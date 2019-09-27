# This script bins wordforms based on their corpus dispersions
# (measured using Deviation of Proportions (DP))

# update this variable to point to the tab-delimited file of wordforms,
# frequencies, and dispersions
input_path  <- 'data/English/stats/wordforms.tsv'

# update this variable to point to the location where
# you would like the list of selected wordforms generated
output_path <- 'data/English/stats/suggestedWordforms.txt'

# load data
data <- read.table(
  input_path,
  colClasses = c('character', 'integer', 'numeric'),
  header     = TRUE,
  quote      = '',
  sep        = '\t',
)

filteredData      <- data[which(data$frequency >= 3),]
filteredData$bins <- cut(filteredData$dispersion, breaks = 100)

select_wordform_from_bin <- function(bin) {
  observations <- filteredData$wordform[which(filteredData$bins == bin)]
  if (length(observations)) return(sample(observations, size = 1))
  else return(NA)
}

bins               <- levels(filteredData$bins)
selected_wordforms <- sapply(bins, select_wordform_from_bin)

write.table(
  selected_wordforms,
  col.names    = FALSE,
  file         = output_path,
  fileEncoding = 'UTF-8',
  na           = 'NA',
  row.names    = FALSE,
  quote        = FALSE,
)
