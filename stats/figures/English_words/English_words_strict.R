library(ggtern)

source("stats/scripts/load_data.R")
source("stats/scripts/plot_triangle_text.R")

file_path <- "stats/data/English_archlexemes.tsv"
data      <- load_data(file_path)

functions <- 1 - data.frame(
  data$dispersion_ref,
  data$dispersion_pred,
  data$dispersion_mod
)

colnames(functions) <- c("ref", "pred", "mod")

for (i in 1:length(functions$ref)) {

  archlexeme <- data[i, 1]

  plot_triangle_text(functions[i, ], archlexeme, archlexeme)

  ggsave(
    paste("stats/figures/English_words/strict/", archlexeme, ".png", sep = ""),
    width  = 10,
    height = 10
  )

}
