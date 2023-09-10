import { LinearRegressionStrategy } from "../CanvasManager";

const MeanSquares: LinearRegressionStrategy = (points) => {
  // Calculate the sum of x, y, x*y, and x^2 for all points
  const n = points.length;
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;

  for (const point of points) {
    sumX += point[0];
    sumY += point[1];
    sumXY += point[0] * point[1];
    sumX2 += point[0] * point[0];
  }

  // Calculate the slope (m) and y-intercept (b) of the linear regression line
  const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const b = (sumY - m * sumX) / n;

  // Return the function that calculates y for a given x using the linear regression equation
  return (x: number) => m * x + b;
};

export default MeanSquares;
