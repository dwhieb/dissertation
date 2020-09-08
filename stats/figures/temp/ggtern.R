library(ggtern)
source("stats/scripts/load_data.R")

language <- "English"

file_path  <- paste("stats/data/", language, "_archlexemes.tsv", sep = "")
graph_path <- "stats/figures/temp/temp.pdf"

data <- load_data(file_path)

functions <- 1 - data[7:9] # DP

plot <- ggtern(functions, aes(dispersionREF, dispersionPRED, dispersionMOD)) +
  Tlab("Predication") +
  Llab("Reference") +
  Rlab("Modification") +
  tern_limits(T = 1.05, L = 1.05, R = 1.05) +
  # geom_text(aes(label = data$item))
  geom_point()

# zoomed <- plot +
#   labs(title = "Zoomed to R Corner") +
#   tern_limits(T = .1, L = .1, R = 1.05)

# grid.arrange(plot, zoomed, ncol = 2, top = "Regular vs. Zoomed Plots")

ggsave("stats/figures/temp/plot.png", width = 10, height = 10)
