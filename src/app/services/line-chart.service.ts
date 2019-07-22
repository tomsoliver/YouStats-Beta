import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { DataSet, DataElement } from '../models/dataElement';
import { GovernmentFilterService } from './government-filter.service';
import { Styles } from 'src/stylings/styles';
import { Lengths, Chart } from './models';
import { AxisService } from './axis.service';
import { TooltipService } from './tooltip.service';

@Injectable({
  providedIn: 'root'
})
export class LineChartService {
  constructor(
    private governmentFilterService: GovernmentFilterService,
    private axisService: AxisService,
    private tooltipService: TooltipService
  ) {}

  drawGraph(dataSets: DataSet[]) {
    const lengths: Chart = new Chart();
    lengths.marginTop = 30;
    lengths.marginRight = 25;
    lengths.marginBottom = 45;
    lengths.marginLeft = 70;
    lengths.yLabelWidth = 0;
    lengths.xLabelHeight = 0;

    // draw component
    this.drawGraphComponent(dataSets, lengths);
    // this.governmentFilterService.addGovernmentFilter(graphId, dataSet, lengths);
  }

  private drawGraphComponent(dataSets: DataSet[], lengths: Lengths) {
    const graphElement = document.getElementById('chart');
    lengths.width = graphElement.offsetWidth;
    lengths.height = graphElement.offsetHeight;

    const svg = d3
      .select('#svg-chart')
      .attr('width', lengths.width)
      .attr('height', lengths.height);

    // Create the xScale
    // Get min x value
    const xValues = dataSets.concat.apply([], dataSets.map(s => s.data.map(t => t.x))) as Date[];
    const xScale = d3
      .scaleTime()
      .range([lengths.leftMarginWithLabel, lengths.width - lengths.marginRight])
      .domain([d3.min(xValues), d3.max(xValues)]);

    // Get the nearest number value to the nearest 10, accounting for factors.
    // i.e. 260 goes to 200 for min, and 3500 goes to 4000 for max
    const yValues = [].concat.apply([], dataSets.map(s => s.data.map(t => t.y)));
    const yMin = this.roundMinValue(yValues, 1);
    const yMax = this.roundMaxValue(yValues, 1);

    const yScale = d3
      .scaleLinear()
      .range([lengths.height - lengths.bottomMarginWithLabel, lengths.marginTop])
      .domain([yMin, yMax]);

    const xAxis = svg.append('g').attr('class', 'x axis');
    const yAxis = svg.append('g').attr('class', 'y axis');

    this.axisService.drawXAxis(lengths, xAxis, xScale);
    this.axisService.drawYAxis(lengths, yAxis, yScale, this.axisService.moneyFormat);

    // define the line
    const lineFunc = d3
      .line<DataElement>()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y))
      .curve(d3.curveLinear);

    // Create the line draw space
    const chart = svg
      .append('g')
      .attr('class', 'chart')
      .attr('fill', 'black');

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

    this.tooltipService.generateTooltip(svg, xScale, lengths, dataSets);
  }

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
