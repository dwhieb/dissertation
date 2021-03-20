source("stats/scripts/load_data.R")
source("stats/figures/functions/stems/plot_word.R")

library(ggtern)

# NB: Path should end in a slash
plot_words <- function(path, data, lang) {

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

    item       <- data[i, 1]
    gloss      <- data[i, 2]
    file_label <- "unknown"
    item_label <- "unknown"

    if (lang == "English") {
      file_label <- item
      item_label <- item
    } else {
      file_label <- gloss
      item_label <- paste(item, gloss, sep = " ")
    }

    plot_rel_freq   <- plot_word(rel_freq[i, ], item_label, "Relative Frequencies")
    plot_dispersion <- plot_word(DP[i, ], item_label, "Deviation of Proportions (DP)")

    plots <- ggtern::grid.arrange(
      plot_rel_freq,
      plot_dispersion,
      ncol = 2
    )

    ggsave(
      paste(path, file_label, ".png", sep = ""),
      plots,
      height = 5,
      width  = 10
    )

  }

}

data_Nuu <- load_data("stats/data/Nuuchahnulth_stems.tsv")
data_Nuu <- data_Nuu[which(data_Nuu$frequency >= 4), ]
data_Nuu <- data_Nuu[order(-data_Nuu$flexibility), ]
data_Nuu <- data_Nuu[1:100, ]

data_Eng <- load_data("stats/data/English_stems.tsv")
data_Eng <- data_Eng[which(data_Eng$frequency >= 4), ]
data_Eng <- data_Eng[order(-data_Eng$flexibility), ]

plot_words("stats/figures/functions/stems/Nuuchahnulth/", data_Nuu, "Nuuchahnulth")
plot_words("stats/figures/functions/stems/English/", data_Eng, "English")
