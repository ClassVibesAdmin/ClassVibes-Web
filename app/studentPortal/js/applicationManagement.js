function initializeFirebase(){
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
}


function getLiveSeverAlerts(){
    firebase.firestore().collection('Application Management').doc("ServerAlerts").onSnapshot(function(result){

        var data = result.data();

        if(data == undefined || data == null){
           
        } else {
          var title = data.alertTitle;
          var message = data.alertMessage;
  
          var toastHTML = `
          <!-- Modal -->
          <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel"><i class="fas fa-cloud"></i> Server Alert</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <h1>${title}</h1>
                  <p>${message}</p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
          
          `;

          $(toastHTML).appendTo('#pageBody');
  
          $('#exampleModal').modal('show')
        }

        console.log(data);
    });
}

function getServerStatus(){
  firebase.firestore().collection('Application Management').doc("ServerManagement").onSnapshot(function(result){

      var data = result.data()["serversAreUp"];

      if(data == false || data == null){
          window.location = "../../../serverDown.html";
      } 
      
  });
}