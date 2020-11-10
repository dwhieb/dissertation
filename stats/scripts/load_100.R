source("stats/scripts/load_data.R")

load_100 <- function() {

  Nuu_lexemes <- read.delim(
    "data/Nuuchahnulth/selected_archlexemes.txt",
    encoding = "UTF-8",
    header   = FALSE
  )

  colnames(Nuu_lexemes) <- c("item")

  Nuu_all  <- load_data("stats/data/Nuuchahnulth.tsv")
  data_Nuu <- merge(Nuu_all, Nuu_lexemes, by = "item")

  data_Eng <- load_data("stats/data/English.tsv")

  data_Eng$language <- "English"
  data_Nuu$language <- "Nuuchahnulth"
  data              <- rbind(data_Eng, data_Nuu)
  data              <- data[which(data$frequency <= 4), ]

  return(data)

}
