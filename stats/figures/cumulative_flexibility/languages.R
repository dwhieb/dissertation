data_Eng <- read.table("stats/data/English_means.tsv")
colnames(data_Eng) <- c("mean")

plot_Eng <- ggplot(data_Eng, aes(
    x = seq_along(mean),
    y = mean
  )) +
  labs(title = "cumulative mean flexibility (English)") +
  ylab("mean flexibility (Shannon's H)") +
  xlab("# tokens observed") +
  theme_minimal() +
  theme(
    plot.title          = element_text(hjust = 0.5),
    plot.title.position = "plot"
  ) +
  ylim(0, 1) +
  geom_point()

plot_Eng

ggsave(
  "stats/figures/cumulative_mean_flexibility/English.png",
  plot_Eng,
  height = 5,
  width  = 10
)

data_Nuu <- read.table("stats/data/Nuuchahnulth_means.tsv")
colnames(data_Nuu) <- c("mean")

plot_Nuu <- ggplot(data_Nuu, aes(
    x = seq_along(mean),
    y = mean
  )) +
  labs(title = "cumulative mean flexibility (Nuuchahnulth)") +
  ylab("mean flexibility (Shannon's H)") +
  xlab("# tokens observed") +
  theme_minimal() +
  theme(
    plot.title          = element_text(hjust = 0.5),
    plot.title.position = "plot"
  ) +
  ylim(0, 1) +
  geom_point()

plot_Nuu

ggsave(
  "stats/figures/cumulative_mean_flexibility/Nuuchahnulth.png",
  plot_Nuu,
  height = 5,
  width  = 10
)
