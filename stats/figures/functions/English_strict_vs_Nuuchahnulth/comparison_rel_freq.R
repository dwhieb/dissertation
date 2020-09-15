library(ggtern)

source("stats/scripts/load_100.R")

data <- load_100()

data$ref_rel  = data$ref_rel
data$pred_rel = data$pred_rel
data$mod_rel  = data$mod_rel

plot <- ggtern(data, aes(
  ref_rel,
  pred_rel,
  mod_rel,
  color = language
)) +
  theme_minimal() +
  theme_hidelabels() +
  theme(
    tern.axis.title.L = element_text(hjust = -0.25),
    tern.axis.title.R = element_text(hjust = 1.25)
  ) +
  Tlab("Predication") +
  Llab("Reference") +
  Rlab("Modification") +
  tern_limits(T = 1.05, L = 1.05, R = 1.05) +
  geom_polygon(
    data = data.frame(
      ref_rel  = c(1, 0, 0),
      pred_rel = c(0, 1, 0),
      mod_rel  = c(0, 0, 1)
    ),
    alpha = 0,
    color = "#BBBBBB",
    size  = 0.5
  ) +
  geom_point(show.legend = FALSE) +
  facet_grid(cols = vars(language))

ggsave(
  "stats/figures/functions/English_strict_vs_Nuuchahnulth/comparison_rel_freq.png",
  plot
)
