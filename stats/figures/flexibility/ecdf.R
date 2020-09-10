library(ggplot2)
library(gridExtra)
library(reshape)

source("stats/scripts/load_data.R")

data_English      <- load_data("stats/data/English_archlexemes.tsv")
data_Nuuchahnulth <- load_data("stats/data/Nuuchahnulth_archlexemes.tsv")

data_English_nonzero      <- data_English[which(data_English$flexibility != 0), ]
data_Nuuchahnulth_nonzero <- data_Nuuchahnulth[which(data_Nuuchahnulth$flexibility != 0), ]

combined <- rbind(
  data.frame(lang = "English", flexibility = data_English_nonzero$flexibility),
  data.frame(lang = "Nuuchahnulth", flexibility = data_Nuuchahnulth_nonzero$flexibility)
)

plot <- ggplot(combined, aes(x = flexibility, color = lang)) +
  stat_ecdf()

ggsave(
  "stats/figures/flexibility/ecdf.png",
  height = 10,
  width  = 10
)
