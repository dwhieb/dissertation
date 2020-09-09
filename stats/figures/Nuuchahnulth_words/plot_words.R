library(ggtern)

source("stats/scripts/load_data.R")
source("stats/scripts/plot_triangle.R")
source("stats/figures/Nuuchahnulth_words/plot_word.R")

file_path      <- "stats/data/Nuuchahnulth_archlexemes.tsv"
data           <- load_data(file_path)
frequent_words <- data[which(data$frequency > 6), ]

rel_freq <- data.frame(
  frequent_words$ref_rel,
  frequent_words$pred_rel,
  frequent_words$mod_rel
)

DP <- 1 - data.frame(
  frequent_words$dispersion_ref,
  frequent_words$dispersion_pred,
  frequent_words$dispersion_mod
)

for (i in 1:length(frequent_words$dispersion_ref)) {

  archlexeme <- frequent_words[i, 1]
  gloss      <- frequent_words[i, 2]

  plot_rel_freq   <- plot_word(rel_freq[i, ], archlexeme, gloss, "Relative Frequencies")
  plot_dispersion <- plot_word(DP[i, ], archlexeme, gloss, "Deviation of Proportions (DP)")

  plots <- grid.arrange(
    plot_rel_freq,
    plot_dispersion,
    ncol = 2
  )

  ggsave(
    paste(
      "stats/figures/Nuuchahnulth_words/plots/",
      gloss,
      ".png",
      sep = ""
    ),
    plots,
    width  = 10,
    height = 10
  )

}
