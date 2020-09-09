library(ggtern)

source("stats/scripts/load_data.R")
source("stats/scripts/plot_triangle.R")

file_path <- "stats/data/English_archlexemes.tsv"
data      <- load_data(file_path)

functions_broad <- data.frame(
  data$ref_rel_broad,
  data$pred_rel_broad,
  data$mod_rel
)

functions_strict <- data.frame(
  data$ref_rel,
  data$pred_rel,
  data$mod_rel
)

plot_broad  <- plot_triangle(functions_broad, "Broad", "Relative Frequencies")
plot_strict <- plot_triangle(functions_strict, "Strict", "Relative Frequencies")

plots <- ggtern::grid.arrange(plot_broad, plot_strict, ncol = 2)

ggsave(
  "stats/figures/English_strict_vs_broad/rel_freq.png",
  plots,
  height = 10,
  width = 10,
)
