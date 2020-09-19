source("stats/scripts/load_data.R")

library(ggplot2)

data_path <- "stats/data/Nuuchahnulth_roots.tsv"
data      <- load_data(data_path)

plot <- ggplot(data, aes(x = flexibility, y = dispersion)) +
  labs(
    title = "Dispersion vs. Flexibility for Nuuchahnulth Roots",
    x     = "flexibility",
    y     = "dispersion (DP)"
  ) +
  theme_minimal() +
  geom_point(
    size = 1
  ) +
  xlim(0, 1) +
  ylim(0, 1)
  
plot

ggsave(
  "stats/figures/roots/dispersion_vs_flexibility.png",
  plot
)