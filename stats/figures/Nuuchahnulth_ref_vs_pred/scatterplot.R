library(ggplot2)

source("stats/scripts/load_data.R")

file_path <- "stats/data/Nuuchahnulth_archlexemes.tsv"
data      <- load_data(file_path)

functions <- 1 - data.frame(
  data$dispersion_ref,
  data$dispersion_pred
)

colnames(functions) <- c("ref", "pred")

ggplot(functions, aes(ref, pred)) +
  theme_minimal() +
  xlab("reference") +
  ylab("predication") +
  xlim(0, 0.8) +
  ylim(0, 0.8) +
  geom_point()

ggsave(
  "stats/figures/Nuuchahnulth_ref_vs_pred/scatterplot.png",
  height = 7.5,
  width  = 7.5
)
