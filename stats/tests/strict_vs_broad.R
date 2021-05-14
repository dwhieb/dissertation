source("stats/scripts/load_data.R")

# diversity rating: strict vs. broad
# compare: means, distributions

# Q: Do the means of the strict vs. broad samples of English differ?
# H0: The means do not differ.
# H1: The means differ.
# Test: t-test

# Preliminaries

data <- load_data("stats/data/English.tsv")

mean(data$diversity)       # 0.2230745
mean(data$diversity_broad) # 0.3335356

sd(data$diversity)       # 0.2306626
sd(data$diversity_broad) # 0.2727678

boxplot(
  data$diversity,
  data$diversity_broad,
  main  = "English diversity: strict vs. broad",
  notch = TRUE,
  ylab  = "diversity"
)
grid()
rug(data$diversity, side = 2)
rug(data$diversity_broad, side = 4)

# The diversity ratings appear to differ significantly in both their means and distributions.

# Preliminary: The data are normally distributed.

shapiro.test(data$diversity)       # W = 0.86085, p < 0.001 (***)
shapiro.test(data$diversity_broad) # W = 0.92096, p < 0.001 (***)

# Result:
# The data are not normally distributed for either the strict or broad samples.
# Cannot use a t-test

# Q: Do the *median* diversity ratings differ for the strict vs. broad samples?
# H0: They do not differ.
# H1: They differ significantly.
# Test: U-test

# Preliminary: Are the variances of both the strict and broad samples homogenous?

fligner.test(data$diversity, data$diversity_broad)
# χ^2 = 90.637, df = 81, p = 0.2174

# The variances are homogenous (surprisingly!).

IQR(data$diversity)       # 0.2989356
IQR(data$diversity_broad) # 0.4922745

ks.test(data$diversity, data$diversity_broad)
# D = 0.24752, p-value = 0.004107

# The distributions are very significantly different.
# The assumptions of the U-test are violated. Running it anyway:

# Use wilcox.test to run the U-test
wilcox.test(
  data$diversity,
  data$diversity_broad,
  paired = FALSE
)

# Result:
# W = 4083.5, p = 0.01429 (*)
# The median diversity rating of the strict vs. broad samples are significantly different.
