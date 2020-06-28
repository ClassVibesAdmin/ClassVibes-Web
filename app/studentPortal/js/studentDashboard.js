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

var classCodes = {};
var selectedClass = "";

var dropDownMenuItems = ``;

function getProfileInfo() {
  var name = localStorage.getItem("name");
  var pic = localStorage.getItem("photo");

  var outputPic = ``;

  if(pic != null && pic != undefined && pic != ""){
      outputPic = `<img class="img-profile rounded-circle" src="${pic}">`;
  } else {
      outputPic = `<img class="img-profile rounded-circle" src="https://thumbs.dreamstime.com/b/creative-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mockup-144849704.jpg">`;
  }


  $(outputPic).appendTo("#profilePic")

  document.getElementById("displayName").innerHTML = name

}

// FIRESTORE MIGRATED FULLY
function getStudentClasses(studentUsername, pageType) {

  if (document.getElementById("classesRowDisplay") != null) {
    document.getElementById("classesRowDisplay").innerHTML = "";
  }

  console.log(studentUsername);

  let output = "";

  classesList = [];



  firebase.firestore().collection('UserData').doc(studentUsername).collection("Classes").get().then(function (doc) {

    doc.forEach(snapshot => {
      var classData = snapshot.data();

      var classCode = classData["Code"];
      var className = classData["class-name"];

      classesList.push(className);
      classCodes[className] = classCode;

      console.log(classesList.length);
    });

    console.log(classesList.length + ": LENGTH");


    if (classesList.length != 0) {

      console.log(classesList);

      inital = `
          <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="selectedClassForDropdown">
                    ${classesList[0]}
                  </button>
          `;

      selectedClass = classesList[0];

      $(inital).appendTo("#selectedClassForDropdown");


      classesList.forEach(function (item, index) {
        console.log(item, index);
        output = `
            <div class="col-xl-3 col-md-6 mb-4">
                    <div class="card border-left-primary shadow h-100 py-2">
                      <div class="card-body">
                        <div class="row no-gutters align-items-center">
                          <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">CLASS</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">${item}</div>
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
            <a class="collapse-item">${item}</a>
            `;

        output3 = `
        <option selected value="base">${item}</option>
            `;

        dropDownMenuItems += output3;

        $(output3).appendTo("#dropDownMoodPicker");

        $(output2).appendTo("#classesListSideBar");

        $(output).appendTo("#classesRowDisplay");

        if (pageType == "student-joinClass") {
          document.getElementById('loadingIndicator').style.display = "none";

          document.getElementById('classesSection-description').style.display = "initial";

          document.getElementById('noClasses-Section').style.display = "none";

        } else {
          document.getElementById('loadingIndicator').style.display = "none";

          document.getElementById('dashboardSection-content').style.display = "initial";

          document.getElementById('noClassesSection').style.display = "none";
        }

      });

    } else {

      if (pageType == "student-joinClass") {
        document.getElementById('loadingIndicator').style.display = "none";

        document.getElementById('classesSection-description').style.display = "none";

        document.getElementById('noClasses-Section').style.display = "initial";

      } else {
        document.getElementById('loadingIndicator').style.display = "none";

        document.getElementById('dashboardSection-content').style.display = "none";

        document.getElementById('noClassesSection').style.display = "initial";

      }


    }

  });



  /*

  var _ref = firebase.database().ref().child("UserData").child(studentUsername).child("Classes");

  _ref.once('value').then(function (snapshot) {

    if (snapshot.val() != null) {
      snapshot.forEach((child) => {
        var classCode = child.child("Code").val();
        var className = child.child("class-name").val();

        classesList.push(className);
        classCodes[className] = classCode;
      });

      console.log(classCodes);
    }

  }).then(() => {
    console.log(classesList.length);

    console.log(classesList);

    inital = `
        <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="selectedClassForDropdown">
                  ${classesList[0]}
                </button>
        `;

    selectedClass = classesList[0];

    $(inital).appendTo("#selectedClassForDropdown");


    classesList.forEach(function (item, index) {
      console.log(item, index);
      output = `
          <div class="col-xl-3 col-md-6 mb-4">
                  <div class="card border-left-primary shadow h-100 py-2">
                    <div class="card-body">
                      <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                          <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">CLASS</div>
                          <div class="h5 mb-0 font-weight-bold text-gray-800">${item}</div>
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
          <a class="collapse-item">${item}</a>
          `;

      output3 = `
          <div class="dropdown-item" onclick="setMainClassForMood('${item}', '${classesList[0]}')" id = "${item}">${item}</div>
          `;

      dropDownMenuItems += output3;

      $(output3).appendTo("#dropDownMoodPicker");

      $(output2).appendTo("#classesListSideBar");

      $(output).appendTo("#classesRowDisplay");
    });
  });
  */

}

