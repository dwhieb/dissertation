source("stats/scripts/load_all_data.R")

data <- load_all_data()
data <- data[which(data$flexibility != "NaN"), ]
data <- data[which(data$flexibility > 0), ]
data <- data[which(data$frequency > 1 & data$frequency < 100), ]

plot <- ggplot(data, aes(
  x     = flexibility,
  y     = rel_freq,
  color = language,
  shape = language
)) +
  ylab("relative frequency (per 1,000 words)") +
  labs(color = "Language", shape = "Language") +
  theme_minimal() +
  geom_point(size = 2) +
  geom_rug() +
  xlim(0, 1) +
  # clip 9 values for readability
  ylim(0, 10) +
  facet_grid(cols = vars(language))

plot