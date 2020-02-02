//declaration of input fields
  var loginPro_Form=document.querySelector('#login_form');
  var loginBtn=document.querySelector('#signIn');
  var signed_nav_link=document.querySelectorAll('.signed_in');
  var signedOut_nav_link=document.querySelectorAll('.signed_out');
  var registerPro_Form=document.querySelector('#signUpPro');
  var category_pros=document.querySelector('#category_pros');
  var postForm=document.querySelector('#postForm');
  var post_description=document.querySelector('#post_Description');
  var post_verification_msg=document.querySelector('.post');
  var form=document.querySelector('#new_post');
  var email=document.querySelector('#register_email');
  var password=document.querySelector('#password');

  //CONFIGURATED FIREBASE
  var firebaseConfig = {
    apiKey: "AIzaSyBulcduYuKQfGIUbqq4xNbx-1MR65ia86s",
    authDomain: "pickapro-b9b63.firebaseapp.com",
    databaseURL: "https://pickapro-b9b63.firebaseio.com",
    projectId: "pickapro-b9b63",
    storageBucket: "pickapro-b9b63.appspot.com",
    messagingSenderId: "26515396537",
    appId: "1:26515396537:web:623bbaf83a4df9c0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var auth=firebase.auth();
  var db=firebase.firestore();

//  


  // const functions = require('firebase-functions');
  // // var database = firebase.database().ref().child('/users/');
  // const messaging = firebase.messaging();
  
  // messaging.usePublicVapidKey("BL1HMn-LrlM6VKk_Zk286O4hC9dx0745pvyzo1_SrE4COLwXF-A5dV-Kki0e0R8qXiW0-7V3ML8hOxm2sMvtDXk");
 

  // messaging.onTokenRefresh(() => {
  //   messaging.getToken().then((refreshedToken) => {
  //     console.log('Token refreshed.');
  //     // Indicate that the new Instance ID token has not yet been sent to the
  //     // app server.
  //     setTokenSentToServer(false);
  //     // Send Instance ID token to app server.
  //     sendTokenToServer(refreshedToken);
  //     // [START_EXCLUDE]
  //     // Display new Instance ID token and clear UI of all previous messages.
  //     resetUI();
  //     // [END_EXCLUDE]
  //   }).catch((err) => {
  //     console.log('Unable to retrieve refreshed token ', err);
  //     showToken('Unable to retrieve refreshed token ', err);
  //   });
  // });
  // // [END refresh_token]
  // // [START receive_message]
  // // Handle incoming messages. Called when:
  // // - a message is received while the app has focus
  // // - the user clicks on an app notification created by a service worker
  // //   `messaging.setBackgroundMessageHandler` handler.
  // messaging.onMessage((payload) => {
  //   console.log('Message received. ', payload);
  //   // [START_EXCLUDE]
  //   // Update the UI to include the received message.
  //   appendMessage(payload);
  //   // [END_EXCLUDE]
  // });
  // // [END receive_message]
  // function resetUI() {
  //   clearMessages();
  //   showToken('loading...');
  //   // [START get_token]
  //   // Get Instance ID token. Initially this makes a network call, once retrieved
  //   // subsequent calls to getToken will return from cache.
  //   messaging.getToken().then((currentToken) => {
  //     if (currentToken) {
  //       sendTokenToServer(currentToken);
  //       updateUIForPushEnabled(currentToken);
  //     } else {
  //       // Show permission request.
  //       console.log('No Instance ID token available. Request permission to generate one.');
  //       // Show permission UI.
  //       updateUIForPushPermissionRequired();
  //       setTokenSentToServer(false);
  //     }
  //   }).catch((err) => {
  //     console.log('An error occurred while retrieving token. ', err);
  //     showToken('Error retrieving Instance ID token. ', err);
  //     setTokenSentToServer(false);
  //   });
  // }

  //   function showToken(currentToken) {
  //     // Show token in console and UI.
  //     var tokenElement = document.querySelector('#token');
  //     tokenElement.textContent = currentToken;
  //   }
  //   // Send the Instance ID token your application server, so that it can:
  //   // - send messages back to this app
  //   // - subscribe/unsubscribe the token from topics
  //   function sendTokenToServer(currentToken) {
  //     if (!isTokenSentToServer()) {
  //       console.log('Sending token to server...');
  //       // TODO(developer): Send the current token to your server.
  //       setTokenSentToServer(true);
  //     } else {
  //       console.log('Token already sent to server so won\'t send it again ' +
  //           'unless it changes');
  //     }
  //   }
  //   function isTokenSentToServer() {
  //     return window.localStorage.getItem('sentToServer') === '1';
  //   }
  //   function setTokenSentToServer(sent) {
  //     window.localStorage.setItem('sentToServer', sent ? '1' : '0');
  //   }
  //   function showHideDiv(divId, show) {
  //     const div = document.querySelector('#' + divId);
  //     if (show) {
  //       div.style = 'display: visible';
  //     } else {
  //       div.style = 'display: none';
  //     }
  //   }
  //   function requestPermission() {
  //     console.log('Requesting permission...');
  //     // [START request_permission]
  //     Notification.requestPermission().then((permission) => {
  //       if (permission === 'granted') {
  //         console.log('Notification permission granted.');
  //         // TODO(developer): Retrieve an Instance ID token for use with FCM.
  //         // [START_EXCLUDE]
  //         // In many cases once an app has been granted notification permission,
  //         // it should update its UI reflecting this.
  //         resetUI();
  //         // [END_EXCLUDE]
  //       } else {
  //         console.log('Unable to get permission to notify.');
  //       }
  //     });
  //     // [END request_permission]
  //   }
  //   function deleteToken() {
  //     // Delete Instance ID token.
  //     // [START delete_token]
  //     messaging.getToken().then((currentToken) => {
  //       messaging.deleteToken(currentToken).then(() => {
  //         console.log('Token deleted.');
  //         setTokenSentToServer(false);
  //         // [START_EXCLUDE]
  //         // Once token is deleted update UI.
  //         resetUI();
  //         // [END_EXCLUDE]
  //       }).catch((err) => {
  //         console.log('Unable to delete token. ', err);
  //       });
  //       // [END delete_token]
  //     }).catch((err) => {
  //       console.log('Error retrieving Instance ID token. ', err);
  //       showToken('Error retrieving Instance ID token. ', err);
  //     });
  //   }
  //   // Add a message to the messages element.
  //   function appendMessage(payload) {
  //     const messagesElement = document.querySelector('#messages');
  //     const dataHeaderELement = document.createElement('h5');
  //     const dataElement = document.createElement('pre');
  //     dataElement.style = 'overflow-x:hidden;';
  //     dataHeaderELement.textContent = 'Received message:';
  //     dataElement.textContent = JSON.stringify(payload, null, 2);
  //     messagesElement.appendChild(dataHeaderELement);
  //     messagesElement.appendChild(dataElement);
  //   }
  //   // Clear the messages element of all children.
  //   function clearMessages() {
  //     const messagesElement = document.querySelector('#messages');
  //     while (messagesElement.hasChildNodes()) {
  //       messagesElement.removeChild(messagesElement.lastChild);
  //     }
  //   }
  //   function updateUIForPushEnabled(currentToken) {
  //     showHideDiv(tokenDivId, true);
  //     showHideDiv(permissionDivId, false);
  //     showToken(currentToken);
  //   }
  //   function updateUIForPushPermissionRequired() {
  //     showHideDiv(tokenDivId, false);
  //     showHideDiv(permissionDivId, true);
  //   }
  //   resetUI();




  function signed_user(cred){
if(cred){
    signedOut_nav_link.forEach( item => item.style.display='none' );
      document.querySelector('#login').style.display='none';
      document.querySelector('#loading').style.display='block';
      setTimeout( () => document.querySelector('#loading').style.display='none', 2000 );
      document.querySelector('.logged').style.display='block';
      setTimeout( () => document.querySelector('.logged').style.display='none', 2000 );
      signed_nav_link.forEach( item => item.style.display='block' );

      $('#loggedUserInfo').html(`<p>Logged in as ${auth.currentUser.email}</p>`);
      $('#loggedUserInfo').show();
      showUserInfo();
}


  }

  //Sign in with existing user and password
  loginPro_Form.addEventListener('submit', function (e)
  {
    e.preventDefault();
    var email=document.querySelector('#user');
    var password=document.querySelector('#pass');

    auth.signInWithEmailAndPassword (email.value, password.value)
      .then(
        signed_user()
      ).catch(function(err)
    {
    console.log("invalid username or password, or no connection!");
    document.querySelector('.modal').style.display="block";
 });
   })



  function registered_user(cred)
  {

    signedOut_nav_link.forEach( item => item.style.display='none' );
    document.querySelector('#login').style.display='none';
    document.querySelector('#loading').style.display='block';
    setTimeout( () => document.querySelector('#loading').style.display='none', 2000 );
    document.querySelector('#registered_msg').style.display='block';
    setTimeout( () => document.querySelector('#registered_msg').style.display='none', 2000 );
    signed_nav_link.forEach( item => item.style.display='block' );

    $('#loggedUserInfo').html(`<p>Logged in as ${auth.currentUser.email}</p>`);
    $('#loggedUserInfo').show();
    showUserInfo();


  }



//BECOME A PRO FORM REGISTRATION

function registerPro_form () {
  $('#return').show();
  $('#post_Description').hide();
  $('#postForm').hide();
  $('#new_post').hide();
  $('#login').hide();
  $('#user_profile').hide();
  $('body').css('background-image','url(css/images/becomePro.jpg)');
  $('#Pro_description').show();
  $('#signUpasPro').show();
  $('#signUpPro').show();
}



//Registering new user


function userSelected(){

var selected_user = $('#user_category').val() ;
if(selected_user == "Pro") {
  $('#label_user').val("Signing as PRO");
  $('#speciality').show();
  $('#rate').show();
  $('#Pro_description').show();
  $('#post_Description').hide();
  var category_label = $('#category_label').text();
  $('#category_label').text( category_label.replace("Select your main interests from our categories" , "Select category:" ));

  registerPro_Form.addEventListener('submit', function(e)
  {
    e.preventDefault();
    var email=document.querySelector('#register_email');
    var password=document.querySelector('#password');


    auth.createUserWithEmailAndPassword (email.value, password.value)
    .then( cred => {

      return db.collection("pros").doc(cred.user.uid).set({
        Firstname: document.querySelector('#name').value,
        Lastname: document.querySelector('#lastname').value,
        Location: document.querySelector('#location').value,
        Email: document.querySelector('#register_email').value,
        Occupation: category_pros.options[category_pros.selectedIndex].value,
        Specialities: document.querySelector('#specialities').value,
        Salary: document.querySelector('#salary').value + " eur"

      });
  }).then(() => {
    registered_user();
      console.log(auth.currentUser.email);


    }).catch(
     function (error)
    {
      console.log(error.message);
    })
  })
}

else
if(selected_user == "User"){
$('#label_user').val("Signing as USER");
$('#speciality').hide();
$('#rate').hide();
$('#Pro_description').hide();
$('#post_Description').show();
var category_label = $('#category_label').text();
$('#category_label').text( category_label.replace("Select category:", "Select your main interests from our categories" ));


registerPro_Form.addEventListener('submit', function(e)
{
  e.preventDefault();
  var email=document.querySelector('#register_email');
  var password=document.querySelector('#password');

  auth.createUserWithEmailAndPassword (email.value, password.value)
  .then( cred => {

    return db.collection("users").doc(cred.user.uid).set({
      Firstname: document.querySelector('#name').value,
      Lastname: document.querySelector('#lastname').value,
      Location: document.querySelector('#location').value,
      Email: document.querySelector('#register_email').value,
      MainInterests: category_pros.options[category_pros.selectedIndex].text,
    });
}).then(() => {
    registered_user();

    console.log(auth.currentUser.email);
  }).catch(
   function (error)
  {
    console.log(error.message);
  })
})

}
}



//auth status changes
auth.onAuthStateChanged(function(user)
{
  if(user){
    console.log('user logged in as:',user);
    uid = user.uid;
    signed_user(user);
    showUserInfo();

     //get posted jobs
db.collection('posts').onSnapshot( data => {
   console.log(data.docs)
   set_posts(data.docs);
 }, error => {
   console.log(error.message);
  })


  } else {
    console.log('user logged out');
    uid = null;
    signed_nav_link.forEach( item => item.style.display='none' );
    $('#table').hide();
    signedOut_nav_link.forEach( item => item.style.display='block' );
    document.querySelector('#login').style.display='block';


  }
})


//CHECK POSTED JOBS section ( for signed in users)
function show_posts() {

  form.style.display="none";
  post_description.style.display="none";
  postForm.style.display="none";
  $('#jobs_room').show();
  $('#send_a_post').hide();
  $('#user_profile').hide();
  $('.posts_board').show();
  $('#table').hide();
  $('#render_table').hide();
  $('thead').hide();
}

const profile_board = document.querySelector('#user_profile');

var set_profile = (userProfile) => {
  let render_user='';
  if(userProfile){


    let profile = `<div class="container emp-profile">
    <form method="post">
        <div class="row">
            <div class="col-md-4">
                <div class="profile-img">
                <img src="css/images/user_profile.jpg" style="width:70px">
                </div>
            </div>
            <div class="col-md-6">
                <div class="profile-head">
                            <h5 id="user_fullname"  class="user_description">${userProfile.Firstname} ${userProfile.Lastname}</h5>
                            <h6 id="user_occupation" class="user_description">${userProfile.Occupation}</h6>
                            <h6 id="user_occupation" class="user_description">${type_user}</h6>


                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <div class="profile-work">
                    <p>SKILLS</p>
                        <div id="user_skills" class="user_description">${userProfile.Specialities}</div>
                </div>
            </div>
            <div class="col-md-8">
                <div class="tab-content profile-tab" id="myTabContent">
                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                                <div class="row">
                                    <div class="col-md-6">
                                        <label>User</label>
                                    </div>
                                    <div class="col-md-6">
                                        <p id="user_fullname" class="user_description">${userProfile.Firstname} ${userProfile.Lastname}</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <label>Email</label>
                                    </div>
                                    <div class="col-md-6">
                                        <p id="user_email" class="user_description">${userProfile.Email}</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <label>Profession</label>
                                    </div>
                                    <div class="col-md-6">
                                        <p id="user_occupation" class="user_description">${userProfile.Occupation}</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <label>Hourly Rate</label>
                                    </div>
                                    <div class="col-md-6">
                                        <p id="user_rate" class="user_description">${userProfile.Salary}</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <label>Main Interests</label>
                                    </div>
                                    <div class="col-md-6">
                                        <p id="user_interests" class="user_description">${userProfile.MainInterests}</p>
                                    </div>
                                </div>
                    </div>

                </div>
            </div>
        </div>
    </form>
</div>`;


render_user = profile;


  }

  profile_board.innerHTML = render_user;


}



function showUserInfo(){

  db.collection('pros').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      const pro = doc.data();
  console.log(auth.currentUser.email);
  console.log(pro.Email);

      if( auth.currentUser.email == pro.Email){
        type_user = "Signed as Pro"
        set_profile(pro);
    }
  });
  });
    db.collection('users').get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        const client = doc.data();
        console.log(auth.currentUser.email);
        console.log(client.Email);

        if(auth.currentUser.email == client.Email){
        type_user = "Signed as User"
         set_profile(client);
         removeEmpty();

      }
    });
    });

  }

  function removeEmpty(){
    // $(".container .user_description").filter(function() {return $(this).text()​​​​​​​ == '';}).remove();

    $('.container').find('.user_description').each(function(){
      if($(this).is(':empty'))
          $(this).remove();
  });
  }


