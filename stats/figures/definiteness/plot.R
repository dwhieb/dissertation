# This script was started to plot the interaction of definite markers
# and aspect, but it turns out there are hardly any cases where a stem
# appears with both an aspect marker and a definite marker.

source("stats/scripts/load_data.R")

data <- load_data("stats/data/Nuuchahnulth_stems.tsv")
data <- data[which(data$frequency >= 4), ]
data <- data[which(data$definite > 0), ]
data <- data[which(!is.na(data$aspect)), ]
