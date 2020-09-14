source("stats/scripts/load_data.R")

load_Nuuchahnulth_100 <- function() {
  
  data_100 <- read.delim(
    "data/Nuuchahnulth/selected_archlexemes.txt",
    encoding = "UTF-8",
    header   = FALSE
  )
  
  data_all <- load_data("stats/data/Nuuchahnulth_archlexemes.tsv")
  
  colnames(data_100) <- c("item")
  
  data <- merge(data_all, data_100, by = "item")
  
  return (data)
  
}