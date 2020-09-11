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

# Q: Do English and Nuuchahnulth differ significantly in terms of their mean flexibility?
# H0: No
# H1: Yes

# Q: Do English and Nuuchahnulth differ significantly in the distribution of their flexibility?
# H0: No
# H1: Yes