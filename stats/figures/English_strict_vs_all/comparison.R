library(ggtern)
source("stats/scripts/load_data.R")
source("stats/scripts/plot_triangle.R")

file_path_all <- "stats/data/English_archlexemes_all.tsv"
data_all      <- load_data(file_path_all)
functions_all <- 1 - data_all[7:9] # DP
plot_all      <- plot_triangle(functions_all, "Broad")

file_path_strict <- "stats/data/English_archlexemes_strict.tsv"
data_strict      <- load_data(file_path_strict)
functions_strict <- 1 - data_strict[7:9] # DP
plot_strict      <- plot_triangle(functions_strict, "Strict")

plots <- ggtern::grid.arrange(plot_all, plot_strict, ncol = 2)

ggsave(
  "stats/figures/English_strict_vs_all/comparison.png",
  plots,
  height = 10,
  width = 10,
)
