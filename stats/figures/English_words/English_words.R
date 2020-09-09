library(ggtern)

source("stats/scripts/load_data.R")
source("stats/scripts/name_cols.R")

file_path <- "stats/data/English_archlexemes.tsv"
data      <- load_data(file_path)
cols      <- c("ref", "pred", "mod")

DP_broad <- 1 - data.frame(
  data$dispersion_ref_broad,
  data$dispersion_pred_broad,
  data$dispersion_mod
)

DP_strict <- 1 - data.frame(
  data$dispersion_ref,
  data$dispersion_pred,
  data$dispersion_mod
)

name_cols(DP_broad)
name_cols(DP_strict)

for (i in 1:length(DP_broad$ref)) {

  archlexeme         <- data[i, 1]
  dispersions_broad  <- DP_broad[i, ]
  dispersions_strict <- DP_strict[i, ]
  item_data          <- data.frame(dispersions_broad)
  item_data          <- rbind(item_data, dispersions_strict)

  plot_dispersions <- ggtern(
    item_data,
    aes(ref, pred, mod)
  ) +
    labs(
      title = archlexeme,
      subtitle = "Deviation of Proportions (DP)"
    ) +
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
    plot_dispersions,
    width  = 10,
    height = 10
  )

}
