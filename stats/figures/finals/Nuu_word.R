source("stats/scripts/load_data.R")
source("stats/figures/finals/plot_word.R")

library(ggtern)

gloss <- "good"

data <- load_data("stats/data/Nuuchahnulth_stems.tsv")
data <- data[which(data$gloss == gloss), ]

freq <- data.frame(
  data$ref,
  data$pred,
  data$mod
)

quoted_gloss <- paste("‘", gloss, "’", sep = "")
plot         <- plot_word(freq, paste(data$item[1], quoted_gloss, sep = "  "))
plot

ggsave(
  paste("stats/figures/finals/Nuu-", gloss, ".png", sep = ""),
  plot,
  height = 4,
  width  = 5
)
