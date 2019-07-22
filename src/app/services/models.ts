export interface Lengths {
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  xLabelHeight?: number;
  yLabelWidth?: number;
  width?: number;
  height?: number;
  leftMarginWithLabel?: number;
  bottomMarginWithLabel?: number;
  graphHeight?: number;
  graphWidth?: number;
}

// Defines all dimensions of a chart
export class Chart implements Lengths {
  private _marginTop?: number = 0;
  private _marginRight?: number = 0;
  private _marginBottom?: number = 0;
  private _marginLeft?: number = 0;
  private _xLabelHeight?: number = 0;
  private _yLabelWidth?: number = 0;
  private _width?: number = 0;
  private _height?: number = 0;

  constructor() {}

  // Get and set top margin
  get marginRight(): number {
    return this._marginRight;
  }
  set marginRight(value: number) {
    this._marginRight = value;
    this.setGraphWidth();
  }

  // Get and set top margin
  get marginTop(): number {
    return this._marginTop;
  }
  set marginTop(value: number) {
    this._marginTop = value;
    this.setGraphHeight();
  }

  // Get and set bottom margin
  get marginBottom(): number {
    return this._marginBottom;
  }
  set marginBottom(value: number) {
    this._marginBottom = value;
    this.setBottomMarginWithLabel();
    this.setGraphHeight();
  }

  // Get and set left margin
  get marginLeft(): number {
    return this._marginLeft;
  }
  set marginLeft(value: number) {
    this._marginLeft = value;
    this.setLeftMarginWithLabel();
    this.setGraphWidth();
  }

  // Get and set bottom margin
  get xLabelHeight(): number {
    return this._xLabelHeight;
  }
  set xLabelHeight(value: number) {
    this._xLabelHeight = value;
    this.setBottomMarginWithLabel();
    this.setGraphHeight();
  }

  // Get and set y label width
  get yLabelWidth(): number {
    return this._yLabelWidth;
  }
  set yLabelWidth(value: number) {
    this._yLabelWidth = value;
    this.setLeftMarginWithLabel();
    this.setGraphWidth();
  }

  // Get and set bottom margin
  get width(): number {
    return this._width;
  }
  set width(value: number) {
    this._width = value;
    this.setGraphWidth();
  }

  // Get and set y label width
  get height(): number {
    return this._height;
  }
  set height(value: number) {
    this._height = value;
    this.setGraphHeight();
  }

  public leftMarginWithLabel: number = 0;
  public bottomMarginWithLabel: number = 0;
  public graphHeight: number = 0;
  public graphWidth: number = 0;

  private setLeftMarginWithLabel() {
    this.leftMarginWithLabel = this._marginLeft + this._yLabelWidth;
  }

  private setBottomMarginWithLabel() {
    this.bottomMarginWithLabel = this.xLabelHeight + this._marginBottom;
  }

  private setGraphHeight(): void {
    this.graphHeight = this._height - this.xLabelHeight - this._marginBottom - this._marginTop;
  }

  private setGraphWidth(): void {
    this.graphWidth = this._width - this._marginLeft - this._yLabelWidth - this._marginRight;
  }
}
