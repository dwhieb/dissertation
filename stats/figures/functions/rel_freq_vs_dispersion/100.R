library(ggtern)

source("stats/scripts/load_100.R")
source("stats/scripts/plot_triangle.R")

data <- load_all()

dispersion <- data.frame(
  ref      = 1 - data$dispersion_ref,
  pred     = 1 - data$dispersion_pred,
  mod      = 1 - data$dispersion_mod,
  language = data$language
)

rel_freq <- data.frame(
  ref      = data$ref_rel,
  pred     = data$pred_rel,
  mod      = data$mod_rel,
  language = data$language
)

plot_rel_freq <- ggtern(
  rel_freq,
  aes(
    x = ref,
    y = pred,
    z = mod
  )
) +
  labs(
    title = "Relative Frequency"
  ) +
  Tlab("predication") +
  Llab("reference") +
  Rlab("modification") +
  theme_minimal() +
  theme(
    strip.text.y        = element_blank(),
    plot.title.position = "plot",
    plot.title          = element_text(hjust = 0.5),
    tern.axis.title.R   = element_text(hjust = 1.25),
    tern.axis.title.L   = element_text(hjust = -0.25)
  ) +
  theme_hidelabels() +
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
  geom_point(
    aes(color = language),
    show.legend = FALSE
  ) +
  facet_grid(
    rows = vars(language)
  )

plot_dispersion <- ggtern(
  dispersion,
  aes(
    x = ref,
    y = pred,
    z = mod
  ),
  color = language
) +
  labs(
    title = "Dispersion"
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
    data = data.frame(
      ref  = c(1, 0, 0),
      pred = c(0, 1, 0),
      mod  = c(0, 0, 1)
    ),
    alpha = 0,
    color = "#BBBBBB",
    size  = 0.5
  ) +
  geom_point(
    aes(color = language),
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

grid

ggsave(
  "stats/figures/functions/rel_freq_vs_dispersion/100.png",
  grid,
  height = 10,
  width = 10,
)
