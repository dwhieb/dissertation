source("stats/scripts/name_cols.R")

plot_triangle <- function(
  data,
  plot_title = "",
  plot_subtitle = ""
) {

  data <- name_cols(data)

  limits <- data.frame(
    ref  = c(1, 0, 0),
    pred = c(0, 1, 0),
    mod  = c(0, 0, 1)
  )

  plot <- ggtern(data, aes(ref, pred, mod)) +
    labs(title = plot_title, subtitle = plot_subtitle) +
    theme_minimal() +
    theme(
      plot.title.position = "plot",
      plot.title          = element_text(hjust = 0.5),
      plot.subtitle       = element_text(hjust = 0.5),
      tern.axis.title.R   = element_text(hjust = 1.25),
      tern.axis.title.L   = element_text(hjust = -0.25)
    ) +
    theme_hidelabels() +
    Tlab("Predication") +
    Llab("Reference") +
    Rlab("Modification") +
    tern_limits(T = 1.05, L = 1.05, R = 1.05) +
    geom_polygon(
      data  = limits,
      alpha = 0,
      color = "#BBBBBB",
      size  = 0.5
    ) +
    geom_point()

  return(plot)

}