//realtime db
/*
function updateReaction(reaction) {
  var box = document.getElementById("moodBox");

  box.innerHTML = '<div class="card shadow mb-4" style="width: max-content;"><div class="card-header py-3"><h6 class="m-0 font-weight-bold text-primary">Your Mood</h6></div><div class="card-body"><div class="center-text">Response reported.</div><div><button class = "btn btn-primary" onclick = "reloadPage()">Update Response</button></div></div></div>';

  var currentDate = new Date();

  var studentEmail = localStorage.getItem("email");

  var _ref = firebase.database().ref().child("Classes").child(classCodes[selectedClass]).child("Student Reactions").push();

  _ref.child("Student Email").set(studentEmail);
  _ref.child("Reaction").set(reaction);
  _ref.child("Date").set(currentDate.toString());

  var _reactionRef = firebase.database().ref().child("Classes").child(classCodes[selectedClass]).child("Students").child(studentEmail);
  _reactionRef.child("Reaction").set(reaction);

  var _reactionRefStudent = firebase.database().ref().child("UserData").child(studentEmail);
  _reactionRefStudent.child("Reaction").set(reaction);

  getStudentStatus();


}
*/

// FIRESTORE MIGRATED FULLY
function updateReaction(reaction) {
  var box = document.getElementById("moodBox");

  box.innerHTML = '<center><div class="center-text">Response reported.</div><div><button class = "btn btn-primary" onclick = "reloadPage()">Update Response</button></div></center>';

  var currentDate = new Date();

  var studentEmail = localStorage.getItem("email");


  var classSelected = localStorage.getItem("selectedClassDropdown");

  console.log("TESET:" + classSelected);

  console.log(classCodes);


  firebase.firestore().collection("Classes").doc(classSelected).collection("Student Reactions").doc().set({
    studentEmail: studentEmail,
    reaction: reaction,
    date: currentDate.toString()
  });

  firebase.firestore().collection("Classes").doc(classSelected).collection("Students").doc(studentEmail).update({
    reaction: reaction
  });

  firebase.firestore().collection("UserData").doc(studentEmail).update({
    reaction: reaction
  });

  getStudentStatus();


}

function reloadPage() {
  window.location.reload();
}


//Firestore Migrated Fully
function setMainClassForMood(index) {

  className = classesList[index];

  selectedClass = classCodes[className];

  console.log(selectedClass + ":" + index + ":" + className);

  localStorage.setItem("selectedClassDropdown", selectedClass);

}