// Database -Firebase - Post a problem section

var postsBoard=document.querySelector('.posts_board');
var count = 0;
var set_posts =  (posted) =>
{
let innerPosts=document.createElement('div');
innerPosts = '';
if(posted.length){
  posted.forEach (doc => {
    let post = doc.data();
    console.log(post);
    console.log(posted.length);
  
    card =`<div class="card text-right" style="width: 300px; height:300px; margin: 10px; float:left; display:inline-block;  border-style:solid; background-color:lightcyan;">
    <div class="card-body">
    <h5 class="card-title">${post.Firstname}</h5>
    <h5 class="card-title">from ${post.Location}</h5>
    <p class="card-text" id="category_selected">${post.Category}</p>
    <p class="card-text" onclick=function(){if(post.Category.value !='Other'){ post.Other.value==''}} >${post.Other}</p>
    <p class="card-text">${post.Description}</p>
    <button id="btn" type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal${count}">Contact me</button>
    <div class="modal fade" id="myModal${count}" role="dialog">
        <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Contact: ${post.Firstname} Location: ${post.Location}</h4>
          </div>
          <div class="modal-body">
            <p>${post.email}</p>
            <p>${post.Telephone}</p>
          </div>
      

          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
    </div>`
  count++;
  innerPosts += card;   
  })
postsBoard.innerHTML = innerPosts;  
 } else {
  postsBoard.innerHTML =  `<div class="alert alert-success" role="alert">
  <h4 class="alert-heading">Sorry</h4>
  <hr>
  <p>There are no current posts in job section </p>
  <hr>
</div>`
}
}



      //Logout
      function LogOut() {
        auth.signOut()
        .then(function()
        {
          signed_nav_link.forEach( item => item.style.display='none' );
          document.querySelector('#post_Description').style.display = 'none';
          document.querySelector('#postForm').style.display = 'none';
          document.querySelector('#jobs_room').style.display = 'none';
          document.querySelector('.posts_board').style.display = 'none';
          document.querySelector('body').style ='background-image: url(css/images/background.jpg)';
          document.querySelector('#loading').style.display = 'none';
          setTimeout( () => document.querySelector('#loading').style.display='none', 2000 );
          document.querySelector('.logged_out').style.display='block';
          setTimeout( () => document.querySelector('.logged_out').style.display='none', 2000 );

          setInterval( () =>
                            signedOut_nav_link.forEach( item => item.style.display='block' ),
                            document.querySelector('#login').style.display='block',
                            email.innerHTML = '',
                            password.innerHTML = '',

                            console.log('Signed out'), 3000


          )
          
        }
        )}


