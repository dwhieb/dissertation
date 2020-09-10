library(ggtern)

source("stats/scripts/load_data.R")
source("stats/scripts/plot_triangle.R")

file_path <- "stats/data/English_archlexemes.tsv"
data      <- load_data(file_path)

rel_freq <- data.frame(
  data$ref_rel_broad,
  data$pred_rel_broad,
  data$mod_rel
)

DP <- 1 - data.frame(
  data$dispersion_ref_broad,
  data$dispersion_pred_broad,
  data$dispersion_mod
)

plot_rel_freq <- plot_triangle(rel_freq, "English (broad)", "Relative Frequency")
plot_DP       <- plot_triangle(DP, "English (broad)", "Deviation of Proportions (DP)")

plots <- ggtern::grid.arrange(
  plot_rel_freq,
  plot_DP,
  ncol = 2
)

ggsave(
  "stats/figures/functions/English_broad/rel_freq.png",
  plot_rel_freq,
  width  = 10,
  height = 10
)

ggsave(
  "stats/figures/functions/English_broad/DP.png",
  plot_DP,
  width  = 10,
  height = 10
)

ggsave(
  "stats/figures/functions/English_broad/comparison.png",
  plots,
  height = 10,
  width = 10,
)
