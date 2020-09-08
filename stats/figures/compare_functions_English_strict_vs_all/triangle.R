library(ggtern)
source("stats/scripts/load_data.R")

file_path_all <- paste("stats/data/English_archlexemes_all.tsv", sep = "")
file_path_strict <- paste("stats/data/English_archlexemes_strict.tsv", sep = "")

data_all      <- load_data(file_path_all)
functions_all <- 1 - data_all[7:9] # DP

plot_all <- ggtern(
  functions_all,
  aes(dispersionREF, dispersionPRED, dispersionMOD)
) +
  labs(title = "Broad") +
  Tlab("Predication") +
  Llab("Reference") +
  Rlab("Modification") +
  tern_limits(T = 1.05, L = 1.05, R = 1.05) +
  geom_point()

data_strict      <- load_data(file_path_strict)
functions_strict <- 1 - data_strict[7:9] # DP

plot_strict <- ggtern(
  functions_strict,
  aes(dispersionREF, dispersionPRED, dispersionMOD)
) +
  labs(title = "Strict") +
  Tlab("Predication") +
  Llab("Reference") +
  Rlab("Modification") +
  tern_limits(T = 1.05, L = 1.05, R = 1.05) +
  geom_point()

plots <- grid.arrange(plot_all, plot_strict, ncol = 2)
ggsave("stats/figures/compare_functions_English_strict_vs_all/comparison.png", plots, width = 10, height = 10)
