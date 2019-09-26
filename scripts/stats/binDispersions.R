wordforms_path <- 'data/English/stats/wordforms.tsv'

# load data
data <- read.table(
  file_path,
  colClasses = c('character', 'integer', 'numeric'),
  header     = TRUE,
  quote      = '',
  sep        = '\t',
)