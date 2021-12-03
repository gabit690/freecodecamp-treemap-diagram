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
    diagramContainer: (parentElement = "body") =>  d3.select(parentElement).append("svg"),
    getWidth: (element = {}) => Number(element.style("width").slice(0,-2)),
    getHeight: (element = {}) => Number(element.style("height").slice(0,-2)),
}