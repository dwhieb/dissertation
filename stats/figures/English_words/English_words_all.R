# This script creates and saves 1 ternary plot for each English archlexeme

library(ggtern)
source("stats/scripts/load_data.R")

file_path <- "stats/data/English_archlexemes_all.tsv"
data      <- load_data(file_path)
functions <- 1 - data[7:9] # DP

for (i in 1:length(functions$dispersionREF)) {

  archlexeme <- data[i, 1]

  # this plotting function is slightly different from the one in plot_triangle
  plot <- ggtern(
    functions[i, ],
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
    tern_limits(T = 1.1, L = 1.1, R = 1.1) +
    geom_text(label = archlexeme)

  ggsave(
    paste("stats/figures/English_words/all/", archlexeme, ".png", sep = ""),
    width  = 10,
    height = 10
  )

}
