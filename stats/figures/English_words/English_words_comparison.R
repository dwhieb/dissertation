# This script creates and saves 1 ternary plot for each English archlexeme

library(ggtern)
source("stats/scripts/load_data.R")

file_path_all    <- "stats/data/English_archlexemes_all.tsv"
file_path_strict <- "stats/data/English_archlexemes_strict.tsv"

data_all    <- load_data(file_path_all)
data_strict <- load_data(file_path_strict)

functions_all    <- 1 - data_all[7:9] # DP
functions_strict <- 1 - data_strict[7:9] # DP

for (i in 1:length(functions_all$dispersionREF)) {

  archlexeme         <- data_all[i, 1]
  dispersions_all    <- functions_all[i, ]
  dispersions_strict <- functions_strict[i, ]
  data               <- data.frame(dispersions_all)
  data               <- rbind(data, dispersions_strict)

  plot <- ggtern(
    data,
    aes(dispersionREF, dispersionPRED, dispersionMOD)
  ) +
    labs(title = archlexeme) +
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
    geom_point() +
    geom_text(aes(label = c("broad", "strict")), vjust = 1.5)

  ggsave(
    paste(
      "stats/figures/English_words/comparison/",
      archlexeme,
      ".png",
      sep = ""
    ),
    width  = 10,
    height = 10
  )

}
