import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import { LineChartService } from 'src/app/services/line-chart.service';
import { TestData } from 'src/app/models/TestData';
import { DataSet } from 'src/app/models/dataElement';
import { GovernmentFilterService } from 'src/app/services/government-filter.service';

@Component({
  selector: 'ys-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  public graphId: string = 'graph';
  public sourceId: string = 'source';
  test = 'test';
  dataSet: DataSet;

  constructor(
    private chartService: LineChartService,
    private governmentFilterService: GovernmentFilterService
  ) {
    this.dataSet = TestData;
  }

  ngOnInit() {
    this.showGraph();
  }

  ngAfterViewInit(): void {
    this.drawGraph();
  }

  drawGraph() {
    this.chartService.drawGraph(this.graphId, this.dataSet);
    this.governmentFilterService.addGovernmentFilter(this.graphId, this.dataSet);
    window.onresize = () => {
      this.chartService.onResizeFunction(this.graphId, this.dataSet);
      this.governmentFilterService.onResizeFunction(this.graphId, this.dataSet);
    };
  }

  showGraph() {
    const graph = document.getElementById(this.graphId);
    graph.style.display = 'block';

    const source = document.getElementById(this.sourceId);
    source.style.display = 'none';
  }

  showSources() {
    const graph = document.getElementById(this.graphId);
    graph.style.display = 'none';

    const source = document.getElementById(this.sourceId);
    source.style.display = 'block';
  }
}
