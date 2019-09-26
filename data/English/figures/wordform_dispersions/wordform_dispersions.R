wordforms_path <- 'data/English/stats/wordforms.tsv'
graph_path     <- 'data/English/figures/wordform_dispersions/wordform_dispersions.pdf'

# load data
data <- read.table(
  file_path,
  colClasses = c('character', 'integer', 'numeric'),
  header     = TRUE,
  quote      = '',
  sep        = '\t',
)

# start PDF generation
pdf(graph_path)

# density plot
d <- density(data$dispersion)

plot(
  d,
  main = 'Density of Wordform Dispersions',
)

# end PDF generation
dev.off()

# show summary statistics
print(summary(data$dispersion))