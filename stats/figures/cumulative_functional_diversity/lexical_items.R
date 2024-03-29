library(ggplot2)

high_frequency_Nuu_words <- c(
  "wa·",
  "wik",
  "quːʔas",
  "qʷis",
  "hiɬ",
  "qaḥ",
  "ḥaw̓iɬ",
  "ʔaya",
  "huḥtak",
  "huːʔak"
)

Nuu_glosses <- c(
  "say",
  "not",
  "person",
  "do.so",
  "there",
  "dead",
  "chief",
  "many",
  "know",
  "long.ago"
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

Nuu_stems <- data.frame(high_frequency_Nuu_words, Nuu_glosses)
Eng_stems <- data.frame(high_frequency_Eng_words, high_frequency_Eng_words)

stem_col_names <- c("stem", "gloss")

colnames(Nuu_stems) <- stem_col_names
colnames(Eng_stems) <- stem_col_names

Nuu_stems$language <- "Nuuchahnulth"
Eng_stems$language <- "English"

load_data <- function(file_path) {

  data <- read.table(
    file_path,
    colClasses = c(
      "integer",
      "character",
      "integer",
      "integer",
      "integer",
      "integer",
      "numeric"
    ),
    col.names = c(
      "sample",
      "stem",
      "REF",
      "PRED",
      "MOD",
      "tokens_observed",
      "diversity"
    ),
    comment.char = "",
    encoding     = "UTF-8",
    header       = FALSE,
    quote        = "",
    sep          = "\t",
  )

  # TODO: This should be applied to the subsetted data, not the raw data
  data$token <- sequence(rle(as.character(data$sample))$lengths)

  return(data)

}

plot_word <- function(stem_data) {

  plot <- ggplot(stem_data, aes(
    x = token,
    y = diversity
  )) +
    ylab("functional diversity (Shannon's H)") +
    xlab("# tokens observed") +
    theme_minimal() +
    theme(
      plot.title          = element_text(hjust = 0.5),
      plot.title.position = "plot"
    ) +
    ylim(0, 1) +
    geom_point(
      alpha       = 0.1,
      show.legend = FALSE,
      size        = 1
    )

  return(plot)

}

plot_words <- function(data, wordlist) {

  for (i in 1:length(wordlist$stem)) {

    stem            <- wordlist$stem[i]
    gloss           <- wordlist$gloss[i]
    language        <- wordlist$language[i]
    stem_data       <- data[which(data$stem == stem), ]
    stem_data$gloss <- gloss
    stem_data$token <- sequence(rle(as.character(stem_data$sample))$lengths)
    plot            <- plot_word(stem_data)

    ggsave(
      paste("stats/figures/cumulative_functional_diversity/", language, "/", language, "_", gloss, ".png", sep = ""),
      plot,
      height = 5,
      width  = 10
    )

  }

}

data_Nuu <- load_data("stats/cumulative_functional_diversity/Nuuchahnulth_items.tsv")
data_Eng <- load_data("stats/cumulative_functional_diversity/English_items.tsv")

data_Nuu_stems <- data_Nuu[data_Nuu$stem %in% Nuu_stems$stem, ]
data_Eng_stems <- data_Eng[data_Eng$stem %in% Eng_stems$stem, ]

plot_words(data_Nuu_stems, Nuu_stems)
plot_words(data_Eng_stems, Eng_stems)
