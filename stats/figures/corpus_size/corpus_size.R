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
  ylab("flexibility (Shannon's H)") +
  xlab("# tokens observed") +
  theme_minimal() +
  theme(
    plot.title          = element_text(hjust = 0.5),
    plot.title.position = "plot"
  ) +
  ylim(0, 1) +
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
  x = tokens_observed,
  y = flexibility
)) +
  labs(title = "English") +
  ylab("flexibility (Shannon's H)") +
  xlab("# tokens observed") +
  theme_minimal() +
  theme(
    plot.title          = element_text(hjust = 0.5),
    plot.title.position = "plot"
  ) +
  ylim(0, 1) +
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

high_frequency_Eng_words <- c(
  "know",
  "think",
  "one",
  "thing",
  "right",
  "say",
  "see",
  "time",
  "good",
  "year"
)

data_Eng_words <- data_Eng[data_Eng$stem %in% high_frequency_Eng_words, ]

plot_Eng_words <- ggplot(data_Eng_words, aes(
  x = tokens_observed,
  y = flexibility,
  color = stem
)) +
  labs(title = "high-frequency English stems") +
  ylab("flexibility (Shannon's H)") +
  xlab("# tokens observed") +
  theme_minimal() +
  theme(
    plot.title          = element_text(hjust = 0.5),
    plot.title.position = "plot"
  ) +
  ylim(0, 1) +
  geom_point(
    show.legend = TRUE,
    size        = 1
  ) # +
  # scale_x_continuous(trans="log10")

ggsave(
  "stats/figures/corpus_size/English_high_freq.png",
  plot_Eng_words,
  height = 5,
  width  = 10
)

high_frequency_Nuu_words <- c(
  "wa·",
  "wik",
  "waː",
  "qʷaː",
  "ʔaḥʔaː",
  "ʔaḥ",
  "čuː",
  "quːʔas",
  "qʷayac̓iːk",
  "qʷis"
)

data_Nuu_words <- data_Nuu[data_Nuu$stem %in% high_frequency_Nuu_words, ]

plot_Nuu_words <- ggplot(data_Nuu_words, aes(
  x = tokens_observed,
  y = flexibility,
  color = stem
)) +
  labs(title = "high-frequency Nuuchahnulth stems") +
  ylab("flexibility (Shannon's H)") +
  xlab("# tokens observed") +
  theme_minimal() +
  theme(
    plot.title          = element_text(hjust = 0.5),
    plot.title.position = "plot"
  ) +
  ylim(0, 1) +
  geom_point(
    show.legend = TRUE,
    size        = 1
  )

ggsave(
  "stats/figures/corpus_size/Nuuchahnulth_high_freq.png",
  plot_Nuu_words,
  height = 5,
  width  = 10
)
