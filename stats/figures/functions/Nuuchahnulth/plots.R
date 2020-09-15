library(ggtern)

source("stats/scripts/load_Nuuchahnulth_100.R")
source("stats/scripts/plot_triangle.R")

data <- load_Nuuchahnulth_100()

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
  "stats/figures/functions/Nuuchahnulth/rel_freq.png",
  plot_rel_freq,
  width  = 10,
  height = 10
)

ggsave(
  "stats/figures/functions/Nuuchahnulth/DP.png",
  plot_DP,
  width  = 10,
  height = 10
)

ggsave(
  "stats/figures/functions/Nuuchahnulth/comparison.png",
  plots,
  height = 10,
  width = 10,
)
