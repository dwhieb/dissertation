library(ggplot2)

data_path <- "stats/simulation/simulated_entropy.csv"
plot_path <- "stats/simulation/simulation.png"

data <- read.csv(
  data_path,
  header = TRUE
)

hist(data$entropy)

calculate_entropy <- function(values) {
  percentages <- values / sum(values)
  return(-sum(percentages * log_with_0(percentages)) / log3)
}

# entropy cannot get below 0.05 until frequency >= 102
print(calculate_entropy(c(102, 1, 0)))

plot <- ggplot(data, aes(
  x = entropy,
  y = freq
)) +
  xlab("flexibility (entropy)") +
  ylab("frequency") +
  theme_minimal() +
  geom_point() +
  xlim(0, 1)

ggsave(
  plot_path,
  plot
)