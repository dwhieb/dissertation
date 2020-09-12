library(cowplot)
library(ggplot2)

source("stats/scripts/load_data.R")

data_English      <- load_data("stats/data/English_archlexemes.tsv")
data_Nuuchahnulth <- load_data("stats/data/Nuuchahnulth_archlexemes.tsv")
data_Nuuchahnulth <- data_Nuuchahnulth[which(data_Nuuchahnulth$frequency > 1 & data_Nuuchahnulth$flexibility != "NaN"), ]

data_English_nonzero      <- data_English[which(data_English$flexibility != 0), ]
data_Nuuchahnulth_nonzero <- data_Nuuchahnulth[which(data_Nuuchahnulth$flexibility != 0), ]

bin_width <- 0.05 # results in 20 bins

English_hist <- ggplot(data_English, aes(x = flexibility)) +
  labs(title = "English") +
  theme(
    axis.text.x         = element_blank(),
    axis.ticks.x        = element_blank(),
    axis.title.x        = element_blank(),
    plot.margin         = margin(0.5, 0.5, 0, 0.5, "cm"),
    plot.title          = element_text(hjust = 0.5),
    plot.title.position = "plot"
  ) +
  geom_histogram(
    binwidth = bin_width,
    color    = "black",
    fill     = "white",
    na.rm    = TRUE
  ) +
  geom_density(
    aes(y = ..count.. * bin_width),
    alpha = 0.2,
    fill  = "red"
  ) +
  geom_vline(
    aes(xintercept = mean(flexibility)),
    color    = "red",
    linetype = "dashed",
    size     = 1
  ) +
  xlim(-0.1, 1)

English_boxplot <- ggplot(data_English, aes(x = flexibility)) +
  theme(
    axis.text.y        = element_blank(),
    axis.ticks.y       = element_blank(),
    axis.title.y       = element_blank(),
    panel.grid.major.y = element_blank(),
    panel.grid.minor.y = element_blank(),
    plot.margin        = margin(0, 0.5, 0.5, 0.5, "cm")
  ) +
  geom_boxplot(
    na.rm = TRUE,
    notch = TRUE,
    width = 0.5
  ) +
  geom_vline(
    aes(xintercept = mean(flexibility)),
    color    = "red",
    linetype = "dashed",
    size = 1
  ) +
  geom_rug(length = unit(0.2, "cm")) +
  xlim(-0.1, 1) +
  ylim(-0.5, 0.5)

Nuuchahnulth_hist <- ggplot(data_Nuuchahnulth, aes(x = flexibility)) +
  labs(title = "Nuuchahnulth") +
  theme(
    axis.text.x         = element_blank(),
    axis.ticks.x        = element_blank(),
    axis.title.x        = element_blank(),
    plot.margin         = margin(0.5, 0.5, 0, 0.5, "cm"),
    plot.title          = element_text(hjust = 0.5),
    plot.title.position = "plot"
  ) +
  geom_histogram(
    binwidth = bin_width,
    color    = "black",
    fill     = "white",
    na.rm    = TRUE
  ) +
  geom_density(
    aes(y = ..count.. * bin_width),
    alpha = 0.2,
    fill  = "blue"
  ) +
  geom_vline(
    aes(xintercept = mean(flexibility)),
    color    = "blue",
    linetype = "dashed",
    size     = 1
  ) +
  xlim(-0.1, 1)

Nuuchahnulth_boxplot <- ggplot(data_Nuuchahnulth, aes(x = flexibility)) +
  theme(
    axis.text.y        = element_blank(),
    axis.ticks.y       = element_blank(),
    axis.title.y       = element_blank(),
    panel.grid.major.y = element_blank(),
    panel.grid.minor.y = element_blank(),
    plot.margin        = margin(0, 0.5, 0.5, 0.5, "cm")
  ) +
  geom_boxplot(
    na.rm = TRUE,
    notch = TRUE,
    width = 0.5
  ) +
  geom_vline(
    aes(xintercept = mean(flexibility)),
    color    = "blue",
    linetype = "dashed",
    size = 1
  ) +
  geom_rug(length = unit(0.2, "cm")) +
  xlim(-0.1, 1) +
  ylim(-0.5, 0.5)

