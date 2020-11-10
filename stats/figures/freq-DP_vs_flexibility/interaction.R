# interaction_model <- bam(flexibility ~ te(log_rel_freq, dispersion), data = data, method = "REML")


#vis.gam(
#  x         = partials_model,
#  view      = c("log_rel_freq", "dispersion"),
#  plot.type = "contour",
#  too.far   = 0.1,
#  se        = 2
#)
