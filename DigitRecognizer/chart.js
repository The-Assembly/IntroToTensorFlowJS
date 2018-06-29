var chartSe = document.getElementById("myChart").getContext('2d');


var myChart = new Chart(chartSe, {

barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    backgroundColor: '#ef6c00',
    scales: {
      xAxes: [{
                  gridLines: {
                      display: false
                  },
                  ticks: {
                    fontSize: 40
                }
              }],
      yAxes: [{
              display: false,
                  gridLines: {
                      display: false
                  }   
              }]
      }

  },

   barChartLabels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
   barChartType = 'bar',
   barChartLegend = false
}); 
