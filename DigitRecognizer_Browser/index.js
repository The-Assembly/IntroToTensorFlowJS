import * as tf from '@tensorflow/tfjs';

import {MnistData} from './data';

var canvas;
var context;
var canvasWidth =300;
var canvasHeight = 150;
var model = tf.sequential();

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

var canvasDiv = document.getElementById('canvasDiv');
var detectButton = document.getElementById('submitButton'); 
var clearButton = document.getElementById('clearButton')

model.add(tf.layers.conv2d({
  inputShape: [28, 28, 1],
  kernelSize: 5,
  filters: 8,
  strides: 1,
  activation: 'relu',
  kernelInitializer: 'varianceScaling'
}));
model.add(tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]}));
model.add(tf.layers.conv2d({
  kernelSize: 5,
  filters: 16,
  strides: 1,
  activation: 'relu',
  kernelInitializer: 'varianceScaling'
}));
model.add(tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]}));
model.add(tf.layers.flatten());
model.add(tf.layers.dense(
    {units: 10, kernelInitializer: 'varianceScaling', activation: 'softmax'}));
const LEARNING_RATE = 0.15;
const optimizer = tf.train.sgd(LEARNING_RATE);
model.compile({
  optimizer: optimizer,
  loss: 'categoricalCrossentropy',
  metrics: ['accuracy'],
});
const BATCH_SIZE = 64;
const TRAIN_BATCHES = 150;
const TEST_BATCH_SIZE = 1000;
const TEST_ITERATION_FREQUENCY = 5;




canvas = document.createElement('canvas');
canvas.setAttribute('width', canvasWidth);
canvas.setAttribute('height', canvasHeight);
canvas.setAttribute('id', 'canvas');
canvasDiv.appendChild(canvas);
if(typeof G_vmlCanvasManager != 'undefined') {
	canvas = G_vmlCanvasManager.initElement(canvas);
}
context = canvas.getContext("2d");

async function train(){
  const lossValues = [];
  const accuracyValues = [];

  for (let i = 0; i < TRAIN_BATCHES; i++) {
    const [batch, validationData] = tf.tidy(() => {
      const batch = data.nextTrainBatch(BATCH_SIZE);
      batch.xs = batch.xs.reshape([BATCH_SIZE, 28, 28, 1]);

      let validationData;
      if (i % TEST_ITERATION_FREQUENCY === 0) {
        const testBatch = data.nextTestBatch(TEST_BATCH_SIZE);
        validationData = [
          testBatch.xs.reshape([TEST_BATCH_SIZE, 28, 28, 1]), testBatch.labels
        ];
      }
      return [batch, validationData];
    });

    const history = await model.fit(
        batch.xs, batch.labels,
        {batchSize: BATCH_SIZE, validationData, epochs: 10});

    const loss = history.history.loss[0];
    const accuracy = history.history.acc[0];

    lossValues.push({'batch': i, 'loss': loss, 'set': 'train'});


    if (validationData != null) {
      accuracyValues.push({'batch': i, 'accuracy': accuracy, 'set': 'train'});
    }

    tf.dispose([batch, validationData]);

    await tf.nextFrame();
  }

  console.log('Model trained')
  document.getElementById("status").innerHTML = "Model trained";

}

let data;
async function load() {
  data = new MnistData();
  await data.load();
}

// This is our main function. It loads the MNIST data, trains the model, and
// then shows what the model predicted on unseen test data.
async function mnist() {
  document.getElementById("status").innerHTML = "Training...";

  await load();
  await train();
}
mnist();

$('#canvas').mousedown(function(e){
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;
          
    paint = true;
    addClick(mouseX, mouseY, false);
    redraw();
  });

  $('#canvas').mousemove(function(e){
    if(paint){
      addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
      redraw();
    }
  });

  $('#canvas').mouseup(function(e){
    paint = false;
  });

  $('#canvas').mouseleave(function(e){
    paint = false;
  });


function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}

function redraw(){
    
    
    context.strokeStyle = "#111111";
    context.lineJoin = "round";
    context.lineWidth = 10;
            
    
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    for(var i=0; i < clickX.length; i++) {		
      context.beginPath();
      if(clickDrag[i] && i){
        context.moveTo(clickX[i-1], clickY[i-1]);
       }else{
         context.moveTo(clickX[i]-1, clickY[i]);
       }
       context.lineTo(clickX[i], clickY[i]);
       context.closePath();
       context.stroke();
    }
  }

clearButton.addEventListener("click", function(){
    clickX = new Array();
    clickY = new Array();
    clickDrag = new Array();
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    document.getElementById("number").innerHTML = "";
})

detectButton.addEventListener("click", saveDrawing)


async function saveDrawing() {
    context.drawImage(canvas, 0, 0, 28, 28);
    var data = context.getImageData(0, 0, 28, 28);
    predict(data);
}

async function predict(imageData){

  const pred = await tf.tidy(() => {

 
    let img = tf.fromPixels(imageData, 1);
    img = img.reshape([1 , 28, 28, 1]);
    img = tf.cast(img, 'float32');
    const output = model.predict(img);
    var predictions = Array.from(output.dataSync())
  
    document.getElementById("number").innerHTML = indexOfMax(predictions);
    
  });
}

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}


