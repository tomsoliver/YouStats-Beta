import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { Bounds } from './bounds';
import { DataSet } from '../models/dataElement';
import { Styles } from 'src/stylings/styles';

@Injectable({
  providedIn: 'root'
})
export class LegendService {
  // Draws the legend, will automatically push down if overlap is detected
  drawLegend(
    svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
    bounds: Bounds,
    dataSets: DataSet[],
    yScale: d3.ScaleLinear<number, number>
  ) {
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

      const legendIndicator = legendEntry.append('g').attr('class', 'legendIndicator');

      legendIndicator
        .append('line')
        .attr('x1', bounds.width)
        .attr('x2', bounds.width + 10)
        .attr('y1', legendExpectedTopBound)
        .attr('y2', legendExpectedTopBound)
        .attr('stroke', Styles.GraphColors[i])
        .attr('stroke-width', 0.5);

      if (legendTopBound !== legendExpectedTopBound) {
        legendIndicator
        .append('line')
        .attr('x1', bounds.width + 10)
        .attr('x2', bounds.width + 10)
        .attr('y1', legendExpectedTopBound)
        .attr('y2', legendTopBound)
        .attr('stroke', Styles.GraphColors[i])
        .attr('stroke-width', 0.5);
      }

      legendIndicator
        .append('line')
        .attr('x1', bounds.width + 10)
        .attr('x2', bounds.width + 20)
        .attr('y1', legendTopBound)
        .attr('y2', legendTopBound)
        .attr('stroke', Styles.GraphColors[i])
        .attr('stroke-width', 0.5);

      legendEntry
        .append('text')
        .text(orderedData[i].name)
        .attr('y', legendTopBound + 4)
        .attr('x', bounds.width + 30)
        .attr('font-size', 12)
        .attr('fill', Styles.GraphColors[i]);

      // set the previous entry bottom bound as bound for next top
      previousEntryBottomBound = legendTopBound + 12;
    }

    // Set legend width
    bounds.legendWidth = legend.node().getBBox().width;
    legend.attr('transform', 'translate(-' + (bounds.legendWidth + bounds.marginRight / 2) + ')');
  }
}
