English      <- load_data("stats/data/English_archlexemes.tsv")
Nuuchahnulth <- load_data("stats/data/Nuuchahnulth_archlexemes.tsv")

English      <- English[which(English$flexibility > 0), ]
Nuuchahnulth <- Nuuchahnulth[which(Nuuchahnulth$flexibility != "NaN"), ]
Nuuchahnulth <- Nuuchahnulth[which(Nuuchahnulth$flexibility > 0), ]

# Q: Does the mean flexibility of each language differ significantly from zero?
# H0: No (t = 0)
# H1: Yes (t != 0)
# Test: one-sided t-test

# descriptive statistics
mean(English$flexibility)
sd(English$flexibility)

mean(Nuuchahnulth$flexibility)
sd(Nuuchahnulth$flexibility)

# Assumption of the t-test: The data are normally distributed.
# Test for normality (H0 = normal distribution; H1 = non-normal distribution)
shapiro.test(English$flexibility)      # W = 0.87914, p < .0001
shapiro.test(Nuuchahnulth$flexibility) # W = 0.93616, p < .0001

# The data are not normally distributed.
# Test: one-sided, one-sample sign test for the median
# H0: The median is zero
# H1: The median is greater than zero

# one-sample sign test is run using wilcox.test()
wilcox.test(
  English$flexibility,
  alternative = "greater",
  mu = 0
) # V = 4371, p < .0001

wilcox.test(
  Nuuchahnulth$flexibility,
  alternative = "greater",
  mu = 0
) # V = 20503, p < .0001

# Result
# The median flexibility differs highly significantly from zero for both English and Nuuchahnulth.
