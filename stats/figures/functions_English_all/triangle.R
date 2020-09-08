library(ggtern)
source("stats/scripts/load_data.R")

file_path <- "stats/data/English_archlexemes_all.tsv"
data      <- load_data(file_path)
functions <- 1 - data[7:9] # DP

plot <- ggtern(functions, aes(dispersionREF, dispersionPRED, dispersionMOD)) +
  Tlab("Predication") +
  Llab("Reference") +
  Rlab("Modification") +
  tern_limits(T = 1.05, L = 1.05, R = 1.05) +
  geom_point()

ggsave(
  "stats/figures/functions_English_all/triangle.png",
  width  = 10,
  height = 10
)
