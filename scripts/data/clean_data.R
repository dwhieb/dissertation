# the path to the data directory (change as needed)
data_dir  <- 'data/English/data'

# 1. get list of Penn tags

tags_path <- 'scripts/constants/POS.tsv'

tags <- read.csv(
  tags_path,
  col.names  = c('Tag', 'Description'),
  colClasses = 'factor',
  header     = FALSE,
  quote      = '',
  row.names  = NULL,
  sep        = '\t'
)

tags <- as.character(tags$Tag)

# 2. get list of CoNLL files

files <- list.files(
  full.names = TRUE,
  path       = data_dir,
  pattern    = '.conll$',
  recursive  = TRUE
)

# 3. clean each CoNLL file

# column types for each CoNLL file
column_classes <- c(
  'numeric',
  'numeric',
  'numeric',
  'character',
  'character',
  'factor'
)

# column names for each TSV file
column_names <- c(
  'ID',
  'start_index',
  'end_index',
  'token',
  'lemma',
  'POS'
)

# check whether a token is an invalid one-letter word
is_bad_one_letter_word <- function(token) {
  return(
    nchar(token) == 1
    & token != 'a'
    & token != 'I'
    & grepl('[^0-9]', token)
  )
}

# process a single .conll file (generate cleaned .tsv version)
process_file <- function(file_path) {
  
  table <- read.delim(
    file_path,
    blank.lines.skip = TRUE,
    fill             = TRUE,
    header           = FALSE,
    quote            = '',
    row.names        = NULL
  )
  
  table        <- table[0:6]
  names(table) <- column_names
  table$token  <- as.character(table$token)
  table$lemma  <- as.character(table$lemma)
  table        <- subset(table, POS != 'POS')
  table        <- subset(table, POS != 'SYM')
  table        <- subset(table, is.element(POS, tags)) # filter out non-Penn tags
  table        <- subset(table, !is_bad_one_letter_word(token))
  
  new_file_path <- sub('.conll$', '.tsv', file_path)
  
  write.table(
    table,
    col.names    = TRUE,
    eol          = '\r\n',
    file         = new_file_path,
    fileEncoding = 'UTF-8',
    quote        = FALSE,
    row.names    = FALSE,
    sep          = '\t'
  )
  
}

# clean each file
lapply(files[10], process_file)