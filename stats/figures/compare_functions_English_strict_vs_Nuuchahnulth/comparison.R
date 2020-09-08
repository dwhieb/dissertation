library(ggtern)
source("stats/scripts/load_data.R")

file_path_English <- "stats/data/English_archlexemes_strict.tsv"
data_English      <- load_data(file_path_English)
functions_English <- 1 - data_English[7:9] # DP

plot_English <- ggtern(
  functions_English,
  aes(dispersionREF, dispersionPRED, dispersionMOD)
) +
  labs(title = "English (strict)") +
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

file_path_Nuuchahnulth <- "stats/data/Nuuchahnulth_archlexemes.tsv"
data_Nuuchahnulth      <- load_data(file_path_Nuuchahnulth)
functions_Nuuchahnulth <- 1 - data_Nuuchahnulth[7:9] # DP

plot_Nuuchahnulth <- ggtern(
  functions_Nuuchahnulth,
  aes(dispersionREF, dispersionPRED, dispersionMOD)
) +
  labs(title = "Nuuchahnulth") +
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

plots <- ggtern::grid.arrange(plot_English, plot_Nuuchahnulth, ncol = 2)

ggsave(
  "stats/figures/compare_functions_English_strict_vs_Nuuchahnulth/comparison.png",
  plots,
  height = 10,
  width = 10,
)
