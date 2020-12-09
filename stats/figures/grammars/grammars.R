data <- read.csv(
  "data/grammars.csv",
  colClasses = c("character", "integer", "character"),
  header     = TRUE
)

data <- data[which(data$year > 1300), ]

Europe   <- data[which(data$continent == "Europe"), ]
Americas <- data[which(data$continent == "Americas"), ]

png(
  filename = "stats/figures/grammars/grammars.png",
  height   = 750,
  width    = 1500
)

# create an empty plot

plot(
  NA,
  axes     = FALSE,
  cex.lab  = 2,
  font.lab = 2,
  xlab     = "",
  xlim     = c(1300, 1650),
  ylab     = "year",
  ylim     = c(-0.5, 0.5)
)

text(
  1475,
  0.5,
  cex    = 2,
  font   = 2,
  labels = c("European languages")
)

text(
  1475,
  -0.5,
  cex    = 2,
  font   = 2,
  labels = c("American languages")
)

# create axis with year labels

abline(
  h   = 0,
  lwd = 2
)

axis_labels <- seq.int(1300, 1650, 50)

text(
  axis_labels,
  0,
  cex    = 2,
  font   = 2,
  labels = axis_labels,
  pos    = 1
)

# add data points

Europe_pos   <- c(0.25, 0.25, 0.25, 0.25, 0.25, 0.375, 0.5, 0.25)
Americas_pos <- c(0.25, 0.375, 0.5)

segments(
  Europe$year,
  0,
  Europe$year,
  Europe_pos
)

segments(
  Americas$year,
  0,
  Americas$year,
  -Americas_pos
)

text(
  Europe$year,
  Europe_pos,
  cex    = 1.5,
  labels = Europe$language,
  pos    = 3
)

text(
  Americas$year,
  -Americas_pos,
  cex    = 1.5,
  labels = Americas$language,
  pos    = 1
)

dev.off()