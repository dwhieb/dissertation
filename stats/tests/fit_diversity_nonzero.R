source("stats/scripts/load_100.R")

data_100 <- load_100()
Eng_100  <- data_100[which(data_100$language == "English"), ]
Nuu_100  <- data_100[which(data_100$language == "Nuuchahnulth"), ]

data_small <- load_small()
Eng_small  <- data_small[which(data_small$language == "English"), ]
Nuu_small  <- data_small[which(data_small$language == "Nuuchahnulth"), ]

# Q: Does the mean diversity of each sample differ significantly from zero?
# H0: No (t = 0)
# H1: Yes (t != 0)
# Test: one-sided t-test

# descriptive statistics
mean(Eng_100$diversity)
median(Eng_100$diversity)
sd(Eng_100$diversity)

mean(Nuu_100$diversity)
median(Nuu_100$diversity)
sd(Nuu_100$diversity)

mean(Eng_small$diversity)
median(Eng_small$diversity)
sd(Eng_small$diversity)

mean(Nuu_small$diversity)
median(Nuu_small$diversity)
sd(Nuu_small$diversity)

# Assumption of the t-test: The data are normally distributed.
# Test for normality (H0 = normal distribution; H1 = non-normal distribution)
shapiro.test(Eng_100$diversity)   # W = 0.86087, p < .0001
shapiro.test(Nuu_100$diversity)   # W = 0.72829, p < .0001
shapiro.test(Eng_small$diversity) # W = 0.57494, p < .0001
shapiro.test(Nuu_small$diversity) # W = 0.63818, p < .0001

# The data are not normally distributed.
# Test: one-sided, one-sample sign test for the median
# H0: The median is zero
# H1: The median is greater than zero

# one-sample sign test is run using wilcox.test()
wilcox.test(
  Eng_100$diversity,
  alternative = "greater",
  mu = 0
) # V = 4371, p < .0001

wilcox.test(
  Nuu_100$diversity,
  alternative = "greater",
  mu = 0
) # V = 903, p < .0001

wilcox.test(
  Eng_small$diversity,
  alternative = "greater",
  mu = 0
) # V = 861, p < .0001

wilcox.test(
  Nuu_small$diversity,
  alternative = "greater",
  mu = 0
) # V = 7381, p < .0001

# Result
# The median diversity differs highly significantly from zero for both English and Nuuchahnulth.
