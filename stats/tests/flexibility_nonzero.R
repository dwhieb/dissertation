# RQ: Do English and Nuuchahnulth differ in their flexibility (zero-flexibility cases-excluded)

source("stats/scripts/load_all_data.R")

data <- load_all_data()
data <- data[which(data$flexibility != "NaN" & data$flexibility > 0), ]

attach(data)

# Visualize the data
boxplot(
  flexibility~language,
  notch = TRUE,
  ylab  = "flexibility",
  ylim  = c(0, 1)
)
rug(jitter(flexibility[language == "English"]), side = 2)
rug(jitter(flexibility[language == "Nuuchahnulth"]), side = 4)
text(1:2, tapply(flexibility, language, mean), "x")

tapply(flexibility, language, mean)
tapply(flexibility, language, sd)
tapply(flexibility, language, median)
tapply(flexibility, language, IQR)

# Prelim: Are the data normally distributed?
# H0: Yes
# H1: No
# Test: Shapiro-Wilk normality test

tapply(flexibility, language, shapiro.test)
# English:      W = 0.87914, p < .0001
# Nuuchahnulth: W = 0.93616, p < .0001

# Result:
# H1 is true: The data are not normally distributed. Both W and p are very low.

# Prelim: Are the variances homogenous?
# H0: Yes
# H1: No
# Test: Fligner-Killeen test of homogeneity of variances
# An F-test is not applicable here because the data are not normally distributed (one of the test's assumptions)

fligner.test(flexibility~language) # χ2 = 11.969, df = 1, p < .001

# Result:
# H1 is true: The variances are not homogenous

# Q: Do English and Nuuchahnulth differ significantly in the distribution of their flexibility?
# H0: No (D = 0)
# H1: Yes (D > 0)
# Test: two-sample Kolmogorov-Smirnov test for difference in distribution

ks.test(
  jitter(flexibility[language == "English"]),
  jitter(flexibility[language == "Nuuchahnulth"])
) # D = 0.54562, p < .0001

# Result
# H1 is true: English and Nuuchahnulth differ highly significantly from each other in terms of their flexibility distributions.

# Q: Do English and Nuuchahnulth differ significantly in terms of their *median* flexibility?
# Cannot compare mean flexibility, because the data are not normally distributed, and their variances are not homogenous.
# H0: No
# H1: Yes
# Test: U-test (Mann-Whitney U test / Wilcoxon rank-sum test; nonparametric)
# The distributions of flexibility ratings are not identically distributed for the two languages.
# Nonetheless, a U-test can be applied even when this assumption isn't met.

# The U-test is run with wilcox.test()
wilcox.test(flexibility~language, paired = FALSE)
# W = 3460.5, p < .0001

# Result
# H1 is true: English and Nuuchahnulth differ highly significantly in terms of their median flexibility.