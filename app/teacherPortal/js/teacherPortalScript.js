function getTeacherAccountStatus(){
  var email = localStorage.getItem('email');

  firebase.firestore().collection('UserData').doc(email).get().then(function (doc) {
    var data = doc.data();

    var in_a_district = data['District Code'];

    if(in_a_district != null &&  in_a_district != undefined){
      firebase.firestore().collection('Districts').doc(in_a_district).get().then(function (doc) {
        var data = doc.data()["status"];

        if(data != "Activated"){
          var bodyPage = document.getElementById('main-body-page-teacher');

          var activateDistrictHTML = `
          
          `;
        } else {
          getClassData();
          getProfileInfo();
          getChartData();
    
        }

      });
    } else {
      var accountStatus = data['Account Status'];

      if(accountStatus == "Activated"){
        getClassData();
        getProfileInfo();
        getChartData();
  
      } else {
        
      }
    }

  });
}

function getProfileInfo() {
  var name = localStorage.getItem("name");
  var pic = localStorage.getItem("photo");

  var outputPic = ``;

  if (pic != null && pic != undefined && pic != "") {
    outputPic = `<img class="img-profile rounded-circle" src="${pic}">`;
  } else {
    outputPic = `<img class="img-profile rounded-circle" src="https://thumbs.dreamstime.com/b/creative-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mockup-144849704.jpg">`;
  }




  $(outputPic).appendTo("#profilePic")

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

  }).then(function () {
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
  var dateNow = new Date();
  var formattedDate = dateNow.toLocaleString();
  /*
  var _refWriteAnnouncement = firebase.database().ref().child("Classes").child(numberClass).child("Announcements").push();
 
  _refWriteAnnouncement.child("Title").set(messageTitle);
  _refWriteAnnouncement.child("Message").set(messageText);
  
  */

  firebase.firestore().collection("Classes").doc(numberClass).collection("Announcements").doc().set({
    "Title": messageTitle,
    "Message": messageText,
    "Date" : formattedDate.toString(),
    "Timestamp" : dateNow.toString(),
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

function createClass() {
  var code = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
  var className = document.getElementById("className").value;
  var course = document.getElementById("course").value;
  var teacher = document.getElementById("teacher").value;
  var classImg = document.getElementById("imageInput").value;
  var courseDescription = document.getElementById("courseDescription").value;
  var courseVideo = localStorage.getItem("videoLink");
  var teachersNote = document.getElementById("teachersNote").value;
  var classCreator = localStorage.getItem("email")

  // var _refCreateClass = firebase.database().ref().child("UserData").child(classCreator).child("Classes").child(code);
  // _refCreateClass.child("Code").set(code);
  // _refCreateClass.child("class-name").set(className);
  // _refCreateClass.child("Course").set(course);
  // _refCreateClass.child("teacher").set(teacher);
  // _refCreateClass.child("classImg").set(classImg);
  // _refCreateClass.child("courseDescription").set(courseDescription);
  // _refCreateClass.child("courseVideo").set(courseVideo);
  // _refCreateClass.child("teachersNote").set(teachersNote);


  // console.log(code);

  // var _refStudentClass = firebase.database().ref().child("Classes").child(code);
  // _refStudentClass.child("Code").set(code);
  // _refStudentClass.child("class-name").set(className);
  // _refStudentClass.child("Course").set(course);
  // _refStudentClass.child("teacher").set(teacher);
  // _refStudentClass.child("classImg").set(classImg);
  // _refStudentClass.child("courseDescription").set(courseDescription);
  // _refStudentClass.child("courseVideo").set(courseVideo);
  // _refStudentClass.child("teachersNote").set(teachersNote).then(() => {
  //   window.location = "dashboard.html";
  // });

  firebase.firestore().collection("UserData").doc(classCreator).collection("Classes").doc(code).set({
    "Code": code,
    "class-name": className,
    "Course": course,
    "teacher": teacher,
    "classImg": classImg,
    "courseDescription": courseDescription,
    "courseVideo": courseVideo,
    "teachersNote": teachersNote,

  });

  firebase.firestore().collection("Classes").doc(code).set({
    "Code": code,
    "class-name": className,
    "Course": course,
    "teacher": teacher,
    "classImg": classImg,
    "courseDescription": courseDescription,
    "courseVideo": courseVideo,
    "teachersNote": teachersNote,

  });






}

$(document).ready(function () {
  initializeFirebase();

  getServerStatus();
  getLiveSeverAlerts();
  checkUserAuthStatus();


  getProfileInfo();
  getClassData();

  getStudentData();
});


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

/*
classesRef.once("value", (snap) => {
  console.log(snap.val());
  rawData = snap.val();

  if (rawData != null) {
      snap.forEach((child) => {
          classesList.push([child.child("Code").val(), child.child("class-name").val(),]);
      })
  }
}).then(function () {

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

}),

*/






function storeClassPref(code, name) {
  localStorage.setItem("code", code);
  localStorage.setItem("className", name);
  console.log(code);



}

function getStudentData() {
  var code = localStorage.getItem("code");


  //var classInfoRef = firebase.database().ref().child("Classes").child(code).child("Students");



  var classInfoList = [];
  console.log(classInfoList);

  firebase.firestore().collection('Classes').doc(code).collection("Students").get().then(function (doc) {

      doc.forEach(snapshot => {

          var data = snapshot.data();

          var reaction = data["reaction"];
          var studentName = data["name"];
          var studentEmail = data["email"]
          classInfoList.push([studentName, reaction, studentEmail])
          console.log(classInfoList)

      });

      document.getElementById("studentTable").innerHTML = "";

      for (var i = 0; i <= classInfoList.length; i++) {
          let descriptionOutput = "";
          classInfoData = classInfoList[i];
          var happy = '<h1 class="icon-hover" style = "margin-left: 20px; font-size: 70px;"  style="color: green;">&#128513;</h1>';
          var meh = '<h1  class="icon-hover" style = "margin-right: 20px; margin-left: 20px; font-size: 70px;"  style="color: yellow;">&#128533;</h1>';
          var sad = '<h1  class="icon-hover" style = "margin-right: 20px; font-size: 70px;">&#128545;</h1>'

          if (classInfoData != null || classInfoData != undefined) {
              console.log("works")
              var className = localStorage.getItem("className");
              document.getElementById("className").innerHTML = className
              var studentName = classInfoData[0];

              var studentReaction = classInfoData[1];

              var studentEmail = classInfoData[2];
              console.log(classInfoData)


              descriptionOutput2 = `
      <tr>
      <td>${studentName}</td>
      <td>${studentEmail}</td>
      <td>Some Comment</td>
      <td><div id = "face"></div></td>
      <td>2011/04/25</td>
      <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal${i}" data-whatever="@mdo" style = "height: 50px; margin-right: 20px; margin-top: 15px">Schedual Meeting</button></td></tr>
      `;

              happy_face_Column = `
      <tr>
      <td>${studentName}</td>
      <td>${studentEmail}</td>
      <td>Some Comment</td>
      <td><h1 class="icon-hover" style = "margin-left: 20px; font-size: 70px;"  style="color: green;">&#128513;</h1></td>
      <td>2011/04/25</td>
      <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal${i}" data-whatever="@mdo" style = "height: 50px; margin-right: 20px; margin-top: 15px">Schedual Meeting</button></td></tr>
      `;

              meh_colum_face = `
      <tr>
      <td>${studentName}</td>
      <td>${studentEmail}</td>
      <td>Some Comment</td>
      <td><h1  class="icon-hover" style = "margin-right: 20px; margin-left: 20px; font-size: 70px;"  style="color: yellow;">&#128533;</h1></td>
      <td>2011/04/25</td>
      <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal${i}" data-whatever="@mdo" style = "height: 50px; margin-right: 20px; margin-top: 15px">Schedual Meeting</button></td></tr>
      `;

              frustrated_column_face = `
      <tr>
      <td>${studentName}</td>
      <td>${studentEmail}</td>
      <td>Some Comment</td>
      <td><h1  class="icon-hover" style = "margin-right: 20px; font-size: 70px;">&#128545;</h1></td>
      <td>2011/04/25</td>
      <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal${i}" data-whatever="@mdo" style = "height: 50px; margin-right: 20px; margin-top: 15px">Schedual Meeting</button></td></tr>

      

  </div>

  
      `;

              outputModel = `
      <div class="modal fade" id="exampleModal${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel${i}" aria-hidden="true">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel${i}">Schedual Meeting</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
              <form>
              <div class="form-group">
                  <label for="recipient-name" class="col-form-label">Title:</label>
                  <input type="text" class="form-control" id="title${i}">
              </div>
              <div class="form-group">
                  <label for="recipient-name" class="col-form-label">Date/Time</label>
                  <input type="text" class="form-control" id="date${i}">
              </div>
              <div class="form-group">
                  <label for="message-text" class="col-form-label">Student</label>
                  <input type="text" class="form-control" placeholder = "${studentName}" readonly>
              </div>
              </form>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" onclick = "schedualMeeting('${studentEmail}', '${className}', '${i}')" data-dismiss = "modal">Send message</button>
          </div>
          </div>
      </div>
      </div>
      `

              $(outputModel).appendTo("#outputModel")
              $(descriptionOutput2).appendTo("#studentTable")

              if (studentReaction == "good") {
                  document.getElementById("face").outerHTML = happy;
                  $(descriptionOutput2).appendTo("#studentsListGreat");
                  $(happy_face_Column).appendTo('#studentTable-doing-good');

              } else if (studentReaction == "meh") {
                  document.getElementById("face").outerHTML = meh;
                  $(descriptionOutput2).appendTo("#studentsListHelp");
                  $(meh_colum_face).appendTo('#studentTable-meh');


              } else if (studentReaction == "needs help") {

                  document.getElementById("face").outerHTML = sad;

                  $(descriptionOutput2).appendTo("#studentsListFrustrated");
                  $(frustrated_column_face).appendTo("#studentTable-frustrated");

              } else {
                  document.getElementById("face").outerHTML = happy;

                  $(happy_face_Column).appendTo("#studentsListGreat");

              }

          }
      }



  });


}
/*
classInfoRef.once("value", (snap) => {
              console.log(snap.val());
              rawData2 = snap.val();

              if (rawData2 != null) {

                  snap.forEach((child) => {
                      classInfoList.push([child.child("Name").val(), child.child("Reaction").val(), child.child("Email").val()])

                  });


              }


              document.getElementById("studentsList").innerHTML = "";

              for (var i = 0; i <= classInfoList.length; i++) {
                  let descriptionOutput = "";
                  classInfoData = classInfoList[i];
                  var happy = '<h1 class="icon-hover" style = "margin-left: 20px; font-size: 70px;"  style="color: green;">&#128513;</h1>';
                  var meh = '<h1  class="icon-hover" style = "margin-right: 20px; margin-left: 20px; font-size: 70px;"  style="color: yellow;">&#128533;</h1>';
                  var sad = '<h1  class="icon-hover" style = "margin-right: 20px; font-size: 70px;">&#128545;</h1>'

                  if (classInfoData != null || classInfoData != undefined) {
                      console.log("works")
                      var className = localStorage.getItem("className");
                      document.getElementById("className").innerHTML = className
                      var studentName = classInfoData[0];

                      var studentReaction = classInfoData[1];

                      var studentEmail = classInfoData[2];


                      descriptionOutput = `
      <div class="card mb-4 py-3 border-left-success" id = "studentCard">
          <div class="row">
              <div class="card-body">
                  <h4>${studentName}</h4>
              </div>
              <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo" style = "height: 50px; margin-right: 20px; margin-top: 15px">Schedual Meeting</button>
              <div style="margin-right: 25px;" id = "face"></div>

              <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Schedual Meeting</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div class="modal-body">
                      <form>
                      <div class="form-group">
                          <label for="recipient-name" class="col-form-label">Title:</label>
                          <input type="text" class="form-control" id="title">
                      </div>
                      <div class="form-group">
                          <label for="recipient-name" class="col-form-label">Date/Time</label>
                          <input type="text" class="form-control" id="date">
                      </div>
                      <div class="form-group">
                          <label for="message-text" class="col-form-label">Student</label>
                          <input type="text" class="form-control" placeholder = "${studentName}" readonly>
                      </div>
                      </form>
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary" onclick = "schedualMeeting('${studentEmail}', '${className}')" data-dismiss = "modal">Send message</button>
                  </div>
                  </div>
              </div>
              </div>

          </div>

          
  
  `;
                      $(descriptionOutput).appendTo("#studentsList");

                      if (studentReaction == "good") {
                          document.getElementById("face").outerHTML = happy;
                          $(descriptionOutput).appendTo("#studentsListGreat");

                      } else if (studentReaction == "meh") {
                          document.getElementById("face").outerHTML = meh;
                          $(descriptionOutput).appendTo("#studentsListHelp");


                      } else if (studentReaction == "needs help") {
                          document.getElementById("face").outerHTML = sad;
                          $(descriptionOutput).appendTo("#studentsListFrustrated");


                      } else {
                          document.getElementById("face").outerHTML = happy;
                          $(descriptionOutput).appendTo("#studentsListGreat");
                      }


                  }

              }
*/

/*


$('#exampleModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var recipient = button.data('whatever') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  //modal.find('.modal-title').text('New message to ' + recipient)
  //modal.find('.modal-body input').val(recipient)
})
*/

function schedualMeeting(emailStudent, course, index) {
  console.log("schedual meeting")

  var nameLocal = localStorage.getItem("email");
  var meetingTitle = document.getElementById("title" + index).value;
  var meetingDate = document.getElementById("date" + index).value;
  // var _refSchedualMeeting = firebase.database().ref().child("UserData").child(emailStudent).child("Meetings").push();
  var dateNow = new Date();
  var formattedDate = dateNow.toLocaleString();

  firebase.firestore().collection('UserData').doc(emailStudent).collection("Meetings").doc().set({
      "Title": meetingTitle,
      "Date": meetingDate,
      "Course": course,
      "Timestamp": dateNow.toString(),
  });


  // _refSchedualMeeting.child("Title").set(meetingTitle);
  // _refSchedualMeeting.child("Date").set(meetingDate);
  // _refSchedualMeeting.child("Course").set(course);


  // var _refSchedualMeeting = firebase.database().ref().child("UserData").child(nameLocal).child("Meetings").push();

  firebase.firestore().collection('UserData').doc(nameLocal).collection("Meetings").doc().set({
      "Title": meetingTitle,
      "Date": meetingDate,
      "Course": course,
      "Timestamp": dateNow.toString(),
  });
  // _refSchedualMeeting.child("Title").set(meetingTitle);
  // _refSchedualMeeting.child("Date").set(meetingDate);
  // _refSchedualMeeting.child("Course").set(course);

}

function showGreat() {
  document.getElementById('studentTable').style.display = "none";


  // document.getElementById('studentsListGreat').style.display = "initial";
  // document.getElementById('studentsListHelp').style.display = "none";
  //document.getElementById('studentsListFrustrated').style.display = "none";

  document.getElementById("doing-good-table-section").style.display = "initial";
  document.getElementById("meh-table-section").style.display = "none";
  document.getElementById("frustrated-table-section").style.display = "none";

}

function showHelp() {

  document.getElementById('studentTable').style.display = "none";


  // document.getElementById('studentsListGreat').style.display = "initial";
  // document.getElementById('studentsListHelp').style.display = "none";
  //document.getElementById('studentsListFrustrated').style.display = "none";

  document.getElementById("doing-good-table-section").style.display = "none";
  document.getElementById("meh-table-section").style.display = "initial";
  document.getElementById("frustrated-table-section").style.display = "none";

  // document.getElementById('studentTable').style.display = "none";
  // document.getElementById('studentsListGreat').style.display = "none";
  // document.getElementById('studentsListHelp').style.display = "initial";
  // document.getElementById('studentsListFrustrated').style.display = "none";
}

function showFrustrated() {
  // document.getElementById('studentTable').style.display = "none";
  //document.getElementById('studentsListGreat').style.display = "none";
  //document.getElementById('studentsListHelp').style.display = "none";
  //document.getElementById('studentsListFrustrated').style.display = "initial";

  document.getElementById('studentTable').style.display = "none";


  // document.getElementById('studentsListGreat').style.display = "initial";
  // document.getElementById('studentsListHelp').style.display = "none";
  //document.getElementById('studentsListFrustrated').style.display = "none";

  document.getElementById("doing-good-table-section").style.display = "none";
  document.getElementById("meh-table-section").style.display = "none";
  document.getElementById("frustrated-table-section").style.display = "initial";
}

function showAll() {
  //document.getElementById('studentTable').style.display = "initial";
  //document.getElementById('studentsListGreat').style.display = "none";
  //document.getElementById('studentsListHelp').style.display = "none";
  //document.getElementById('studentsListFrustrated').style.display = "none";
  window.location.reload();
}






