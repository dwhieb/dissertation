library(ggtern)

source("stats/scripts/load_data.R")
source("stats/scripts/name_cols.R")

file_path <- "stats/data/English_archlexemes.tsv"
data      <- load_data(file_path)

rel_freq_broad <- name_cols(data.frame(
  data$ref_rel_broad,
  data$pred_rel_broad,
  data$mod_rel
))

rel_freq_strict <- name_cols(data.frame(
  data$ref_rel,
  data$pred_rel,
  data$mod_rel
))

DP_broad <- 1 - name_cols(data.frame(
  data$dispersion_ref_broad,
  data$dispersion_pred_broad,
  data$dispersion_mod
))

DP_strict <- 1 - name_cols(data.frame(
  data$dispersion_ref,
  data$dispersion_pred,
  data$dispersion_mod
))

for (i in 1:length(DP_broad$ref)) {

  archlexeme <- data[i, 1]

  rel_freqs_broad     <- rel_freq_broad[i, ]
  rel_freqs_strict    <- rel_freq_strict[i, ]
  rel_freqs_item_data <- data.frame(rel_freqs_broad)
  rel_freqs_item_data <- rbind(rel_freqs_item_data, rel_freqs_strict)

  limits <- data.frame(
    ref  = c(1, 0, 0),
    pred = c(0, 1, 0),
    mod  = c(0, 0, 1)
  )

  plot_rel_freqs <- ggtern(
    rel_freqs_item_data,
    aes(ref, pred, mod)
  ) +
    labs(
      title = archlexeme,
      subtitle = "Relative Frequencies"
    ) +
    theme_minimal() +
    theme (
      plot.title.position = "plot",
      plot.title          = element_text(hjust = 0.5),
      plot.subtitle       = element_text(hjust = 0.5),
      tern.axis.title.R   = element_text(hjust = 1.25),
      tern.axis.title.L   = element_text(hjust = -0.25)
    ) +
    theme_hidelabels() +
    Tlab("Predication") +
    Llab("Reference") +
    Rlab("Modification") +
    tern_limits(T = 1.2, L = 1.2, R = 1.2) +
    geom_polygon(
      data = limits,
      alpha = 0,
      color = "#BBBBBB",
      size  = 0.5
    ) +
    geom_point() +
    geom_text(aes(label = c("broad", "strict")), vjust = 1.5)

  dispersions_broad     <- DP_broad[i, ]
  dispersions_strict    <- DP_strict[i, ]
  dispersions_item_data <- data.frame(dispersions_broad)
  dispersions_item_data <- rbind(dispersions_item_data, dispersions_strict)

  plot_dispersions <- ggtern(
    dispersions_item_data,
    aes(ref, pred, mod)
  ) +
    labs(
      title = archlexeme,
      subtitle = "Deviation of Proportions (DP)"
    ) +
    theme_minimal() +
    theme(
      plot.title.position = "plot",
      plot.title          = element_text(hjust = 0.5),
      plot.subtitle       = element_text(hjust = 0.5),
      tern.axis.title.R   = element_text(hjust = 1.25),
      tern.axis.title.L   = element_text(hjust = -0.25)
    ) +
    theme_hidelabels() +
    Tlab("Predication") +
    Llab("Reference") +
    Rlab("Modification") +
    tern_limits(T = 1.2, L = 1.2, R = 1.2) +
    geom_polygon(
      data = limits,
      alpha = 0,
      color = "#BBBBBB",
      size  = 0.5
    ) +
    geom_point() +
    geom_text(aes(label = c("broad", "strict")), vjust = 1.5)

  plots <- ggtern::grid.arrange(
    plot_rel_freqs,
    plot_dispersions,
    ncol = 2
  )

  ggsave(
    paste(
      "stats/figures/functions/English_words/plots/",
      archlexeme,
      ".png",
      sep = ""
    ),
    plots,
    width  = 10,
    height = 10
  )

}
