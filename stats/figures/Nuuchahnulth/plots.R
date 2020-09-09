library(ggtern)

source("stats/scripts/load_data.R")
source("stats/scripts/plot_triangle.R")

file_path <- "stats/data/Nuuchahnulth_archlexemes.tsv"
data      <- load_data(file_path)

rel_freq <- data.frame(
  data$ref_rel,
  data$pred_rel,
  data$mod_rel
)

DP <- 1 - data.frame(
  data$dispersion_ref,
  data$dispersion_pred,
  data$dispersion_mod
)

plot_rel_freq <- plot_triangle(rel_freq, "Nuuchahnulth", "Relative Frequency")
plot_DP       <- plot_triangle(DP, "Nuuchahnulth", "Deviation of Proportions (DP)")

plots <- ggtern::grid.arrange(
  plot_rel_freq,
  plot_DP,
  ncol = 2
)

ggsave(
  "stats/figures/Nuuchahnulth/rel_freq.png",
  plot_rel_freq,
  width  = 10,
  height = 10
)

ggsave(
  "stats/figures/Nuuchahnulth/DP.png",
  plot_DP,
  width  = 10,
  height = 10
)

ggsave(
  "stats/figures/Nuuchahnulth/comparison.png",
  plots,
  height = 10,
  width = 10,
)
