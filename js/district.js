
function validateAccountState(){
    var email = localStorage.getItem('email');

    var _ref = firebase.database().ref().child("UserData").child(email).child('Account Status');

    _ref.once('value').then(function (snapshot) {
        if(snapshot.val() == "Deactivated"){
            document.getElementById('deactivatedAccountSection').style.display = "initial";
        }
    });
}