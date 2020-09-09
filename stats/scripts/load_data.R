load_data <- function(file_path) {

  item
  frequency
  GER
  INF
  MOD
  PRED
  PREDCXN
  REF
  dispersion
  dispersionREF
  dispersionPRED
  dispersionMOD
  dispersionPREDbroad
  dispersionREFbroad
  dispersionNorm
  dispersionREFNorm
  dispersionPREDNorm
  dispersionMODNorm
  gloss

  data <- read.table(
    file_path,
    colClasses = c(
      "character", # lexeme
      "integer",   # corpus frequency
      "integer",   # REF frequency
      "integer",   # PRED frequency
      "integer",   # MOD frequency
      "numeric",   # corpus dispersion
      "numeric",   # REF dispersion
      "numeric",   # PRED dispersion
      "numeric",   # MOD dispersion
      "numeric",   # DPnorm (corpus)
      "numeric",   # DPnorm (REF)
      "numeric",   # DPnorm (PRED)
      "numeric"    # DPnorm (MOD)
    ),
    comment.char = "",
    encoding     = "UTF-8",
    header       = TRUE,
    quote        = "",
    sep          = "\t",
  )

  return(data)

}
