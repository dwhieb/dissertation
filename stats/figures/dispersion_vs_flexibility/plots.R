source("stats/scripts/load_100.R")

library(ggplot2)
library(cowplot)

data <- load_100()

Eng <- data[which(data$language == "English"), ]
Nuu <- data[which(data$language == "Nuuchahnulth"), ]

Eng_nonzero <- Eng[which(Eng$flexibility > 0), ]
Nuu_nonzero <- Nuu[which(Nuu$flexibility > 0), ]

model_Eng <- lm(Eng$flexibility ~ Eng$dispersion)
model_Nuu <- lm(Nuu$flexibility ~ Nuu$dispersion)

model_Eng_nonzero <- lm(Eng_nonzero$flexibility ~ Eng_nonzero$dispersion)
model_Nuu_nonzero <- lm(Nuu_nonzero$flexibility ~ Nuu_nonzero$dispersion)

models <- data.frame(
  language   = c("English", "Nuuchahnulth"),
  intercepts = c(model_Eng$coefficients[1], model_Nuu$coefficients[1]),
  slopes     = c(model_Eng$coefficients[2], model_Nuu$coefficients[2])
)

models_nonzero <- data.frame(
  language   = c("English", "Nuuchahnulth"),
  intercepts = c(model_Eng_nonzero$coefficients[1], model_Nuu_nonzero$coefficients[1]),
  slopes     = c(model_Eng_nonzero$coefficients[2], model_Nuu_nonzero$coefficients[2])
)

histogram <- ggplot(data, aes(
  x    = flexibility,
  fill = language
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
    bins        = 20,
    color       = "black",
    show.legend = FALSE
  ) +
  xlim(0, 1) +
  ylim(0, 15) +
  facet_grid(cols = vars(language))

scatterplot <- ggplot(data, aes(
  x     = flexibility,
  y     = dispersion,
  color = language,
  shape = language
)) +
  ylab("dispersion (Deviation of Proportions)") +
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
  geom_abline(
    aes(
      color     = language,
      intercept = intercepts,
      slope     = slopes
    ),
    data        = models_nonzero,
    linetype    = "dashed",
    show.legend = FALSE,
    size        = 0.75
  ) +
  geom_rug(
    show.legend = FALSE
  ) +
  xlim(0, 1) +
  ylim(0, 1) +
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
  "stats/figures/dispersion_vs_flexibility/100.png",
  grid
)

