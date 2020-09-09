library(ggtern)
source("stats/scripts/load_data.R")
source("stats/scripts/plot_triangle.R")

file_path <- "stats/data/English_archlexemes.tsv"
data      <- load_data(file_path)

functions <- 1 - data.frame(
  data$dispersion_ref,
  data$dispersion_pred,
  data$dispersion_mod
)

plot <- plot_triangle(functions)

ggsave(
  "stats/figures/English_strict/triangle.png",
  width  = 10,
  height = 10
)
