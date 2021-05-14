source("stats/scripts/load_small.R")
source("stats/scripts/load_100.R")

library(mgcv)

# small corpus

data_small              <- load_small()
data_small$log_rel_freq <- log2(data_small$rel_freq)

model_small <- bam(
  diversity ~ s(log_rel_freq) + s(dispersion),
  data = data_small,
  method = "REML",
)

png(
  filename = "stats/figures/freq-DP_vs_diversity/partials_small.png",
  height   = 500,
  width    = 1000,
)

plot(
  model_small,
  cex       = 0.75,
  pages     = 1,
  pch       = 1,
  residuals = TRUE,
  shade     = TRUE,
  shade.col = "lightgreen",
  shift     = coef(model_small)[1],
)

dev.off()

# 100 lexemes

data_100              <- load_100()
data_100$log_rel_freq <- log2(data_100$rel_freq)

model_100 <- bam(
  diversity ~ s(log_rel_freq) + s(dispersion),
  data = data_100,
  method = "REML",
)

png(
  filename = "stats/figures/freq-DP_vs_diversity/partials_100.png",
  height   = 500,
  width    = 1000,
)

plot(
  model_100,
  cex       = 0.75,
  pages     = 1,
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
# (Intercept) 0.137237   0.009948   13.79   <2e-16 ***
#
# Approximate significance of smooth terms:
#                   edf Ref.df     F p-value
# s(log_rel_freq) 1.000  1.000 2.009   0.157
# s(dispersion)   1.407  1.712 2.780   0.118
#
# R-sq.(adj) =  0.0137   Deviance explained = 1.79%
# -REML = -1.3775  Scale est. = 0.05631   n = 569

# RESULTS
# Smooths are not complex / wiggly (EDF ~ 1).
# The smooths are not statistially significant.

summary(model_100)
# Parametric coefficients:
#             Estimate Std. Error t value Pr(>|t|)
# (Intercept)  0.20339    0.01701   11.96   <2e-16 ***
#
# Approximate significance of smooth terms:
#                   edf Ref.df     F p-value
# s(log_rel_freq) 3.078  3.914 1.725  0.1884
# s(dispersion)   1.000  1.000 3.037  0.0829 .
#
# R-sq.(adj) =  0.0379   Deviance explained = 5.75%
# -REML =   8.75  Scale est. = 0.058163  n = 201

# RESULTS
# The smooth for log relative frequency is slightly complex (EDF ~ 3).
# The smooth for dispersion is linear (EDF = 1).
# The smooth for log relative frequency is not significant.
# The smooth for dispersion marginally significant (p < .01).
