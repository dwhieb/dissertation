source("stats/scripts/load_data.R")

library(mgcv)

# data

hundred_items         <- load_data("stats/data/100_item_samples.csv")
data_Eng              <- hundred_items[which(hundred_items$language == "English"), ]
data_Eng$log_rel_freq <- log2(data_Eng$rel_freq)

data_Nuu              <- load_data("stats/data/Nuuchahnulth_stems.tsv")
data_Nuu$log_rel_freq <- log2(data_Nuu$rel_freq)

# models

model_Eng <- gam(
  diversity ~ s(log_rel_freq) + s(dispersion) + ti(log_rel_freq, dispersion),
  data   = data_Eng,
  method = "REML",
)

summary(model_Eng)

# NB: "The univariate smooths are additive, and then the interaction is
# an addition effect on top of those."

# Parametric coefficients:
#             Estimate Std. Error t-value Pr(>|t|)
# (Intercept) 0.23872  0.04479    5.33    6.53e-07 ***

# Approximate significance of smooth terms:
#                             edf    Ref.df F     p-value
# s(log_rel_freq)             1.000  1.000  0.022 0.882
# s(dispersion)               2.047  2.704  0.711 0.638
# ti(log_rel_freq,dispersion) 1.210  1.350  0.286 0.755

# R-sq.(adj)         = 0.00414
# Deviance explained = 4.65%
# -REML              = 1.5948
# Scale est.         = 0.052983
# n                  = 101

# RESULTS
# The tensor model shows no significant interactions overall.

model_Nuu <- gam(
  diversity ~ s(log_rel_freq) + s(dispersion) + ti(log_rel_freq, dispersion),
  data   = data_Nuu,
  method = "REML",
)

summary(model_Nuu)
# Parametric coefficients:
#             Estimate Std. Error t-value Pr(>|t|)
# (Intercept) 0.034369 0.005315   6.467   1.21e-10 ***

# Approximate significance of smooth terms:
# edf Ref.df      F p-value
# s(log_rel_freq)             2.825  3.461 37.582  <2e-16 ***
# s(dispersion)               3.197  4.180  2.384  0.0506 .
# ti(log_rel_freq,dispersion) 3.191  3.565  2.979  0.0471 *

# R-sq.(adj)         = 0.178
# Deviance explained = 18.2%
# -REML              = -1443.8
# Scale est.         = 0.017135
# n                  = 2384

# RESULTS
# - Frequency correlates in a very highly significant way with functional diversity
# - Frequencies in the middle ranges are more likely to be functionally diverse.
# - Dispersion shows only a partially significant correlation.
# - The interaction of frequency and dispersion also contributes significantly to functional diversity.
#
# However, the 3D interaction plot shows that as stems grow in frequency,
# the standard deviation for their functional diversity ratings grows dramatically,
# resembling that of English.
#
# Moreover, the strong correlation in the low frequencies is very likely due to
# the very large number of items with zero frequency. Given what we have seen in
# the previous section about the number of tokens required to have a reliable
# measure of functional diversity, one should not accept these results unquestioningly.
# It is very likely that the correlations in the Nuuchahnulth data would disappear
# with a larger corpus.

# heat maps

png(
  filename = "stats/figures/freq-DP_vs_diversity/interaction_heat.png",
  height   = 500,
  width    = 1000,
)

par(mfrow = c(1, 2))

vis.gam(
  main        = "English",
  plot.type   = "contour",
  too.far     = 0.1,
  view        = c("log_rel_freq", "dispersion"),
  x           = model_Eng,
  ylim        = c(0, 1),
)

vis.gam(
  main      = "Nuuchahnulth",
  plot.type = "contour",
  too.far   = 0.1,
  view      = c("log_rel_freq", "dispersion"),
  x         = model_Nuu,
  ylim      = c(0, 1),
)

dev.off()

# 3D perspective plots (without standard errors)

png(
  filename = "stats/figures/freq-DP_vs_diversity/interaction_3D.png",
  height   = 500,
  width    = 1000,
)

par(mfrow = c(1, 2))

vis.gam(
  main      = "English",
  phi       = 25,
  plot.type = "persp",
  theta     = 180,
  too.far   = 0.1,
  view      = c("log_rel_freq", "dispersion"),
  x         = model_Eng,
)

vis.gam(
  main      = "Nuuchahnulth",
  phi       = 25,
  plot.type = "persp",
  theta     = 180,
  too.far   = 0.1,
  view      = c("log_rel_freq", "dispersion"),
  x         = model_Nuu,
)

dev.off()

# 3D perspective plot (with standard errors)

png(
  filename = "stats/figures/freq-DP_vs_diversity/interaction_3Dse.png",
  height   = 500,
  width    = 1000,
)

par(mfrow = c(1, 2))

vis.gam(
  main      = "English",
  phi       = 20,
  plot.type = "persp",
  se        = 2,
  too.far   = 0.1,
  view      = c("log_rel_freq", "dispersion"),
  x         = model_Eng,
)

vis.gam(
  main      = "Nuuchahnulth",
  phi       = 20,
  plot.type = "persp",
  se        = 2,
  too.far   = 0.1,
  view      = c("log_rel_freq", "dispersion"),
  x         = model_Nuu,
)

dev.off()
