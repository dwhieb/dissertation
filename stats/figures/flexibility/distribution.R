source("stats/scripts/load_100.R")
source("stats/scripts/load_small.R")

library(cowplot)
library(ggplot2)

create_graphic <- function(data) {

  bin_width <- 0.05 # results in 20 bins

  histogram <- ggplot(
    data,
    aes(
      fill = language,
      x    = flexibility,
    )
  ) +
  theme_minimal() +
  theme(
    axis.text.x  = element_blank(),
    axis.title.x = element_blank(),
    axis.ticks.x = element_blank(),
    plot.margin  = margin(0.5, 0.5, 0, 0.5, "cm")
  ) +
  geom_histogram(
    binwidth    = bin_width,
    show.legend = FALSE
  ) +
  geom_density(
    aes(y = ..count.. * bin_width),
    alpha       = 0.25,
    show.legend = FALSE
  ) +
  geom_rug() +
  xlim(-0.1, 1) +
  facet_grid(cols = vars(language))

  boxplot <- ggplot(
      data,
      aes(
        fill = language,
        x    = flexibility
      )
    ) +
    theme_minimal() +
    theme(
      axis.text.y        = element_blank(),
      axis.ticks.y       = element_blank(),
      panel.grid.major.y = element_blank(),
      panel.grid.minor.y = element_blank(),
      plot.margin        = margin(0, 0.5, 0.5, 0.5, "cm"),
      strip.text.x       = element_blank()
    ) +
    geom_boxplot(
      notch       = TRUE,
      show.legend = FALSE,
      width       = 1
    ) +
    xlim(-0.1, 1) +
    facet_grid(cols = vars(language))

  grid <- plot_grid(
    histogram,
    boxplot,
    align       = "v",
    ncol        = 1,
    nrow        = 2,
    rel_heights = c(3, 1)
  )

  return(grid)

}

data_100   <- load_100()
data_small <- load_small()

graphic_100   <- create_graphic(data_100)
graphic_small <- create_graphic(data_small)

graphic_100

graphic_height <- 5
graphic_width  <- 10

ggsave(
  "stats/figures/flexibility/distribution_100.png",
  graphic_100,
  height = graphic_height,
  width  = graphic_width
)

ggsave(
  "stats/figures/flexibility/distribution_small.png",
  graphic_small,
  height = graphic_height,
  width  = graphic_width
)
