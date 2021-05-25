rm(list = ls(all.names = TRUE))

require(combinat)

chi_squared_test <- function(obs.freqs, exp.percs) {
   exp.freqs <- sum(obs.freqs) * exp.percs
   sum( ( (obs.freqs - exp.freqs) ^ 2) / exp.freqs)
}

multinomial_test <- function (obs.freqs, exp.percs) {

  possible.outcomes      <- xsimplex(length(obs.freqs), sum(obs.freqs))
  possible.outcome.probs <- apply(possible.outcomes, 2, dmnom, prob = exp.percs)
  possible.outcome.chis  <- apply(possible.outcomes, 2, chi_squared_test, exp.percs = exp.percs)

  output <- sum(possible.outcome.probs[possible.outcome.chis >= chi_squared_test(obs.freqs, exp.percs)])

  names(output) <- "p_multinomial test (based on prob. of occ. more deviating from H0)"

  return(output)

}

# create the null hypothesis probabilities for 3 types:
exp.percs <- rep(1 / 3, 3) # equal distribution
collector <- c() # create a collector structure

# go through token frequencies from 1 to 12
for (num_tokens in 1:12) {

   # create the most extreme distribution possible with
   # that many tokens over 3 type slots (N, V, Adj)
   obs.freqs <- c(num_tokens, 0, 0)

   # compute a multinomial test for this distribution
   # collect its p-value
   collector[num_tokens] <- multinomial_test(obs.freqs, exp.percs)

}

# check when it's even possible to get a significant result
min(which(round(collector, 5) < 0.05)) # you need minimally 4 tokens
