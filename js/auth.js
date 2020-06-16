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

function facebookLoginStudent() {
    base_provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(base_provider).then(function (result) {
        var user = result.user;
        var email = user.email;
        var name3 = user.displayName;
        var profilePic = user.photoURL;

        var errorMessage = document.getElementById('signupError');

        var formattedEmail = email.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '-');

        var _ref = firebase.database().ref().child("UserData").child(formattedEmail).child("Account Type");

        _ref.once('value').then(function (snapshot) {
            var exists = snapshot.val();

            console.log(exists);

            if(exists == null){
                errorHTML = `<div class="alert alert-danger" role="alert" 
                style="margin-top: 20px; width: 94%; margin-left: 6%;">
                <strong>Oops! </strong> This account is not yet registered. <a href = "signup.html">Sign Up</a>
            </div>`;
            
                    errorMessage.innerHTML = errorHTML;
                

            } else {

                if(exists == "Student"){
                    localStorage.setItem("photo", profilePic);
                    localStorage.setItem("email", formattedEmail);
                    localStorage.setItem("name", name3);
    
                    window.location = "/studentDashboard.html";
    
                    window.location = "/studentDashboard.html";
                }else {
                    errorHTML = `<div class="alert alert-danger" role="alert" 
                style="margin-top: 20px; width: 94%; margin-left: 6%;">
                <strong>Oops! </strong> This account was signed up as a ${exists} account. You do not have sufficient permissions.
            </div>`;
            
                    errorMessage.innerHTML = errorHTML;
                }
                
            }

        });

        

    }).catch(function (err) {

        var errorMessage = document.getElementById('signupError');

        console.log(err)
        console.log("Facebook Sign In Failed");

        if(err.code == "auth/account-exists-with-different-credential"){
            errorHTML = `<div class="alert alert-danger" role="alert" 
            style="margin-top: 20px; width: 94%; margin-left: 6%;">
            <strong>Oops! </strong> An account with this email is already registered.
        </div>`;
        
                errorMessage.innerHTML = errorHTML;
        }
    })
}

function facebookLoginDistrict() {
    base_provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(base_provider).then(function (result) {
        var user = result.user;
        var email = user.email;
        var name3 = user.displayName;
        var profilePic = user.photoURL;

        var errorMessage = document.getElementById('signupError');

        var formattedEmail = email.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '-');

        var _ref = firebase.database().ref().child("UserData").child(formattedEmail).child("Account Type");

        _ref.once('value').then(function (snapshot) {
            var exists = snapshot.val();

            console.log(exists);

            if(exists == null){
                errorHTML = `<div class="alert alert-danger" role="alert" 
                style="margin-top: 20px; width: 94%; margin-left: 6%;">
                <strong>Oops! </strong> This account is not yet registered. <a href = "signup.html">Sign Up</a>
            </div>`;
            
                    errorMessage.innerHTML = errorHTML;
                

            } else {

                if(exists == "District"){
                    localStorage.setItem("photo", profilePic);
                    localStorage.setItem("email", formattedEmail);
                    localStorage.setItem("name", name3);
    
                    window.location = "/dashboard.html";
    
                    window.location = "/districtDashboard.html";
                }else {
                    errorHTML = `<div class="alert alert-danger" role="alert" 
                style="margin-top: 20px; width: 94%; margin-left: 6%;">
                <strong>Oops! </strong> This account was signed up as a ${exists} account. You do not have sufficient permissions.
            </div>`;
            
                    errorMessage.innerHTML = errorHTML;
                }
                
            }

        });

        

    }).catch(function (err) {

        var errorMessage = document.getElementById('signupError');

        console.log(err)
        console.log("Facebook Sign In Failed");

        if(err.code == "auth/account-exists-with-different-credential"){
            errorHTML = `<div class="alert alert-danger" role="alert" 
            style="margin-top: 20px; width: 94%; margin-left: 6%;">
            <strong>Oops! </strong> An account with this email is already registered.
        </div>`;
        
                errorMessage.innerHTML = errorHTML;
        }
    })
}

