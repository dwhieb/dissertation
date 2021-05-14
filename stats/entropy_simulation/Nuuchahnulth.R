library(cowplot)
library(ggplot2)

source("stats/scripts/load_data.R")

data_path <- "stats/data/Nuuchahnulth.tsv"

data <- load_data(data_path)

bin_width <- 0.05 # results in 20 bins

histogram <- ggplot(data, aes(x = diversity)) +
  theme(
    axis.text.x  = element_blank(),
    axis.title.x = element_blank(),
    axis.ticks.x = element_blank(),
    plot.margin  = margin(0.5, 0.5, 0, 0.5, "cm"),
  ) +
  geom_histogram(
    bins     = 20,
    color    = "black",
    fill     = "white"
  ) +
  xlim(0, 1) +
  ylim(0, 60)

scatterplot <- ggplot(data, aes(
  x = diversity,
  y = rel_freq
)) +
  ylab("relative frequency") +
  geom_point() +
  xlim(0, 1) +
  ylim(0, 10)

grid <- plot_grid(
  histogram,
  scatterplot,
  align = "v",
  ncol = 1,
  nrow = 2,
  rel_heights = c(1, 4)
)

grid

ggsave(
  "stats/simulation/Nuuchahnulth.png",
  grid,
  width = 5
)
