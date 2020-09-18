library(ggplot2)

source("stats/scripts/load_data.R")

file_path <- "stats/data/Nuuchahnulth.tsv"
data      <- load_data(file_path)

data <- 1 - data.frame(
  ref = data$dispersion_ref,
  pred = data$dispersion_pred
)

plot <- ggplot(data, aes(ref, pred)) +
  labs(title = "Deviation of Proportions (DP)") +
  xlab("reference") +
  ylab("predication") +
  theme_minimal() +
  xlim(0, 0.8) +
  ylim(0, 0.8) +
  geom_point()

plot

ggsave(
  "stats/figures/functions/Nuuchahnulth_ref_vs_pred/plot.png",
  plot,
  height = 10,
  width  = 10
)