function facebookLoginTeacher() {
    base_provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(base_provider).then(function (result) {
        var user = result.user;
        var email = user.email;
        var name3 = user.displayName;
        var profilePic = user.photoURL;

        var errorMessage = document.getElementById('signupError');

        var formattedEmail = email.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '-');

        var _ref = firebase.database().ref().child("UserData").child(formattedEmail).child("Account Type");

        _ref.once('value').then(function (snapshot) {
            var exists = snapshot.val();

            console.log(exists);

            if(exists == null){
                errorHTML = `<div class="alert alert-danger" role="alert" 
                style="margin-top: 20px; width: 94%; margin-left: 6%;">
                <strong>Oops! </strong> This account is not yet registered. <a href = "signup.html">Sign Up</a>
            </div>`;
            
                    errorMessage.innerHTML = errorHTML;
                

            } else {

                if(exists == "Teacher"){
                    localStorage.setItem("photo", profilePic);
                    localStorage.setItem("email", formattedEmail);
                    localStorage.setItem("name", name3);
    
                    window.location = "/dashboard.html";
                }else {
                    errorHTML = `<div class="alert alert-danger" role="alert" 
                style="margin-top: 20px; width: 94%; margin-left: 6%;">
                <strong>Oops! </strong> This account was signed up as a ${exists} account. You do not have sufficient permissions.
            </div>`;
            
                    errorMessage.innerHTML = errorHTML;
                }
                
            }

        });

        

    }).catch(function (err) {

        var errorMessage = document.getElementById('signupError');

        console.log(err)
        console.log("Facebook Sign In Failed");

        if(err.code == "auth/account-exists-with-different-credential"){
            errorHTML = `<div class="alert alert-danger" role="alert" 
            style="margin-top: 20px; width: 94%; margin-left: 6%;">
            <strong>Oops! </strong> An account with this email is already registered.
        </div>`;
        
                errorMessage.innerHTML = errorHTML;
        }
    })
}

googleSignInTeacher = () => {
    base_provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(base_provider).then(function (result) {
        var user = result.user;
        var email = user.email;
        var name3 = user.displayName;
        var profilePic = user.photoURL;

        var errorMessage = document.getElementById('signupError');

        var formattedEmail = email.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '-');

        var _ref = firebase.database().ref().child("UserData").child(formattedEmail).child("Account Type");

        _ref.once('value').then(function (snapshot) {
            var exists = snapshot.val();

            if(exists == null){
                errorHTML = `<div class="alert alert-danger" role="alert" 
                style="margin-top: 20px; width: 94%; margin-left: 6%;">
                <strong>Oops! </strong> This account is not yet registered. <a href = "signup.html">Sign Up</a>
            </div>`;
            
                    errorMessage.innerHTML = errorHTML;
                

            } else {
                if(exists == "Teacher"){
                    localStorage.setItem("photo", profilePic);
                    localStorage.setItem("email", formattedEmail);
                    localStorage.setItem("name", name3);
    
                    window.location = "/dashboard.html";
                }else {
                    errorHTML = `<div class="alert alert-danger" role="alert" 
                style="margin-top: 20px; width: 94%; margin-left: 6%;">
                <strong>Oops! </strong> This account was signed up as a ${exists} account. You do not have sufficient permissions.
            </div>`;
            
                    errorMessage.innerHTML = errorHTML;
                }
            }

        });

        

    }).catch(function (err) {
        console.log(err)
        console.log("Google Sign In Failed");
    })
}

googleSignInDistrict = () => {
    base_provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(base_provider).then(function (result) {
        var user = result.user;
        var email = user.email;
        var name3 = user.displayName;
        var profilePic = user.photoURL;

        var errorMessage = document.getElementById('signupError');

        var formattedEmail = email.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '-');

        var _ref = firebase.database().ref().child("UserData").child(formattedEmail).child("Account Type");

        _ref.once('value').then(function (snapshot) {
            var exists = snapshot.val();

            if(exists == null){
                errorHTML = `<div class="alert alert-danger" role="alert" 
                style="margin-top: 20px; width: 94%; margin-left: 6%;">
                <strong>Oops! </strong> This account is not yet registered. <a href = "signup.html">Sign Up</a>
            </div>`;
            
                    errorMessage.innerHTML = errorHTML;
                

            } else {
                if(exists == "District"){
                    localStorage.setItem("photo", profilePic);
                    localStorage.setItem("email", formattedEmail);
                    localStorage.setItem("name", name3);
    
                    window.location = "/districtDashboard.html";
                }else {
                    errorHTML = `<div class="alert alert-danger" role="alert" 
                style="margin-top: 20px; width: 94%; margin-left: 6%;">
                <strong>Oops! </strong> This account was signed up as a ${exists} account. You do not have sufficient permissions.
            </div>`;
            
                    errorMessage.innerHTML = errorHTML;
                }
            }

        });

        

    }).catch(function (err) {
        console.log(err)
        console.log("Google Sign In Failed");
    })
}


