source("stats/scripts/name_cols.R")

plot_word <- function(functions, archlexeme, gloss, title) {

  limits <- data.frame(
    ref  = c(1, 0, 0),
    pred = c(0, 1, 0),
    mod  = c(0, 0, 1)
  )

  functions <- name_cols(functions)

  plot <- ggtern(functions, aes(ref, pred, mod)) +
    labs(title = title) +
    theme_minimal() +
    theme(
      plot.title.position = "plot",
      plot.title = element_text(hjust = 0.5),
      plot.subtitle = element_text(hjust = 0.5),
      tern.axis.title.R = element_text(hjust = 1.25),
      tern.axis.title.L = element_text(hjust = -0.25)
    ) +
    theme_hidelabels() +
    Tlab("predication") +
    Llab("reference") +
    Rlab("modification") +
    tern_limits(T = 1.2, L = 1.2, R = 1.2) +
    geom_polygon(
      alpha = 0,
      color = "#BBBBBB",
      data  = limits,
      size  = 0.5
    ) +
    geom_point() +
    geom_text(aes(label = archlexeme), vjust = 1.5) +
    geom_text(aes(label = gloss), vjust = 3)

  return(plot)

}
