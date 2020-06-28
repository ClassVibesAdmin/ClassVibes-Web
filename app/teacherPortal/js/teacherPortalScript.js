function getProfileInfo() {
    var name = localStorage.getItem("name");
    var pic = localStorage.getItem("photo");

    let outputPic = "";
    outputPic += `
   <img class="img-profile rounded-circle" src="${pic}">

   `

    if (outputPic !== "") {
      $(outputPic).appendTo("#profilePic")
    }

    document.getElementById("displayName").innerHTML = name

  }

  function getClassData() {
    var emailRef = localStorage.getItem("email")
    console.log(emailRef)
   // var classesRef = firebase.database().ref().child("UserData").child(emailRef).child("Classes")
    var classesList = [];
    console.log(classesList);

    firebase.firestore().collection('UserData').doc(emailRef).collection("Classes").get().then(function (doc) {

      doc.forEach(snapshot => {

        var data = snapshot.data();

        var classCode = data["Code"];
        var className = data["class-name"];
        classesList.push([classCode, className])

        console.log(classesList)
      });

    }).then(function () {
      for (var i = 0; i <= classesList.length; i++) {
          let output = "";
          let output2 = "";
          let output3 = "";
          let output4 = "";
          var classData = classesList[i];
          console.log(classData);

          if (classData != null || classData != undefined) {

            console.log("works");
            var className = classData[1];
            var classCode = classData[0];


            output = `
          <div class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-success text-uppercase mb-1">${className}</div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">Class Code: ${classCode}</div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;

            output2 = `
          <a class="collapse-item" href="classPage.html" onclick = "setClassCode(${classCode})">${className}</a>
          `;

            output3 = `
          <a class="dropdown-item" href="#" onclick = "storeClassforChart(${classCode})">${className}</a>
                      <div class="dropdown-divider"></div>
          
          `

            function setClassCode(classCode) {
              localStorage.setItem("code", classCode);
            }




            $(output).appendTo("#topClassesSection");
            $(output2).appendTo("#classesOp");
            $(output3).appendTo("#classesOp1");
            $(output3).appendTo("#classesOp2");
          }

        }

    }).then(function() {
      getChartData();
    })

    /*
    classesRef.once("value", (snap) => {
        console.log(snap.val());
        rawData = snap.val();

        if (rawData != null) {
          snap.forEach((child) => {
            classesList.push([child.child("Code").val(), child.child("class-name").val(),]);
            storeClassforChart(child.child.code);
          })
        }
      }).then(function () {

        for (var i = 0; i <= classesList.length; i++) {
          let output = "";
          let output2 = "";
          let output3 = "";
          let output4 = "";
          var classData = classesList[i];
          console.log(classData);

          if (classData != null || classData != undefined) {

            console.log("works");
            var className = classData[1];
            var classCode = classData[0];


            output = `
          <div class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-success text-uppercase mb-1">${className}</div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">Class Code: ${classCode}</div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;

            output2 = `
          <a class="collapse-item" href="classPage.html" onclick = "setClassCode(${classCode})">${className}</a>
          `;

            output3 = `
          <a class="dropdown-item" href="#" onclick = "storeClassforChart(${classCode})">${className}</a>
                      <div class="dropdown-divider"></div>
          
          `

            function setClassCode(classCode) {
              localStorage.setItem("code", classCode);
            }




            $(output).appendTo("#topClassesSection");
            $(output2).appendTo("#classesOp");
            $(output3).appendTo("#classesOp1");
            $(output3).appendTo("#classesOp2");
          }

        }








      }).then(() => {
        getChartData();
      });*/


      

    }

          
function storeClassforChart(code) {
    localStorage.setItem("codeForChart", code);
    getChartData();

}

