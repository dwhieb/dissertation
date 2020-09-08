library(ggtern)
source("stats/scripts/load_data.R")

file_path_all <- "stats/data/English_archlexemes_all.tsv"
data_all      <- load_data(file_path_all)
functions_all <- 1 - data_all[7:9] # DP

plot_all <- ggtern(
  functions_all,
  aes(dispersionREF, dispersionPRED, dispersionMOD)
) +
  labs(title = "Broad") +
  theme(
    # top, right, bottom, left
    plot.title.position = "plot",
    plot.title = element_text(hjust = 0.5),
    tern.axis.title.R = element_text(hjust = 1.25),
    tern.axis.title.L = element_text(hjust = -0.25)
  ) +
  theme_hidelabels() +
  Tlab("Predication") +
  Llab("Reference") +
  Rlab("Modification") +
  tern_limits(T = 1.05, L = 1.05, R = 1.05) +
  geom_point()

file_path_strict <- "stats/data/English_archlexemes_strict.tsv"
data_strict      <- load_data(file_path_strict)
functions_strict <- 1 - data_strict[7:9] # DP

plot_strict <- ggtern(
  functions_strict,
  aes(dispersionREF, dispersionPRED, dispersionMOD)
) +
  labs(title = "Strict") +
  theme(
    plot.title.position = "plot",
    plot.title = element_text(hjust = 0.5),
    tern.axis.title.R = element_text(hjust = 1.25),
    tern.axis.title.L = element_text(hjust = -0.25)
  ) +
  theme_hidelabels() +
  Tlab("Predication") +
  Llab("Reference") +
  Rlab("Modification") +
  tern_limits(T = 1.05, L = 1.05, R = 1.05) +
  geom_point()

plots <- ggtern::grid.arrange(plot_all, plot_strict, ncol = 2)

ggsave(
  "stats/figures/compare_functions_English_strict_vs_all/comparison.png",
  plots,
  height = 10,
  width = 10,
)
