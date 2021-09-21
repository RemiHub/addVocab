// register form
const registerForm = document.querySelector("#register-form");
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //get user info
  const firstName = registerForm["firstname"].value;
  const lastName = registerForm["lastname"].value;
  const email = registerForm["reg-email"].value;
  const password = registerForm["reg-password"].value;

  // console.log(firstName, lastName, email, password);

  //sign up the user
  auth.createUserWithEmailAndPassword(email, password).then((cred) => {
    // console.log(cred);
  });
});

//login form
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // console.log(cred);
  });
});

const loginPageChange = document.querySelector("#login-btn");
loginPageChange.addEventListener("click", (e) => {
  auth.onAuthStateChanged((user) => {
    console.log(user, "now logged in");
    if (user) {
      location.href = "index.html";
    } else {
      console.log("Sorry you are an unknown user, please login!");
    }
  });
});

//works peachy needs more real testing
//next step instead of logging errors to console, create error message/display