//Firestore migrated fully
function checkIfClassCodeExists(addType) {

  if (addType == "no-classes") {

    var code = document.getElementById("inputClassCode-noClasses").value;

    var error = document.getElementById("errorMessage-noClasses");

    console.log(code);

    var exists = false;

    // var _ref = firebase.database().ref().child("Classes").child(code).child("Code");

    firebase.firestore().collection('Classes').doc(code).get().then(function (doc) {
      var classCode = doc.data();

      var email = localStorage.getItem("email");

      if (classCode != null) {
        exists = true;

      } else {
        exists = false;
      }

      if (exists == false) {
        error.innerHTML = `
      <div class="alert alert-danger" role="alert" style="width: 310px;">
      Class code doesn't exist
     </div>
     `;
      }

      if (exists == "enrolledInClass") {
        error.innerHTML = `
     <div class="alert alert-danger" role="alert" style="width: 310px;">
     You are already enrolled in this class
    </div>
    `;
      }

      if (exists == true) {
        error.innerHTML = `
      <div class="alert alert-success" role="alert" style="width: 310px;">
      You have joined this class
     </div>
     `;

        addClassToStudentData(code);

        getStudentClasses(localStorage.getItem("email"));
      }

      console.log(exists);

    });

  } else {

    var code = document.getElementById("inputClassCode").value;

    var error = document.getElementById("errorMessage");

    console.log(code);

    //var exists = false;

    // var _ref = firebase.database().ref().child("Classes").child(code).child("Code");

    firebase.firestore().collection('Classes').doc(code).get().then(function (doc) {
      var classCode = doc.data();
      var email = localStorage.getItem('email');

      var exist = false;

      if (classCode != null) {
        exists = true;
      } else {
        exists = false;
      }

      console.log("EXISTS:" + exists);

      if (exists == false) {
        error.innerHTML = `
      <div class="alert alert-danger" role="alert" style="width: 310px;">
      Class code doesn't exist
     </div>
     `;
      }

      if (exists == "enrolledInClass") {
        error.innerHTML = `
      <div class="alert alert-danger" role="alert" style="width: 310px;">
      You are already enrolled in this class
     </div>
     `;
      }

      if (exists == true) {
        error.innerHTML = `
      <div class="alert alert-success" role="alert" style="width: 310px;">
      You have joined this class
     </div>
     `;

        addClassToStudentData(code);

        getStudentClasses(email);
      }

      console.log(exists);


    });


  }



  // _ref.once('value').then(function (snapshot) {

  // if (snapshot.val() != null) {
  //   exists = true;
  // } else {
  //   exists = false;

  // }

  // if(exists == false){
  //   error.innerHTML = `
  //   <div class="alert alert-danger" role="alert" style="width: 310px;">
  //   Class code doesn't exist
  //  </div>
  //  `;
  // }

  // if(exists == true){
  //   error.innerHTML = `
  //   <div class="alert alert-success" role="alert" style="width: 310px;">
  //   You have joined this class
  //  </div>
  //  `;

  //  addClassToStudentData(code);

  //  getStudentClasses(localStorage.getItem("email"));
  // }

  // console.log(exists);


  // });

}

//Firestore migrated fully
function addClassToStudentData(classCode) {

  var email = localStorage.getItem("email");


  firebase.firestore().collection("Classes").doc(classCode).get().then(function (doc) {
    var classNamE = doc.data()['class-name'];

    firebase.firestore().collection("UserData").doc(email).collection("Classes").doc(classCode).set({
      'Code': classCode.toString(),
      'class-name': classNamE,
    });

    firebase.firestore().collection("Classes").doc(classCode).collection("Students").doc(email).set({
      'name': "ADD NAME PROPERLY",
      'email': email,
    });

  });

  console.log("Success");

  // var _classInfoRef = firebase.database().ref().child("Classes").child(classCode).child("class-name");

  // _classInfoRef.once('value').then(function (snapshot) {
  //   console.log("LOG:" + snapshot.val());
  //   if (snapshot.val() != null) {
  //     className = snapshot.val();
  //   }
  // }).then(() => {
  //   console.log("CLASS NAME: " + className);

  //   var _studentRef = firebase.database().ref().child("UserData").child(localStorage.getItem("email")).child("Classes").child(classCode);

  //   _studentRef.child("Code").set(classCode.toString());
  //   _studentRef.child("class-name").set(className);

  // });

  // var studentEmail = localStorage.getItem("email");

  // var studentName = localStorage.getItem("name");//localStorage.getItem("Formatted Email");

  // var _classInfoStudentRef = firebase.database().ref().child("Classes").child(classCode).child("Students").child(studentEmail);

  // _classInfoStudentRef.child("Name").set(studentName);
  // _classInfoStudentRef.child("Email").set(studentEmail);





}

