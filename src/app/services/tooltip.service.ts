import { Injectable } from '@angular/core';
import { DataSet } from '../models/dataElement';
import * as d3 from 'd3';
import { Bounds } from './bounds';
import { Styles } from 'src/stylings/styles';

@Injectable({
  providedIn: 'root'
})
export class TooltipService {
  public generateTooltip(
    svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
    xScale: d3.ScaleTime<number, number>,
    bounds: Bounds,
    dataSets: DataSet[]
  ) {
    const tooltip = d3
      .select('#tooltip')
      .style('display', 'none')
      .attr('year', '0');
    const tooltipLine = svg.append('line').attr('class', 'tooltip-line');

    let tipBox;
    tipBox = svg
      .append('rect')
      .attr('width', bounds.width)
      .attr('height', bounds.height)
      .attr('x', bounds.left)
      .attr('y', bounds.top)
      .attr('opacity', 0)
      .style('z-index', '2')
      .on('mousemove', () =>
        this.drawToolTip(xScale, tipBox, dataSets, tooltip, tooltipLine, bounds)
      )
      .on('mouseout', () => {
        // If moving over the tooltip, then treat as if moving over the rectangle
        if (d3.event.relatedTarget.id === tooltip.attr('id')) {
          this.drawToolTip(xScale, tipBox, dataSets, tooltip, tooltipLine, bounds);
          return;
        }

        // Else remove the tooltip
        if (tooltip) {
          tooltip.style('display', 'none');
        }
        if (tooltipLine) {
          tooltipLine.attr('stroke', 'none');
        }
      });
  }

  drawToolTip(
    xScale: d3.ScaleTime<number, number>,
    tipBox: { node: () => d3.ContainerElement },
    data: DataSet[],
    tooltip: d3.Selection<d3.BaseType, unknown, HTMLElement, any>,
    tooltipLine: d3.Selection<SVGLineElement, unknown, HTMLElement, any>,
    bounds: Bounds
  ): void {
    // Get year from coordinates
    const coordinate = d3.mouse(tipBox.node())[0];
    const date = xScale.invert(coordinate);
    const year = new Date(0);
    if (date.getMonth() < 6) {
      year.setFullYear(xScale.invert(coordinate).getUTCFullYear());
    } else {
      year.setFullYear(xScale.invert(coordinate).getUTCFullYear() + 1);
    }
    const yearValue = year.getUTCFullYear();

    // Check if tooltip needs to be updated
    if (tooltip.attr('year') === yearValue.toString()) {
      return;
    }

    // draw tooltip line
    tooltipLine
      .attr('stroke', '#ccc')
      .attr('x1', xScale(year))
      .attr('x2', xScale(year))
      .attr('y1', bounds.top)
      .attr('y2', bounds.bottom);

    // Get graph width, if over half way, then tooltip will flip to other side
    tooltip
      .style('display', 'block')
      .style('left', () => {
        // See if width + position is wider than chart width
        const position = xScale(year);
        const tooltipWidth = parseInt(tooltip.style('width').slice(0, -2), 10);
        if (position + tooltipWidth + 20 > bounds.width) {
          return position - tooltipWidth - 10 + 'px';
        }
        return position + 10 + 'px';
      })
      .style('top', '70px')
      .attr('year', yearValue.toString());

    tooltip
      .html('<h5>' + yearValue.toString() + '</h5>')
      .selectAll()
      .data(data)
      .enter()
      .append('div')
      .attr('class', 'tooltip-text')
      .html((d, i) => {
        const tooltipData = d.data.find(s => s.x.getUTCFullYear() === yearValue);

        if (tooltipData === undefined) {
          return '';
        }
        return (
          '<div class="tooltip-circle" style="background-color:' +
          Styles.GraphColors[i] +
          ';"></div>' +
          '<p id="tooltip-data-name">' +
          d.name +
          '</p>' +
          '<p id="tooltip-data-data">' +
          tooltipData.tooltip +
          '<p>'
        );
      });
  }
}
