import builder from "./builder.js";

const showTreemapDiagram = (kickstartersUrl = "", movieSalesUrl = "", videogamesUrl = "") => {
    Promise.all([
        fetch(kickstartersUrl),
        fetch(movieSalesUrl),
        fetch(videogamesUrl)
    ]).then(responses => Promise.all(responses.map(response => response.json())))
      .then(data => {
          builder.addTitle("header h1", "video game sales");
          builder.addDescription("header", "top 100 most sold video games grouped by platform");
          const svg = builder.diagramContainer("main");
          const margin = {top: 0, right: 0, bottom: 0, left: 0};
          const WIDTH = 0;
          const HEIGHT = 0;
      });
}

document.addEventListener('DOMContentLoaded', () => {
    let kickstartersUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json";
    let movieSalesUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";
    let videogamesUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";
    showTreemapDiagram(kickstartersUrl, movieSalesUrl, videogamesUrl);
});