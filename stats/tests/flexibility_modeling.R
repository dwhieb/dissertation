data <- data.frame(
  ref       = c(1),
  pred      = c(1),
  mod       = c(1),
  frequency = c(3),
  entropy   = c(1)
)

log3 <- log(3)

calculate_entropy <- function(values) {
  percentages <- values / sum(values)
  return(-sum(percentages * log(percentages)) / log3)
}

# frequency loop
for (f in 1:100) {
  
  # observations loop
  for (o in 1:100) {
    
    values <- runif(f)
    
    observations <- cut(
      values,
      breaks = c(0, 0.333, 0.666, 1),
      include.lowest = TRUE,
      labels = c("ref", "pred", "mod")
    )
    
    counts  <- data.frame(table(observations))
    entropy <- calculate_entropy(1 + counts$Freq)
    lexeme  <- c(counts$Freq, f, entropy)
    data    <- rbind(data, lexeme)
    
  }

}

plot(data$frequency ~ data$entropy)