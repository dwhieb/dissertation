library(ggplot2)

source("stats/scripts/load_data.R")

data <- load_data("stats/data/English_archlexemes.tsv")
data <- data[order(-data$flexibility), ]

ggplot(data) +
  theme_minimal() +
  theme(
    plot.title.position = "plot",
    plot.title = element_text(hjust = 0.5),
  ) +
  labs(title = "English") +
  ylab("archlexeme") +
  scale_color_discrete(name = "Coding Scheme") +
  geom_point(
    aes(
      x = flexibility,
      y = reorder(item, flexibility),
      color = "strict"
    )
  ) +
  geom_point(
    aes(
      x = flexibility_broad,
      y = reorder(item, flexibility_broad),
      color = "broad"
    )
  )

ggsave(
  "stats/figures/flexibility/dot_plot_English_combined.png",
  height = 15
)
