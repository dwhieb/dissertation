library(ggtern)

source("stats/scripts/load_data.R")
source("stats/scripts/plot_triangle.R")
source("stats/figures/Nuuchahnulth_words/plot_word.R")

file_path      <- "stats/data/Nuuchahnulth_archlexemes.tsv"
data           <- load_data(file_path)
frequent_words <- data[which(data$frequency > 6), ]

functions <- 1 - data.frame(
  frequent_words$dispersion_ref,
  frequent_words$dispersion_pred,
  frequent_words$dispersion_mod
)

for (i in 1:length(frequent_words$dispersion_ref)) {

  archlexeme <- frequent_words[i, 1]
  gloss      <- frequent_words[i, 2]
  plot_word(functions[i, ], archlexeme, gloss)

}
