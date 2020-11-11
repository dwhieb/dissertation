source("stats/scripts/load_data.R")

load_small <- function() {

  data_English      <- load_data("stats/data/English_subcorpus.tsv")
  data_Nuuchahnulth <- load_data("stats/data/Nuuchahnulth_stems.tsv")

  data_English$language      <- "English"
  data_Nuuchahnulth$language <- "Nuuchahnulth"

  data <- rbind(data_English, data_Nuuchahnulth)
  data <- data[which(data$frequency >= 4), ]

  return(data)

}
