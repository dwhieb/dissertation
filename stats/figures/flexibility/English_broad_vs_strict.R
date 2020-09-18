library(cowplot)
library(ggplot2)

source("stats/scripts/load_100.R")

data <- load_100()

bin_width <- 0.05 # results in 20 bins

histogram_strict <- ggplot(data, aes(x = flexibility)) +
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
  geom_density(
    aes(y = ..count.. * bin_width),
    alpha       = 0.5,
    show.legend = FALSE
  ) +
  geom_vline(
    aes(xintercept = mean(flexibility)),
    linetype    = "dashed",
    size        = 1,
    show.legend = FALSE
  )

boxplot_strict <- ggplot(data, aes(x = flexibility)) +
  theme(
    axis.text.y        = element_blank(),
    axis.ticks.y       = element_blank(),
    panel.grid.major.y = element_blank(),
    panel.grid.minor.y = element_blank(),
    plot.margin        = margin(0, 0.5, 0.5, 0.5, "cm"),
    strip.text.x       = element_blank()
  ) +
  geom_boxplot(
    notch = TRUE,
    width = 0.5
  ) +
  geom_vline(
    aes(xintercept = mean(flexibility)),
    linetype    = "dashed",
    show.legend = FALSE,
    size        = 1
  ) +
  geom_rug(length = unit(0.2, "cm")) +
  xlim(0, 1) +
  ylim(-0.5, 0.5)

histogram_broad <- ggplot(data, aes(x = flexibility_broad)) +
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
  geom_density(
    aes(y = ..count.. * bin_width),
    alpha       = 0.5,
    show.legend = FALSE
  ) +
  geom_vline(
    aes(xintercept = mean(flexibility_broad)),
    linetype    = "dashed",
    size        = 1,
    show.legend = FALSE
  )

boxplot_broad <- ggplot(data, aes(x = flexibility_broad)) +
  theme(
    axis.text.y        = element_blank(),
    axis.ticks.y       = element_blank(),
    panel.grid.major.y = element_blank(),
    panel.grid.minor.y = element_blank(),
    plot.margin        = margin(0, 0.5, 0.5, 0.5, "cm"),
    strip.text.x       = element_blank()
  ) +
  geom_boxplot(
    notch = TRUE,
    width = 0.5
  ) +
  geom_vline(
    aes(
      color = language,
      xintercept = mean(flexibility_broad)
    ),
    linetype    = "dashed",
    show.legend = FALSE,
    size        = 1
  ) +
  geom_rug(length = unit(0.2, "cm")) +
  xlim(0, 1) +
  ylim(-0.5, 0.5)

grid <- plot_grid(
  histogram_strict,
  histogram_broad,
  boxplot_strict,
  boxplot_broad,
  align = "v",
  ncol  = 2,
  nrow  = 2
)

grid

ggsave(
  "stats/figures/flexibility/English_broad_vs_strict.png",
  grid
)