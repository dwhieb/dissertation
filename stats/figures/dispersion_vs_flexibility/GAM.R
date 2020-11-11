source("stats/scripts/load_small.R")
source("stats/scripts/load_100.R")

library(mgcv)

# small corpus

data_small <- load_small()

# For language-specific results (make sure to change filename too)
# data_small <- data_small[which(data_small$language == "English"), ]

model_small <- bam(
  flexibility ~ s(dispersion),
  data = data_small,
  method = "REML",
)

# 100 lexemes

data_100 <- load_100()

model_100 <- bam(
  flexibility ~ s(dispersion),
  data = data_100,
  method = "REML",
)

# Plots

png(
  filename = "stats/figures/dispersion_vs_flexibility/GAM.png",
  height   = 500,
  width    = 1000,
)

par(mfrow = c(1, 2))

plot(
  model_small,
  cex       = 0.75,
  main      = "Small Corpus",
  pch       = 1,
  residuals = TRUE,
  shade     = TRUE,
  shade.col = "lightgreen",
  shift     = coef(model_small)[1],
)

plot(
  model_100,
  cex       = 0.75,
  main      = "100 Lexemes",
  pch       = 1,
  residuals = TRUE,
  shade     = TRUE,
  shade.col = "orange",
  shift     = coef(model_100)[1],
)

dev.off()

# Summary Statistics
# Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

summary(model_small)
# Parametric coefficients:
#             Estimate Std. Error t value Pr(>|t|)
# (Intercept) 0.137237   0.009957   13.78   <2e-16 ***
#
# Approximate significance of smooth terms:
#                 edf Ref.df     F p-value
# s(dispersion) 1.408  1.714 5.194  0.0201 *
#
# R-sq.(adj) =  0.012   Deviance explained = 1.44%
# -REML = -3.9734  Scale est. = 0.05641   n = 569

# RESULTS
# The smooth is not very complex / wiggly (EDF ≅ 1.4).
# The smooth is significant (p < .05).

summary(model_100)
# Parametric coefficients:
#             Estimate Std. Error t value Pr(>|t|)
# (Intercept)  0.20339    0.01725   11.79   <2e-16 ***
#
# Approximate significance of smooth terms:
#               edf Ref.df     F p-value
# s(dispersion)   1      1 3.264  0.0723 .
#
# R-sq.(adj) =  0.0112   Deviance explained = 1.61%
# -REML = 7.3685  Scale est. = 0.059778  n = 201

# RESULTS
# Smooth is linear (EDF = 1).
# Smooth is marginally significant (p < .1).

# OVERALL RESULTS
# There does not seem to be a significant effect of dispersion on flexibility.
# If there is an effect, it is quite small and negative.
# The results are generally the same when examining just English.
# For Nuuchahnulth, dispersion is significant.
# For the small corpus of Nuuchahnulth, dispersion is very highly significant (p < .001).
# For the 100 lexemes of Nuuchahnulth, dispersion is marginally significant (p < .1).
# In both cases the relationship is linear and slightly negative.
