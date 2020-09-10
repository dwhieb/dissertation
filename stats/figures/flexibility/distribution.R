library(ggplot2)
library(gridExtra)

source("stats/scripts/load_data.R")

data_English      <- load_data("stats/data/English_archlexemes.tsv")
data_Nuuchahnulth <- load_data("stats/data/Nuuchahnulth_archlexemes.tsv")

data_English_nonzero      <- data_English[which(data_English$flexibility != 0), ]
data_Nuuchahnulth_nonzero <- data_Nuuchahnulth[which(data_Nuuchahnulth$flexibility != 0), ]

plot_English <- ggplot(data_English, aes(x = flexibility)) +
  labs(title = "English flexibility") +
  geom_histogram(
    aes(y = ..density..),
    color = "black",
    fill = "white"
  ) +
  geom_density(alpha = 0.2, fill = "blue") +
  geom_vline(
    aes(xintercept = mean(flexibility)),
    color = "blue",
    linetype = "dashed",
    size = 1
  )

plot_Nuuchahnulth <- ggplot(data_Nuuchahnulth, aes(x = flexibility)) +
  labs(title = "Nuuchahnulth flexibility") +
  geom_histogram(
    aes(y = ..density..),
    color = "black",
    fill = "white"
  ) +
  geom_density(alpha = 0.2, fill = "red") +
  geom_vline(
    aes(xintercept = mean(flexibility)),
    color = "red",
    linetype = "dashed",
    size = 1
  )

plot_English_nonzero <- ggplot(data_English_nonzero, aes(x = flexibility)) +
  labs(title = "English flexibility (nonzero)") +
  geom_histogram(
    aes(y = ..density..),
    color = "black",
    fill = "white"
  ) +
  geom_density(alpha = 0.2, fill = "blue") +
  geom_vline(
    aes(xintercept = mean(flexibility)),
    color = "blue",
    linetype = "dashed",
    size = 1
  )

plot_Nuuchahnulth_nonzero <- ggplot(data_Nuuchahnulth_nonzero, aes(x = flexibility)) +
  labs(title = "Nuuchahnulth flexibility (nonzero)") +
  geom_histogram(
    aes(y = ..density..),
    color = "black",
    fill = "white"
  ) +
  geom_density(alpha = 0.2, fill = "red") +
  geom_vline(
    aes(xintercept = mean(flexibility)),
    color = "red",
    linetype = "dashed",
    size = 1
  )

plots <- grid.arrange(
  plot_English,
  plot_Nuuchahnulth,
  plot_English_nonzero,
  plot_Nuuchahnulth_nonzero,
  ncol = 2,
  nrow = 2,
  heights = unit(c(10, 10), "cm")
)

ggsave(
  "stats/figures/flexibility/distribution.png",
  plots,
  height = 10,
  width = 10,
)
