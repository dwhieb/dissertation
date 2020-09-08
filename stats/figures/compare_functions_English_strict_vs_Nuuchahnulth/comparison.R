library(ggtern)
source("stats/scripts/load_data.R")
source("stats/scripts/plot_triangle.R")

file_path_English <- "stats/data/English_archlexemes_strict.tsv"
data_English      <- load_data(file_path_English)
functions_English <- 1 - data_English[7:9] # DP
plot_English      <- plot_triangle(functions_English, "English (strict)")

file_path_Nuuchahnulth <- "stats/data/Nuuchahnulth_archlexemes.tsv"
data_Nuuchahnulth      <- load_data(file_path_Nuuchahnulth)
functions_Nuuchahnulth <- 1 - data_Nuuchahnulth[7:9] # DP
plot_Nuuchahnulth      <- plot_triangle(functions_Nuuchahnulth, "Nuuchahnulth")

plots <- ggtern::grid.arrange(plot_English, plot_Nuuchahnulth, ncol = 2)

ggsave(
  "stats/figures/compare_functions_English_strict_vs_Nuuchahnulth/comparison.png",
  plots,
  height = 10,
  width = 10,
)
