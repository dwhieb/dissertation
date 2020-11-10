source("stats/scripts/load_data.R")

# This script bins wordforms based on their corpus dispersions
# (measured using Deviation of Proportions (DP))

# update this variable to point to the tab-delimited file of
# wordforms, frequencies, and dispersions
input_path <- "stats/data/Nuuchahnulth.tsv"

# update this variable to point to the location where
# you would like the list of selected wordforms generated
output_path <- "data/Nuuchahnulth/suggested_wordforms.txt"

# the number of wordforms to suggest
num_wordforms <- 100

# load data
data <- load_data(input_path)

data_filtered      <- data[which(data$frequency >= 4), ]
data_filtered$bins <- cut(data_filtered$dispersion, breaks = num_wordforms)

select_wordform_from_bin <- function(bin) {

  observations <- data_filtered$item[which(data_filtered$bins == bin)]

  if (length(observations)) return(sample(observations, size = 1))
  else return(NA)

}

bins               <- levels(data_filtered$bins)
selected_wordforms <- sapply(bins, select_wordform_from_bin)

connection <- file(output_path)
writeLines(selected_wordforms, connection, useBytes = TRUE)
close(connection)