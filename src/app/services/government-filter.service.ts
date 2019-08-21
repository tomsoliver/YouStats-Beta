import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { DataSet } from '../models/dataElement';
import { TestGovernements } from '../models/TestData';
import { GovernmentTerm } from '../models/governmentTerm';
import { Bounds } from './bounds';

@Injectable({
  providedIn: 'root'
})
export class GovernmentFilterService {
  public static ElementClass: string = 'govenment-overlay';

  constructor() {}

  public addGovernmentFilter(graphId: string, dataSet: DataSet, bounds: Bounds) {
    // Draw filters
    this.drawFilters(graphId, dataSet, bounds);

    // Set up resize
    // window.addEventListener('resize', this.onResizeFunction(graphId, dataSet, lengths));
  }

  public onResizeFunction(graphId: string, dataSet: DataSet, bounds: Bounds): () => void {
    // Add on load function
    let overlayResizeTimer;
    const drawFiltersFunc = this.drawFilters;

    return () => {
      clearTimeout(overlayResizeTimer);
      overlayResizeTimer = setTimeout(() => {
        let s = d3.selectAll('.' + graphId + '-overlays');
        s = s.remove();
        drawFiltersFunc(graphId, dataSet, bounds);
      }, 20);
    };
  }

  private drawFilters(graphId: string, dataSet: DataSet, bounds: Bounds) {
    const graphElement = document.getElementById(graphId);
    const width = graphElement.offsetWidth;
    const height = graphElement.offsetHeight;

    const svg = d3
    .select('#svg-chart').append('g').attr('class', 'governments');

    // Get valid government terms
    let governments = TestGovernements;

    // Get earliest valid govenment
    const earliestValidGovernemntIndex = governments.findIndex(s => {
      // Get earliest date in the dataset
      const earliestDate = dataSet.data.reduce((previous, current) =>
        previous.x < current.x ? previous : current
      );
      // Find govenment with a start date before and end date after this date
      return s.startDate <= earliestDate.x && s.endDate >= earliestDate.x;
    });

    // Get latest valid govenment
    const latestValidGovernemntIndex = governments.findIndex(s => {
      // Get latest date in the dataset
      const latestDate = dataSet.data.reduce((previous, current) =>
        previous.x > current.x ? previous : current
      );
      // Find govenment with a start date before and end date after this date
      return s.startDate <= latestDate.x && s.endDate >= latestDate.x;
    });

    governments = governments.slice(earliestValidGovernemntIndex, latestValidGovernemntIndex + 1);

    // Get scale
    const xScale = d3
      .scaleTime()
      .range([bounds.left, width - bounds.right])
      .domain([d3.min(governments.map(d => d.startDate)), d3.max(governments.map(d => d.endDate))]);

    const rects = svg
      .selectAll('rect .' + graphId + '-overlays')
      .data(governments)
      .enter()
      .append('rect')
      .attr('class', graphId + '-overlays')
      .attr('x', d => xScale(d.startDate))
      .attr('y', bounds.top)
      .attr('width', d => xScale(d.endDate) - xScale(d.startDate))
      .attr('height', d => height - bounds.bottom - bounds.top)
      .attr('fill', d => d.color)
      .style('stroke', d => d.color)
      .style('stroke-width', '1')
      .style('opacity', '0.2');
  }
}
