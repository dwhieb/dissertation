source("stats/scripts/load_data.R")
source("stats/figures/functions/Nuuchahnulth_words/plot_word.R")

library(ggtern)

data <- load_data("stats/data/Nuuchahnulth_stems.tsv")
data <- data[which(data$frequency >= 4), ]
data <- data[order(-data$flexibility), ]
data <- data[1:100, ]

rel_freq <- data.frame(
  data$ref_rel,
  data$pred_rel,
  data$mod_rel
)

DP <- 1 - data.frame(
  data$dispersion_ref,
  data$dispersion_pred,
  data$dispersion_mod
)

for (i in 1:length(data$item)) {

  archlexeme <- data[i, 1]
  gloss      <- data[i, 2]

  plot_rel_freq   <- plot_word(rel_freq[i, ], archlexeme, gloss, "Relative Frequencies")
  plot_dispersion <- plot_word(DP[i, ], archlexeme, gloss, "Deviation of Proportions (DP)")

  plots <- ggtern::grid.arrange(
    plot_rel_freq,
    plot_dispersion,
    ncol = 2
  )

  ggsave(
    paste(
      "stats/figures/functions/Nuuchahnulth_words/plots/",
      gloss,
      ".png",
      sep = ""
    ),
    plots,
    width  = 10,
    height = 10
  )

}
