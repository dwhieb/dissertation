plot_word <- function(functions, archlexeme, gloss) {

  plot <- plot_triangle(functions) +
    geom_text(aes(label = archlexeme), vjust = 1.5) +
    geom_text(aes(label = gloss), vjust = 3)

  ggsave(
    paste(
      "stats/figures/Nuuchahnulth_words/plots/",
      gloss,
      ".png",
      sep = ""
    ),
    width  = 10,
    height = 10
  )

}
