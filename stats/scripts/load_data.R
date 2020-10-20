load_data <- function(file_path) {

  data <- read.table(
    file_path,
    na.strings = "NULL",
    colClasses = c(
      "character", # lexeme
      "character", # gloss
      "character", # aspect
      "integer",   # corpus frequency
      "numeric",   # relative frequency
      "numeric",   # flexibility (frequency)
      "numeric",   # flexibility (frequency broad)
      "integer",   # definite
      "integer",   # GER frequency
      "integer",   # INF frequency
      "integer",   # MOD frequency
      "integer",   # PRED frequency
      "integer",   # PREDCXN frequency
      "integer",   # REF frequency
      "numeric",   # relative MOD frequency
      "numeric",   # relative PRED frequency
      "numeric",   # relative REF frequency
      "numeric",   # relative PREDbroad frequency
      "numeric",   # relative REFbroad frequency
      "numeric",   # corpus dispersion
      "numeric",   # REF dispersion
      "numeric",   # PRED dispersion
      "numeric",   # MOD dispersion
      "numeric",   # PREDbroad dispersion
      "numeric",   # REFbroad dispersion
      "numeric",   # corpus dispersion (DPnorm)
      "numeric",   # REF dispersion (DPnorm)
      "numeric",   # PRED dispersion (DPnorm)
      "numeric"    # MOD dispersion (DPnorm)
    ),
    comment.char = "",
    encoding     = "UTF-8",
    header       = TRUE,
    quote        = "",
    sep          = "\t",
  )

  return(data)

}
