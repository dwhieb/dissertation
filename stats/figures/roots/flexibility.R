source("stats/scripts/load_data.R")

library(cowplot)
library(ggplot2)

data_path <- "stats/data/Nuuchahnulth_roots.tsv"
data      <- load_data(data_path)

bin_width <- 0.05 # results in 20 bins

histogram <- ggplot(data, aes(x = flexibility)) +
  labs(
    title = "Distribution of Flexibility Ratings of Nuuchahnulth Roots"
  ) +
  theme(
    axis.text.x  = element_blank(),
    axis.title.x = element_blank(),
    axis.ticks.x = element_blank(),
    plot.margin  = margin(0.5, 0.5, 0, 0.5, "cm"),
  ) + 
  geom_histogram(
    binwidth = bin_width,
    color    = "black",
    fill     = "white"
  ) +
  xlim(0, 1) +
  ylim(0, 50)

grid <- plot_grid(
  histogram
)

grid

ggsave(
  "stats/figures/roots/flexibility.png",
  grid
)