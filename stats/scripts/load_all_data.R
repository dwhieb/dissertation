source("stats/scripts/load_data.R")

load_all_data <- function() {

  data_English      <- load_data("stats/data/English_archlexemes.tsv")
  data_Nuuchahnulth <- load_data("stats/data/Nuuchahnulth_archlexemes.tsv")

  data_English$language      = "English"
  data_Nuuchahnulth$language = "Nuuchahnulth"

  data <- rbind(data_English, data_Nuuchahnulth)

  return(data)

}
