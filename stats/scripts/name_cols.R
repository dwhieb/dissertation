name_cols <- function(data) {

  if (length(data) == 4) {
    colnames(data) <- c("ref", "pred", "mod", "lang")
  } else {
    colnames(data) <- c("ref", "pred", "mod")
  }

  return (data)

}
