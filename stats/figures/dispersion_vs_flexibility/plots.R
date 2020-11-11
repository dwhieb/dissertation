source("stats/scripts/load_100.R")
source("stats/scripts/load_small.R")

library(cowplot)
library(ggplot2)

create_graphic <- function(data) {

  # create models

  Eng <- data[which(data$language == "English"), ]
  Nuu <- data[which(data$language == "Nuuchahnulth"), ]

  model_Eng <- lm(Eng$dispersion ~ Eng$flexibility)
  model_Nuu <- lm(Nuu$dispersion ~ Nuu$flexibility)

  models <- data.frame(
    language   = c("English", "Nuuchahnulth"),
    intercepts = c(model_Eng$coefficients[1], model_Nuu$coefficients[1]),
    slopes     = c(model_Eng$coefficients[2], model_Nuu$coefficients[2])
  )

  # ggplot visualization

  histogram <- ggplot(data, aes(
    x    = dispersion,
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
    x     = dispersion,
    y     = flexibility,
    color = language,
    shape = language
  )) +
    ylab("flexbility (Shannon H)") +
    theme_minimal() +
    theme(
      axis.text.x  = element_blank(),
      axis.title.x = element_blank(),
      plot.margin  = margin(0, 0.5, 0, 0.5, "cm"),
      strip.text.x = element_blank()
    ) +
    geom_point(
      show.legend = FALSE,
      size        = 1
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
    ylim(0, 1) +
    facet_grid(cols = vars(language))

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
    xlab("dispersion (Deviation of Proportions)") +
    geom_boxplot(
      na.rm       = TRUE,
      notch       = TRUE,
      show.legend = FALSE,
      width       = 1
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
    rel_heights = c(1, 4, 1)
  )

  return(grid)

}

data_100   <- load_100()
data_small <- load_small()

graphic_100   <- create_graphic(data_100)
graphic_small <- create_graphic(data_small)

figure_height <- 7.5
figure_width  <- 10

ggsave(
  "stats/figures/dispersion_vs_flexibility/100.png",
  graphic_100,
  height = figure_height,
  width  = figure_width
)

ggsave(
  "stats/figures/dispersion_vs_flexibility/small.png",
  graphic_small,
  height = figure_height,
  width  = figure_width
)
