import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { Bounds } from './bounds';
import { DataSet } from '../models/dataElement';
import { Styles } from 'src/stylings/styles';
import { Vector } from './vector';
const pixelWidth = require('string-pixel-width');

@Injectable({
  providedIn: 'root'
})
export class LegendService {
  circlePadding: number = 8;
  circleRadius: number = 4;
  fontSize: number = 12;

  // Draws the legend, will automatically push down if overlap is detected
  // Returns the bounds of the legend
  drawLegend(
    svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
    bounds: Bounds,
    dataSets: DataSet[],
    yScale: d3.ScaleLinear<number, number> | d3.AxisScale<d3.AxisDomain>
  ): Vector {
    // Set up the legend
    const legend = svg.append('g').attr('class', 'legend');

    // Get data in order of the last node
    const orderedData = dataSets.sort(
      (a, b) => b.data[b.data.length - 1].y - a.data[a.data.length - 1].y
    );

    // Use a for loop instead of d3 data enter api, as it allows us to access work with the previous entry more easily
    let previousEntryBottomBound = 0;
    for (let i = 0; i < orderedData.length; i++) {
      const legendEntry = legend.append('g').attr('class', 'legend-entry');

      const legendExpectedTopBound = yScale(orderedData[i].data[orderedData[i].data.length - 1].y);
      let legendTopBound = legendExpectedTopBound;
      if (legendTopBound < previousEntryBottomBound + 5) {
        legendTopBound += 5;
      }

      const legendIndicator = legendEntry.append('g').attr('class', 'legend-indicator');

      legendIndicator
        .append('line')
        .attr('x1', bounds.right)
        .attr('x2', bounds.right + 10)
        .attr('y1', legendExpectedTopBound)
        .attr('y2', legendExpectedTopBound)
        .attr('stroke', Styles.GraphColors[i])
        .attr('stroke-width', 0.5);

      if (legendTopBound !== legendExpectedTopBound) {
        legendIndicator
          .append('line')
          .attr('x1', bounds.right + 10)
          .attr('x2', bounds.right + 10)
          .attr('y1', legendExpectedTopBound)
          .attr('y2', legendTopBound)
          .attr('stroke', Styles.GraphColors[i])
          .attr('stroke-width', 0.5);
      }

      legendIndicator
        .append('line')
        .attr('x1', bounds.right + 10)
        .attr('x2', bounds.right + 20)
        .attr('y1', legendTopBound)
        .attr('y2', legendTopBound)
        .attr('stroke', Styles.GraphColors[i])
        .attr('stroke-width', 0.5);

      const legendEntryText = legendEntry
        .append('text')
        .attr('y', legendTopBound + 4)
        .attr('x', bounds.right + 25)
        .attr('font-size', this.fontSize)
        .attr('fill', Styles.GraphColors[i]);

      legendEntryText
        .append('tspan')
        .text(orderedData[i].name)
        .attr('y', legendTopBound + 4)
        .attr('x', bounds.right + 25);

      // set the previous entry bottom bound as bound for next top
      previousEntryBottomBound = legendTopBound + 12;
    }

    // Get legend bounds
    const boundingBox = legend.node().getBBox();
    const padVector = new Vector(boundingBox.width, 0);
    legend.attr('transform', 'translate(-' + (padVector.x + 5) + ')');
    return padVector;
  }

  // Returns a vector containing how far the graph needs to pad the right and bottom bounds
  drawBottomLegend(
    svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
    bounds: Bounds,
    dataSets: DataSet[]
  ): Vector {
    // Set up the legend and bounds
    const padding = 20;
    bounds = bounds.padBottom(padding);
    const legend = svg.append('g').attr('class', 'legend');

    // Get data in order of the last node
    const orderedData = dataSets.sort(
      (a, b) => b.data[b.data.length - 1].y - a.data[a.data.length - 1].y
    );

    const legendEntries = legend
      .selectAll()
      .data(orderedData)
      .enter()
      .append('g')
      .attr('class', 'legend-entry');

    // calculate x position left to right
    let xPosition = bounds.right;
    let yPosition = bounds.bottom + 40;
    // Todo, add rows for legend, so the service can translate the data up

    legendEntries.each((dataSet, i, nodes) => {
      const width = pixelWidth(dataSet.name, { font: 'Arial', size: this.fontSize });

      xPosition -= width;
      d3.select(nodes[i])
        .append('text')
        .text(dataSet.name)
        .attr('x', xPosition)
        .attr('y', yPosition + this.fontSize * 0.35)
        .attr('font-size', this.fontSize)
        .attr('fill', Styles.GraphColors[i]);

      xPosition -= this.circlePadding;
      d3.select(nodes[i])
        .append('circle')
        .attr('fill', Styles.GraphColors[i])
        .attr('class', 'legend-circle')
        .attr('r', this.circleRadius)
        .attr('cx', xPosition)
        .attr('cy', yPosition);

      // calculate the position of the next entry
      xPosition -= this.circlePadding * 2;
    });

    // Get legend bounds
    const boundingBox = legend.node().getBBox();
    const padVector = new Vector(0, boundingBox.height);
    return padVector;
  }
}
