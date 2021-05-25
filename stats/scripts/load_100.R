source("stats/scripts/load_data.R")

load_100 <- function() {

  Nuu_lexemes <- read.delim(
    "data/Nuuchahnulth/selected_stems.txt",
    encoding = "UTF-8",
    header   = FALSE
  )

  Nuu_lexemes <- Nuu_lexemes[1]
  colnames(Nuu_lexemes) <- c("item")

  Nuu_all  <- load_data("stats/data/Nuuchahnulth.tsv")
  data_Nuu <- merge(Nuu_all, Nuu_lexemes, by = "item")

  Eng_lexemes <- read.delim(
    "data/English/selected_stems.txt",
    encoding = "UTF-8",
    header   = FALSE
  )

  colnames(Eng_lexemes) <- c("item")

  Eng_all  <- load_data("stats/data/English.tsv")
  data_Eng <- merge(Eng_all, Eng_lexemes, by = "item")

  data_Eng$language <- "English"
  data_Nuu$language <- "Nuuchahnulth"
  data              <- rbind(data_Eng, data_Nuu)

  return(data)

}
