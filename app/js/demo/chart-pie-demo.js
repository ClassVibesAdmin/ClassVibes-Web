
function getChartData() {

  var code = localStorage.getItem("codeForChart");

  //var _chartDataRef = firebase.database().ref().child("Classes").child(code).child("Students");
 // _chartDataRef.on('value', get);

  function get(snapshot){
    
    var studentsReactionLists = [0,0,0];
  
      console.log(snapshot.val());

      firebase.firestore().collection('Classes').doc(code).collection("Students").get().then(function (doc) {

        doc.forEach(snapshot => {

            var data1 = snapshot.data();

            var reaction = data1["reaction"];

            if(reaction == "good"){
              studentsReactionLists[0] = studentsReactionLists[0] + 1;
            }
    
            if(reaction == "meh"){
              studentsReactionLists[1] = studentsReactionLists[1] + 1;
            }
    
            if(reaction == "needs help"){
              studentsReactionLists[2] = studentsReactionLists[2] + 1;
            }


        });

    })
  
      /*
      if(snapshot.val() != null){
        snapshot.forEach((child) => {
          
          console.log(child);
          if(child.child("Reaction").val() == "good"){
            studentsReactionLists[0] = studentsReactionLists[0] + 1;
          }
  
          if(child.child("Reaction").val() == "meh"){
            studentsReactionLists[1] = studentsReactionLists[1] + 1;
          }
  
          if(child.child("Reaction").val() == "needs help"){
            studentsReactionLists[2] = studentsReactionLists[2] + 1;
          }
        });
      } else {
        studentsReactionLists[0] = 1;
      }
      */
        console.log(studentsReactionLists);
        
  // Set new default font family and font color to mimic Bootstrap's default styling
  Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
  Chart.defaults.global.defaultFontColor = '#858796';
  
  // Pie Chart Example
  var ctx = document.getElementById("myPieChart");
  var myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ["Doing Great", "Needs Help", "Frustrated"],
      datasets: [{
        data: studentsReactionLists,
        backgroundColor: ['#4feb34', '#ebe834', '#eb0c00'],
        hoverBackgroundColor: ['#15b809', '#c2cc00', '#cc0011'],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      }],
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
      legend: {
        display: false
      },
      cutoutPercentage: 80,
    },
  });
  }

}



