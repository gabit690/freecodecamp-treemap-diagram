const createTreemap = (dataset = 0, width = 0, height = 0) => {
  let root = d3.hierarchy(dataset)
            .eachBefore((d) => d.data.id = (d.parent ? d.parent.data.id + '.' : '') + d.data.name)
            .sum(d => d.value)
            .sort((a, b) => b.height - a.height || b.value - a.value);
  d3.treemap()
      .size([width, height])
      .paddingInner(0.8)
      (root);
  return root;
}

const CATEGORY_OF_MOVIES = [
  "Action", 
  "Drama", 
  "Adventure", 
  "Family", 
  "Animation",
  "Comedy", 
  "Biography"
]

const getColor = (category = "") => {
  let ordinalScale = d3.scaleOrdinal()
  .domain(CATEGORY_OF_MOVIES)
  .range(["#1779ba", "#d2691e", "#3adb76", "#ffae00", "#cc4b37", "#e3ff00", "#9370db"]);
  return ordinalScale(category);
}

export default {
  addTitle: (parentElement = "body", title = "my title") => {
    d3.select(parentElement)
      .attr("id", "title")
      .text(title);
  },
  addDescription: (parentElement = "body", description = "my description") => {
    d3.select(parentElement)
      .append("h2")
      .attr("id", "description")
      .text(description);
  },
  tilesContainer: (parentElement = "body") =>  d3.select(parentElement).append("svg").attr("id", "tiles-container"),
  getWidth: (element = {}) => Number(element.style("width").slice(0,-2)),
  getHeight: (element = {}) => Number(element.style("height").slice(0,-2)),
  addDataTiles: (container = {}, dataset = {}, width = 0, height = 0) => {
    let root = createTreemap(dataset, width, height);
    let cells = container.selectAll('g')
                          .data(root.leaves())
                          .enter()
                          .append('g')
                          .attr('class', 'group')
                          .attr('transform', d => 'translate(' + d.x0 + ',' + d.y0 + ')');
    cells.append('rect')
          .attr('id', d => d.data.id)
          .attr('class', 'tile')
          .attr('width', d => d.x1 - d.x0)
          .attr('height', d => d.y1 - d.y0)
          .attr('data-name', d => d.data.name)
          .attr('data-category', d => d.data.category)
          .attr('data-value', d => d.data.value)
          .attr('fill', d => getColor(d.data.category));
    cells.append('text')
          .attr('class', 'tile-text')
          .selectAll('tspan')
          .data((d) => d.data.name.split(" "))
          .enter()
          .append('tspan')
          .attr('x', 5)
          .attr('y', (d, i) => 13 + i * 15)
          .attr("font-size", "14px")
          .text(d => d);
  },
  addMovieCategoryLegend: (element = "body", coordinateX = 0, coordinateY = 0) => {
    let legendContainer = d3.select(element)
                              .append("svg")
                              .attr("id", "legend")
                              .attr("transform", `translate(${coordinateX}, ${coordinateY})`);
                              
    legendContainer.selectAll("rect")
                    .data(CATEGORY_OF_MOVIES)
                    .enter()
                    .append("rect")
                    .attr("class", "legend-item")
                    .attr("x", (d, i) => i * 200)
                    .attr("y", 10)
                    .attr("width", 30)
                    .attr("height", 30)
                    .attr("stroke", "black")
                    .attr("fill", d => getColor(d));

    legendContainer.selectAll("text")
                    .data(CATEGORY_OF_MOVIES)
                    .enter()
                    .append("text")
                    .attr("transform", (d, i) => `translate(${(i * 200) + 35}, ${30})`)
                    .text(d => d);
  }
}