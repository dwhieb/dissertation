library(ggplot2)

load_data <- function(file_path) {

  data <- read.table(
    file_path,
    colClasses = c(
      "character",
      "integer",
      "integer",
      "integer",
      "integer",
      "numeric"
    ),
    col.names = c(
      "stem",
      "REF",
      "PRED",
      "MOD",
      "tokens_observed",
      "flexibility"
    ),
    comment.char = "",
    encoding     = "UTF-8",
    header       = FALSE,
    quote        = "",
    sep          = "\t",
  )
  
  return(data)

}

data_Nuu <- load_data("stats/data/Nuuchahnulth_corpus_size.tsv")
data_Eng <- load_data("stats/data/English_corpus_size.tsv")

# data_Eng$language <- "English"
# data_Nuu$language <- "Nuuchahnulth"
# data              <- rbind(data_Eng, data_Nuu)

plot_Nuu <- ggplot(data_Nuu, aes(
  x     = tokens_observed,
  y     = flexibility,
  color = stem
)) +
  labs(title = "Nuuchahnulth") +
  ylab("flexibility") +
  xlab("# tokens observed") +
  theme_minimal() +
  theme(
    plot.title          = element_text(hjust = 0.5),
    plot.title.position = "plot"
  ) +
  geom_point(
    show.legend = FALSE,
    size        = 0.5
  )

ggsave(
  "stats/figures/corpus_size/Nuuchahnulth.png",
  plot_Nuu,
  height = 5,
  width  = 10
)

plot_Eng <- ggplot(data_Eng, aes(
  x     = tokens_observed,
  y     = flexibility
)) +
  labs(title = "English") +
  ylab("flexibility") +
  xlab("# tokens observed") +
  theme_minimal() +
  theme(
    plot.title          = element_text(hjust = 0.5),
    plot.title.position = "plot"
  ) +
  geom_point(
    show.legend = FALSE,
    size        = 0.5
  ) # +
  # scale_x_continuous(trans="log10")

ggsave(
  "stats/figures/corpus_size/English.png",
  plot_Eng,
  height = 10,
  width  = 20
)