library(ggtern)

plotA <- ggtern(data.frame(x = 1, y = 1, z = 1), aes(x, y, z)) + geom_point()
plotB <- ggtern(data.frame(a = 1, b = 1, c = 1), aes(a, b, c)) + geom_point()

plots <- ggtern::grid.arrange(plotA, plotB, ncol = 2)
ggsave("stats/figures/temp/temp.png", plots)