import { CanvasManager } from "./lib/CanvasManager";
import MeanSquares from "./lib/regression/MeanSquares";
import "./styles/global.css";
import "./styles/sass/styles.scss";

console.log("index.js connected!");

const canvasEl = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvasEl.getContext("2d")!;

const options = {
  pixelSize: 10,
};

const canvasManager = new CanvasManager(canvasEl, ctx, {
  pixelSize: 10,
  primaryColor: "#ff0000",
  bgColor: "#000",
  axesPadding: 50,
  linearRegressionStrategy: MeanSquares,
});
