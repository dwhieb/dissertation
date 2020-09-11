library(ggtern)
source("stats/scripts/load_data.R")
source("stats/scripts/plot_triangle.R")

file_path_English <- "stats/data/English_archlexemes.tsv"
data_English      <- load_data(file_path_English)

# English DP
functions_English_DP <- 1 - data.frame(
  data_English$dispersion_ref,
  data_English$dispersion_pred,
  data_English$dispersion_mod
)

# English DPnorm
functions_English_DPnorm <- 1 - data.frame(
  data_English$dispersion_ref_norm,
  data_English$dispersion_pred_norm,
  data_English$dispersion_mod_norm
)

file_path_Nuuchahnulth <- "stats/data/Nuuchahnulth_archlexemes.tsv"
data_Nuuchahnulth      <- load_data(file_path_Nuuchahnulth)
data_Nuuchahnulth      <- data_Nuuchahnulth[which(data_Nuuchahnulth$frequency > 1), ]

# Nuuchahnulth DP
functions_Nuuchahnulth_DP <- 1 - data.frame(
  data_Nuuchahnulth$dispersion_ref,
  data_Nuuchahnulth$dispersion_pred,
  data_Nuuchahnulth$dispersion_mod
)

# Nuuchahnulth DPnorm
functions_Nuuchahnulth_DPnorm <- 1 - data.frame(
  data_Nuuchahnulth$dispersion_ref_norm,
  data_Nuuchahnulth$dispersion_pred_norm,
  data_Nuuchahnulth$dispersion_mod_norm
)

plot_English_DP          <- plot_triangle(functions_English_DP, "English (DP)")
plot_English_DPnorm      <- plot_triangle(functions_English_DPnorm, "English (DPnorm)")
plot_Nuuchahnulth_DP     <- plot_triangle(functions_Nuuchahnulth_DP, "Nuuchahnulth (DP)")
plot_Nuuchahnulth_DPnorm <- plot_triangle(functions_Nuuchahnulth_DPnorm, "Nuuchahnulth (DPnorm)")

plots <- ggtern::grid.arrange(
  plot_English_DP,
  plot_English_DPnorm,
  plot_Nuuchahnulth_DP,
  plot_Nuuchahnulth_DPnorm,
  ncol = 2,
  nrow = 2
)

ggsave(
  "stats/figures/functions/DP_vs_DPnorm/comparison.png",
  plots,
  height = 10,
  width = 10,
)
