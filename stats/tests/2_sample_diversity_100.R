# RQ: Do English and Nuuchahnulth differ in their functional diversity?
# This test compares the 100-lexeme samples.

source("stats/scripts/load_100.R")
source("stats/scripts/load_small.R")

data <- load_100()
attach(data)

# Visualize the data

boxplot(
  diversity~language,
  notch = TRUE,
  ylab  = "functional diversity",
  ylim  = c(0, 1)
)
rug(jitter(diversity[language == "English"]), side = 2)
rug(jitter(diversity[language == "Nuuchahnulth"]), side = 4)
text(1:2, tapply(diversity, language, mean), "x")

# Visualizing the data suggest that the data are not normally distributed,
# and that both the mean and median differ significantly.

# Prelim: Are English and Nuuchahnulth functional diversity ratings normally distributed?
# H0: The data are normally distributed
# H1: The data are not normally distributed
# Test: Shapiro-Wilk test for normality

tapply(diversity, language, mean)
tapply(diversity, language, sd)
tapply(diversity, language, shapiro.test)

# English:      W = 0.86085; p < .0001.
# Nuuchahnulth: W = 0.35818; p < .0001.

# Result:
# H1 is true: The data are not normally distributed for either language.
# W is extremely low for both languages (well below the typical .99 threshhold),
# and p < .001. (Explanation of W values: https://emilkirkegaard.dk/en/?p=4452)

# Prelim: Variances of functional diversity ratings are homogenous
# H0: The variances are homogenous
# H1: The variances are not homogenous
# Test: Fligner-Killeen test.
# Cannot use an F-test for homogeneity of variances because the data are not normally distributed.
# The Fligner-Killeen test is most robust against departures from normality.

fligner.test(diversity~language) # χ2 = 299, p < .0001

# Result:
# H1 is true: The variances are not homogenous.

# Q: Do English and Nuuchahnulth differ significantly in the distribution of their functional diversity?
# H0: No
# H1: Yes
# Test: Kolmogorov-Smirnov test for differences in distributions
# There are not enough English data points to run this test.

ks.test(diversity[language = "English"], diversity[language = "Nuuchahnulth"])
# (test fails)

# Q: Do English and Nuuchahnulth differ significantly in terms of their median functional diversity?
# Cannot test differences in *mean* functional diversity because the data are not normally distributed,
# and the variances are not homogenous.
# H0: No
# H1: Yes
# Test: U-test. (Mann-Whitney U test / Wilcoxon rank-sum test; nonparametric) Cannot use t-test here because the data are not normally distributed.

tapply(diversity, language, median)
tapply(diversity, language, IQR)

# An assumption of the U-test is that "the populations from which the samples whose
# central tendencies are tested have been drawn are identically distributed. This
# assumption is not clearly met (because the Kolmogorov-Smirnov test failes).
# However, Bortz, Lienart, & Boehnke (1990: 211) state that the U-test can discover
# differences in measures of central tendency even if this assumption is violated
# (Gries 2013: 230).

# The U-test is run with wilcox.test()
wilcox.test(
  diversity~language,
  correct = FALSE,
  paired  = FALSE
) # W = 168458; p < .0001

# Result:
# H1 is true: English and Nuuchahnulth differ highly significantly in terms of their median functional diversity.
