library(cowplot)
library(ggplot2)

source("stats/scripts/load_all_data.R")

data <- load_all_data()
data <- data[which(data$flexibility != "NaN"), ]
attach(data)

data_nonzero <- data[which(flexibility > 0), ]

histogram <- ggplot(data_nonzero, aes(
  x     = flexibility,
  fill  = language
)) +
  theme_minimal() +
  theme(
    axis.text        = element_blank(),
    axis.title       = element_blank(),
    panel.grid.major = element_blank(),
    panel.grid.minor = element_blank(),
    plot.margin      = margin(0.5, 0.5, 0, 0.5, "cm")
  ) +
  geom_histogram(
    binwidth    = 0.05,
    color       = "black",
    show.legend = FALSE
  ) +
  xlim(0, 1) +
  facet_grid(cols = vars(language))

scatterplot <- ggplot(data_nonzero, aes(
  x     = flexibility,
  y     = rel_freq,
  color = language,
  shape = language
)) +
  ylab("relative frequency (per 1,000 words)") +
  labs(
    #color = "Language",
    #shape = "Language"
  ) +
  theme_minimal() +
  theme(
    axis.text.x  = element_blank(),
    axis.title.x = element_blank(),
    plot.margin  = margin(0, 0.5, 0, 0.5, "cm"),
    strip.text.x = element_blank()
  ) +
  geom_point(
    show.legend = FALSE,
    size = 2
  ) +
  geom_rug(
    show.legend = FALSE
  ) +
  xlim(0, 1) +
  # clip 9 values for readability
  ylim(0, 10) +
  facet_grid(cols = vars(language))

boxplot <- ggplot(data_nonzero, aes(
  x    = flexibility,
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
  facet_grid(cols = vars(language))

grid <- plot_grid(
  histogram,
  scatterplot,
  boxplot,
  align = "v",
  ncol  = 1,
  nrow  = 3,
  rel_heights = c(1, 3.5, 1)
)

grid

ggsave(
  "stats/figures/freq_vs_flex/plot.png",
  grid
)