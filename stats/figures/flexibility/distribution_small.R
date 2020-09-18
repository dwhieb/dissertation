library(cowplot)
library(ggplot2)

source("stats/scripts/load_small.R")

data <- load_small()
data <- data[which(data$frequency > 10), ]

bin_width <- 0.05 # results in 20 bins

histogram <- ggplot(data, aes(x = flexibility)) +
  labs(
    title = "Distribution of Flexibility Ratings (Non-Low Frequencies, Small Corpus)"
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
  geom_density(
    aes(
      color = language,
      fill  = language,
      y     = ..count.. * bin_width,
    ),
    alpha       = 0.5,
    show.legend = FALSE
  ) +
  geom_vline(
    aes(
      color = language,
      xintercept = mean(flexibility)
    ),
    linetype    = "dashed",
    size        = 1,
    show.legend = FALSE
  ) +
  xlim(0, 1) +
  facet_grid(cols = vars(language))

boxplot <- ggplot(data, aes(x = flexibility)) +
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
      xintercept = mean(flexibility)
    ),
    linetype    = "dashed",
    show.legend = FALSE,
    size        = 1
  ) +
  geom_rug(length = unit(0.2, "cm")) +
  xlim(0, 1) +
  ylim(-0.5, 0.5) +
  facet_grid(cols = vars(language))

grid <- plot_grid(
  histogram,
  boxplot,
  align = "v",
  ncol  = 1,
  nrow  = 2,
  rel_heights = c(3.5, 1)
)

grid

ggsave(
  "stats/figures/flexibility/distribution_small.png",
  grid
)
