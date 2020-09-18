source("stats/scripts/load_data.R")

load_all <- function() {

  data_English      <- load_data("stats/data/English.tsv")
  data_Nuuchahnulth <- load_data("stats/data/Nuuchahnulth.tsv")

  data_English$language      <- "English"
  data_Nuuchahnulth$language <- "Nuuchahnulth"

  data <- rbind(data_English, data_Nuuchahnulth)

  return(data)

}
