# This script creates and saves 1 ternary plot for each English archlexeme

library(ggtern)
source("stats/scripts/load_data.R")
source("stats/scripts/plot_triangle_text.R")

file_path <- "stats/data/English_archlexemes_strict.tsv"
data      <- load_data(file_path)
functions <- 1 - data[7:9] # DP

for (i in 1:length(functions$dispersionREF)) {

  archlexeme <- data[i, 1]

  plot_triangle_text(functions[i, ], archlexeme, archlexeme)

  ggsave(
    paste("stats/figures/English_words/strict/", archlexeme, ".png", sep = ""),
    width  = 10,
    height = 10
  )

}
