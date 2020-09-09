plot_word <- function(functions, archlexeme, gloss, title) {

  plot <- plot_triangle(functions) +
    labs(title = title) +
    geom_text(aes(label = archlexeme), vjust = 1.5) +
    geom_text(aes(label = gloss), vjust = 3)

  return(plot)

}
