# Plots mean corpus dispersion (as a boxplot) for both samples,
# comparing English and Nuuchahnulth side by side,
# in separate files.

source("stats/scripts/load_100.R")
source("stats/scripts/load_small.R")

library(cowplot)
library(ggplot2)

create_plot <- function(data) {

  plot <- ggplot(data, aes(
    x    = dispersion,
    fill = language
  )) +
    theme_minimal() +
    theme(
      axis.text.y        = element_blank(),
      axis.title.x       = element_blank(),
      panel.grid.major.y = element_blank(),
      panel.grid.minor.y = element_blank()
    ) +
    geom_boxplot(
      na.rm       = TRUE,
      notch       = TRUE,
      show.legend = FALSE,
      width       = 1
    ) +
    xlim(0, 1) +
    ylim(-0.5, 0.5) +
    facet_grid(rows = vars(language))

  return(plot)

}

data_100   <- load_100()
data_small <- load_small()

plot_100   <- create_plot(data_100)
plot_small <- create_plot(data_small)

ggsave(
 "stats/figures/dispersion/100.png",
 plot_100,
 height = 2.5,
 width  = 5
)

ggsave(
  "stats/figures/dispersion/small.png",
  plot_small,
  height = 2.5,
  width  = 5
)
