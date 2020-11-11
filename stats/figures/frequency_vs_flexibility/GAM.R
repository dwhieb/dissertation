source("stats/scripts/load_small.R")
source("stats/scripts/load_100.R")

library(mgcv)

# small corpus

data_small              <- load_small()
data_small$log_rel_freq <- log2(data_small$rel_freq)

# For language-specific results (be sure to change filename too)
# data_small <- data_small[which(data_small$language == "Nuuchahnulth"), ]

model_small <- bam(
  flexibility ~ s(log_rel_freq),
  data = data_small,
  method = "REML",
)

# 100 lexemes

data_100              <- load_100()
data_100$log_rel_freq <- log2(data_100$rel_freq)

model_100 <- bam(
  flexibility ~ s(log_rel_freq),
  data = data_100,
  method = "REML",
)

# Plots

png(
  filename = "stats/figures/frequency_vs_flexibility/GAM_Nuuchahnulth.png",
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
# (Intercept) 0.137237   0.009976   13.76   <2e-16 ***
#
# Approximate significance of smooth terms:
#                 edf Ref.df     F p-value
# s(log_rel_freq)   1      1 5.738  0.0169 *
#
# R-sq.(adj) =  0.00827   Deviance explained =    1%
# -REML = -3.146  Scale est. = 0.056622  n = 569

# RESULTS
# Smooth is linear (EDF = 1).
# Smooth is significant (p < .05).

summary(model_100)
# Parametric coefficients:
#             Estimate Std. Error t value Pr(>|t|)
# (Intercept)  0.20339    0.01705   11.93   <2e-16 ***
#
# Approximate significance of smooth terms:
#                   edf Ref.df     F p-value
# s(log_rel_freq) 3.479  4.389 1.825   0.139
#
# R-sq.(adj) =  0.0335   Deviance explained = 5.04%
# -REML = 7.4488  Scale est. = 0.058426  n = 201

# RESULTS
# Smooth is slightly complex (EDF ≅ 3.5).
# Smooth is insignificant.

# OVERALL RESULTS
# There does not seem to be a significant effect of frequency on flexibility.
# If there is an effect, it is small and positive.
# There are also no significant correlations when examining just English.
# In the small corpus of Nuuchahnulth, relative frequency shows a highly significant but small positive linear correlation with flexibility.
# No correlations were found for the 100-lexeme sample of Nuuchahnulth.