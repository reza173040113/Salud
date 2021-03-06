// const database = firebase.firestore();
// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

var labelsArray = [];
var dataArray = [];
firebase.firestore().collection('Aspirasi').limit(5).orderBy("jumlahLike","desc").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        var item = doc.data();

        var name = item.name;
        dataArray.push(name);
        console.log(dataArray);
        var jumlahLike = item.jumlahLike;
        labelsArray.push(jumlahLike);
        var ctx = document.getElementById("myAreaChart");
        if(item.isEnable=="y"){
          var myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: dataArray,
              datasets: [{
                label: "Jumlah Like",
                lineTension: 0.3,
                backgroundColor: "rgba(2,117,216,0.2)",
                borderColor: "rgba(2,117,216,1)",
                pointRadius: 5,
                pointBackgroundColor: "rgba(2,117,216,1)",
                pointBorderColor: "rgba(255,255,255,0.8)",
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(2,117,216,1)",
                pointHitRadius: 50,
                pointBorderWidth: 2,
                data: labelsArray,
              }],
            },
            options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }
          }
          });
        }
      });
  });