//close Modal function -- when Invalid username or password

function closeModal()
{
  document.querySelector('.modal').style.display='none';
}


//Create a job  (+Post a Job section)

function create_post(){

  $('#postForm').show();
  $('.posts_board').hide();
  $('#user_profile').hide();
  $('#new_post').show();
  $('#post_Description').show();
  $('#jobs_room').hide();
  $('#firstname_user').show();
  $('#location_user').show();
  $('#user_email').show();
  $('#tel').show();
  $('#problem_type').show();
  $('#user_submitPost').show();
  $('body').css('background-image', 'url(css/images/becomePro.jpg)');
  $('#table').hide();
  $('#render_table').hide();
  $('thead').hide();
  var other_category=document.querySelector('#other_profession_category');


form.addEventListener('submit', (e) => {
e.preventDefault();
db.collection('posts').add({
Category:  category.options[category.selectedIndex].text,
Other: other_category.value,
Description: document.querySelector('#textarea').value,
Firstname: document.querySelector('#firstname').value,
Location: document.querySelector('#place').value,
Telephone: document.querySelector('#telephone').value,
email: document.querySelector('#newUser_email').value

}).then( () => {
  post_verification_msg.style.display="block"
  setInterval( () => post_verification_msg.style.display="none", 2000)
form.reset();

})

})
}


    // Pop-Up categories when Posting Job as signed user in POST A JOB category

        function Other()
      {

          $('#other_selected').hide();
              $('#user_submitPost').hide();
              $('#other_selected').removeAttr('required');
              $('#other_selected').removeAttr('data-error', 'This field is required');
              $('#post_from_user').show();
              $('#post_from_user').attr('required');
              $('#post_from_user').attr('data-error', 'This field is required');

            if($('#category').val() != "select_category")
            {

            if($('#category').val() == "other")
            {
              $('#other_selected').show();
              $('#user_submitPost').show();
              $('#other_profession_category').attr('required');
              $('#other_profession_category').attr('data-error', 'This field is required');
              $('#post_from_user').show();
              $('#post_from_user').attr('required');
              $('#post_from_user').attr('data-error', 'This field is required');
            }

            if($('#category').val() != "other")
            {
              $('#other_selected').hide();
              $('#user_submitPost').show();
              $('#other_profession_category').removeAttr('required');
              $('#other_profession_category').removeAttr('data-error', 'This field is required');
              $('#post_from_user').show();
              $("#post_from_user").attr('required');

            }
          }

          }



  // SETUP PRO TABLE   (==Check posted Jobs== section)

