library(cowplot)
library(ggplot2)

source("stats/scripts/load_100.R")

data <- load_100()
data <- data[which(data$flexibility != "NaN"), ]

data_Eng <- data[which(language == "English"), ]
data_Nuu <- data[which(language == "Nuuchahnulth"), ]

attach(data)

model_Eng <- lm(data_Eng$flexibility ~ data_Eng$rel_freq)
model_Nuu <- lm(data_Nuu$flexibility ~ data_Nuu$rel_freq)

models <- data.frame(
  c("English", "Nuuchahnulth"),
  c(model_Eng$coefficients[1], model_Nuu$coefficients[1]),
  c(model_Eng$coefficients[2], model_Nuu$coefficients[2])
)

colnames(models) <- c("language", "intercepts", "slopes")

histogram <- ggplot(data, aes(
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

scatterplot <- ggplot(data, aes(
  x     = flexibility,
  y     = rel_freq,
  color = language,
  shape = language
)) +
  ylab("relative frequency (per 1,000 words)") +
  theme_minimal() +
  theme(
    axis.text.x  = element_blank(),
    axis.title.x = element_blank(),
    plot.margin  = margin(0, 0.5, 0, 0.5, "cm"),
    strip.text.x = element_blank()
  ) +
  geom_point(
    show.legend = FALSE,
    size = 1
  ) +
  geom_rug(
    show.legend = FALSE
  ) +
  geom_density2d(
    show.legend = FALSE
  ) +
  geom_abline(
    aes(
      color     = language,
      intercept = intercepts,
      slope     = slopes
    ),
    data        = models,
    show.legend = FALSE,
    size        = 0.75
  ) +
  xlim(0, 1) +
  # clip 9 values for readability
  ylim(0, 5) +
  facet_grid(cols = vars(language))

boxplot <- ggplot(data, aes(
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
  "stats/figures/frequency_vs_flexibility/comparison.png",
  grid
)
