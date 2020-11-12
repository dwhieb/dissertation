source("stats/scripts/load_100.R")
source("stats/scripts/load_small.R")

library(ggplot2)

create_graphic <- function(data) {

  plot <- ggplot(
    data,
    aes(
      x = flexibility,
      y = reorder(item, flexibility)
    )
  ) +
  theme_minimal() +
  theme(
    plot.title.position = "plot",
    plot.title          = element_text(hjust = 0.5)
  ) +
  labs(title = data$language[1]) +
  ylab("archlexeme") +
  scale_y_discrete(labels = paste(data$item, data$gloss, sep = "   ")) +
  geom_point() +
  xlim(0, 1)

  return(plot)

}

data_100 <- load_100()
data_100 <- data_100[order(-data_100$flexibility), ]

data_small <- load_small()
data_small <- data_small[order(-data_small$flexibility), ]

data_100_Eng <- data_100[which(data_100$language == "English"), ]
data_100_Nuu <- data_100[which(data_100$language == "Nuuchahnulth"), ]

data_small_Eng <- data_small[which(data_small$language == "English"), ]
data_small_Eng <- data_small_Eng[1:50, ]

data_small_Nuu <- data_small[which(data_small$language == "Nuuchahnulth"), ]
data_small_Nuu <- data_small_Nuu[1:100, ]

graphic_100_Eng <- create_graphic(data_100_Eng)
graphic_100_Nuu <- create_graphic(data_100_Nuu)

graphic_small_Eng <- create_graphic(data_small_Eng)
graphic_small_Nuu <- create_graphic(data_small_Nuu)

figure_height = 15

ggsave(
  "stats/figures/flexibility/dot_plot_Eng_100.png",
  graphic_100_Eng,
  height = figure_height
)

ggsave(
  "stats/figures/flexibility/dot_plot_Nuu_100.png",
  graphic_100_Nuu,
  height = figure_height
)

ggsave(
  "stats/figures/flexibility/dot_plot_Eng_small.png",
  graphic_small_Eng,
  height = 10
)

ggsave(
  "stats/figures/flexibility/dot_plot_Nuu_small.png",
  graphic_small_Nuu,
  height = figure_height
)
