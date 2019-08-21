import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { DataSet, DataElement } from '../models/dataElement';
import { GovernmentFilterService } from './government-filter.service';
import { Styles } from 'src/stylings/styles';
import { Bounds } from './bounds';
import { AxisService } from './axis.service';
import { TooltipService } from './tooltip.service';
import { LegendService } from './legend.service';

@Injectable({
  providedIn: 'root'
})
export class LineChartService {

  constructor(
    private governmentFilterService: GovernmentFilterService,
    private axisService: AxisService,
    private tooltipService: TooltipService,
    private legendService: LegendService,
  ) {}

  drawGraph(dataSets: DataSet[]) {
    this.drawGraphComponent(dataSets);
    // this.governmentFilterService.addGovernmentFilter('chart', dataSets[0], this.bounds);
  }

  onResize(dataSets: DataSet[]) {
    const svg = d3.selectAll('#svg-chart > *').remove();
    this.drawGraphComponent(dataSets);
  }

  private drawGraphComponent(dataSets: DataSet[]) {
    const graphElement = document.getElementById('chart');
    const boundingRect = graphElement.getBoundingClientRect();
    const svgBounds = new Bounds(0, 0, boundingRect.width, boundingRect.height);

    let bounds = svgBounds.padTop(25);
    bounds = bounds.padBottom(35);
    bounds = bounds.padLeft(65);
    bounds = bounds.padRight(10);

    const svg = d3
      .select('#svg-chart')
      .attr('width', boundingRect.width)
      .attr('height', boundingRect.height);

    // Get the nearest number value to the nearest 10, accounting for factors.
    // i.e. 260 goes to 200 for min, and 3500 goes to 4000 for max
    const yValues = [].concat.apply([], dataSets.map(s => s.data.map(t => t.y)));
    const yMin = this.roundMinValue(yValues, 1);
    const yMax = this.roundMaxValue(yValues, 1);

    const yScale = d3
      .scaleLinear()
      .range(bounds.yRange())
      .domain([yMin, yMax]);

    // draw legend if required
    if (dataSets.length > 1) {
      const legendBounds = this.legendService.drawLegend(svg, svgBounds, dataSets, yScale);
      console.log(legendBounds)
      bounds = bounds.padRight(legendBounds.width);
    }

    // Create the xScale after the legend is calculated
    // Get min x value
    const xValues = dataSets.concat.apply([], dataSets.map(s => s.data.map(t => t.x))) as Date[];
    const xScale = d3
      .scaleTime()
      .range(bounds.xRange())
      .domain([d3.min(xValues), d3.max(xValues)]);

    const xAxis = svg.append('g').attr('class', 'x axis');
    const yAxis = svg.append('g').attr('class', 'y axis');

    this.axisService.drawXAxis(bounds, xAxis, xScale);
    this.axisService.drawYAxis(bounds, yAxis, yScale, this.axisService.moneyFormat);

    // define the line
    const lineFunc = d3
      .line<DataElement>()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y))
      .curve(d3.curveLinear);

    // Create the line draw space
    const chart = svg.append('g').attr('class', 'chart');

    // Draw the nodes
    for (let i = 0; i < dataSets.length; i++) {
      const dataSet = dataSets[i];

      const nodes = chart.append('g').attr('class', 'nodes');
      nodes
        .selectAll('circle')
        .data(dataSet.data)
        .enter()
        .append('svg:circle')
        .attr('cx', d => Math.round(xScale(d.x)))
        .attr('cy', d => Math.round(yScale(d.y)))
        .attr('r', '2px')
        .attr('fill', Styles.GraphColors[i]);

      chart
        .append('path')
        .attr('d', lineFunc(dataSet.data))
        .attr('stroke', Styles.GraphColors[i])
        .attr('stroke-width', 1.5)
        .attr('fill', 'none');
    }

    this.tooltipService.generateTooltip(svg, xScale, bounds, dataSets);
  }

  // Round the data to the nearest 10^n, where n is the number of digits
  roundMinValue(data: number[] | Date[], roundDigits: number): number | Date {
    let yMin: number;
    if (data[0] instanceof Date) {
      yMin = new Date(Math.min.apply(null, data)).getUTCFullYear();
      console.log(yMin);
    } else {
      yMin = Math.min.apply(null, data);
    }

    const yMinNumberLength = Math.pow(10, yMin.toString().length - roundDigits);

    if (data[0] instanceof Date) {
      return new Date(Math.ceil(yMin / yMinNumberLength) * yMinNumberLength, 0, 1);
    } else {
      return Math.floor(yMin / yMinNumberLength) * yMinNumberLength;
    }
  }

  // Round the data to the nearest 10^n, where n is the number of digits
  roundMaxValue(data: number[] | Date[], roundDigits: number): number | Date {
    let yMax: number;
    if (data[0] instanceof Date) {
      yMax = new Date(Math.max.apply(null, data)).getUTCFullYear();
    } else {
      yMax = Math.max.apply(null, data);
    }

    const yMaxNumberLength = Math.pow(10, yMax.toString().length - roundDigits);

    if (data[0] instanceof Date) {
      return new Date(Math.ceil(yMax / yMaxNumberLength) * yMaxNumberLength, 0, 1);
    } else {
      return Math.ceil(yMax / yMaxNumberLength) * yMaxNumberLength;
    }
  }

  // Applies default margins to the rectangle
  getDefaultBounds(targetElement: HTMLElement): Bounds {

    return bounds;
  }
}
