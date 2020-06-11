

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









//Add login event







firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
    } else {
        console.log('not logged in')
    }
})

const btnLogout = document.getElementById("btnLogout").value;


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
                }
            }
        }
    });
}












