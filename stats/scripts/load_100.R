source("stats/scripts/load_data.R")
source("stats/scripts/load_Nuuchahnulth_100.R")

load_100 <- function() {

  data_Eng          <- load_data("stats/data/English_archlexemes.tsv")
  data_Nuu          <- load_Nuuchahnulth_100()
  data_Eng$language <- "English"
  data_Nuu$language <- "Nuuchahnulth"
  data              <- rbind(data_Eng, data_Nuu)

  return(data)

}
