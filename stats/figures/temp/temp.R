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
    'numeric',
    'integer',
    'integer',
    'integer'
  ),
  comment.char = "",
  encoding     = "UTF-8",
  header       = TRUE,
  quote        = '',
  sep          = '\t',
)

functionCounts <- data[4:6]

# start PDF generation
pdf(graph_path)

ternaryplot(
  functionCounts[rowSums(functionCounts) > 0, ],
  labels    = 'none',
  main      = paste('Frequency of Use by Discourse Function (', language, ')', sep=''),
  pch       = 20,
  # prop_size = TRUE, # plot weighted values
)

# end PDF generation
dev.off()
