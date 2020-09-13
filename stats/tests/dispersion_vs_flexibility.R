data <- load_all_data()
data <- data[which(data$flexibility != "NaN"), ]
attach(data)

# Q: Does dispersion correlate with degree of flexibility?
# Hypothesis: Yes, archlexemes that are more evenly dispersed are more flexible.

# Note: Despite the directional hypothesis, this is a two-tailed test.
# There is no principled reason for ruling out in advance the possibility
# that the direction of correlation could be negative.

# H0: Dispersion and flexibility do not correlate.
# H1: Dispersion and flexibility correlate.

# First test for all data, independent of language

cov(dispersion, flexibility) # -0.009721362
# There exists a negative correlation

# Cannot use Pearson's product-moment correlation (r) because the data are not normally distributed.
# Need to use Kendall’s tau (τ) instead, which is a rank-order test.

tau <- cor(flexibility, dispersion, method = "kendall"); tau
t2  <- tau^2 * 100; t2
# τ   = -0.323203
# τ^2 = 10.44602

# There is an intermediate negative correlation between dispersion and flexibility.
# ~10% of the variance in flexibility can be statistically accounted for by dispersion.

# Is the correlation between dispersion and flexibility significant?
# H0: The correlation is not significant.
# H1: the correlation is significant.

cor.test(flexibility, dispersion, method = "kendall")
# z = -18.067, p < .0001 (***)

# Result
# H1 is true: The correlation between dispersion and flexibility is highly significant.
# Dispersion accounts statistically for ~10% of the variance in flexibility.

# Next test each language independently

Eng <- data[which(language == "English"), ]
Nuu <- data[which(language == "Nuuchahnulth"), ]

cov(Eng$dispersion, Eng$flexibility) #  0.00192300: positive correlation
cov(Nuu$dispersion, Nuu$flexibility) # -0.00793939: negative correlation

# The correlation between dispersion and flexibility appears to be the inverse of the correlation between relative frequency
# and flexibility, for both English and Nuuchahnulth.

# Cannot use Pearson's product-moment correlation (r) because the data are not normally distributed.
# Need to use Kendall’s tau (τ) instead, which is a rank-order test.

tau_Eng <- cor(Eng$flexibility, Eng$dispersion, method = "kendall"); tau
t2_Eng  <- tau^2 * 100; t2
# τ   = -0.323203
# τ^2 = 10.44602

tau_Nuu <- cor(Nuu$flexibility, Nuu$dispersion, method = "kendall"); tau
t2_Nuu  <- tau^2 * 100; t2
# τ   = 0.4145373
# τ^2 = 17.18412

# There is an intermediate negative correlation between dispersion and flexibility for English,
# accounting for ~10% of the variance in the flexibility data.

# There is an intermediate positive correlation between dispersion and flexibility for Nucuhahnulth,
# accounting for ~17% of the variance in the flexibility data.

# Is the correlation between frequency and flexibility significant?
# H0: The correlation is not significant
# H1: The correlation is significant

cor.test(Eng$flexibility, Eng$dispersion, method = "kendall")
# z = 0.18197, p = 0.8556 (ns)

cor.test(Nuu$flexibility, Nuu$dispersion, method = "kendall")
# z = -14.159, p < .0001 (***)

# Result
# English: H0 is true. The correlation between dispersion and flexibility is not significant.
# Nuuchahnulth: H1 is true. There is a highly significant intermediate correlation between dispersion and frequency.
# ~17% of the variance in the flexibility ratings for Nuuchahnulth can be accounted for statistically by dispersion.