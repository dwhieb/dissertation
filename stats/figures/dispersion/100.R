source("stats/scripts/load_100.R")

library(ggplot2)
library(cowplot)

data <- load_100()

boxplot <- ggplot(data, aes(
  x    = dispersion,
  fill = language
)) +
  theme_minimal() +
  theme(
    axis.text.y        = element_blank(),
    axis.ticks.y       = element_blank(),
    axis.title.y       = element_blank(),
    panel.grid.major.y = element_blank(),
    panel.grid.minor.y = element_blank(),
    plot.margin        = margin(0, 0.5, 0.5, 0.5, "cm"),
    strip.text.x       = element_blank()
  ) +
  geom_boxplot(
    na.rm       = TRUE,
    notch       = TRUE,
    show.legend = FALSE,
    width       = 0.5
  ) +
  xlim(0, 1) +
  ylim(-0.5, 0.5) +
  facet_grid(cols = vars(dispersion))

boxplot
