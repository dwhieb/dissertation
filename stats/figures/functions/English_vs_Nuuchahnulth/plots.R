source("stats/scripts/load_100.R")
source("stats/scripts/load_small.R")

library(ggtern)

create_graphic <- function(data) {

  plot <- ggtern(
    data,
    aes(
      dispersion_ref,
      dispersion_pred,
      dispersion_mod,
      color = language
    )
  ) +
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
  geom_point(show.legend = FALSE) +
  facet_grid(cols = vars(language))

  return(plot)

}

data_100 <- load_100()
data_100$dispersion_ref  <- 1 - data_100$dispersion_ref
data_100$dispersion_pred <- 1 - data_100$dispersion_pred
data_100$dispersion_mod  <- 1 - data_100$dispersion_mod

data_small <- load_small()
data_small$dispersion_ref  <- 1 - data_small$dispersion_ref
data_small$dispersion_pred <- 1 - data_small$dispersion_pred
data_small$dispersion_mod  <- 1 - data_small$dispersion_mod

graphic_100   <- create_graphic(data_100)
graphic_small <- create_graphic(data_small)

fig_height <- 5
fig_width  <- 10

ggsave(
  "stats/figures/functions/English_vs_Nuuchahnulth/100.png",
  graphic_100,
  height = fig_height,
  width  = fig_width
)

ggsave(
  "stats/figures/functions/English_vs_Nuuchahnulth/small.png",
  graphic_small,
  height = fig_height,
  width  = fig_width
)
