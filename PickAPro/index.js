

function signed_user() {

  signedOut_nav_link.forEach(item => item.style.display = 'none');
  document.querySelector('#signUpasPro').style.display = 'none';
  document.querySelector('#Pro_description').style.display = 'none';
  document.querySelector('#login').style.display = 'none';
  document.querySelector('#loading').style.display = 'block';
  setTimeout(() => document.querySelector('#loading').style.display = 'none', 2000);
  document.querySelector('.logged').style.display = 'block';
  setTimeout(() => document.querySelector('.logged').style.display = 'none', 2000);
  signed_nav_link.forEach(item => item.style.display = 'block');

  $('#loggedUserInfo').html(`<p>Logged in as ${auth.currentUser.email}</p>`);
  $('#loggedUserInfo').show();


  showUserInfo();


}


//Sign in with existing user and password
loginPro_Form.addEventListener('submit', function (e) {
  e.preventDefault();
  var email = document.querySelector('#user');
  var password = document.querySelector('#pass');

  auth.signInWithEmailAndPassword(email.value, password.value)
    .then((cred)=>
      signed_user(cred)
    ).catch(function (err) {
      console.log("invalid username or password, or no connection!");
      document.querySelector('.modal').style.display = "block";
    });
})



function registered_user() {

  signedOut_nav_link.forEach(item => item.style.display = 'none');
  document.querySelector('#login').style.display = 'none';
  document.querySelector('#loading').style.display = 'block';
  setTimeout(() => document.querySelector('#loading').style.display = 'none', 2000);
  document.querySelector('#registered_msg').style.display = 'block';
  setTimeout(() => document.querySelector('#registered_msg').style.display = 'none', 2000);
  signed_nav_link.forEach(item => item.style.display = 'block');

  $('#loggedUserInfo').html(`<p>Logged in as ${auth.currentUser.email}</p>`);
  $('#loggedUserInfo').show();
  showUserInfo();


}



//BECOME A PRO FORM REGISTRATION

function registerPro_form() {
  $('#return').show();
  $('#post_Description').hide();
  $('#postForm').hide();
  $('#new_post').hide();
  $('#login').hide();
  $('#user_profile').hide();
  $('body').css('background-image', 'url(css/images/becomePro.jpg)');
  $('#Pro_description').show();
  $('#signUpasPro').show();
  $('#signUpPro').show();
}



//Registering new user


function userSelected(selected_user) {

  var selected_user = $('#user_category').val();

  if (selected_user == "Pro") {
    console.log("Pro selected");
    $('#label_user').val("Signing as PRO");
    $('#speciality').show();
    $('#rate').show();
    $('#Pro_description').show();
    $('#post_Description').hide();
    var category_label = $('#category_label').text();
    $('#category_label').text(category_label.replace("Select your main interests from our categories", "Select category:"));

    registerPro_Form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = document.querySelector('#register_email');
      var password = document.querySelector('#password');


      auth.createUserWithEmailAndPassword(email.value, password.value)
        .then(cred => {

          return db.collection("pros").doc(cred.user.uid).set({
            Firstname: document.querySelector('#name').value,
            Lastname: document.querySelector('#lastname').value,
            Location: document.querySelector('#location').value,
            Email: document.querySelector('#register_email').value,
            Occupation: category_pros.options[category_pros.selectedIndex].value,
            Specialities: document.querySelector('#specialities').value,
            Salary: document.querySelector('#salary').value + " eur"

          });
        }).then((pro) => {
          registered_user(pro);
          console.log(auth.currentUser.email);


        }).catch(
          function (error) {
            console.log(error.message);
          })
    })
  }


  if (selected_user == "User") {

    $('#label_user').val("Signing as USER");
    $('#speciality').hide();
    $('#rate').hide();
    $('#Pro_description').hide();
    $('#post_Description').show();
    var category_label = $('#category_label').text();
    $('#category_label').text(category_label.replace("Select category:", "Select your main interests from our categories"));


    registerPro_Form.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = document.querySelector('#register_email');
      var password = document.querySelector('#password');

      auth.createUserWithEmailAndPassword(email.value, password.value)
        .then(cred => {

          return db.collection("users").doc(cred.user.uid).set({
            Firstname: document.querySelector('#name').value,
            Lastname: document.querySelector('#lastname').value,
            Location: document.querySelector('#location').value,
            Email: document.querySelector('#register_email').value,
            MainInterests: category_pros.options[category_pros.selectedIndex].text,
          });
        }).then((client) => {
          registered_user(client);

          console.log(auth.currentUser.email);
        }).catch(
          function (error) {
            console.log(error.message);
          })
    })

  }
}



