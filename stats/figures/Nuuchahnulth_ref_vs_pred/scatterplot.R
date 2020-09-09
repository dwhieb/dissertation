library(ggplot2)

source("stats/scripts/load_data.R")

file_path <- "stats/data/Nuuchahnulth_archlexemes.tsv"
data      <- load_data(file_path)
cols      <- c("ref", "pred")

rel_freq <- data.frame(
  data$ref_rel,
  data$pred_rel
)

DP <- 1 - data.frame(
  data$dispersion_ref,
  data$dispersion_pred
)

colnames(rel_freq) <- cols
colnames(DP)       <- cols

plot_rel_freq <- ggplot(rel_freq, aes(ref, pred)) +
  labs(title = "Relative Frequencies") +
  theme_minimal() +
  xlab("reference") +
  ylab("predication") +
  geom_point()

plot_DP <- ggplot(DP, aes(ref, pred)) +
  labs(title = "Deviation of Proportions (DP)") +
  theme_minimal() +
  xlab("reference") +
  ylab("predication") +
  xlim(0, 0.8) +
  ylim(0, 0.8) +
  geom_point()

plots <- ggtern::grid.arrange(
  plot_rel_freq,
  plot_DP,
  ncol = 2
)

ggsave(
  "stats/figures/Nuuchahnulth_ref_vs_pred/rel_freq.png",
  plot_rel_freq,
  height = 7.5,
  width  = 7.5
)

ggsave(
  "stats/figures/Nuuchahnulth_ref_vs_pred/DP.png",
  plot_DP,
  height = 7.5,
  width  = 7.5
)

ggsave(
  "stats/figures/Nuuchahnulth_ref_vs_pred/comparison.png",
  plots,
  height = 10,
  width = 10,
)
