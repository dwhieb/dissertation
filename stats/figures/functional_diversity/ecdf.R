source("stats/scripts/load_100.R")
source("stats/scripts/load_small.R")

library(ggplot2)

create_plot <- function(data) {

  plot <- ggplot(
    data,
    aes(
      color = language,
      x     = diversity
    )
  ) +
  theme_minimal() +
  theme(
    axis.title.y = element_blank()
  ) +
  scale_color_discrete(name = "Language") +
  stat_ecdf(size = 1.5)

  return(plot)

}

data_100   <- load_100()
data_small <- load_small()

# filter out cases where diversity = 0
# (NB: be sure to update filenames for figures)
# data_100   <- data_100[which(data_100$diversity != 0), ]
# data_small <- data_small[which(data_small$diversity != 0), ]

plot_100   <- create_plot(data_100)
plot_small <- create_plot(data_small)

fig_dim <- 10

ggsave(
  "stats/figures/functional_diversity/ecdf_100.png",
  plot_100,
  height = fig_dim,
  width  = fig_dim
)

ggsave(
  "stats/figures/functional_diversity/ecdf_small.png",
  plot_small,
  height = fig_dim,
  width  = fig_dim
)
