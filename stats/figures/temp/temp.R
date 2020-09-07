library('vcd')

language <- 'English'

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

functionDispersions <- 1 - data[7:9]

# start PDF generation
pdf(graph_path)

ternaryplot(
  functionDispersions[rowSums(functionDispersions) > 0, ],
  # labels = 'none',
  main   = paste('Frequency of Use by Discourse Function (', language, ')', sep=''),
  pch    = 20,
)

# end PDF generation
dev.off()
