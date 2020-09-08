library(ggtern)
source("stats/scripts/load_data.R")
source("stats/scripts/plot_triangle.R")

file_path <- "stats/data/English_archlexemes_strict.tsv"
data      <- load_data(file_path)
functions <- 1 - data[7:9] # DP
plot      <- plot_triangle(functions)

ggsave(
  "stats/figures/English_strict/triangle.png",
  width  = 10,
  height = 10
)
