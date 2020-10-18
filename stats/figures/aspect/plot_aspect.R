library(ggtern)

plot_aspect <- function(data, color = "black") {

  plot <- ggtern(data, aes(
    dispersion_ref,
    dispersion_pred,
    dispersion_mod
  )) +
    theme_minimal() +
    theme_hidelabels() +
    theme(
      tern.axis.title.L = element_text(hjust = -0.25),
      tern.axis.title.R = element_text(hjust = 1.25)
    ) +
    Tlab("predication") +
    Llab("reference") +
    Rlab("modification") +
    tern_limits(T = 1.1, L = 1.1, R = 1.1) +
    geom_polygon(
      data = data.frame(
        dispersion_ref  = c(1, 0, 0),
        dispersion_pred = c(0, 1, 0),
        dispersion_mod  = c(0, 0, 1)
      ),
      alpha = 0,
      color = "#BBBBBB",
      size  = 0.5
    ) +
    geom_point(
      alpha       = 0.5,
      color       = color,
      show.legend = FALSE,
      size        = 5
    )

  return(plot)

}