//FIRESTORE MIGRATED FULLY
function updateAddClasesDropdown(studentUsername) {

  let output = "";

  classesList = [];

  
  firebase.firestore().collection("UserData").doc(studentUsername).collection("Classes").get().then(function (doc) {
  
    doc.forEach(snapshot => {

      var classData = snapshot.data();

      var classCode = classData["Code"];
      var className = classData["class-name"];

      classesList.push(className);
      classCodes[className] = classCode;
    });

  }).then(() => {
    console.log(classesList.length);

    console.log(classesList);

    inital = `
        <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="selectedClassForDropdown">
                  ${classesList[0]}
                </button>
        `;

    selectedClass = classesList[0];

    $(inital).appendTo("#selectedClassForDropdown");


    classesList.forEach(function (item, index) {
      console.log(item, index);

      output2 = `
          <a class="collapse-item">${item}</a>
          `;


      $(output2).appendTo("#classesListSideBar");
    });
  });;

  /*
  var _ref = firebase.database().ref().child("UserData").child(studentUsername).child("Classes");

  _ref.once('value').then(function (snapshot) {

    if (snapshot.val() != null) {
      snapshot.forEach((child) => {
        var classCode = child.child("Code").val();
        var className = child.child("class-name").val();

        classesList.push(className);
        classCodes[className] = classCode;
      });

      console.log(classCodes);
    }

  }).then(() => {
    console.log(classesList.length);

    console.log(classesList);

    inital = `
        <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="selectedClassForDropdown">
                  ${classesList[0]}
                </button>
        `;

    selectedClass = classesList[0];

    $(inital).appendTo("#selectedClassForDropdown");


    classesList.forEach(function (item, index) {
      console.log(item, index);
      output = `
          <div class="col-xl-3 col-md-6 mb-4">
                  <div class="card border-left-primary shadow h-100 py-2">
                    <div class="card-body">
                      <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                          <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">CLASS</div>
                          <div class="h5 mb-0 font-weight-bold text-gray-800">${item}</div>
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
          <a class="collapse-item">${item}</a>
          `;

      output3 = `
          <div class="dropdown-item" onclick="setMainClassForMood('${item}', '${classesList[0]}')" id = "${item}">${item}</div>
          `;

      dropDownMenuItems += output3;

      $(output3).appendTo("#dropDownMoodPicker");

      $(output2).appendTo("#classesListSideBar");

      $(output).appendTo("#classesRowDisplay");
    });
  });

  */

}


function getStudentContactsList(studentUsername) {

  let output = "";

  var classesListContacts = [];

  var _ref = firebase.database().ref().child("UserData").child(studentUsername).child("Classes");

  _ref.once('value').then(function (snapshot) {

    if (snapshot.val() != null) {
      snapshot.forEach((child) => {
        var className = child.child("class-name").val();

        classesListContacts.push(className);

      });

    }

  }).then(() => {

    inital = `
    <div class="chat-contactBox-active">

                    <h3 style="font-weight: 700; padding-top: 28px; margin-left: 20px;">${classesListContacts[0]}</h3>

                  </div>
        `;

    $(inital).appendTo("#contactsSection");


    classesListContacts.forEach(function (item, index) {
      console.log(item, index);
      output = `
      <div class="chat-contactBox">

      <h3 style="font-weight: 700; padding-top: 28px; margin-left: 20px;">${item}</h3>

    </div>
          `;

      $(output).appendTo("#contactsSection");
    });
  });

}


//FIRESTORE FULLY MIGRATED
function getStudentStatus() {

  var studentEmail = localStorage.getItem("email");

  var page = document.getElementById('currentStatusSection');

  firebase.firestore().collection('UserData').doc(studentEmail).get().then(function (doc) {
    var value = doc.data()["Reaction"];

    console.log("REACTION:" + value);

    if (value != undefined) {
      if (value == "needs help") {
        page.innerHTML = `<h1  class="icon-hover" style = "margin-right: 20px; font-size: 70px;" >&#128545;</h1>`;
      }

      if (value == "meh") {
        page.innerHTML = `<h1  class="icon-hover" style = "margin-right: 20px; margin-left: 20px; font-size: 70px;" style="color: yellow;">&#128533;</h1>`;
      }

      if (value == "good") {
        page.innerHTML = `<h1 class="icon-hover" style = "margin-left: 20px; font-size: 70px;" style="color: green;">&#128513;</h1>`;
      }
    } else {
      page.innerHTML = `<h1  class="icon-hover" style = "margin-right: 20px; font-size: 70px;" >&#128513;</h1>`;
    }

  });

}

