library('vcd')

language <- 'Nuuchahnulth'

file_path  <- paste('stats/data/', language, '_archlexemes.tsv', sep='')
graph_path <- 'stats/figures/temp/temp.pdf'

# load data
data <- read.table(
  file_path,
  colClasses   = c(
    'character',
    'integer',
    'integer',
    'integer',
    'integer',
    'numeric',
    'numeric',
    'numeric',
    'numeric'
  ),
  comment.char = "",
  encoding     = "UTF-8",
  header       = TRUE,
  quote        = '',
  sep          = '\t',
)

calculate_DP_norm <- function(DP, numParts) {
  return(DP / (1 - (1 / numParts)))
}

result <- calculate_DP_norm(2/3, 3)
print(result)

# DP_norm <- lapply(data$dispersion, calculate_DP_norm)

# functionDispersions <- 1 - data$dispersion

# start PDF generation
# pdf(graph_path)

# ternaryplot(
#   functionDispersions[rowSums(functionDispersions) > 0, ],
#   labels = 'none',
#   main   = paste('Frequency of Use by Discourse Function (', language, ')', sep=''),
#   pch    = 20,
# )

# end PDF generation
# dev.off()
