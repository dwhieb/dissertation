plot_triangle <- function(functions, plot_title = "") {

  plot <- ggtern(
    functions,
    aes(dispersionREF, dispersionPRED, dispersionMOD)
  ) +
    labs(title = plot_title) +
    theme(
      plot.title.position = "plot",
      plot.title = element_text(hjust = 0.5),
      tern.axis.title.R = element_text(hjust = 1.25),
      tern.axis.title.L = element_text(hjust = -0.25)
    ) +
    theme_hidelabels() +
    Tlab("Predication") +
    Llab("Reference") +
    Rlab("Modification") +
    tern_limits(T = 1.05, L = 1.05, R = 1.05) +
    geom_point()

  return(plot)

}
