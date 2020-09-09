# This script creates and saves 1 ternary plot for each English archlexeme

library(ggtern)
source("stats/scripts/load_data.R")

file_path <- "stats/data/English_archlexemes.tsv"
data      <- load_data(file_path)
cols      <- c("ref", "pred", "mod")

functions_broad <- 1 - data.frame(
  data$dispersion_ref_broad,
  data$dispersion_pred_broad,
  data$dispersion_mod
)

functions_strict <- 1 - data.frame(
  data$dispersion_ref,
  data$dispersion_pred,
  data$dispersion_mod
)

colnames(functions_broad)  <- cols
colnames(functions_strict) <- cols

for (i in 1:length(functions_broad$ref)) {

  archlexeme         <- data[i, 1]
  dispersions_broad  <- functions_broad[i, ]
  dispersions_strict <- functions_strict[i, ]
  item_data          <- data.frame(dispersions_broad)
  item_data          <- rbind(item_data, dispersions_strict)

  plot <- ggtern(
    item_data,
    aes(ref, pred, mod)
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
    tern_limits(T = 1.05, L = 1.05, R = 1.05) +
    geom_point() +
    geom_text(aes(label = c("broad", "strict")), vjust = 1.5)

  ggsave(
    paste(
      "stats/figures/English_words/comparison/",
      archlexeme,
      ".png",
      sep = ""
    ),
    width  = 10,
    height = 10
  )

}
