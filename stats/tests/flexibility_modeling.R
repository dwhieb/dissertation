file_path <- "stats/tests/simulated.csv"
log3      <- log(3)

log_with_0 <- function(x) {
  return(ifelse(x == 0, 0, log(x)))
}

calculate_entropy <- function(values) {
  percentages <- values / sum(values)
  return(-sum(percentages * log_with_0(percentages)) / log3)
}

data <- read.csv(
  file_path,
  header = TRUE
)

for (i in 1:length(data$freq)) {
  
  data$entropy[i] = calculate_entropy(c(data$ref[i], data$pred[i], data$mod[i]))
  
}

write.csv(
  data,
  "stats/tests/simulated_entropy.csv",
  row.names = FALSE
)