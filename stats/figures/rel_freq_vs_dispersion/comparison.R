library(ggtern)

source("stats/scripts/load_data.R")
source("stats/scripts/plot_triangle.R")

file_path_English <- "stats/data/English_archlexemes.tsv"
data_English      <- load_data(file_path_English)

# English DP
English_DP <- 1 - data.frame(
  data_English$dispersion_ref,
  data_English$dispersion_pred,
  data_English$dispersion_mod
)

# English relative frequencies
English_rel_freq <- data.frame(
  data_English$ref_rel,
  data_English$pred_rel,
  data_English$mod_rel
)

file_path_Nuuchahnulth <- "stats/data/Nuuchahnulth_archlexemes.tsv"
data_Nuuchahnulth      <- load_data(file_path_Nuuchahnulth)

# Nuuchahnulth DP
Nuuchahnulth_DP <- 1 - data.frame(
  data_Nuuchahnulth$dispersion_ref,
  data_Nuuchahnulth$dispersion_pred,
  data_Nuuchahnulth$dispersion_mod
)

# Nuuchahnulth relative frequencies
Nuuchahnulth_rel_freq <- data.frame(
  data_Nuuchahnulth$ref_rel,
  data_Nuuchahnulth$pred_rel,
  data_Nuuchahnulth$mod_rel
)

plot_English_DP            <- plot_triangle(English_DP, "English (DP)")
plot_English_rel_freq      <- plot_triangle(English_rel_freq, "English (relative frequency)")
plot_Nuuchahnulth_DP       <- plot_triangle(Nuuchahnulth_DP, "Nuuchahnulth (DP)")
plot_Nuuchahnulth_rel_freq <- plot_triangle(Nuuchahnulth_rel_freq, "Nuuchahnulth (relative frequency)")

plots <- ggtern::grid.arrange(
  plot_English_rel_freq,
  plot_English_DP,
  plot_Nuuchahnulth_rel_freq,
  plot_Nuuchahnulth_DP,
  ncol = 2,
  nrow = 2
)

ggsave(
  "stats/figures/rel_freq_vs_dispersion/comparison.png",
  plots,
  height = 10,
  width = 10,
)
