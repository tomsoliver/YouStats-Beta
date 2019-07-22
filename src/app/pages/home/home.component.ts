import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TestData1, TestData2 } from 'src/app/models/TestData';
import { DataSet } from 'src/app/models/dataElement';

@Component({
  selector: 'ys-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  public graphId: string = 'chart';
  public sourceId: string = 'source';
  test = 'test';
  dataSets: DataSet[];

  constructor() {
    this.dataSets = [TestData1, TestData2];
  }

  ngOnInit() {
    this.showGraph();
  }

  ngAfterViewInit(): void {
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
