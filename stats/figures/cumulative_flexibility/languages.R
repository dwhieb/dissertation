library(ggplot2)

displayPoints <- 10000

data_Eng                  <- read.table("stats/cumulative_flexibility/English.tsv")
numObservations_Eng       <- nrow(data_Eng)
data_Eng_subset           <- data_Eng[seq(1, numObservations_Eng, numObservations_Eng / displayPoints), ]
colnames(data_Eng_subset) <- c("sample", "cumulative_flexibility")
data_Eng_subset$token     <- sequence(rle(as.character(data_Eng_subset$sample))$lengths)

plot_Eng <- ggplot(data_Eng_subset, aes(
    x = token,
    y = cumulative_flexibility
  )) +
  labs(title = "cumulative flexibility (English)") +
  ylab("cumulative flexibility (Shannon's H)") +
  xlab("# tokens observed") +
  theme_minimal() +
  theme(
    plot.title          = element_text(hjust = 0.5),
    plot.title.position = "plot"
  ) +
  ylim(0, 1) +
  geom_point(alpha = 0.1)

plot_Eng

ggsave(
  "stats/figures/cumulative_flexibility/English.png",
  plot_Eng,
  height = 5,
  width  = 10
)

data_Nuu                  <- read.table("stats/cumulative_flexibility/Nuuchahnulth.tsv")
numObservations_Nuu       <- nrow(data_Nuu)
data_Nuu_subset           <- data_Nuu[seq(1, numObservations_Nuu, numObservations_Nuu / displayPoints), ]
colnames(data_Nuu_subset) <- c("sample", "cumulative_flexibility")
data_Nuu_subset$token     <- sequence(rle(as.character(data_Nuu_subset$sample))$lengths)

plot_Nuu <- ggplot(data_Nuu_subset, aes(
    x = token,
    y = cumulative_flexibility
  )) +
  labs(title = "cumulative flexibility (Nuuchahnulth)") +
  ylab("cumulative flexibility (Shannon's H)") +
  xlab("# tokens observed") +
  theme_minimal() +
  theme(
    plot.title          = element_text(hjust = 0.5),
    plot.title.position = "plot"
  ) +
  ylim(0, 1) +
  geom_point(alpha = 0.1)

plot_Nuu

ggsave(
  "stats/figures/cumulative_flexibility/Nuuchahnulth.png",
  plot_Nuu,
  height = 5,
  width  = 10
)
