source("stats/scripts/load_data.R")
source("stats/figures/finals/plot_word.R")

library(ggtern)

stem <- "childhood"

data <- load_data("stats/data/English_stems.tsv")
data <- data[which(data$item == stem), ]

DP <- 1 - data.frame(
  data$dispersion_ref,
  data$dispersion_pred,
  data$dispersion_mod
)

plot <- plot_word(DP, stem)
plot

ggsave(
  paste("stats/figures/finals/Eng-", stem, ".png", sep = ""),
  plot,
  height = 4,
  width  = 5
)
