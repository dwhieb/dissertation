# DEPENDENCIES

library(mgcv)

# UTILITIES

load_data <- function(file_path) {

  data <- read.csv(
    file_path,
    na.strings = "NULL",
    colClasses = c(
      "character", # lexeme
      "character", # gloss
      "integer",   # token frequency
      "numeric",   # relative frequency
      "numeric",   # functional diversity
      "numeric"    # dispersion
    ),
    encoding     = "UTF-8"
  )

  return(data)

}

# DATA

# English small corpus sample
data_Eng_small              <- load_data("Eng_small.csv")
data_Eng_small$log_rel_freq <- log2(data_Eng_small$rel_freq)

# Nuuchahnulth small corpus sample
data_Nuu_small              <- load_data("Nuu_small.csv")
data_Nuu_small$log_rel_freq <- log2(data_Nuu_small$rel_freq)

# English 100-item sample
data_Eng_100              <- load_data("Eng_100.csv")
data_Eng_100$log_rel_freq <- log2(data_Eng_100$rel_freq)

# Nuuchahnulth 100-item sample
data_Nuu_100              <- load_data("Nuu_100.csv")
data_Nuu_100$log_rel_freq <- log2(data_Nuu_100$rel_freq)

# MODELS

# English small corpus sample
model_Eng_small <- gam(
  diversity ~ s(log_rel_freq) + s(dispersion) + ti(log_rel_freq, dispersion),
  data   = data_Eng_small,
  method = "REML",
)

summary(model_Eng_small)

# Nuuchahnulth small corpus sample
model_Nuu_small <- gam(
  diversity ~ s(log_rel_freq) + s(dispersion) + ti(log_rel_freq, dispersion),
  data   = data_Nuu_100,
  method = "REML",
)

summary(model_Nuu_small)

# English 100-item sample
model_Eng_100 <- gam(
  diversity ~ s(log_rel_freq) + s(dispersion) + ti(log_rel_freq, dispersion),
  data   = data_Eng_100,
  method = "REML",
)

summary(model_Eng_100)

# Nuuchahnulth 100-item sample
model_Nuu_100 <- gam(
  diversity ~ s(log_rel_freq) + s(dispersion) + ti(log_rel_freq, dispersion),
  data   = data_Nuu_100,
  method = "REML",
)

summary(model_Nuu_100)
