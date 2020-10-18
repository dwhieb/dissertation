source("stats/scripts/plot_triangle.R")
source("stats/scripts/load_data.R")
source("stats/figures/aspect/plot_aspect.R")

library(ggtern)
library(scales)

data <- load_data("stats/data/Nuuchahnulth.tsv")

data$dispersion_ref  <- 1 - data$dispersion_ref
data$dispersion_pred <- 1 - data$dispersion_pred
data$dispersion_mod  <- 1 - data$dispersion_mod

hex_codes <- hue_pal()(9)

plot_CONT  <- plot_aspect(data[which(data$aspect == "CONT"), ], hex_codes[1])
plot_DUR   <- plot_aspect(data[which(data$aspect == "DUR"), ], hex_codes[2])
plot_GRAD  <- plot_aspect(data[which(data$aspect == "GRAD"), ], hex_codes[3])
plot_INCEP <- plot_aspect(data[which(data$aspect == "INCEP"), ], hex_codes[4])
plot_IT    <- plot_aspect(data[which(data$aspect == "IT"), ], hex_codes[5])
plot_MOM   <- plot_aspect(data[which(data$aspect == "MOM"), ], hex_codes[6])
plot_REP   <- plot_aspect(data[which(data$aspect == "REP"), ], hex_codes[7])
plot_TEL   <- plot_aspect(data[which(data$aspect == "TEL"), ], hex_codes[8])
plot_NA    <- plot_aspect(data[which(is.na(data$aspect)), ], hex_codes[9])

ggsave("stats/figures/aspect/CONT.png", plot_CONT)
ggsave("stats/figures/aspect/DUR.png", plot_DUR)
ggsave("stats/figures/aspect/GRAD.png", plot_GRAD)
ggsave("stats/figures/aspect/INCEP.png", plot_INCEP)
ggsave("stats/figures/aspect/IT.png", plot_IT)
ggsave("stats/figures/aspect/MOM.png", plot_MOM)
ggsave("stats/figures/aspect/REP.png", plot_REP)
ggsave("stats/figures/aspect/TEL.png", plot_TEL)
ggsave("stats/figures/aspect/NA.png", plot_NA)
