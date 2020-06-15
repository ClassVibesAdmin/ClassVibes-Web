
function validateAccountState(page){
    var email = localStorage.getItem('email');

    var _ref = firebase.database().ref().child("UserData").child(email).child('Account Status');

    _ref.once('value').then(function (snapshot) {
        if(snapshot.val() == "Deactivated"){
            document.getElementById('deactivatedAccountSection').style.display = "initial";
            document.getElementById('createDistrictOptions').style.display = "none";

            return "Deactivated";

        } else if(snapshot.val() == "Activated"){

            if(page == 'dashboard'){
                getDistrictStatus();
            }

            if(page = 'createPage'){
                getDistrictStatusCreatePage();
            }

            return "Activated";
        }
    });
}

function getDistrictStatus(){
    var email = localStorage.getItem('email');

    var _ref = firebase.database().ref().child("UserData").child(email).child('Districts');

    _ref.once('value').then(function (snapshot) {



        

        if(snapshot.val() == null){
            document.getElementById('createDistrictOptions').style.display = "initial";
            document.getElementById('districtInfo-stats').style.display = "none";
        } else {
            document.getElementById('districtInfo-stats').style.display = "initial";
            document.getElementById('createDistrictOptions').style.display = "none";

            var key = 0;

            snapshot.forEach((child) => {
                key = child.child('Code').val();
            });

            getDistrictData(key);
        }
    });
}

function getDistrictStatusCreatePage(){
    var email = localStorage.getItem('email');

    var _ref = firebase.database().ref().child("UserData").child(email).child('Districts');

    _ref.once('value').then(function (snapshot) {
        //console.log(snapshot.val());

        if(snapshot.val() == null){
            document.getElementById('createDistrict-page').style.display = "initial";
            document.getElementById('quotaReached').style.display = "none";
        } else {
            document.getElementById('createDistrict-page').style.display = "none";
            document.getElementById('quotaReached').style.display = "initial";
        }
    });
}

function createDistrict(){

    var userEmail = localStorage.getItem('email');
    var name = document.getElementById('districtName').value;
    var email = document.getElementById('districtEmail').value;
    var website = document.getElementById('districtWebsite').value;
    var headOffice = document.getElementById('districtAddress').value;
    var headEmail = document.getElementById('districtEmailHead').value;
    var phone = document.getElementById('districtPhone').value;
    var socialMedia = document.getElementById('districtSocialMedia').value;

    var errorMessage = document.getElementById('districtCreateError');

    if(name,email,website,headOffice,headEmail,phone,socialMedia == ""){

        var errorHTML = `
        <div class="alert alert-danger" role="alert"
        style="margin-top: 20px; width: 100%;">
        <strong>Error! </strong> You can't leave any fields blank
    </div>
        `;

        errorMessage.innerHTML = errorHTML;
        
    } else {
        errorMessage.innerHTML = "";

        var code = Math.floor(100000 + Math.random() * 900000);

        console.log(code);

        var _ref = firebase.database().ref().child('Districts').child(code).child('Name');

        _ref.once('value').then(function (snapshot) {
            var exists = snapshot.val();

            while(exists != null){

                function generateNew(){
                    _newRef.once('value').then(function (snapshot) {
                        if(snapshot.val() == null){
                            code = newCode;
                            return true;
                        }else {
                            return false;
                        }
                    });
                }
                console.log("exists");
                var newCode = Math.floor(100000 + Math.random() * 900000);

                console.log(newCode);

                var _newRef = firebase.database().ref().child('Districts').child(newCode).child('Name');

                var newCode = generateNew();

                if(newCode == true){
                    break
                }
                

            }
        }).then(() => {
            var _ref = firebase.database().ref().child('Districts').child(code);

            _ref.child("Name").set(name);
            _ref.child("Email").set(email);
            _ref.child("Website").set(website);
            _ref.child("Address").set(headOffice);
            _ref.child("Head Email").set(headEmail);
            _ref.child("Phone").set(phone);
            _ref.child("Social Media Links").set(socialMedia);
            _ref.child("Code").set(code);

            var _ref = firebase.database().ref().child('UserData').child(userEmail).child("Districts").child(code);

            _ref.child("Name").set(name);
            _ref.child("Code").set(code);
        });
    }
}

