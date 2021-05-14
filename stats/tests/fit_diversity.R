English      <- load_data("stats/data/English_archlexemes.tsv")
Nuuchahnulth <- load_data("stats/data/Nuuchahnulth_archlexemes.tsv")
Nuuchahnulth <- Nuuchahnulth[which(Nuuchahnulth$diversity != "NaN"), ]

# Q: Does the mean diversity of each language differ significantly from zero?
# H0: No (t = 0)
# H1: Yes (t != 0)
# Test: one-sided t-test

# descriptive statistics
mean(English$diversity)
sd(English$diversity)

mean(Nuuchahnulth$diversity)
sd(Nuuchahnulth$diversity)

# Assumption of the t-test: The data are normally distributed.
# Test for normality (H0 = normal distribution; H1 = non-normal distribution)
shapiro.test(English$diversity)      # W = 0.86085, p < .0001
shapiro.test(Nuuchahnulth$diversity) # W = 0.35818, p < .0001

# The data are not normally distributed.
# Test: one-sided, one-sample sign test for the median
# H0: The median is zero
# H1: The median is greater than zero

# one-sample sign test is run using wilcox.test()
wilcox.test(
  English$diversity,
  alternative = "greater",
  mu = 0
) # V = 4371, p < .0001

wilcox.test(
  Nuuchahnulth$diversity,
  alternative = "greater",
  mu = 0
) # V = 20503, p < .0001

# Result
# The median diversity differs highly significantly from zero for both English and Nuuchahnulth.
