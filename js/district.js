
function validateAccountState(){
    var email = localStorage.getItem('email');

    var _ref = firebase.database().ref().child("UserData").child(email).child('Account Status');

    _ref.once('value').then(function (snapshot) {
        if(snapshot.val() == "Deactivated"){
            document.getElementById('deactivatedAccountSection').style.display = "initial";
        } else if(snapshot.val() == "Activated"){
            getDistrictStatus();
        }
    });
}

function getDistrictStatus(){
    var email = localStorage.getItem('email');

    var _ref = firebase.database().ref().child("UserData").child(email).child('Districts');

    _ref.once('value').then(function (snapshot) {
        if(snapshot.val() == null){
            document.getElementById('createDistrictOptions').style.display = "initial";
        } else {
            document.getElementById('districtInfo-stats').style.display = "initial";
        }
    });
}

function createDistrict(){
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

        var _ref = firebase.database().ref().child('Districts');

        _ref.child("Name").set(name);
        _ref.child("Email").set(email);
        _ref.child("Website").set(website);
        _ref.child("Address").set(headOffice);
        _ref.child("Name").set(name);
        _ref.child("Name").set(name);
        _ref.child("Name").set(name);

    }
}