//auth status changes
auth.onAuthStateChanged(function (user) {
  if (user) {
    console.log('user logged in as:', user.email);
    uid = user.uid;
    signed_user(user);
    showUserInfo(user);
    reload = 0;
    while (reload == 1) {
      window.location.reload();
      reload++;

    }

    //get posted jobs
    db.collection('posts').onSnapshot(data => {
      console.log(data.docs)
      set_posts(data.docs);

      $(document).ready(function () {
        var comments = [{
          'name': 'Vladimir Planojevic',
          'date': new Date(),
          'comment': 'This is my comment'
        }]
        var comments = []
        for (var i = 0; i < comments.length; i++) {
          console.log(comments[i]);
          renderComments(comments[i]);
        }


        $('.commentsBtn').click(function () {

          text = '';
          var comments = $('.comment').on('keydown', function () {
            text += $(this) + ''
          });

          var addComment = {
            'sender': user.email,
            'date': new Date(),
            'comment': comments.val()
          };

          console.log(addComment.comment);
          console.log(addComment);
          comments.push(addComment);
          post_verification_msg.style.display = "block";
          setInterval(() => post_verification_msg.style.display = "none", 2000);

          renderComments(addComment);

        })

      })

    }, error => {
      console.log(error.message);
    });



  } else {
    console.log('user logged out');
    uid = null;
    signed_nav_link.forEach(item => item.style.display = 'none');
    $('#table').hide();
    signedOut_nav_link.forEach(item => item.style.display = 'block');
    document.querySelector('#login').style.display = 'block';


  }
})




// Set function for displaying Profile page

const profile_board = document.querySelector('#user_profile');

var set_profile = (userProfile) => {
  let render_user = '';
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
                            <h5 id="user_fullname"  class="user_description" onclick="$(this).text(text.replace('undefined', 'Not Available for these type of Users, please register as Pro'))">${userProfile.Firstname} ${userProfile.Lastname}</h5>
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
  profile_board.innerHTML = render_user;
}



//Display profile page for user

function showUserInfo() {

  db.collection('pros').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      const pro = doc.data();
      if (auth.currentUser.email == pro.Email) {
        type_user = "Signed as Pro"
        set_profile(pro);

        $('.user_description').each(function () {
          var text = $(this).text();
          if ($(this).text() === 'undefined')
            $(this).text(text.replace('undefined', ''));
        });
      }
    });
  });

  db.collection('users').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      const client = doc.data();
      if (auth.currentUser.email == client.Email) {
        type_user = "Signed as User";
        set_profile(client);

        $('.user_description').each(function () {
          var text = $(this).text();
          if ($(this).text() === 'undefined')
            $(this).text(text.replace('undefined', ''));
        });


      }
    });
  });
}




//CHECK POSTED JOBS section ( for signed in users)
function show_posts() {

  form.style.display = "none";
  post_description.style.display = "none";
  postForm.style.display = "none";
  $('#jobs_room').show();
  $('#send_a_post').hide();
  $('#user_profile').hide();
  $('.posts_board').show();
  $('#table').hide();
  $('#render_table').hide();
  $('thead').hide();

}





// Database -Firebase - Post a problem section