English_hist_nonzero <- ggplot(data_English_nonzero, aes(x = flexibility)) +
  labs(title = "English (nonzero)") +
  theme(
    axis.text.x         = element_blank(),
    axis.ticks.x        = element_blank(),
    axis.title.x        = element_blank(),
    plot.margin         = margin(0.5, 0.5, 0, 0.5, "cm"),
    plot.title          = element_text(hjust = 0.5),
    plot.title.position = "plot"
  ) +
  geom_histogram(
    binwidth = bin_width,
    color    = "black",
    fill     = "white",
    na.rm    = TRUE
  ) +
  geom_density(
    aes(y = ..count.. * bin_width),
    alpha = 0.2,
    fill  = "red"
  ) +
  geom_vline(
    aes(xintercept = mean(flexibility)),
    color    = "red",
    linetype = "dashed",
    size     = 1
  ) +
  xlim(-0.1, 1) +
  ylim(0, 45)

English_boxplot_nonzero <- ggplot(data_English_nonzero, aes(x = flexibility)) +
  theme(
    axis.text.y        = element_blank(),
    axis.ticks.y       = element_blank(),
    axis.title.y       = element_blank(),
    panel.grid.major.y = element_blank(),
    panel.grid.minor.y = element_blank(),
    plot.margin        = margin(0, 0.5, 0.5, 0.5, "cm")
  ) +
  geom_boxplot(
    na.rm = TRUE,
    notch = TRUE,
    width = 0.5
  ) +
  geom_vline(
    aes(xintercept = mean(flexibility)),
    color    = "red",
    linetype = "dashed",
    size = 1
  ) +
  geom_rug(length = unit(0.2, "cm")) +
  xlim(-0.1, 1) +
  ylim(-0.5, 0.5)

Nuuchahnulth_hist_nonzero <- ggplot(data_Nuuchahnulth_nonzero, aes(x = flexibility)) +
  labs(title = "Nuuchahnulth (nonzero)") +
  theme(
    axis.text.x         = element_blank(),
    axis.ticks.x        = element_blank(),
    axis.title.x        = element_blank(),
    plot.margin         = margin(0.5, 0.5, 0, 0.5, "cm"),
    plot.title          = element_text(hjust = 0.5),
    plot.title.position = "plot"
  ) +
  geom_histogram(
    binwidth = bin_width,
    color    = "black",
    fill     = "white",
    na.rm    = TRUE
  ) +
  geom_density(
    aes(y = ..count.. * bin_width),
    alpha = 0.2,
    fill  = "blue"
  ) +
  geom_vline(
    aes(xintercept = mean(flexibility)),
    color    = "blue",
    linetype = "dashed",
    size     = 1
  ) +
  xlim(-0.1, 1) +
  ylim(0, 45)

Nuuchahnulth_boxplot_nonzero <- ggplot(data_Nuuchahnulth_nonzero, aes(x = flexibility)) +
  theme(
    axis.text.y        = element_blank(),
    axis.ticks.y       = element_blank(),
    axis.title.y       = element_blank(),
    panel.grid.major.y = element_blank(),
    panel.grid.minor.y = element_blank(),
    plot.margin        = margin(0, 0.5, 0.5, 0.5, "cm")
  ) +
  geom_boxplot(
    na.rm = TRUE,
    notch = TRUE,
    width = 0.5
  ) +
  geom_vline(
    aes(xintercept = mean(flexibility)),
    color    = "blue",
    linetype = "dashed",
    size = 1
  ) +
  geom_rug(length = unit(0.2, "cm")) +
  xlim(-0.1, 1) +
  ylim(-0.5, 0.5)

grid <- plot_grid(
  English_hist,
  Nuuchahnulth_hist,
  English_boxplot,
  Nuuchahnulth_boxplot,
  English_hist_nonzero,
  Nuuchahnulth_hist_nonzero,
  English_boxplot_nonzero,
  Nuuchahnulth_boxplot_nonzero,
  align = "v",
  ncol  = 2,
  nrow  = 4,
  rel_heights = c(3.5, 1, 3.5, 1)
)

grid

ggsave(
  "stats/figures/flexibility/distribution.png",
  grid,
  height = 10,
  width  = 10
)