function setupPros(data) {

  $('#jobs_room').hide();
  $('#send_a_post').hide();
  $('.posts_board').hide();
  $('#user_profile').hide();
  $('#firstname_user').hide();
  $('#location_user').hide();
  $('#user_email').hide();
  $('#tel').hide();
  $('#problem_type').hide();
  $('#user_submitPost').hide();
  $('#postForm').hide();
  $('#post_Description').hide();


  if(data.length){
    let pro = ''

    $('#table').show();
    $('thead').show();
    $('#render_table').show();

    data.forEach(doc => {
      const person = doc.data();
      console.log(person)


      const render_pro_info = `

      <tr class="table table-dark" style = "color:black;">
      <th ><a href="#"><img src="css/images/profile.png" style="width:30px"></a></th>
      <td >${person.Firstname}</td>
      <td >${person.Lastname}</td>
      <td >${person.Email}</td>
      <td >${person.Location}</td>
      <td >${person.Occupation}</td>
      <td >${person.Specialities}</td>
      <td >${person.Salary}</td>
      </tr>
      `;

      $("th").hover(function(){
        $(this).css("color", "blue");
        }, function(){
        $(this).css("color", "#fff");
      });

        $("th").css('cursor', 'pointer');



      pro += render_pro_info;

    })


 console.log(pro);
      const table = document.querySelector("#render_table");
      table.innerHTML = pro;
      $('body').css('background-image', 'url(css/images/becomePro.jpg)');

      $('#table').DataTable({searching: false, paging: false, info: false, retrieve: true, destroy: true});

  }

}




   //async func -- render table
      function create_table_pros(){
        db.collection('pros').get().then( snapshot => {
          console.log(snapshot.docs);
          setupPros(snapshot.docs);
          })
        }



          function searchPros(){
            var value = $('#searchServices').val().toLowerCase();

              $("#table tr").filter(function() {

                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
              });
          }

          function searchProsByDropDown(){
            var value = $("#select_tags_category").val().toLowerCase();

            console.log(value);
            $("#table tr").filter(function() {

              $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });


          }

        //filter jobs ( GET JOBS BY INDUSTRY)

          $('#select_tags_category').change( function() {

            var value = $(this).val().toLowerCase();
            console.log(value);

            $('.card').filter(function() {
                $(this).toggle($(this).find('p').text().toLowerCase().indexOf(value) > -1)
            });
          });







