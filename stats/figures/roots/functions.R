source("stats/scripts/load_data.R")

library(gridExtra)
library(ggtern)

data_path_roots <- "stats/data/Nuuchahnulth_roots.tsv"
data_path_stems <- "stats/data/Nuuchahnulth.tsv"

data_roots <- load_data(data_path_roots)
data_stems <- load_data(data_path_stems)

data_roots <- data.frame(
  ref  = 1 - data_roots$dispersion_ref,
  pred = 1 - data_roots$dispersion_pred,
  mod  = 1 - data_roots$dispersion_mod
)

data_stems <- data.frame(
  ref  = 1 - data_stems$dispersion_ref,
  pred = 1 - data_stems$dispersion_pred,
  mod  = 1 - data_stems$dispersion_mod
)

roots <- ggtern(data_roots, aes(ref, pred, mod)) +
  labs(
    title = "roots"
  ) +
  Tlab("predication") +
  Llab("reference") +
  Rlab("modification") +
  theme_minimal() +
  theme_hidelabels() +
  theme(
    plot.title          = element_text(hjust = 0.5),
    plot.title.position = "plot",
    tern.axis.title.L   = element_text(hjust = -0.25),
    tern.axis.title.R   = element_text(hjust = 1.25)
  ) +
  tern_limits(T = 1.05, L = 1.05, R = 1.05) +
  geom_polygon(
    data = data.frame(
      ref  = c(1, 0, 0),
      pred = c(0, 1, 0),
      mod  = c(0, 0, 1)
    ),
    alpha = 0,
    color = "#BBBBBB",
    size  = 0.5
  ) +
  geom_point()

stems <- ggtern(data_stems, aes(ref, pred, mod)) +
  labs(
    title = "roots"
  ) +
  Tlab("predication") +
  Llab("reference") +
  Rlab("modification") +
  theme_minimal() +
  theme_hidelabels() +
  theme(
    plot.title          = element_text(hjust = 0.5),
    plot.title.position = "plot",
    tern.axis.title.L   = element_text(hjust = -0.25),
    tern.axis.title.R   = element_text(hjust = 1.25)
  ) +
  tern_limits(T = 1.05, L = 1.05, R = 1.05) +
  geom_polygon(
    data = data.frame(
      ref  = c(1, 0, 0),
      pred = c(0, 1, 0),
      mod  = c(0, 0, 1)
    ),
    alpha = 0,
    color = "#BBBBBB",
    size  = 0.5
  ) +
  geom_point()

grid <- ggtern::grid.arrange(
  roots,
  stems,
  ncol = 2,
  nrow = 1
)

ggsave(
  "stats/figures/roots/functions.png",
  grid
)