function writeAnnouncement() {
    var numberClass = document.getElementById("numberClass").value;
    console.log("NUMBER CLASS" + numberClass);
    var messageTitle = document.getElementById("messageTitle").value;
    var messageText = document.getElementById("messageText").value;
    /*
    var _refWriteAnnouncement = firebase.database().ref().child("Classes").child(numberClass).child("Announcements").push();
  
    _refWriteAnnouncement.child("Title").set(messageTitle);
    _refWriteAnnouncement.child("Message").set(messageText);
    
    */

    firebase.firestore().collection("Classes").doc(numberClass).collection("Announcements").doc().set({
      "Title": messageTitle,
      "Message": messageText,

    });



  }

  function getMeetings() {
    var name = localStorage.getItem("email");

    //var _ref = firebase.database().ref().child("UserData").child(name).child("Meetings");

    firebase.firestore().collection('UserData').doc(name).collection("Meetings").get().then(function (doc) {

        doc.forEach(snapshot => {

            var data1 = snapshot.data();
            var classForMeeting = data1["Course"]

            var date = data1["Date"];
            var title = data1["Title"];

            output = `
            <div class="col-xl-5 col-md-6 mb-4">
            <div class="card border-left-primary shadow h-100 py-2">
            <div class="card-body">
                <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">${classForMeeting}</div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">${title}</div>
                    <div class="h6 mb-0 font-weight-bold text-blue-800">${date}</div>
                </div>
                <div class="col-auto">
                    <i class="fas ffas fa-headset fa-2x text-gray-300"></i>
                </div>
                </div>
            </div>
            </div>
        </div>
        `;

            $(output).appendTo("#meetingsList");



        });

    })

    /*
    _ref.once('value').then(function (snapshot) {

            console.log("MEETINGS:" + snapshot.val());

            if (snapshot.val() != null) {
                snapshot.forEach((child) => {
                    var classForMeeting = child.child("Course").val();
                    var date = child.child("Date").val();
                    var title = child.child("Title").val();

                    console.log(child.val());

                    output = `
<div class="col-xl-5 col-md-6 mb-4">
<div class="card border-left-primary shadow h-100 py-2">
  <div class="card-body">
    <div class="row no-gutters align-items-center">
      <div class="col mr-2">
        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">${classForMeeting}</div>
        <div class="h5 mb-0 font-weight-bold text-gray-800">${title}</div>
        <div class="h6 mb-0 font-weight-bold text-blue-800">${date}</div>
      </div>
      <div class="col-auto">
        <i class="fas ffas fa-headset fa-2x text-gray-300"></i>
      </div>
    </div>
  </div>
</div>
</div>
`;

                    $(output).appendTo("#meetingsList");


                });

            } else {
                console.log("NONE");
                outputError = `
<h1>No Scheduled Meetings</h1>
`;

                $(outputError).appendTo("#meetingsList");
            }

        });
    */


        
    }

    
function getClassData() {
    var emailRef = localStorage.getItem("email")
    console.log(emailRef)
    //var classesRef = firebase.database().ref().child("UserData").child(emailRef).child("Classes")
    // var classesRef = firebase.firestore().collection("UserData").doc(emailRef).collection("classes").get().then(function(querySanp[]){

    // });
    var classesList = [];
    console.log(classesList);

    firebase.firestore().collection('UserData').doc(emailRef).collection("Classes").get().then(function (doc) {

        doc.forEach(snapshot => {

            var data1 = snapshot.data();

            var classCode = data1["Code"];
            var className = data1["class-name"];

            classesList.push([classCode, className])

            console.log(classesList)
        });

    }).then(function () {
        console.log(classesList)


        for (var i = 0; i <= classesList.length; i++) {
            let output = "";
            let output2 = "";
            let output3 = "";
            var classData = classesList[i];
            console.log(classData);

            if (classData != null || classData != undefined) {

                console.log("works");
                var className = classData[1];
                var classCode = classData[0];

                output2 = `
    <a class="collapse-item" href="#" onclick = "storeClassPref('${classCode}', '${className}')">${className}</a>
    `;

                output3 = `
    <a class="dropdown-item" href="#" onclick = "storeClassPref('${classCode}', '${className}')">${className}</a>
<div class="dropdown-divider"></div>
    
    `

                $(output).appendTo("#topClassesSection");
                $(output2).appendTo("#classesOp");
                $(output3).appendTo("#classesOp1");
                $(output3).appendTo("#classesOp2")
            }

        }
    })
}

function storeClassPref(code, name) {
    localStorage.setItem("code", code);
    localStorage.setItem("className", name);
    console.log(code);
    window.location = "classPage.html"



}
