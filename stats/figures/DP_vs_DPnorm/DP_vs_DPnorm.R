library(ggtern)
source("stats/scripts/load_data.R")
source("stats/scripts/plot_triangle.R")

file_path_English        <- "stats/data/English_archlexemes.tsv"
data_English             <- load_data(file_path_English)
functions_English_DP     <- 1 - data_English[11:13] # DP
functions_English_DPnorm <- 1 - data_English[17:19] # DPnorm

file_path_Nuuchahnulth        <- "stats/data/Nuuchahnulth_archlexemes.tsv"
data_Nuuchahnulth             <- load_data(file_path_Nuuchahnulth)
functions_Nuuchahnulth_DP     <- 1 - data_Nuuchahnulth[11:13] # DP
functions_Nuuchahnulth_DPnorm <- 1 - data_Nuuchahnulth[17:19] # DPnorm

plot_English_DP          <- plot_triangle(functions_English_DP, "English (DP)")
# plot_English_DPnorm      <- plot_triangle(functions_English_DPnorm, "English (DPnorm)")
# plot_Nuuchahnulth_DP     <- plot_triangle(functions_Nuuchahnulth_DP, "Nuuchahnulth (DP)")
# plot_Nuuchahnulth_DPnorm <- plot_triangle(functions_Nuuchahnulth_DPnorm, "Nuuchahnulth (DPnorm)")

# plots <- ggtern::grid.arrange(
#   plot_English_DP,
#   plot_English_DPnorm,
#   plot_Nuuchahnulth_DP,
#   plot_Nuuchahnulth_DPnorm,
#   ncol = 2,
#   nrow = 2
# )

# ggsave(
#   "stats/figures/DP_vs_DPnorm/comparison.png",
#   plots,
#   height = 10,
#   width = 10,
# )