function getDistrictData(code){
    var students = 0;
    var teachers = 0;
    var schools = 0;
    var pendingTeacherRequests = 0;

    var districtName = "";

    //District NAME GET

    var _districtNameRef = firebase.database().ref().child('Districts').child(code).child("Name");

    _districtNameRef.once('value').then(function (snapshot) {
        var value = snapshot.val();

        if(value == null || value == undefined){
            $('#districtName').text("Loading...");
        } else {
            districtName = snapshot.val();
            $('#districtName').text(districtName);
        }
    });

    //STUDENTS GET

    var _studentRef = firebase.database().ref().child('Districts').child(code).child("Student Count");

    _studentRef.once('value').then(function (snapshot) {
        var value = snapshot.val();

        if(value == null || value == undefined){
            students = 0;
            _studentRef.set(students);
        } else {
            students = snapshot.val();

            $('#studentsCount').text(students);
        }
    });

    //TEACHERS GET

    var _teacherRef = firebase.database().ref().child('Districts').child(code).child("Teacher Count");

    _teacherRef.once('value').then(function (snapshot) {
        var value = snapshot.val();

        if(value == null || value == undefined){
            teachers = 0;
            _teacherRef.set(teachers);
        } else {
            teachers = snapshot.val();

            $('#teachersCount').text(teachers);
        }
    });

    //SCHOOLS GET

    var _schoolsRef = firebase.database().ref().child('Districts').child(code).child("Schools Count");

    _schoolsRef.once('value').then(function (snapshot) {
        var value = snapshot.val();

        if(value == null || value == undefined){
            schools = 0;
            _schoolsRef.set(schools);
        } else {
            schools = snapshot.val();

            $('#teachersCount').text(schools);
        }
    });

    //PENDING REQUESTS GET

    var _pendingRequestsRef = firebase.database().ref().child('Districts').child(code).child("Pending Requests");

    _pendingRequestsRef.once('value').then(function (snapshot) {
        var value = snapshot.val();

        if(value == null || value == undefined || value == 0){
            pendingTeacherRequests = 0;
            _pendingRequestsRef.set(pendingTeacherRequests);
        } else {
            pendingTeacherRequests = snapshot.val();

            $('#pendingRequests').html(`${pendingTeacherRequests} <span class="badge badge-warning" style="padding-top: -6px;">New</span>`);
        }
    });

    //PLAN DETAILS GET

    var _planDetailsRef = firebase.database().ref().child('Districts').child(code).child("Plan Details");

    _planDetailsRef.once('value').then(function (snapshot) {

        var value = snapshot.val();

        var planActivated = snapshot.child("Plan Activated").val();
        var planExpires = snapshot.child("Plan Expires").val();
        var planName = snapshot.child("Plan Name").val();
        var planStatus = snapshot.child("Plan Status").val();

        if(planStatus == null || planStatus == undefined || planStatus == "Deactivated"){
            $('#planStatus').html(`<span class="badge badge-danger" >Inactive</span>`);

        } else {
            
            $('#planStatus').html(`<span class="badge badge-success" >${planStatus}</span>`);
            $('#activatedDate').text(planActivated);
            $('#expireDate').text(planExpires);
            $('#planName').html(`<span class="badge badge-warning" >${planName}</span>`);

            function dateDiffInDays(date1, date2) {
                // round to the nearest whole number
                return Math.round((date2-date1)/(1000*60*60*24));
            }
            var totalDays=dateDiffInDays(new Date(planActivated), new Date(planExpires));

            var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); 
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;


            var untilExpireDays=dateDiffInDays(new Date(today), new Date(planExpires));

            if(totalDays == 0){
                console.log("PLAN EXPIRED");
            }

            console.log(totalDays);


            console.log("DAYS LEFT: " + untilExpireDays);

            var percentage = Math.round((untilExpireDays/totalDays)*100);

          console.log(percentage + "%");

          var totalMinusPercentage = 100 - percentage;
          console.log(totalMinusPercentage + "%/100");

          document.getElementById('percentageBar').style.width = totalMinusPercentage + "%";
        }
    });

    


}