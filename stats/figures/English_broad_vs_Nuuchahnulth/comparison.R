library(ggtern)

source("stats/scripts/load_data.R")
source("stats/scripts/plot_triangle.R")

file_path_English <- "stats/data/English_archlexemes.tsv"
data_English      <- load_data(file_path_English)

functions_English <- 1 - data.frame(
  data_English$dispersion_ref_broad,
  data_English$dispersion_pred_broad,
  data_English$dispersion_mod
)

plot_English <- plot_triangle(functions_English, "English (broad)")

file_path_Nuuchahnulth <- "stats/data/Nuuchahnulth_archlexemes.tsv"
data_Nuuchahnulth      <- load_data(file_path_Nuuchahnulth)

functions_Nuuchahnulth <- 1 - data.frame(
  data_Nuuchahnulth$dispersion_ref,
  data_Nuuchahnulth$dispersion_pred,
  data_Nuuchahnulth$dispersion_mod
)

plot_Nuuchahnulth <- plot_triangle(functions_Nuuchahnulth, "Nuuchahnulth")

plots <- ggtern::grid.arrange(plot_English, plot_Nuuchahnulth, ncol = 2)

ggsave(
  "stats/figures/English_broad_vs_Nuuchahnulth/comparison.png",
  plots,
  height = 10,
  width = 10,
)
