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

trainButton.addEventListener("click", function(){

    successText.innerHTML = "";
    linearModel = tf.sequential();

    var arrayx = datax.value.split(",")
    var arrayy = datay.value.split(",")
    // Define a model for linear regression.
    linearModel.add(tf.layers.dense({units: 1, inputShape: [1]}));
    
    // Prepare the model for training: Specify the loss and the optimizer.
    linearModel.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
    
    
    // Training data, completely random stuff
    xs = tf.tensor1d(arrayx);
    ys = tf.tensor1d(arrayy);

    linearModel.fit(xs, ys, {epochs: 300}).then(() => {
        isModelTrained = true;
        successText.innerHTML = "Model Trained";
    });

})

predictionButton.addEventListener("click", function(e){
    if (isModelTrained)
    {
            const output = linearModel.predict(tf.tensor2d([input.value], [1, 1]))
            const prediction = Array.from(output.dataSync())[0];
            
            predictionText.innerHTML = prediction;
    }
    else successText.innerHTML = "Model hasn't been trained yet"
})