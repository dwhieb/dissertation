source("stats/scripts/load_100.R")
source("stats/scripts/load_small.R")

library(ggtern)

create_graphic <- function(data) {

  plot_rel_freq <- ggtern(
    data,
    aes(
      color = language,
      x     = ref_rel,
      y     = pred_rel,
      z     = mod_rel
    )
  ) +
    labs(
      title = "Relative Frequency (per 1,000 words)"
    ) +
    Tlab("predication") +
    Llab("reference") +
    Rlab("modification") +
    theme_minimal() +
    theme(
      plot.title.position = "plot",
      plot.title          = element_text(hjust = 0.5),
      tern.axis.title.R   = element_text(hjust = 1.25),
      tern.axis.title.L   = element_text(hjust = -0.25)
    ) +
    theme_hidelabels() +
    tern_limits(T = 1.05, L = 1.05, R = 1.05) +
    geom_polygon(
      alpha = 0,
      color = "#BBBBBB",
      data = data.frame(
        ref_rel  = c(1, 0, 0),
        pred_rel = c(0, 1, 0),
        mod_rel  = c(0, 0, 1)
      ),
      size = 0.5
    ) +
    geom_point(
      show.legend = FALSE
    ) +
    facet_grid(
      rows = vars(language)
    )

  data$dispersion_ref  <- 1 - data$dispersion_ref
  data$dispersion_pred <- 1 - data$dispersion_pred
  data$dispersion_mod  <- 1 - data$dispersion_mod

  plot_dispersion <- ggtern(
    data,
    aes(
      color = language,
      x     = dispersion_ref,
      y     = dispersion_pred,
      z     = dispersion_mod
    )
  ) +
    labs(
      title = "Dispersion (Deviation of Proportions)"
    ) +
    Tlab("predication") +
    Llab("reference") +
    Rlab("modification") +
    theme_minimal() +
    theme(
      plot.title.position = "plot",
      plot.title          = element_text(hjust = 0.5),
      tern.axis.title.R   = element_text(hjust = 1.25),
      tern.axis.title.L   = element_text(hjust = -0.25)
    ) +
    theme_hidelabels() +
    tern_limits(T = 1.05, L = 1.05, R = 1.05) +
    geom_polygon(
      alpha = 0,
      color = "#BBBBBB",
      data = data.frame(
        dispersion_ref  = c(1, 0, 0),
        dispersion_pred = c(0, 1, 0),
        dispersion_mod  = c(0, 0, 1)
      ),
      size = 0.5
    ) +
    geom_point(
      show.legend = FALSE
    ) +
    facet_grid(
      rows = vars(language)
    )

  grid <- ggtern::grid.arrange(
    plot_rel_freq,
    plot_dispersion,
    ncol = 2,
    nrow = 1
  )

  return(grid)

}

data_100   <- load_100()
data_small <- load_small()

graphic_100   <- create_graphic(data_100)
graphic_small <- create_graphic(data_small)

fig_dim <- 10

ggsave(
  "stats/figures/functions/rel_freq_vs_dispersion/100.png",
  graphic_100,
  height = fig_dim,
  width  = fig_dim
)

ggsave(
 "stats/figures/functions/rel_freq_vs_dispersion/small.png",
 graphic_small,
 height = fig_dim,
 width  = fig_dim
)
