# TODO: update this file to plot any generic word given an index
# TODO: write another function which plots all the words whose frequency
# is greater than 6 (this will result in about 200 plots)

library(ggtern)

source("stats/scripts/load_data.R")
source("stats/scripts/plot_triangle.R")

# set the index of the word to plot here
index <- 1443

file_path  <- "stats/data/Nuuchahnulth_archlexemes.tsv"
data       <- load_data(file_path)
archlexeme <- data[index, 1]
gloss      <- data[index, 2]

functions  <- 1 - data.frame(
  data$dispersion_ref[index],
  data$dispersion_pred[index],
  data$dispersion_mod[index]
)

plot <- plot_triangle(functions) +
  geom_text(aes(label = archlexeme), vjust = 1.5) +
  geom_text(aes(label = gloss), vjust = 3)

ggsave(
  paste(
    "stats/figures/Nuuchahnulth_words/plots/",
    gloss,
    ".png",
    sep = ""
  ),
  width  = 10,
  height = 10
)
