# the path to the data directory (change as needed)
data_dir  <- 'data/English/data'

# the path to the file of statistical data to generate
output_path <- 'data/English/stats/wordforms.tsv'

# get list of TSV files in the data directory
files <- list.files(
  full.names = TRUE,
  path       = data_dir,
  pattern    = '.tsv$',
  recursive  = TRUE
)

# create the data frame for the entire corpus
corpus <- FALSE

column_classes <- c(
  'numeric',
  'numeric',
  'numeric',
  'character',
  'character',
  'factor'
)

process_file <- function(file_path) {

  table <- read.delim(
    file_path,
    blank.lines.skip = TRUE,
    colClasses       = column_classes,
    fill             = TRUE,
    header           = TRUE,
    quote            = '',
    row.names        = NULL
  )
  
  if (corpus == FALSE) {
    corpus <- table
  } else {
    rbind(corpus, table)
  }
  
}

# aggregate statistics from each file
lapply(files, process_file)

