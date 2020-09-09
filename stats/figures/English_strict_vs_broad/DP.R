library(ggtern)

source("stats/scripts/load_data.R")
source("stats/scripts/plot_triangle.R")

file_path <- "stats/data/English_archlexemes.tsv"
data      <- load_data(file_path)

functions_broad <- 1 - data.frame(
  data$dispersion_ref_broad,
  data$dispersion_pred_broad,
  data$dispersion_mod
)

functions_strict <- 1 - data.frame(
  data$dispersion_ref,
  data$dispersion_pred,
  data$dispersion_mod
)

plot_broad  <- plot_triangle(functions_broad, "Broad", "Deviation of Proportions (DP)")
plot_strict <- plot_triangle(functions_strict, "Strict", "Deviation of Proportions (DP)")

plots <- ggtern::grid.arrange(plot_broad, plot_strict, ncol = 2)

ggsave(
  "stats/figures/English_strict_vs_broad/DP.png",
  plots,
  height = 10,
  width = 10,
)
