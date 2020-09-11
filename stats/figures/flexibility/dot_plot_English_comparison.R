library(ggplot2)
library(gridExtra)

source("stats/scripts/load_data.R")

data <- load_data("stats/data/English_archlexemes.tsv")

plot_strict <- ggplot(data, aes(
  x = flexibility,
  y = reorder(item, flexibility),
)) +
  theme_minimal() +
  theme(
    plot.title.position = "plot",
    plot.title = element_text(hjust = 0.5),
    axis.title.x = element_blank(),
    axis.title.y = element_blank()
  ) +
  labs(title = "Strict") +
  geom_point()

plot_broad <- ggplot(data, aes(
  x = flexibility_broad,
  y = reorder(item, flexibility_broad),
)) +
  theme_minimal() +
  theme(
    plot.title.position = "plot",
    plot.title = element_text(hjust = 0.5),
    axis.title.x = element_blank(),
    axis.title.y = element_blank()
  ) +
  labs(title = "Broad") +
  geom_point()

plots <- grid.arrange(
  plot_strict,
  plot_broad,
  ncol = 2,
  bottom = "flexibility",
  left = "archlexeme"
)

ggsave(
  "stats/figures/flexibility/dot_plot_English_comparison.png",
  plots,
  height = 15
)
