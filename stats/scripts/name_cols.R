name_cols <- function(df) {
  colnames(df) <- c("ref", "pred", "mod")
  return(df)
}
