# RQ: Do English and Nuuchahnulth differ in their flexibility?

source("stats/scripts/load_all_data.R")

data <- load_all_data()
data <- data[which(data$flexibility != "NaN"), ]

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

# Visualizing the data suggest that the data are not normally distributed,
# and that both the mean and median differ significantly.

# Prelim: Are English and Nuuchahnulth flexibility ratings normally distributed?
# H0: The data are normally distributed
# H1: The data are not normally distributed
# Test: Shapiro-Wilk test for normality

tapply(flexibility, language, mean)
tapply(flexibility, language, sd)
tapply(flexibility, language, shapiro.test)

# English:      W = 0.86085; p < .0001.
# Nuuchahnulth: W = 0.35818; p < .0001.

# Result:
# H1 is true: The data are not normally distributed for either language.
# W is extremely low for both languages (well below the typical .99 threshhold),
# and p < .001. (Explanation of W values: https://emilkirkegaard.dk/en/?p=4452)

# Prelim: Variances of flexibility ratings are homogenous
# H0: The variances are homogenous
# H1: The variances are not homogenous
# Test: Fligner-Killeen test.
# Cannot use an F-test for homogeneity of variances because the data are not normally distributed.
# The Fligner-Killeen test is most robust against departures from normality.

fligner.test(flexibility~language) # χ2 = 299, p < .0001

# Result:
# H1 is true: The variances are not homogenous.

# Q: Do English and Nuuchahnulth differ significantly in terms of their median flexibility?
# Cannot test differences in *mean* flexibility because the data are not normally distributed,
# and the variances are not homogenous.
# H0: No
# H1: Yes
# Test: U-test. (Mann-Whitney U test / Wilcoxon rank-sum test; nonparametric) Cannot use t-test here because the data are not normally distributed.

tapply(flexibility, language, median)
tapply(flexibility, language, IQR)

# An assumption of the U-test is that "the populations from which the samples whose
# central tendencies are tested have been drawn are identically distributed. This
# assumption is not clearly met (because the Kolmogorov-Smirnov test failes).
# However, Bortz, Lienart, & Boehnke (1990: 211) state that the U-test can discover
# differences in measures of central tendency even if this assumption is violated
# (Gries 2013: 230).

# The U-test is run with wilcox.test()
wilcox.test(
  flexibility~language,
  correct = FALSE,
  paired  = FALSE
) # W = 168458; p < .0001

# Result:
# H1 is true: English and Nuuchahnulth differ highly significantly in terms of their median flexibility.

# Q: Do English and Nuuchahnulth differ significantly in the distribution of their flexibility?
# H0: No
# H1: Yes
# Test: Kolmogorov-Smirnov test for differences in distributions
# There are not enough English data points to run this test.

ks.test(flexibility[language = "English"], flexibility[language = "Nuuchahnulth"])
# (test fails)
