library(ggplot2)

source("stats/scripts/load_data.R")
source("stats/scripts/load_Nuuchahnulth_100.R")

data_English      <- load_data("stats/data/English_archlexemes.tsv")
data_Nuuchahnulth <- load_Nuuchahnulth_100()
data_Nuuchahnulth <- data_Nuuchahnulth[which(data_Nuuchahnulth$frequency > 1), ]

data_English_nonzero      <- data_English[which(data_English$flexibility != 0), ]
data_Nuuchahnulth_nonzero <- data_Nuuchahnulth[which(data_Nuuchahnulth$flexibility != 0), ]

combined <- rbind(
  data.frame(lang = "English", flexibility = data_English_nonzero$flexibility),
  data.frame(lang = "Nuuchahnulth", flexibility = data_Nuuchahnulth_nonzero$flexibility)
)

plot <- ggplot(combined, aes(x = flexibility, color = lang)) +
  theme_minimal() +
  theme(
    axis.title.y = element_blank()
  ) +
  scale_color_discrete(name = "Language") +
  stat_ecdf(size = 1.5)

ggsave(
  "stats/figures/flexibility/ecdf.png",
  height = 10,
  width  = 10
)
