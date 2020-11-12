source("stats/scripts/name_cols.R")

create_ternary_plot <- function(
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
    labs(
      subtitle = plot_subtitle,
      title    = plot_title
    ) +
    theme_minimal() +
    theme_hidelabels() +
    theme(
      plot.title.position = "plot",
      tern.axis.title.L   = element_text(hjust = -0.25),
      tern.axis.title.R   = element_text(hjust = 1.25),
      plot.subtitle       = element_text(hjust = 0.5),
      plot.title          = element_text(hjust = 0.5)
    ) +
    Tlab("predication") +
    Llab("reference") +
    Rlab("modification") +
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
