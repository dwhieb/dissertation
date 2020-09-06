file_path  <- 'stats/data/Nuuchahnulth_archlexemes.tsv'
graph_path <- 'stats/figures/temp/temp.pdf'

# load data
data <- read.table(
  file_path,
  colClasses   = c('character', 'integer', 'numeric', 'numeric'),
  comment.char = "",
  header       = TRUE,
  quote        = '',
  sep          = '\t',
)

# start PDF generation
# pdf(graph_path)

plot(ecdf(log(data$frequency)))

# end PDF generation
# dev.off()
