library(ggplot2)

display_points <- 100000

data_Eng            <- read.table("stats/cumulative_functional_diversity/English.tsv")
colnames(data_Eng)  <- c("sample", "cumulative_functional_diversity")
numObservations_Eng <- nrow(data_Eng)
data_Eng$token      <- sequence(rle(as.character(data_Eng$sample))$lengths)
data_Eng_subset     <- data_Eng[seq(1, numObservations_Eng, numObservations_Eng / display_points), ]

plot_Eng <- ggplot(data_Eng_subset, aes(
    x = token,
    y = cumulative_functional_diversity
  )) +
  labs(title = "cumulative functional diversity (English)") +
  ylab("cumulative functional diversity (Shannon's H)") +
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
  "stats/figures/cumulative_functional_diversity/English.png",
  plot_Eng,
  height = 5,
  width  = 10
)

data_Nuu            <- read.table("stats/cumulative_functional_diversity/Nuuchahnulth.tsv")
colnames(data_Nuu)  <- c("sample", "cumulative_functional_diversity")
numObservations_Nuu <- nrow(data_Nuu)
data_Nuu$token      <- sequence(rle(as.character(data_Nuu$sample))$lengths)
data_Nuu_subset     <- data_Nuu[seq(1, numObservations_Nuu, numObservations_Nuu / display_points), ]

plot_Nuu <- ggplot(data_Nuu_subset, aes(
    x = token,
    y = cumulative_functional_diversity
  )) +
  labs(title = "cumulative functional diversity (Nuuchahnulth)") +
  ylab("cumulative functional diversity (Shannon's H)") +
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
  "stats/figures/cumulative_functional_diversity/Nuuchahnulth.png",
  plot_Nuu,
  height = 5,
  width  = 10
)
