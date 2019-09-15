data_dir = 'data/English/data'

files <- list.files(
  full.names = TRUE,
  path       = data_dir,
  pattern    = '.conll$',
  recursive  = TRUE
)

column_classes <- c(
  'numeric',
  'numeric',
  'numeric',
  'character',
  'character',
  'factor',
  'NULL',
  'NULL',
  'NULL',
  'NULL',
  'NULL'
)

columns <- c(
  'ID',
  'start_index',
  'end_index',
  'token',
  'lemma',
  'POS',
  'misc_1',
  'misc_2',
  'misc_3',
  'misc_4',
  'misc_5'
)

process_file <- function(file_path) {
  
  table <- read.csv(
    file_path,
    blank.lines.skip = TRUE,
    colClasses       = column_classes,
    col.names        = columns,
    header           = FALSE,
    quote            = '',
    row.names        = NULL,
    sep              = '\t'
  )

}

lapply(files[1:1], process_file)