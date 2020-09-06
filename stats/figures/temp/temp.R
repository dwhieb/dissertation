library('vcd')

file_path  <- 'stats/data/English_archlexemes.tsv'
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

functionCounts <- data[5:7]

# start PDF generation
pdf(graph_path)

ternaryplot(
  functionCounts[rowSums(functionCounts) > 0, ],
  labels    = 'none',
  main      = 'Frequency of Use by Discourse Function (English)',
  pch       = 20,
  prop_size = TRUE,
)

# end PDF generation
dev.off()
