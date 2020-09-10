library(ggplot2)
library(gridExtra)

source("stats/scripts/load_data.R")

data_English      <- load_data("stats/data/English_archlexemes.tsv")
data_Nuuchahnulth <- load_data("stats/data/Nuuchahnulth_archlexemes.tsv")

data_English_nonzero      <- data_English[which(data_English$flexibility != 0), ]
data_Nuuchahnulth_nonzero <- data_Nuuchahnulth[which(data_Nuuchahnulth$flexibility != 0), ]

ggplot(data_English, aes(x = flexibility)) +
  labs(title = "English flexibility") +
  geom_histogram(
    aes(y = ..density..),
    color = "black",
    fill = "white"
  ) +
  geom_density(alpha = 0.2, fill = "#FF6666") +
  geom_vline(
    aes(xintercept = mean(flexibility)),
    color = "red",
    linetype = "dashed",
    size = 1
  )

plot_English <- ggplot(mapping = aes(data_English$flexibility)) +
  theme_minimal() +
  xlab("English") +
  xlim(-0.1, 1) +
  geom_histogram()

plot_Nuuchahnulth <- ggplot(mapping = aes(data_Nuuchahnulth$flexibility)) +
  theme_minimal() +
  xlab("Nuuchahnulth") +
  xlim(-0.1, 1) +
  geom_histogram()

plot_English_nonzero <- ggplot(mapping = aes(data_English_nonzero$flexibility)) +
  theme_minimal() +
  xlab("English") +
  xlim(-0.1, 1) +
  geom_histogram()

plot_Nuuchahnulth_nonzero <- ggplot(mapping = aes(data_Nuuchahnulth_nonzero$flexibility)) +
  theme_minimal() +
  xlab("Nuuchahnulth") +
  xlim(-0.1, 1) +
  geom_histogram()

grid.arrange(
  plot_English,
  plot_Nuuchahnulth,
  plot_English_nonzero,
  plot_Nuuchahnulth_nonzero,
  ncol = 2,
  nrow = 2
)