googleSignInStudent = () => {
    base_provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(base_provider).then(function (result) {
        var user = result.user;
        var email = user.email;
        var name3 = user.displayName;
        var profilePic = user.photoURL;

        var errorMessage = document.getElementById('signupError');

        var formattedEmail = email.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '-');

        var _ref = firebase.database().ref().child("UserData").child(formattedEmail).child("Account Type");

        _ref.once('value').then(function (snapshot) {
            var exists = snapshot.val();

            if(exists == null){
                errorHTML = `<div class="alert alert-danger" role="alert" 
                style="margin-top: 20px; width: 94%; margin-left: 6%;">
                <strong>Oops! </strong> This account is not yet registered. <a href = "signup.html">Sign Up</a>
            </div>`;
            
                    errorMessage.innerHTML = errorHTML;
                

            } else {
                if(exists == "Student"){
                    localStorage.setItem("photo", profilePic);
                    localStorage.setItem("email", formattedEmail);
                    localStorage.setItem("name", name3);


    
                    window.location = "/studentDashboard.html";
                }else {
                    errorHTML = `<div class="alert alert-danger" role="alert" 
                style="margin-top: 20px; width: 94%; margin-left: 6%;">
                <strong>Oops! </strong> This account was signed up as a ${exists} account. You do not have sufficient permissions.
            </div>`;
            
                    errorMessage.innerHTML = errorHTML;
                }
            }

        });

        

    }).catch(function (err) {
        console.log(err)
        console.log("Google Sign In Failed");
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

    document.getElementById('signup-btn-text').style.display = "none";
    document.getElementById('signup-btn-main-button').disabled = true;
    document.getElementById('btn-loading').style.display = "initial";

    var email = document.getElementById('inputEmail').value;
    var displayName = document.getElementById('inputDisplayName').value;
    var password = document.getElementById('inputPassword').value;
    var repeatPassword = document.getElementById('inputRepeatPassword').value;

    var loginSuccess = true;

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
            <strong>Oops! </strong> Password and repeat password don't match
        </div>`;
        
                errorMessage.innerHTML = errorHTML;
        } else {

            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {

                document.getElementById('signupError').innerHTML = "";


                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorMessage);
                console.log(errorCode);

                loginSuccess = false;

                if(errorCode == "auth/invalid-email"){
                    document.getElementById('email-error').innerHTML = errorMessage;
                    document.getElementById('password-error').innerHTML = "";
                } 

                if(errorCode == "auth/weak-password"){
                    document.getElementById('password-error').innerHTML = errorMessage;
                    document.getElementById('email-error').innerHTML = "";
                }

                if(errorCode == "auth/email-already-in-use"){
                    document.getElementById('email-error').innerHTML = errorMessage;
                    document.getElementById('password-error').innerHTML = "";
                }

              }).then(() => {

                console.log(loginSuccess);

                if(loginSuccess == true){
                    var signUpPage = document.getElementById('signup-page-full');

                    signUpPage.style.display = "none";
    
                    var successPage = document.getElementById('signup-success-form');
    
                    successPage.style.display = "initial";

                    //FIREBASE DATABASE UPLOAD

                    if(type == "student"){

                        firebase.firestore().collection("UserData").doc(email).set({
                            "display-name": displayName,
                            "email": email,
                            "username": email,
                            "Account Type": "Student",
                            "Account Status": "Deactivated",
                        });
                   }
                    
                    else if(type == 'teacher'){
                        firebase.firestore().collection("UserData").doc(email).set({
                            "display-name": displayName,
                            "email": email,
                            "username": email,
                            "Account Type": "Teacher",
                            "Account Status": "Deactivated",
                        });
                    } 
                    
                    else if(type == 'district'){
                        firebase.firestore().collection("UserData").doc(email).set({
                            "display-name": displayName,
                            "email": email,
                            "username": email,
                            "Account Type": "District",
                            "Account Status": "Deactivated",
                        });
                    }


                }

              });  
        }
    }

    setTimeout(() => { 
        document.getElementById('signup-btn-text').style.display = "initial";
        document.getElementById('signup-btn-main-button').disabled = false;
        document.getElementById('btn-loading').style.display = "none";
     }, 500)
}


facebookSignUp = (type) => {

    base_provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(base_provider).then(function (result) {

        console.log("Facebook login success:");

        var user = result.user;
        var email = user.email;
        var displayName = user.displayName;
        var profilePic = user.photoURL;
        var formattedEmail = email.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '-');

        var _ref = firebase.database().ref().child("UserData").child(formattedEmail).child('email');

        _ref.once('value').then(function (snapshot) {
            var value = snapshot.val();

            console.log("EXISTS:" + value);

            if(value != null || value != undefined){

                errorHTML = `<div class="alert alert-danger" role="alert"
            style="margin-top: 20px; width: 94%; margin-left: 6%;">
            <strong>Error! </strong> An account with this email already exists
        </div>`;

                document.getElementById('signupError').innerHTML = errorHTML;
            } else {

                if(type == "student"){
                    var _ref = firebase.database().ref().child("UserData").child(formattedEmail);
                    console.log(formattedEmail);
                    _ref.child("display-name").set(displayName);
                    _ref.child("email").set(email);
                    _ref.child("username").set(formattedEmail);
                    _ref.child("Account Type").set('Student');
                    _ref.child("Account Status").set('Deactivated');
                }

                else if(type == 'teacher'){
                    var _ref = firebase.database().ref().child("UserData").child(formattedEmail);
                    console.log(formattedEmail);
                    _ref.child("display-name").set(displayName);
                    _ref.child("email").set(email);
                    _ref.child("username").set(formattedEmail);
                    _ref.child("Account Type").set('Teacher');
                    _ref.child("Account Status").set('Deactivated');
                }

                else if(type == 'district'){

                    var _ref = firebase.database().ref().child("UserData").child(formattedEmail);
                    console.log(formattedEmail);
                    _ref.child("display-name").set(displayName);
                    _ref.child("email").set(email);
                    _ref.child("username").set(formattedEmail);
                    _ref.child("Account Type").set('District');
                    _ref.child("Account Status").set('Deactivated');
                }

                console.log('signup success google');

                setTimeout(() => { 
                    var signUpPage = document.getElementById('signup-page-full');

                    signUpPage.style.display = "none";
    
                    var successPage = document.getElementById('signup-success-form');
    
                    successPage.style.display = "initial";
                 }, 200)
                       
            }
        });


    }).catch(function (err) {
        console.log(err)
        console.log("Facebppl Sign In Failed")
        errorHTML = `<div class="alert alert-danger" role="alert"
            style="margin-top: 20px; width: 94%; margin-left: 6%;">
            <strong>Error! </strong> An account with this email already exists
        </div>`;

                document.getElementById('signupError').innerHTML = errorHTML;
    })
}

googleSignUp = (type) => {

    console.log("TYPE:" + type);

    base_provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(base_provider).then(function (result) {

        console.log("Google login success:");

        var user = result.user;
        var email = user.email;
        var displayName = user.displayName;
        var profilePic = user.photoURL;

        firebase.firestore().collection("UserData").doc(email).get().then((documentSnapshot) => {

            var value = documentSnapshot.data();

            if(value == undefined || value == null){
                
                console.log("EXISTS:" + value);
    
                    errorHTML = `<div class="alert alert-danger" role="alert"
                style="margin-top: 20px; width: 94%; margin-left: 6%;">
                <strong>Error! </strong> An account with this email already exists
            </div>`;
    
                document.getElementById('signupError').innerHTML = errorHTML;
            
            } else {
                if(type == "student"){

                    firebase.firestore().collection("UserData").doc(email).set({
                        "display-name": displayName,
                        "email": email,
                        "username": email,
                        "Account Type": "Student",
                        "Account Status": "Deactivated",
                    });
                }

                else if(type == 'teacher'){
                    firebase.firestore().collection("UserData").doc(email).set({
                        "display-name": displayName,
                        "email": email,
                        "username": email,
                        "Account Type": "Teacher",
                        "Account Status": "Deactivated",
                    });
                }

                else if(type == 'district'){

                    firebase.firestore().collection("UserData").doc(email).set({
                        "display-name": displayName,
                        "email": email,
                        "username": email,
                        "Account Type": "District",
                        "Account Status": "Deactivated",
                    });
                }

                console.log('signup success google');

                setTimeout(() => { 
                    var signUpPage = document.getElementById('signup-page-full');

                    signUpPage.style.display = "none";
    
                    var successPage = document.getElementById('signup-success-form');
    
                    successPage.style.display = "initial";
                 }, 200)

            }
        });

    }).catch(function (err) {
        console.log(err)
        console.log("Google Sign In Failed")
    })
}

function loginWithEmailStudent(){
    var email = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPassword').value;

    var formattedEmail = email.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '-');

    var authValid = true;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorMessage);

        errorHTML = `<div class="alert alert-danger" role="alert"
        style="margin-top: 20px; width: 94%; margin-left: 6%;">
        <strong>Error! </strong> Credentials are not valid.
    </div>`;

            document.getElementById('signupError').innerHTML = errorHTML;

        authValid = false;
        // ...
      }).then(() => {

        if(authValid == true){

            var _ref = firebase.database().ref().child("UserData").child(formattedEmail).child('Account Type');

            _ref.once('value').then(function (snapshot) {
                var exists = snapshot.val();
                console.log(exists);

                if(exists != null){
                    if(exists == "Student"){
                        console.log('Login Success');
                        localStorage.setItem("email", formattedEmail);
                        window.location = "studentDashboard.html";
                    } else {

                        errorHTML = `<div class="alert alert-danger" role="alert" 
                        style="margin-top: 20px; width: 94%; margin-left: 6%;">
                        <strong>Oops! </strong> This account was signed up as a ${exists} account. You do not have sufficient permissions.
                    </div>`;
    
                document.getElementById('signupError').innerHTML = errorHTML;
                
                    }
                } else {
                   
                    errorHTML = `<div class="alert alert-danger" role="alert"
                    style="margin-top: 20px; width: 94%; margin-left: 6%;">
                    <strong>Error! </strong> An unexpected error has acurred, please contact customer support.
                </div>`;
            
                        document.getElementById('signupError').innerHTML = errorHTML; 
                }
            });
            
        }
      });

}

function loginWithEmailTeacher(){
    var email = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPassword').value;

    var formattedEmail = email.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '-');

    var authValid = true;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorMessage);

        errorHTML = `<div class="alert alert-danger" role="alert"
        style="margin-top: 20px; width: 94%; margin-left: 6%;">
        <strong>Error! </strong> Credentials are not valid.
    </div>`;

            document.getElementById('signupError').innerHTML = errorHTML;

        authValid = false;
        // ...
      }).then(() => {

        if(authValid == true){

            var _ref = firebase.database().ref().child("UserData").child(formattedEmail).child('Account Type');

            _ref.once('value').then(function (snapshot) {
                var exists = snapshot.val();
                console.log(exists);

                if(exists != null){
                    if(exists == "Teacher"){


                        console.log('Login Success');

                        localStorage.setItem("email", formattedEmail);


                        window.location = "dashboard.html";
                    } else {

                        errorHTML = `<div class="alert alert-danger" role="alert" 
                        style="margin-top: 20px; width: 94%; margin-left: 6%;">
                        <strong>Oops! </strong> This account was signed up as a ${exists} account. You do not have sufficient permissions.
                    </div>`;
    
                document.getElementById('signupError').innerHTML = errorHTML;
                
                    }
                } else {
                   
                    errorHTML = `<div class="alert alert-danger" role="alert"
                    style="margin-top: 20px; width: 94%; margin-left: 6%;">
                    <strong>Error! </strong> An unexpected error has acurred, please contact customer support.
                </div>`;
            
                        document.getElementById('signupError').innerHTML = errorHTML; 
                }
            });
            
        }
      });

}

function loginWithEmailDistrict(){
    var email = document.getElementById('inputEmail').value;
    var password = document.getElementById('inputPassword').value;

    var formattedEmail = email.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '-');

    var authValid = true;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorMessage);

        errorHTML = `<div class="alert alert-danger" role="alert"
        style="margin-top: 20px; width: 94%; margin-left: 6%;">
        <strong>Error! </strong> Credentials are not valid.
    </div>`;

            document.getElementById('signupError').innerHTML = errorHTML;

        authValid = false;
        // ...
      }).then(() => {

        if(authValid == true){

            var _ref = firebase.database().ref().child("UserData").child(formattedEmail).child('Account Type');

            _ref.once('value').then(function (snapshot) {
                var exists = snapshot.val();
                console.log(exists);

                if(exists != null){
                    if(exists == "District"){

                        console.log('Login Success');

                        localStorage.setItem("email", formattedEmail);


                        window.location = "districtDashboard.html";
                    } else {

                        errorHTML = `<div class="alert alert-danger" role="alert" 
                        style="margin-top: 20px; width: 94%; margin-left: 6%;">
                        <strong>Oops! </strong> This account was signed up as a ${exists} account. You do not have sufficient permissions.
                    </div>`;
    
                document.getElementById('signupError').innerHTML = errorHTML;
                
                    }
                } else {
                   
                    errorHTML = `<div class="alert alert-danger" role="alert"
                    style="margin-top: 20px; width: 94%; margin-left: 6%;">
                    <strong>Error! </strong> An unexpected error has acurred, please contact customer support.
                </div>`;
            
                        document.getElementById('signupError').innerHTML = errorHTML; 
                }
            });
            
        }
      });

}

