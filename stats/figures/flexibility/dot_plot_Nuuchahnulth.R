library(ggplot2)

source("stats/scripts/load_data.R")

data <- load_data("stats/data/Nuuchahnulth_archlexemes.tsv")
data <- data[which(data$frequency > 1), ]
data <- data[order(-data$flexibility), ]
data <- data[1:100, ]

ggplot(
  data,
  aes(
    x = flexibility,
    y = reorder(item, flexibility)
  )
) +
  theme_minimal() +
  theme(
    plot.title.position = "plot",
    plot.title = element_text(hjust = 0.5),
  ) +
  labs(title = "Nuuchahnulth") +
  ylab("archlexeme") +
  scale_y_discrete(labels = data$gloss) +
  geom_point()

ggsave(
  "stats/figures/flexibility/dot_plot_Nuuchahnulth.png",
  height = 15
)
