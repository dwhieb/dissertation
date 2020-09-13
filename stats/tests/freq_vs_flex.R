# Q: Does frequency correlate with degree of flexibility?
# Hypothesis: Yes, archlexemes that are more frequent are more flexible.
# Note: Frequency here refers to observed relative frequency per 1,000 words.
# Note: Despite the directional hypothesis, this is a two-tailed test.
# There is no principled reason for ruling out in advance the possibility
# that the direction of correlation could be negative.
# H0: Frequency and flexibility do not correlate.
# H1: Frequency and flexibility correlate.

# First test for all data, independent of language

data <- load_all_data()
data <- data[which(data$flexibility != "NaN"), ]
attach(data)

cov(rel_freq, flexibility) # 0.05170578
# There exists a positive correlation

# Cannot use Pearson's product-moment correlation (r) because the data are not normally distributed.
# Need to use Kendall’s tau (τ) instead, which is a rank-order test.

tau <- cor(flexibility, rel_freq, method = "kendall"); tau
t2  <- tau^2 * 100; t2
# τ   = 0.4145373
# τ^2 = 17.18412

# There is a intermediate positive correlation between relative frequency and flexibility.
# ~17% of the variance in flexibility can be statistically accounted for by frequency.

# Is the correlation between frequency and flexibility significant?
# H0: The correlation is not significant
# H1: The correlation is significant

cor.test(flexibility, rel_freq, method = "kendall")
# z = 21.202, p < .0001 (***)

# Result
# H1 is true: The correlation between frequency and flexibility is highly significant.
# Frequency accounts statistically for ~17% of the variance in flexibility.

# Next test each language independently
Eng <- data[which(language == "English"), ]
Nuu <- data[which(language == "Nuuchahnulth"), ]

cov(Eng$rel_freq, Eng$flexibility) # -0.02180398: negative correlation
cov(Nuu$rel_freq, Nuu$flexibility) #  0.05099984: positive correlation

# Cannot use Pearson's product-moment correlation (r) because the data are not normally distributed.
# Need to use Kendall’s tau (τ) instead, which is a rank-order test.

tau_Eng <- cor(Eng$flexibility, Eng$rel_freq, method = "kendall"); tau
t2_Eng  <- tau^2 * 100; t2
# τ   = 0.4145373
# τ^2 = 17.18412

tau_Nuu <- cor(Nuu$flexibility, Nuu$rel_freq, method = "kendall"); tau
t2_Nuu  <- tau^2 * 100; t2
# τ   = 0.4145373
# τ^2 = 17.18412

# There is a very low negative correlation between relative frequency and flexibility in English.
# There is a very low positive correlation between relative frequency and flexibility in Nuuchahnulth.
# ~17% of the variance in flexibility in both languages can be statistically accounted for by frequency.

# Is the correlation between frequency and flexibility significant?
# H0: The correlation is not significant
# H1: The correlation is significant

cor.test(Eng$flexibility, Eng$rel_freq, method = "kendall")
# z = 0.12034, p = 0.9042 (ns)

cor.test(Nuu$flexibility, Nuu$rel_freq, method = "kendall")
# z = 19.701, p < .0001 (***)

# Result
# English: H0 is true. The correlation between frequency and flexibility is not significant.
# Nuuchahnulth: H1 is true. There is a highly significant but extremely small positive correlation between flexibility and frequency.
# ~17% of the variance in flexibility in English can be statistically accounted for by frequency.