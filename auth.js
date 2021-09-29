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
    // console.log(cred);
    location.href = 'login.html'; //user submits and successfully transfers to login page

    //NEED TO SEND EMAIL AND WINDOW ALERT TO SAY SUCCESSFUL!! - TODO!

  }).catch(signupError => {
    window.alert(signupError); //if user is already registered then alert error
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
      console.log(user, "now logged in");
    } else {
      console.log("Sorry you are an unknown user, please register!");
    }
  });
});

//works peachy needs more real testing
//next step instead of logging errors to console, create error message/display
