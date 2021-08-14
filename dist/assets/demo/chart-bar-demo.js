const database = firebase.firestore();
// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

var labelsArray2 = [];
var dataArray2 = [];
firebase.firestore().collection('Campaign').limit(5).orderBy("danaTerkumpul","desc").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        var item = doc.data();

        var namaCampaign = item.namaCampaign;
        dataArray2.push(namaCampaign);
        console.log(dataArray2);
        var danaTerkumpul = item.danaTerkumpul;
        labelsArray2.push(danaTerkumpul);
        console.log(labelsArray2);
        var ctx = document.getElementById("myBarChart");
        if(item.isEnable=="true"){
          var myLineChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: dataArray2,
              datasets: [{
                label: "Dana Terkumpul",
                backgroundColor: "rgba(2,117,216,1)",
                borderColor: "rgba(2,117,216,1)",
                data: labelsArray2,
              }],
            },
            options: {
              scales: {
                xAxes: [{
                  time: {
                    unit: 'date'
                  },
                  gridLines: {
                    display: false
                  },
                  ticks: {
                    maxTicksLimit: 7
                  }
                }],
                yAxes: [{
                  ticks: {
                    min: 0,
                    max: 1200000000,
                    maxTicksLimit: 5
                  },
                  gridLines: {
                    color: "rgba(0, 0, 0, .125)",
                  }
                }],
              },
              legend: {
                display: false
              }
            }
          });
        }
      });
  });