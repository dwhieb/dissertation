library(ggplot2)

source("stats/scripts/load_data.R")

data_English <- load_data("stats/data/English_archlexemes.tsv")

plot <- ggplot(data_English, aes(archlexeme, flexibility)) +
  theme_minimal() +
  geom_dotplot()

ggsave(
  "stats/figures/flexibility/dot_plot.png",
  plot
)