//FIRESTORE MIGRATED FULLY
function getMeetings(pageType) {

  var email = localStorage.getItem("email");

  //GETS MEETINGS FOR MEETINGS PAGE
  if(pageType == "meetingsPage"){
    firebase.firestore().collection('UserData').doc(email).collection("Meetings").orderBy("Date").get().then(function (doc) {

      console.log("GETTING MEETINGS Main page");
  
      var meetingsCount = 0;
  
      doc.forEach(snapshot => {
  
        meetingsCount += 1;
  
        var meetingsData = snapshot.data();
  
        var classForMeeting = meetingsData["Course"];
        var date = meetingsData["Date"];
        var title = meetingsData["Title"];
  
        console.log(date);
  
        output = `
          <div class="col-xl-6 col-md-6 mb-4">
          <div class="card border-left-primary shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">${classForMeeting}</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">${title}</div>
                  <h6 style = 'color: gray; font-weight: 700'>${date}</h6>
                </div>
                <div class="col-auto">
  
                  <i class="fas fa-microphone-alt fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
          `;
  
        $(output).appendTo("#meetingsList-main-page");
      });
  
      //console.log("MEETINGS LIST: " + meetingsCount);
  
  
      if (meetingsCount == 0) {
  
       document.getElementById("loadingIndicator").style.display = "none";
       document.getElementById("all-meetings-widget").style.display = "none";
       document.getElementById("no-meetings-section").style.display = "initial";

      } else {
        document.getElementById("loadingIndicator").style.display = "none";
        document.getElementById("all-meetings-widget").style.display = "initial";
        document.getElementById("no-meetings-section").style.display = "none";
      }
  
    });
  } 
  
  
  //GETS MEETINGS FOR DASHBOARD PAGE SECTION 

  if(pageType == "dashboard"){
    firebase.firestore().collection('UserData').doc(email).collection("Meetings").orderBy("Date").limitToLast(3).get().then(function (doc) {

      console.log("GETTING MEETINGS Dashboard");
  
      var meetingsCount = 0;
  
      doc.forEach(snapshot => {
  
        meetingsCount += 1;
  
        var meetingsData = snapshot.data();
  
        var classForMeeting = meetingsData["Course"];
        var date = meetingsData["Date"];
        var title = meetingsData["Title"];
  
        console.log(date);
  
        output = `
          <div class="col-xl-12 col-md-6 mb-4">
          <div class="card border-left-primary shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">${classForMeeting}</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">${title}</div>
                  <h6 style = 'color: gray; font-weight: 700'>${date}</h6>
                </div>
                <div class="col-auto">
  
                  <i class="fas fa-microphone-alt fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
          `;
  
        $(output).appendTo("#meetingsList");
      });
  
      //console.log("MEETINGS LIST: " + meetingsCount);
  
  
      if (meetingsCount == 0) {
        outputError = `
        <center>
        <img src = "img/undraw_Booked_j7rj.svg" width="70%">
  
        <h2 style="margin-top: 2%;">No Scheduled Meetings</h2>
        <p>You're all caught up</p>
      </center>
          `;
  
        $(outputError).appendTo("#meetingsList");
      } else {
  
      }
  
    });
  }

  /*

  var _ref = firebase.database().ref().child("UserData").child(name).child("Meetings");


  _ref.once('value').then(function (snapshot) {

    console.log("MEETINGS:" + snapshot.val());

    if (snapshot.val() != null) {
      snapshot.forEach((child) => {
        var classForMeeting = child.child("Course").val();
        var date = child.child("Date").val();
        var title = child.child("Title").val();

        console.log(child.val());

        output = `
        <div class="col-xl-5 col-md-6 mb-4" style = "min-width: 400px">
        <div class="card border-left-primary shadow h-100 py-2">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">${classForMeeting}</div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">${title}</div>
              </div>
              <div class="col-auto">
                <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
              </div>
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

function getAnnouncements(pageType = "annoncements-page-main") {

  document.getElementById("loadingIndicator").style.display = "initial";

  var email = localStorage.getItem("email");

  var classesListCodes = [];

  var classnamesList = [];

  firebase.firestore().collection('UserData').doc(email).collection("Classes").get().then(function (doc) {

    doc.forEach(snapshot => {
      var classData = snapshot.data();

      if (classData != undefined && classData != null) {

        var classCode = classData["Code"];
        var className = classData["class-name"];


        classesListCodes.push(classCode);

        classnamesList.push(className);
      }
    });

  }).then(() => {

    if(pageType == 'dashboard'){

      var announcementsCount = 0;

      for (let i = 0; i <= classesListCodes.length; i++) {
        var classcode = classesListCodes[i];
        console.log("CLASS CODE: " + classcode);
  
        if (classcode != undefined && classcode != null) {
  
          firebase.firestore().collection('Classes').doc(classcode).collection("Announcements").orderBy("Timestamp").limitToLast(3).get().then(function (doc) {
  
  
            doc.forEach(snapshot => {
  
              var annoucementData = snapshot.data();
  
              if (annoucementData != undefined && annoucementData != null) {
                outputAnnouncements = "";
  
                announcementsCount += 1;
  
                console.log(announcementsCount);
  
                var title = annoucementData["Title"];
                var message = annoucementData["Message"];
                var date = annoucementData['Date'];
  
                console.log(title);
                console.log(message);
  
                var nameClass = classnamesList[i];
  
                outputDashboard = `

                <div class="col-xl-12 col-md-6 mb-4">
                <div class="card border-left-success" style = 'height: max-content'>
                      <div class="card-body">
                        <p class="m-0 font-weight-bold text-primary">${nameClass}</p>
                        <p>${message}</p>

                        <p style = 'font-weight: 700; margin-bottom: -3%'>${date}</p>
                      </div>
                    </div>

                    </div>
                `;

                $(outputDashboard).appendTo("#AnnouncementsPageSection");
              
  
              }
            });
          });
        }
  
      }
  
      setTimeout(() => {
  //IF there is no annonucements
  
  if (announcementsCount == 0) {
  
    var noAnnouncementsHTML = ` 
      
    <center>
    <img src="img/undraw_work_chat_erdt.svg" width="73%">
  
    <h2 style="margin-top: 3%;">No Announcements</h2>
    <p>You're all caught up</p>
  </center>
    `;
  document.getElementById("AnnouncementsPageSection").innerHTML = noAnnouncementsHTML;
  
  } else {
  
  }
       }, 1000)
    } 
    
    
    
    //////////////////////////////////////////////////////////////////////////////////////////
    
    
    else {
      var announcementsCount = 0;

      for (let i = 0; i <= classesListCodes.length; i++) {
        var classcode = classesListCodes[i];
        console.log("CLASS CODE: " + classcode);
  
        if (classcode != undefined && classcode != null) {
  
          firebase.firestore().collection('Classes').doc(classcode).collection("Announcements").get().then(function (doc) {
  
  
            doc.forEach(snapshot => {
  
              var annoucementData = snapshot.data();
  
              if (annoucementData != undefined && annoucementData != null) {
                outputAnnouncements = "";
  
                announcementsCount += 1;
  
                console.log(announcementsCount);
  
                var title = annoucementData["Title"];
                var message = annoucementData["Message"];
                var date = annoucementData['Date'];
  
                console.log(title);
                console.log(message);
  
                var nameClass = classnamesList[i];
  
                outputAnnouncements = `
                <div class="col-xl-6 col-md-6 mb-4">
                <div class="card border-left-primary shadow h-100 py-2">
                  <div class="card-body">
                    <div class="row no-gutters align-items-center">
                      <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">${nameClass}</div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">${message}</div>
  
                        <div class="h6 mb-0" style = "color: #a2a39b">${date}</div>
                      </div>
                      <div class="col-auto">
                        <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                `;
  
                  $(outputAnnouncements).appendTo("#annoucementsSection");
              }
            });
          });
        }
  
      }
  
      setTimeout(() => {
  //IF there is no annonucements
  
  if (announcementsCount == 0) {


      document.getElementById("loadingIndicator").style.display = "none";
  
      document.getElementById("announcementsSection-section").style.display = "none";
      
      document.getElementById("no-Announcements-section").style.display = "initial";
  
  } else {
  

      document.getElementById("loadingIndicator").style.display = "none";
  
      document.getElementById("announcementsSection-section").style.display = "initial";
      
      document.getElementById("no-Announcements-section").style.display = "none";
  }
       }, 1000)
    }




  });
}