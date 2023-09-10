export type LinearRegressionStrategy = (points: Point[]) => Line;

export type Line = (x: number) => number;

export type Options = {
  pixelSize: number;
  primaryColor: string;
  bgColor: string;
  axesPadding: number;
  linearRegressionStrategy: LinearRegressionStrategy;
};

export type Point = [number, number];

export class CanvasManager {
  private points: Point[] = [];
  private regressionLine?: Line;
  constructor(
    public canvasEl: HTMLCanvasElement,
    public ctx: CanvasRenderingContext2D,
    public options: Options
  ) {
    this.ctx.strokeStyle = this.options.primaryColor;
    this.ctx.fillStyle = this.options.primaryColor;

    this.handleWindowResize();
    this.addEventListeners();

    this.renderCanvas();
  }

  private addEventListeners() {
    window.addEventListener("resize", this.handleWindowResize.bind(this));
    this.canvasEl.addEventListener("mousedown", this.handleClick.bind(this));
  }

  private handleClick(ev: MouseEvent) {
    this.points.push([ev.clientX, ev.clientY]);
    if (this.points.length < 2) {
      this.renderPoint(this.points.length - 1);
      return;
    }
    this.updateRegressionLine();
    this.renderCanvas();
  }

  private handleWindowResize() {
    this.canvasEl.width = window.innerWidth;
    this.canvasEl.height = window.innerHeight;
    this.renderCanvas();
  }

  public renderAxes() {
    this.ctx.lineWidth = 1;
    const ogStrokeStyle = this.ctx.strokeStyle;
    this.ctx.strokeStyle = "#fff";
    // X Axis
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.canvasEl.height - this.options.axesPadding);
    this.ctx.lineTo(
      this.canvasEl.width,
      this.canvasEl.height - this.options.axesPadding
    );
    this.ctx.stroke();

    // Y Axis
    this.ctx.beginPath();
    this.ctx.moveTo(this.options.axesPadding, 0);
    this.ctx.lineTo(this.options.axesPadding, this.canvasEl.height);
    this.ctx.stroke();

    this.ctx.strokeStyle = ogStrokeStyle;
  }

  public renderCanvas() {
    // Clear Screen
    this.clearCanvas();
    this.renderAxes();
    this.renderPoints();
    this.renderRegressionLine();
  }

  public clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);
  }

  public renderPoints() {
    const { pixelSize } = this.options;
    const ogFillStyle = this.ctx.fillStyle;
    this.ctx.fillStyle = this.options.primaryColor;
    for (const [x, y] of this.points) {
      this.ctx.roundRect(
        x - pixelSize / 2,
        y - pixelSize / 2,
        pixelSize,
        pixelSize,
        pixelSize / 2
      );
      this.ctx.fill();
    }
    this.ctx.fillStyle = ogFillStyle;
  }

  public renderPoint(idx: number) {
    const { pixelSize } = this.options;
    const ogFillStyle = this.ctx.fillStyle;
    this.ctx.fillStyle = this.options.primaryColor;
    const [x, y] = this.points[idx];
    this.ctx.roundRect(
      x - pixelSize / 2,
      y - pixelSize / 2,
      pixelSize,
      pixelSize,
      pixelSize / 2
    );
    this.ctx.fill();
    this.ctx.fillStyle = ogFillStyle;
  }

  private updateRegressionLine() {
    this.regressionLine = this.options.linearRegressionStrategy(this.points);
  }

  private renderRegressionLine() {
    if (this.regressionLine === undefined) return;
    const x1 = 0,
      x2 = this.canvasEl.width;
    const [y1, y2] = [this.regressionLine(x1), this.regressionLine(x2)];
    const ogStrokeStyle = this.ctx.strokeStyle;
    this.ctx.strokeStyle = this.options.primaryColor;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
    this.ctx.strokeStyle = ogStrokeStyle;
  }
}
