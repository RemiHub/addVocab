// register form
const registerForm = document.querySelector("#register-form");
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //get user info
  const firstName = registerForm["firstname"].value; // get rid
  const lastName = registerForm["lastname"].value; //get rid
  const email = registerForm["reg-email"].value;
  const password = registerForm["reg-password"].value;



  //sign up/register the user
  auth.createUserWithEmailAndPassword(email, password).then((cred) => {
    return db.collection('users').doc(cred.user.uid).set({
      names: firstName //registerForm['firstname'].value
    })
  }).then(() => {
    sendVerificationEmail();

    window.alert('You have successfully registered.'); 
    location.href = 'login.html'; //user submits and successfully transfers to login page
   
  }).catch(signupError => {
    window.alert(signupError); //alert error e.g typical error = if user is already registered
  })
});





//login form
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    
    // console.log(cred);
  }).catch(error => {
    var errorCode = error.code;
    var errorMessage = error.message;

    //make error message nicer
    window.alert("Error : " + errorMessage);

  });
});


const loginPageChange = document.querySelector("#login-btn");
loginPageChange.addEventListener("click", (e) => {
  auth.onAuthStateChanged((user) => {
    if (user) {

      location.href = "index.html";
      // console.log(user, "now logged in");
    } else {
      // console.log("Sorry you are an unknown user, please register!");
      window.alert("Error: Sorry you are an unknown user, please register!")
    }
  });
});


//send verification email to current users email address
//used within createEmailAnd... function
function sendVerificationEmail(){
auth.onAuthStateChanged(user => {
  if(user){
      firebase.auth().currentUser.sendEmailVerification()
      .then(() => {
      console.log('email sent')
      }).catch(err => {
        console.log(err);
      })
  } else {
    window.alert('Registration unsuccesful, please try again!');
  }

})

}


// function sendVerificationEmail(){
//    var user = firebase.auth().currentUser;

//    user.sendEmailVerification().then(() => {
//      console.log('Email sent');
//    }).catch((error) => {
//     console.log(error);
//    })
 

// }

// sendVerificationEmail();






//need to load unique data for each individual user when they log in

//use case
//register -> success message (todo) -> log in page -> get taken to a page that displays your previous words &
//you can also add new words


//next step instead of logging/alerting errors to console, create error message/display
