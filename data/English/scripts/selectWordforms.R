# This script bins wordforms based on their corpus dispersions
# (measured using Deviation of Proportions (DP))

# update this variable to point to the tab-delimited file of wordforms,
# frequencies, and dispersions
input_path  <- 'stats/data/English_wordforms.tsv'

# update this variable to point to the location where
# you would like the list of selected wordforms generated
output_path <- 'suggestedWordforms.txt'

# the number of wordforms to suggest
num_wordforms <- 100

# load data
data <- read.table(
  input_path,
  colClasses = c('character', 'integer', 'numeric'),
  header     = TRUE,
  quote      = '',
  sep        = '\t',
)

filteredData      <- data[which(data$frequency >= 3),]
filteredData$bins <- cut(filteredData$dispersion, breaks = num_wordforms)

select_wordform_from_bin <- function(bin) {
  observations <- filteredData$wordform[which(filteredData$bins == bin)]
  # print(observations)
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
