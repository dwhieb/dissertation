# Plots all stems of Nuuchahnulth, coded by aspect (including those without aspect)

source("stats/scripts/load_data.R")

library(ggtern)

data <- load_data("stats/data/Nuuchahnulth_stems.tsv")

data$dispersion_ref  <- 1 - data$dispersion_ref
data$dispersion_pred <- 1 - data$dispersion_pred
data$dispersion_mod  <- 1 - data$dispersion_mod

create_plot <- function() {

  plot <- ggtern(data, aes(
    dispersion_ref,
    dispersion_pred,
    dispersion_mod,
    color = aspect
  )) +
    theme_minimal() +
    theme_hidelabels() +
    theme(
      tern.axis.title.L = element_text(hjust = -0.25),
      tern.axis.title.R = element_text(hjust = 1.25)
    ) +
    Tlab("predication") +
    Llab("reference") +
    Rlab("modification") +
    tern_limits(T = 1.05, L = 1.05, R = 1.05) +
    geom_polygon(
      data = data.frame(
        dispersion_ref  = c(1, 0, 0),
        dispersion_pred = c(0, 1, 0),
        dispersion_mod  = c(0, 0, 1)
      ),
      alpha = 0,
      color = "#BBBBBB",
      size  = 0.5
    ) +
    geom_point(
      size = 2.5
    )

  return (plot)

}

plot_all <- create_plot()

ggsave(
  "stats/figures/aspect/all_lexemes.png",
  plot_all
)

data <- data[which(!is.na(data$aspect)), ]

plot_aspects <- create_plot()

ggsave(
  "stats/figures/aspect/all_aspects.png",
  plot_aspects
)
