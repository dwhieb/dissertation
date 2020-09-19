source("stats/scripts/load_data.R")

library(ggplot2)

data_path_roots <- "stats/data/Nuuchahnulth_roots.tsv"
data_path_stems <- "stats/data/Nuuchahnulth.tsv"

data_roots <- load_data(data_path_roots)
data_stems <- load_data(data_path_stems)

data_roots <- data.frame(
  ref  = 1 - data_roots$dispersion_ref,
  pred = 1 - data_roots$dispersion_pred
)

data_stems <- data.frame(
  ref  = 1 - data_stems$dispersion_ref,
  pred = 1 - data_stems$dispersion_pred
)

roots <- ggplot(data_roots, aes(ref, pred)) +
  labs(
    title = "roots",
    x     = "reference",
    y     = "predication"
  ) +
  theme_minimal() +
  geom_point()

stems <- ggplot(data_stems, aes(ref, pred)) +
  labs(
    title = "stems",
    x     = "reference",
    y     = "predication"
  ) +
  theme_minimal() +
  geom_point()

grid <- plot_grid(
  roots,
  stems
)

grid

ggsave(
  "stats/figures/roots/ref_vs_pred.png",
  grid
)