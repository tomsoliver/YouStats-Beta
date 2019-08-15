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
    private legendService: LegendService
  ) {}

  drawGraph(dataSets: DataSet[]) {
    const lengths: Bounds = new Bounds();
    lengths.marginTop = 30;
    lengths.marginRight = 15;
    lengths.marginBottom = 45;
    lengths.marginLeft = 65;
    lengths.yLabelWidth = 0;
    lengths.xLabelHeight = 0;

    // draw component
    this.drawGraphComponent(dataSets, lengths);
    // this.governmentFilterService.addGovernmentFilter('chart', dataSets[0], lengths);
  }

  private drawGraphComponent(dataSets: DataSet[], bounds: Bounds) {
    const graphElement = document.getElementById('chart');
    bounds.width = graphElement.offsetWidth;
    bounds.height = graphElement.offsetHeight;

    const svg = d3
      .select('#svg-chart')
      .attr('width', bounds.width)
      .attr('height', bounds.height);

    // Get the nearest number value to the nearest 10, accounting for factors.
    // i.e. 260 goes to 200 for min, and 3500 goes to 4000 for max
    const yValues = [].concat.apply([], dataSets.map(s => s.data.map(t => t.y)));
    const yMin = this.roundMinValue(yValues, 1);
    const yMax = this.roundMaxValue(yValues, 1);

    const yScale = d3
      .scaleLinear()
      .range([bounds.height - bounds.bottomMarginWithLabel, bounds.marginTop])
      .domain([yMin, yMax]);

    // draw legend if required
    if (dataSets.length > 1) {
      this.legendService.drawLegend(svg, bounds, dataSets, yScale);
    }

    // Create the xScale after the legend is calculated
    // Get min x value
    const xValues = dataSets.concat.apply([], dataSets.map(s => s.data.map(t => t.x))) as Date[];
    const xScale = d3
      .scaleTime()
      .range([bounds.leftMarginWithLabel, bounds.width - bounds.marginRight - bounds.legendWidth])
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
}
