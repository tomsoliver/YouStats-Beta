import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { DataSet, DataElement } from '../models/dataElement';
import { GovernmentFilterService } from './government-filter.service';
import { Styles } from 'src/stylings/styles';

@Injectable({
  providedIn: 'root'
})
export class LineChartService {
  constructor(governmentFilterService: GovernmentFilterService) {}

  drawGraph(graphId: string, dataSet: DataSet) {
    // draw component
    this.drawGraphComponent(graphId, dataSet);

    // Set up resize watcher
    window.addEventListener('resize', this.onResizeFunction(graphId, dataSet));
  }

  private drawGraphComponent(graphId: string, dataSet: DataSet) {
    const margin = {
      top: 30,
      right: 25,
      bottom: 20,
      left: 15,
      yAxisNameWidth: 50,
      xAxisNameHeight: 40
    };
    const graphElement = document.getElementById(graphId);
    const width = graphElement.offsetWidth;
    const height = graphElement.offsetHeight;

    const svg = d3
      .select('#' + graphId)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('id', graphId + '-svg')
      .attr('class', 'line-graph');

    // Create the xScale
    const xValues = dataSet.data.map(d => d.x);
    const xScale = d3
      .scaleTime()
      .range([margin.left + margin.yAxisNameWidth, width - margin.right])
      .domain([d3.min(xValues), d3.max(xValues)]);

    // Create the yScale
    const yValues = dataSet.data.map(d => d.y);
    const yScale = d3
      .scaleLinear()
      .range([height - margin.bottom - margin.xAxisNameHeight, margin.top])
      .domain([d3.min(yValues), d3.max(yValues)]);

    // Draw the axes
    const yAxisGroup = svg
      .append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(${margin.left + margin.yAxisNameWidth}, 0)`)
      .call(d3.axisLeft(yScale));

    const yAxisText = yAxisGroup.selectAll('text')
      .attr('fill', Styles.AxisColor)
      .attr('font-size', Styles.AxisFontSize);
    console.log(yAxisText);

    const xAxisGroup = svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0, ${height - margin.bottom - margin.xAxisNameHeight})`)
      .call(d3.axisBottom(xScale));

    // text label for the x axis
    svg
      .append('text')
      .attr('transform', 'translate(' + width / 2 + ' ,' + (height - margin.bottom) + ')')
      .style('text-anchor', 'middle')
      .text(dataSet.xAxisName);

    // text label for the y axis
    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', margin.left)
      .attr('x', 0 - height / 2)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text(dataSet.yAxisName);

    // define the line
    const lineFunc = d3
      .line<DataElement>()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y))
      .curve(d3.curveCardinal);

    // Draw the nodes
    const nodes = svg
      .selectAll('circle .' + graphId + '-nodes')
      .data(dataSet.data)
      .enter()
      .append('svg:circle')
      .attr('class', graphId + '-nodes')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', '1px')
      .attr('fill', 'black');

    svg
      .append('path')
      .attr('d', lineFunc(dataSet.data))
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
      .attr('fill', 'none');
  }

  public onResizeFunction(graphId: string, dataSet: DataSet): () => void {
    // Add on load function
    let graphResizeTimer;
    const drawGraphFunc = this.drawGraphComponent;

    return () => {
      clearTimeout(graphResizeTimer);
      graphResizeTimer = setTimeout(() => {
        let s = d3.select('#' + graphId).select('svg');
        s = s.remove();
        drawGraphFunc(graphId, dataSet);
      }, 20);
    };
  }
}
