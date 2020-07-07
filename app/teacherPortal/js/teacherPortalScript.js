function initializeFirebase() {
  var firebaseConfig = {
    apiKey: "AIzaSyA2ESJBkNRjibHsQr2UTHtyYPslzNleyXw",
    authDomain: "cyberdojo-a2a3e.firebaseapp.com",
    databaseURL: "https://cyberdojo-a2a3e.firebaseio.com",
    projectId: "cyberdojo-a2a3e",
    storageBucket: "cyberdojo-a2a3e.appspot.com",
    messagingSenderId: "938057332518",
    appId: "1:938057332518:web:99c34da5abf1b1548533e7",
    measurementId: "G-0EWJ1V40VX"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //firebase.firestore().enablePersistence();
}

function getTeacherAccountStatus(pageType){

  var email = localStorage.getItem('email');

  firebase.firestore().collection('UserData').doc(email).get().then(function (doc) {
    var data = doc.data();

    var in_a_district = data['District Code'] != undefined? data['District Code'] : null;

    console.log("DISTRICT: " + in_a_district);

    var pendingSchoolRequestName = data["Pending School Request Name"];

    var pendingRequestID = data["Pending Request ID"];

    var pendingDistrictRequestID = data["Pending District Request"];

    if(pendingSchoolRequestName){

      var waitingRequestHTML = `
      <center style="margin-top: 23%;">
      <i class="far fa-check-circle" style = "font-size: 80px; color: green"></i>

      <h2 style="margin-top: 2%;">Request Sent</h2>

      <p>You have successfully sent a request to join ${pendingSchoolRequestName}</p>

      <button class="btn-screen danger" onclick = "cancelTeacherRequest('${pendingRequestID}', '${pendingDistrictRequestID}', '${email}')">Cancel</button>
    </center>
      `;

      $('#main-body-page-teacher').html(waitingRequestHTML);
    } else {
    //IN A DISTRICT
    if(in_a_district != null &&  in_a_district != undefined){
      firebase.firestore().collection('Districts').doc(in_a_district).get().then(function (doc) {

        console.log('Executing 1');

        var data = doc.data()["Status"];

        console.log("STATUS:" + data);

        //DISTRICT IS NOT ACTIVATED
        if(data != "Activated"){
          

          var activateDistrictHTML = `
          <center style="margin-top: 23%;">
          <i class="fas fa-exclamation-triangle" style="font-size: 70px;"></i>

          <h2 style="margin-top: 2%;">District Not Active</h2>

          <p>If this is an error, contact you district admin for more info.</p>
        </center>
          `;

          document.getElementById('loader-icon').style.display = 'none';

          $('#main-body-page-teacher').html(activateDistrictHTML);
        } else {

          console.log('Executing 2');

          document.getElementById('loader-icon').style.display = 'none';

          if(pageType == 'meetings-page'){
            document.getElementById('main-page-content-meetings-page').style.display = "initial";
            getProfileInfo();
            getClassData();
            getMeetings();
        } 
        else if(pageType == ""){

        } 
        else if(pageType == 'class-page') {
          getProfileInfo();
          getClassData();
          getStudentData();
          getEditData();
        } 
        
        else if (pageType == 'dashboard'){
          getProfileInfo();
          getClassData();
        }
        
        else {
          getClassData();
          getProfileInfo();
         getChartData();
        }
    
        }
      });

    } 
    //NOT IN A DISTRICT
    else {
      

      var accountStatus = data['Account Status'];

      //ACCOUNT ACTIVE
      if(accountStatus == "Activated"){

        document.getElementById('loader-icon').style.display = 'none';

        document.getElementById('dashboard-section').style.display = 'none';

        if(pageType == 'meetings-page'){
          document.getElementById('main-page-content-meetings-page').style.display = "initial";
          getProfileInfo();
          getClassData();
          getMeetings();
      } 
      else if(pageType == ""){

      } 
      else if(pageType == 'class-page') {
        getProfileInfo();
        getClassData();
        getStudentData();
        getEditData();
      } 
      else if(pageType == 'dashboard'){
        console.log("executing");
        getProfileInfo();
        getClassData();
      }
      
      
      else {
        getClassData();
        getProfileInfo();
       getChartData();
      }
        
        
       //ACCOUNT NOT ACTIVE
      } else {
        var activateDistrictHTML = `
        
        <center style="margin-top: 20%;">
        <i class="fas fa-exclamation-triangle" style="font-size: 70px;"></i>

        <h2 style="margin-top: 2%;">Account Not Activated</h2>

        <p>If you are a solo teacher please contact <a href="mailto:sales@classvibes.net">sales@classvibes.net</a>
          <br> to activate your account.</p>

        <h5>Or</h5>

          <div id = "district-join-input">
            <form class="d-none d-sm-inline-block form-inline mr-auto ml-md-6 my-4 my-md-0 mw-100 navbar-search">
              <div class="input-group">
                  <input type="text" class="form-control bg-light border-3 small" placeholder="District code.." aria-label="Search" aria-describedby="basic-addon2" id="searchInputDistrict">
                  <div class="input-group-append">
                      <button class="btn btn-primary" type="button" onclick="checkIfDistrictCodeExists()">
                          Join
                      </button>
                  </div>
              </div>
          </form>
          </div>


        <div id = "school-join-input" style="display: none;">
          <form class="d-none d-sm-inline-block form-inline mr-auto ml-md-6 my-4 my-md-0 mw-100 navbar-search">
            <div class="input-group">
                <input type="text" class="form-control bg-light border-3 small" placeholder="School Code..." aria-label="Search" aria-describedby="basic-addon2" id="searchInputSchool">
                <div class="input-group-append">
                    <button class="btn btn-primary" type="button" onclick="checkIfSchoolCodeExists()">
                        Join
                    </button>
                </div>
            </div>
        </form>
        </div>

      <div id = "joinSchool-district-err">

      </div>

      </center>
       `;
       document.getElementById('loader-icon').style.display = 'none';
        $('#main-body-page-teacher').html(activateDistrictHTML);
      }
    }
    }


  });
}


function checkIfDistrictCodeExists(){
  var code = document.getElementById('searchInputDistrict').value;

  firebase.firestore().collection('Districts').doc(code).get().then(function (doc) {
    var data = doc.data();

    if(data != null && data != undefined){

      $('#joinSchool-district-err').html('');

      document.getElementById('school-join-input').style.display = "initial";
      document.getElementById('district-join-input').style.display = "none";

    } else {

      var errHTML = `<p style = 'color: red; margin-top: 5px'>District doesn't exist</p>`;

      $('#joinSchool-district-err').html(errHTML);
    }
  });
}

function checkIfSchoolCodeExists(){
  var district_code = document.getElementById('searchInputDistrict').value;
  var school_code = document.getElementById('searchInputSchool').value;

  var teacher_email = localStorage.getItem('email');
  var teacher_name = localStorage.getItem('name');

  firebase.firestore().collection('Districts').doc(district_code).collection("Schools").doc(school_code).get().then(function (doc) {
    var data = doc.data();

    if(data != null && data != undefined){

      $('#joinSchool-district-err').html('');

      /*
      firebase.firestore().collection('Districts').doc(district_code).collection("Schools").doc(school_code).collection('Teachers').doc(teacher_email).set({
        "Teacher Name": teacher_name,
        "Teacher Email": teacher_email,
      });
      */

      /*

      firebase.firestore().collection('UserData').doc(teacher_email).update({
        "District Code": district_code,
      })
      */

      /*
      firebase.firestore().collection('Districts').doc(district_code).collection("Schools").doc(school_code).collection('Teachers').doc(teacher_email).set({
        "Teacher Name": teacher_name,
        "Teacher Email": teacher_email,
      });
      */

     firebase.firestore().collection('Districts').doc(district_code).collection('Schools').doc(school_code).get().then(snapshot => {
        var data = snapshot.data();

        var schoolName = data['School Name']

        return schoolName

    }).then((name) => {

      const increment = firebase.firestore.FieldValue.increment(1);

      firebase.firestore().collection('Districts').doc(district_code).update({
        "Pending Requests": increment
      })

      var _requestRef = firebase.firestore().collection('Districts').doc(district_code).collection("Teacher Requests").doc()
      
      _requestRef.set({
        "Teacher Name": teacher_name,
        "Teacher Email": teacher_email,
        "Teacher School ID Request": school_code,
        "School Name": name,
      }).then(() => {

        console.log(_requestRef.id);


        firebase.firestore().collection('UserData').doc(teacher_email).update({
          "Pending District Request": district_code,
          "Pending School Request": school_code,
          "Pending School Request Name": name,
          "Pending Request ID": _requestRef.id,
        }).then(() => {
          window.location.reload();
        })
        
      })

    })



    } else {

      var errHTML = `<p style = 'color: red; margin-top: 5px'>School doesn't exist</p>`;

      $('#joinSchool-district-err').html(errHTML);
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

  console.log("GET CLASS DAata");


  var emailRef = localStorage.getItem("email")
  console.log(emailRef)
  // var classesRef = firebase.database().ref().child("UserData").child(emailRef).child("Classes")
  var classesList = [];
  console.log(classesList);

  var no_classes_HTML = `
  <center style="margin-top: 15%;">
  <img src = 'img/undraw_taking_notes_tjaf.svg'/ width="25%">

  <h1 style="margin-top: 20px;">Nothing here yet</h1>
  <p>You have not created any classes yet. <br> Go to <strong>Sidebar > Classes > Create Class</strong> <br> to get started</p>
  </center>
  `;

  var index = 0;

  firebase.firestore().collection('UserData').doc(emailRef).collection("Classes").get().then(function (doc) {

    doc.forEach(snapshot => {

      console.log("Getting");

      index = index + 1

      var data = snapshot.data();

      var classCode = data["Code"];
      var className = data["class-name"];
      classesList.push([classCode, className])

      console.log(classesList)
    });

  }).then(function () {

    console.log("INDEX:" + index)

    if(index == 0){
      document.getElementById('main-body-page-teacher').innerHTML = no_classes_HTML;
    } else {
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


        if(i == 0){
          storeClassforChart(classCode)
        }
  
  
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
            <a class="dropdown-item" href="#" onclick = "storeClassforChart('${classCode}')">${className.toString()}</a>
                        <div class="dropdown-divider"></div>
            
            `
  

  
  
  
  
          $(output).appendTo("#topClassesSection");
          $(output2).appendTo("#classesOp");
          $(output3).appendTo("#classesOp1");
          $(output2).appendTo("#dropdown-sidebar");
        }
  
      }
    }


  }).then(function () {

    if(document.getElementById('dashboard-section') != null){
      document.getElementById('dashboard-section').style.display = "initial";
      getChartData();
    }
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

function setClassCode(classCode) {
  localStorage.setItem("code", classCode);
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

  var index = 0;

  firebase.firestore().collection('UserData').doc(name).collection("Meetings").get().then(function (doc) {

    doc.forEach(snapshot => {
      index = index + 1

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



    })
  }).then(() => {
    var noMeetingsHTML = `
    <center style="margin-top: 15%;">
    <img src = 'img/undraw_taking_notes_tjaf.svg'/ width="25%">
  
    <h1 style="margin-top: 20px;">No Meetings</h1>
    <p>You have not created any classes yet. <br> Go to <strong>Sidebar > Classes > Create Class</strong> <br> to get started</p>
    </center>
    `;

    if(index == 0){
        document.getElementById('main-body-page-teacher').innerHTML = noMeetingsHTML;
    }
  });

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


function getClassDataDropdown() {
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
}

function cancelTeacherRequest(ID, districtID, teacher_email){
  firebase.firestore().collection('Districts').doc(districtID).collection('Teacher Requests').doc(ID).delete().then(() => {
    firebase.firestore().collection('UserData').doc(teacher_email).update({
      "Pending District Request": null,
      "Pending School Request": null,
      "Pending School Request Name": null,
      "Pending Request ID":null,
    }).then(() => {
      window.location.reload()
    })
  });

}

function getEditData() {
  var code = localStorage.getItem("code");
  output = ''

  firebase.firestore().collection('Classes').doc(code).get().then(function (doc) {

   var data = doc.data();
   return data;


}).then((data) => {
  var className = data['class-name'];
   var course = data['Course']
   var teacher = data['teacher']
  output += `
  <div class="input-group mb-3">
  <div class="input-group-prepend">
  </div>
  <input type="text" class="form-control" placeholder="${className}" aria-label="Username"
    aria-describedby="basic-addon1" id="className" readonly>
</div>

<div class="input-group mb-3">
  <input type="text" class="form-control" placeholder="${course}" aria-label="Recipient's username"
    aria-describedby="basic-addon2" id="course" readonly>
  <div class="input-group-append">
  </div>
</div>
<div class="input-group mb-3" id="hackLocation">
  <input type="text" class="form-control" placeholder="${teacher}" aria-label="Recipient's username"
    aria-describedby="basic-addon2" id="teacher" readonly>
  <div class="input-group-append">
  </div>
</div>

  `

  $(output).appendTo("#editInfo")

})
}





