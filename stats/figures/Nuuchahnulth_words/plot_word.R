library(ggtern)

source("stats/scripts/load_data.R")
source("stats/scripts/plot_triangle.R")

# set the index of the word to plot here
index <- 456

file_path  <- "stats/data/Nuuchahnulth_archlexemes.tsv"
data       <- load_data(file_path)
functions  <- data[index, 7:9]
archlexeme <- data[index, 1]
gloss      <- data[index, 14]

plot <- plot_triangle(functions, archlexeme, gloss) +
  geom_text(aes(label = archlexeme), vjust = 1.5) +
  geom_text(aes(label = gloss), vjust = 3)

ggsave(
  paste("stats/figures/Nuuchahnulth_words/plots/", gloss, ".png", sep = ""),
  width  = 10,
  height = 10
)
