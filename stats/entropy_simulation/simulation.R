library(ggplot2)

data_path <- "stats/entropy_simulation/simulated_entropy.csv"
plot_path <- "stats/entropy_simulation/simulation.png"

data <- read.csv(
  data_path,
  header = TRUE
)

hist(data$entropy)

log_with_0 <- function(value) {
  ifelse (value == 0, 0, log(value))
}

calculate_entropy <- function(values) {
  percentages <- values / sum(values)
  return(-sum(percentages * log_with_0(percentages)) / 3)
}

# entropy cannot get below 0.05 until frequency >= 102
print(calculate_entropy(c(102, 1, 0)))

plot <- ggplot(data, aes(
  x = entropy,
  y = freq
)) +
  xlab("functional diversity (entropy)") +
  ylab("frequency") +
  theme_minimal() +
  geom_point() +
  xlim(0, 1)

ggsave(
  plot_path,
  plot
)
