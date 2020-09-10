library(ggtern)

source("stats/scripts/load_data.R")
source("stats/scripts/plot_triangle.R")

file_path_English <- "stats/data/English_archlexemes.tsv"
data_English      <- load_data(file_path_English)

functions_English <- data.frame(
  data_English$ref_rel_broad,
  data_English$pred_rel_broad,
  data_English$mod_rel
)

plot_English <- plot_triangle(functions_English, "English (broad)", "Relative Frequencies")

file_path_Nuuchahnulth <- "stats/data/Nuuchahnulth_archlexemes.tsv"
data_Nuuchahnulth      <- load_data(file_path_Nuuchahnulth)

functions_Nuuchahnulth <- data.frame(
 data_Nuuchahnulth$ref_rel,
 data_Nuuchahnulth$pred_rel,
 data_Nuuchahnulth$mod_rel
)

plot_Nuuchahnulth <- plot_triangle(functions_Nuuchahnulth, "Nuuchahnulth", "Relative Frequencies")

plots <- ggtern::grid.arrange(plot_English, plot_Nuuchahnulth, ncol = 2)

ggsave(
 "stats/figures/functions/English_broad_vs_Nuuchahnulth/comparison_rel_freq.png",
 plots,
 height = 10,
 width = 10,
)
