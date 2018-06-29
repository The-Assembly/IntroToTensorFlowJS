var predictionButton = document.querySelector("#getPredictions");
var input = document.querySelector('#input');
var trainButton = document.querySelector('#trainModel');
var successText = document.querySelector('#success');
var datax = document.querySelector('#datax');
var datay = document.querySelector('#datay');
var predictionText = document.querySelector('#predictions');

var xs = "";
var ys = "";
var isModelTrained = false;

const a = tf.variable(tf.scalar(Math.random()));
const b = tf.variable(tf.scalar(Math.random()));
const numIterations = 100;
const learningRate = 0.1;
const optimizer = tf.train.sgd(learningRate);

function predict(x) {
    return tf.tidy(() => {
        return a.mul(x).add(b);
    });
}

function loss(prediction, labels) {
    const error = prediction.sub(labels).square().mean();
    return error;
}
  
async function train(xs, ys, numIterations) {
    for (let iter = 0; iter < numIterations; iter++) {
      optimizer.minimize(() => {
        const pred = predict(xs);
        return loss(pred, ys);
      });
  
      await tf.nextFrame();
    }

    isModelTrained = true;
    successText.innerHTML = "Model trained"
}
  
  
trainButton.addEventListener("click", async function(){
    successText.innerHTML = "";
    
    var arrayx = datax.value.split(",")
    var arrayy = datay.value.split(",")

    xs = tf.tensor1d(arrayx);
    ys = tf.tensor1d(arrayy);

    await train(xs, ys, numIterations);
})

predictionButton.addEventListener("click", function(e){
    if (isModelTrained)
    {        
        predictionText.innerHTML = predict(tf.tensor(input.value)).dataSync()[0];

    }
    else successText.innerHTML = "Model hasn't been trained yet"
})