import builder from "./builder.js";

const showTreemapDiagram = (movieSalesUrl = "") => {
    fetch(movieSalesUrl).then(response => response.json())
                        .then(data => {
                            builder.addTitle("header h1", "movie sales");
                            builder.addDescription("header", "top 100 highest grossing movies grouped by genre");
                            const tilesSvg = builder.tilesContainer("main");
                            const WIDTH = builder.getWidth(tilesSvg);
                            const HEIGHT = 600;
                            builder.addDataTiles(tilesSvg, data, WIDTH, HEIGHT);
                            builder.addMovieCategoryLegend("main", 0, 0);
                        });
}

document.addEventListener('DOMContentLoaded', () => {
    let movieSalesUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";
    showTreemapDiagram(movieSalesUrl);
});