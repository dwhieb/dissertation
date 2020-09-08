library(ggtern)
source("stats/scripts/load_data.R")

language <- "English"

file_path  <- paste("stats/data/English_archlexemes_strict.tsv", sep = "")

data <- load_data(file_path)

functions <- 1 - data[7:9] # DP

plot <- ggtern(functions, aes(dispersionREF, dispersionPRED, dispersionMOD)) +
  Tlab("Predication") +
  Llab("Reference") +
  Rlab("Modification") +
  tern_limits(T = 1.05, L = 1.05, R = 1.05) +
  geom_point()

ggsave(
  "stats/figures/functions_English_strict/triangle.png",
  width  = 10,
  height = 10
)
