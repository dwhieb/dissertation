source("stats/scripts/load_data.R")

data <- load_data("stats/data/Nuuchahnulth.tsv")
data <- data[which(data$definite > 0), ]
data <- data[which(!is.na(data$aspect)), ]