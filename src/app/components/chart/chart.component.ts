import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { LineChartService } from 'src/app/services/line-chart.service';
import { DataSet } from 'src/app/models/dataElement';

@Component({
  selector: 'ys-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChartComponent implements OnInit {
  @Input() dataSets: DataSet[];

  constructor(
    private chartService: LineChartService) { }

  ngOnInit() {
    this.chartService.drawGraph(this.dataSets);
  }
}
