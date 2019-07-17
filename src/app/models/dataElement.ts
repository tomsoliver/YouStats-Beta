export interface DataElement {
  tooltip: string;
  x: Date;
  y: number;
}

export interface DataSet {
  id: string;
  name: string;
  xAxisName: string;
  yAxisName: string;
  data: DataElement[];
  sourceUrls: string[];
  lastUpdated: Date;
}
