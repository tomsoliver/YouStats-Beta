import { Injectable } from '@angular/core';
import { Bounds } from './bounds';
import * as d3 from 'd3';
import { Styles } from 'src/stylings/styles';
import { ScaleContinuousNumeric } from 'd3';

@Injectable({
  providedIn: 'root'
})
export class AxisService {
  public pixelsPerYTick: number = 50;
  public pixelsPerXTick: number = 80;

  public moneyFormat = (d: number) =>  {
    const format = d3.format('.2s');
    return '£' + format(d);
  }

  public drawYAxis(
    bounds: Bounds,
    svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>,
    scale: d3.ScaleLinear<number, number> | d3.AxisScale<d3.AxisDomain>,
    format: { (n: number | { valueOf(): number; }): string; (domainValue: d3.AxisDomain, index: number): string; }
  ): void {
    const axis = d3
      .axisLeft(scale)
      .tickSize(-bounds.width)
      .tickPadding(12)
      .tickFormat(format)
      .ticks(bounds.height / this.pixelsPerYTick);

    const yAxisGroup = svg
      .append('g')
      .attr('transform', `translate(${bounds.left}, 0)`)
      .call(axis);

    const yAxisText = yAxisGroup
      .selectAll('text')
      .attr('fill', Styles.AxisColor)
      .attr('font-size', Styles.AxisFontSize);

    yAxisGroup.select('.domain').remove();
    yAxisGroup
      .selectAll('.tick:not(:first-of-type) line')
      .attr('stroke', '#ccc')
      .attr('stroke-dasharray', '5,5');
  }

  public drawXAxis(
    bounds: Bounds,
    svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>,
    scale: d3.ScaleTime<number, number> | d3.AxisScale<d3.AxisDomain>
  ): void {
    const axis = d3
      .axisBottom(scale)
      .tickSize(0)
      .tickPadding(12)
      .ticks(bounds.width / this.pixelsPerXTick);

    // Draw the axes
    const xAxisGroup = svg
      .append('g')
      .attr('transform', `translate(0, ${bounds.bottom})`)
      .call(axis);

    const xAxisText = xAxisGroup
      .selectAll('text')
      .attr('fill', Styles.AxisColor)
      .attr('font-size', Styles.AxisFontSize);
  }
}
