function facebookLogin() {
    base_provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(base_provider).then(function (result) {
        console.log(result);
        console.log("Success, Facebook Account Linked");
        var user = result.user;
        var email = user.email;
        var name3 = user.displayName;
        var profilePic = user.photoURL;
        var formattedEmail1 = email.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '-');
        console.log(formattedEmail1);
        localStorage.setItem("photo", profilePic);
        localStorage.setItem("email", formattedEmail1);
        localStorage.setItem("name", name3);
        var _ref = firebase.database().ref().child("UserData").child(formattedEmail1);
        console.log(formattedEmail1);
        console.log(name);
        _ref.child("display-name").set(name3);
        _ref.child("email").set(email);
        _ref.child("username").set(formattedEmail1);
        localStorage.setItem("email", formattedEmail1);
        window.location = "/dashboard.html";

    }).catch(function (err) {
        console.log(err)
        console.log("Facebook Sign In Failed")
        if(err.code == "auth/account-exists-with-different-credential"){
            console.log("credentials exist");
            document.getElementById("alert4").innerHTML = `<strong>Oops!</strong> There is already an account with this email</div>`;
        }
        document.getElementById("alert4").style.display = "initial";
    })
}



googleSignIn = () => {
    base_provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(base_provider).then(function (result) {
        console.log(result);
        console.log("Success, Google Account Linked");
        var user = result.user;
        var email = user.email;
        var name3 = user.displayName;
        var profilePic = user.photoURL;
        var formattedEmail1 = email.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '-');
        console.log(formattedEmail1);
        localStorage.setItem("photo", profilePic);
        localStorage.setItem("email", formattedEmail1);
        localStorage.setItem("name", name3);
        var _ref = firebase.database().ref().child("UserData").child(formattedEmail1);
        console.log(formattedEmail1);
        console.log(name);
        _ref.child("display-name").set(name3);
        _ref.child("email").set(email);
        _ref.child("username").set(formattedEmail1);
        localStorage.setItem("email", formattedEmail1);
        window.location = "/dashboard.html";

    }).catch(function (err) {
        console.log(err)
        console.log("Google Sign In Failed")
        document.getElementById("alert3").style.display = "initial";
    })


}

googleSignInStudent = () => {
    base_provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(base_provider).then(function (result) {
        console.log(result);
        console.log("Success, Google Account Linked");
        var user = result.user;
        var email = user.email;
        var name3 = user.displayName;
        var profilePic = user.photoURL;
        var formattedEmail1 = email.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '-');
        console.log(formattedEmail1);
        localStorage.setItem("photo", profilePic);
        localStorage.setItem("email", formattedEmail1);
        localStorage.setItem("name", name3);
        var _ref = firebase.database().ref().child("UserData").child(formattedEmail1);
        console.log(formattedEmail1);
        console.log(name);
        _ref.child("display-name").set(name3);
        _ref.child("email").set(email);
        _ref.child("username").set(formattedEmail1);
        localStorage.setItem("email", formattedEmail1);
        window.location = "/studentDashboard.html";




    }).catch(function (err) {
        console.log(err)
        console.log("Google Sign In Failed")
        document.getElementById("alert3").style.display = "initial";
    })


}

const btnLogout = document.getElementById("btnLogout");


function checkServerStatus(signInType){
    var _ref = firebase.database().ref().child("Application Management").child("serversAreUp");

    var serverMessage = document.getElementById("serverStatusMessage");

    var errorMessage = `
    <img src = "img/undraw_server_down_s4lk.svg" class = "img-fluid" style = "margin-bottom: 50px">
    <div class="alert alert-warning" role="alert" id = "serverStatusMessage"
    style="margin-top: 20px; width: 600px; display: initial;">
    <strong><i class="fas fa-cloud"></i>  Cloud Error </strong>Servers are experiencing downtime
</div>`;

    _ref.once('value').then(function (snapshot) {
        var status = snapshot.val();

        console.log('Status: ' + status);

        if(status == null || status == undefined){
            console.log("NULL");
            $('#serverStatusMessage').replaceWith(errorMessage);
        } else {
            if(status == false){
                serverMessage.parentNode.innerHTML = errorMessage;
            } else {
                if(signInType == "GoogleSignIn"){
                    googleSignIn()
                } else if(signInType == "FacebookLogin"){
                    facebookLogin();
                } else if (signInType == "GoogleSignInStudent"){
                    googleSignInStudent();
                }
            }
        }
    });
}

function emailSignUp(type){

    var email = document.getElementById('inputEmail').value;
    var displayName = document.getElementById('inputDisplayName').value;
    var password = document.getElementById('inputPassword').value;
    var repeatPassword = document.getElementById('inputRepeatPassword').value;

    var errorMessage = document.getElementById('signupError');

    var errorHTML = `<div class="alert alert-danger" role="alert"
    style="margin-top: 20px; width: 94%; margin-left: 6%;">
    <strong>Oops! </strong>${errorMessage}
</div>`;

    if(email == "" || displayName == "" || password == "" || repeatPassword == ""){
        errorHTML = `<div class="alert alert-danger" role="alert" 
    style="margin-top: 20px; width: 94%; margin-left: 6%;">
    <strong>Oops! </strong> You cannot leave any of the fields blank
</div>`;

        errorMessage.innerHTML = errorHTML;
    } else {
        if(password != repeatPassword){
            errorHTML = `<div class="alert alert-danger" role="alert"
            style="margin-top: 20px; width: 94%; margin-left: 6%;">
            <strong>Oops! </strong> Password and repeat password dont' match
        </div>`;
        
                errorMessage.innerHTML = errorHTML;
        } else {

            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorMessage);

                errorHTML = `<div class="alert alert-danger" role="alert"
            style="margin-top: 20px; width: 94%; margin-left: 6%;">
            <strong>Oops! </strong> ERROR
        </div>`;
        
                errorMessage.innerHTML = errorHTML;
                // ...
              });
              
        }
    }
}