var postsBoard = document.querySelector('.posts_board');
var count = 0;
var set_posts = (posted) => {
  let innerPosts = document.createElement('div');
  innerPosts = '';
  if (posted.length) {
    posted.forEach(doc => {
      let post = doc.data();
      console.log(post);
      console.log(posted.length);

      card = `<div class="card text-right" style="width: 300px; height:300px; margin: 10px; float:left; display:inline-block;  border-style:solid; background-color:lightcyan;">
    <div class="card-body">
    <h5 class="card-title">${post.Firstname}</h5>
    <h5 class="card-title">from ${post.Location}</h5>
    <p class="card-text" id="category_selected">${post.Category}</p>
    <p class="card-text" onclick=function(){if(post.Category.value !='Other'){ post.Other.value==''}} >${post.Other}</p>
    <p class="card-text">${post.Description}</p>
    <button id="btn" type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal${count}">Contact me</button>
    <button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#exampleModalLong${count}">Comments</button>
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
          <div class='formComments' method="post">
          <p>Leave a comment to ${post.Firstname}:</p>
          <textarea style="min-width: 100%" class="comment"></textarea>
          <input type="submit"  class="btn-success commentsBtn" value="Send" />
          </div>
            <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    
    
    <div class="modal fade" id="exampleModalLong${count}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Comments about ${post.Firstname}'s issue ...</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class='comments_container'></div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
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
    postsBoard.innerHTML = `<div class="alert alert-success" role="alert">
  <h4 class="alert-heading">Sorry</h4>
  <hr>
  <p>There are no current posts in job section </p>
  <hr>
</div>`
  }
}


// creating Comments on Job cards 

function renderComments(data) {

  var comment = `<div class='commentBox'><div class='leftPanelImg'><img src='css/images/comments_pic.jpg' style="width:50px;height:50px;"/></div><div class='rightPanel'><span>${data.sender}</span><div class='date'>${data.date}</div><p>${data.comment}</p></div><div class='clear'></div></div>`;
  $('.comments_container').append(comment);
  post_verification_msg.style.display = "block"
  setInterval(() => post_verification_msg.style.display = "none", 2000)
}


function renderReviews(data) {


  var review = `<div class='commentBox'><div class='leftPanelImg'><img src='css/images/review_icon.png' style="width:50px;height:50px;"/></div><div class='rightPanel'><span>${data.name}</span><div class='date'>${data.date}</div><h6>${data.subject}</h6><p>${data.review}</p></div><div class='clear'></div></div>`

  $('.reviews_container').append(review);
  post_verification_msg.style.display = "block"
  setInterval(() => post_verification_msg.style.display = "none", 2000)
}



//Logout
function LogOut() {
  auth.signOut()
    .then(function () {
      $('#jobs_room').hide();
      $('.posts_board').hide();
      signed_nav_link.forEach(item => item.style.display = 'none');
      document.querySelector('#post_Description').style.display = 'none';
      document.querySelector('#postForm').style.display = 'none';

      document.querySelector('body').style = 'background-image: url(css/images/background.jpg)';
      document.querySelector('#loading').style.display = 'none';
      setTimeout(() => document.querySelector('#loading').style.display = 'none', 2000);
      document.querySelector('.logged_out').style.display = 'block';
      setTimeout(() => document.querySelector('.logged_out').style.display = 'none', 2000);

      setInterval(() =>
        signedOut_nav_link.forEach(item => item.style.display = 'block'),
        document.querySelector('#login').style.display = 'block',
        email.innerHTML = '',
        password.innerHTML = '',

        console.log('Signed out'), 3000


      )

    })
}


//close Modal function -- when Invalid username or password

function closeModal() {
  document.querySelector('.modal').style.display = 'none';
}


//Create a job  (+Post a Job section)

function create_post() {

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
  var other_category = document.querySelector('#other_profession_category');


  form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('posts').add({
      Category: category.options[category.selectedIndex].text,
      Other: other_category.value,
      Description: document.querySelector('#textarea').value,
      Firstname: document.querySelector('#firstname').value,
      Location: document.querySelector('#place').value,
      Telephone: document.querySelector('#telephone').value,
      email: document.querySelector('#newUser_email').value

    }).then(() => {
      post_verification_msg.style.display = "block"
      setInterval(() => post_verification_msg.style.display = "none", 2000)
      form.reset();

    })

  })
}


// Pop-Up categories when Posting Job as signed user in POST A JOB category

function Other() {

  $('#other_selected').hide();
  $('#user_submitPost').hide();
  $('#other_selected').removeAttr('required');
  $('#other_selected').removeAttr('data-error', 'This field is required');
  $('#post_from_user').show();
  $('#post_from_user').attr('required');
  $('#post_from_user').attr('data-error', 'This field is required');

  if ($('#category').val() != "select_category") {

    if ($('#category').val() == "other") {
      $('#other_selected').show();
      $('#user_submitPost').show();
      $('#other_profession_category').attr('required');
      $('#other_profession_category').attr('data-error', 'This field is required');
      $('#post_from_user').show();
      $('#post_from_user').attr('required');
      $('#post_from_user').attr('data-error', 'This field is required');
    }

    if ($('#category').val() != "other") {
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

  count = 0;
  if (data.length) {
    let pro = ''

    $('#table').show();
    $('thead').show();
    $('#render_table').show();

    data.forEach(doc => {
      const person = doc.data();
      console.log(person)


      const render_pro_info = `

      <tr class="table table-dark" style = "color:black;">
      <th>
      <div class="text-center">
  <a href="" data-toggle="modal" data-target="#modalContactForm${count}"><img src="css/images/profile.png" style="width:30px"/></a>
</div>

    <div class="modal fade" id="modalContactForm${count}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
  aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
    <div class="modal-header text-center">
    <h4 class="modal-title w-100 font-weight-bold">Write Review about ${person.Firstname} ${person.Lastname} </h4>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
      <div class="modal-body mx-3">
      <div class='formReviews' method="post">
      <div class="md-form mb-5">
<i class="fas fa-tag prefix grey-text"></i>
<input type="text" id="form32" class="form-control Subject">
<label data-error="wrong" data-success="right" for="form32">Subject</label>
</div>
<input id="ratings-hidden" name="rating" type="hidden"> 


<i class="fas fa-pencil prefix grey-text"></i>
<textarea id="form8" style="min-width: 100%" class="review"></textarea>
<label data-error="wrong" data-success="right" for="form8">Your comment...</label>
<input type="submit" class="btn btn-outline-danger postReview" value="POST REVIEW" />
        <button type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#reviewModal${count}">Check Reviews</button> 
    </div>
  </div>
</div>

<div class="modal fade" id="reviewModal${count}" tabindex="-1" role="dialog" aria-labelledby="#reviewsPro${count}" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="reviewsPro${count}">Reviews for ${person.Firstname} ${person.Lastname}:</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class='reviews_container'></div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
        </div>
      </div>
</th>
      <td >${person.Firstname}</td>
      <td >${person.Lastname}</td>
      <td >${person.Email}</td>
      <td >${person.Location}</td>
      <td >${person.Occupation}</td>
      <td >${person.Specialities}</td>
      <td >${person.Salary}</td>
      
     
      </tr>
      `;
      count++;


      $("th").hover(function () {
        $(this).css("color", "blue");
      }, function () {
        $(this).css("color", "#fff");
      });

      $("th").css('cursor', 'pointer');



      pro += render_pro_info;

    })


    console.log(pro);
    const table = document.querySelector("#render_table");
    table.innerHTML = pro;
    $('body').css('background-image', 'url(css/images/becomePro.jpg)');

    $('#table').DataTable({
      searching: false,
      paging: false,
      info: false,
      retrieve: true,
      destroy: true
    });

  }

}


//async func -- render table
function create_table_pros() {
  db.collection('pros').get().then(snapshot => {
    console.log(snapshot.docs);
    setupPros(snapshot.docs);

    $(document).ready(function () {
      var reviews = [{
        'name': 'Someone',
        'date': new Date(),
        'subject': 'some subject',
        'review': 'the best pro ever'
      }]
      var reviews = []
      for (var i = 0; i < reviews.length; i++) {
        console.log(reviews[i]);
        renderReviews(reviews[i]);
      }


      $('.postReview').click(function (e) {
        e.preventDefault();
        review = '';
        var reviews = $('.review').on('keydown', function () {
          review += $(this) + ''
        });
        console.log(reviews.val());
        console.log(new Date());

        var addReview = {
          'name': auth.currentUser.email,
          'date': new Date(),
          'subject': $('.Subject').val(),
          'review': reviews.val()

        };

        console.log(addReview);
        reviews.push(addReview);
        renderReviews(addReview);
      })
    });

  })
}



function searchPros() {
  var value = $('#searchServices').val().toLowerCase();

  $("#table tr").filter(function () {

    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  });
}

function searchProsByDropDown() {
  var value = $("#select_tags_category").val().toLowerCase();

  console.log(value);
  $("#table tr").filter(function () {

    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  });


}

// FILTER JOBS 
$('#select_tags_category').change(function () {

  var value = $(this).val().toLowerCase();
  if (value != "all") {
    $('.card').filter(function () {
      $(this).toggle($(this).find('p').text().toLowerCase().indexOf(value) > -1)
    });
  } else $('.card').show();

});