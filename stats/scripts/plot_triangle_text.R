plot_triangle_text <- function(data, title = "", labels, broad = TRUE) {

  x <- if(a==1) 1 else 2

  plot <- ggtern(
    data,
    aes(
      if (broad == TRUE) dispersionREFbroad else dispersionREF,
      if (broad == TRUE) dispersionPREDbroad else dispersionPRED,
      dispersionMOD
    )
  ) +
  labs(title = archlexeme) +
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
  tern_limits(T = 1.1, L = 1.1, R = 1.1) +
  geom_text(label = labels)

  return(plot)

}
