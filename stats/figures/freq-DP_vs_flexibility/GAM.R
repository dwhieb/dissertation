source("stats/scripts/load_100.R")

library(mgcv)

data <- load_100()

model <- gam(flexibility ~ s(rel_freq) + s(dispersion), data = data, method = "REML")