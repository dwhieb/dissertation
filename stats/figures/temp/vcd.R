library("vcd")
source("stats/scripts/load_data.R")

language <- "Nuuchahnulth"

file_path  <- paste("stats/data/", language, "_archlexemes.tsv", sep = "")
graph_path <- "stats/figures/temp/temp.pdf"

load_data(file_path)

functions <- 1 - data[7:9] # DP

# start PDF generation
# pdf(graph_path)

ternaryplot(
  functions[rowSums(functions) > 0, ],
  labels = "none",
  main   = paste("Use by Discourse Function (", language, ")", sep = ""),
  pch    = 20,
)

# end PDF generation
# dev.off()
