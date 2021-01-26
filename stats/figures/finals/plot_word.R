source("stats/scripts/name_cols.R")

library(ggtern)

plot_word <- function(functions, item_label) {

  limits <- data.frame(
    ref  = c(1, 0, 0),
    pred = c(0, 1, 0),
    mod  = c(0, 0, 1)
  )

  functions <- name_cols(functions)
  print(functions)

  plot <- ggtern(functions, aes(ref, pred, mod)) +
    theme_minimal() +
    theme(
      plot.title          = element_blank(),
      tern.axis.title.R   = element_text(hjust = 1.25),
      tern.axis.title.L   = element_text(hjust = -0.25)
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
    geom_point(color = "red") +
    geom_text(label = item_label, vjust = 1.5)

  return(plot)

}
