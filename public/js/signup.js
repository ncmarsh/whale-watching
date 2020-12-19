///copy from example
$(document).ready(function() {
    // Getting references to our form and input
    let signUpForm = $("form#signup-form");
    let signupBtn = $("#signup-btn");
    
    console.log("Hi There");
    // When the signup button is clicked, we validate the email and password are not blank
    signupBtn.on("click", function(event) {
      event.preventDefault();
      let userNameInput = $("input#username");
      let lastNameInput = $("input#last-name");
      let firstNameInput = $("input#first-name");
      let emailInput = $("input#email");
      let phoneNumberInput = $("input#phone");
      let passwordInput = $("input#password");
      let receiveNotification = $("#notification");
      let x = $('input[name=radio2]:checked').val();
      //console.log(receiveNotification.children());
      console.log(x);
      console.log('======');
      let userData = {
        userName: userNameInput.val().trim(),
        lastName: lastNameInput.val().trim(),
        firstName: firstNameInput.val().trim(),  
        email: emailInput.val().trim(),
        phoneNumber: phoneNumberInput.val().trim(),
        password: passwordInput.val().trim(),
        receiveNotification:  x=="Yes"
      };
      console.log(userData);
      if (!userData.userName ||!userData.lastName ||!userData.firstName ||!userData.email || !userData.password) {
        return;
      }
      // If we have an email and password, run the signUpUser function
      signUpUser(userData);
      //emailInput.val("");
      //passwordInput.val("");
    });
    function signUpUserTest(userData){
      $("#olga-test").text(JSON.stringify(userData));
    }
    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(userData) {
        console.log(userData)
      $.post("/api/signup", {
        
        firstName: userData.firstName,
        lastName: userData.lastName, 
        userName: userData.userName, 
        email: userData.email,
        password: userData.password,
        phoneNumber: userData.phoneNumber,
        
        receiveNotification: userData.receiveNotification? 1:0
        
      })
        .then(function(data) {
          window.location.replace("/"); ///change
          // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch(handleLoginErr);
    }
  
    function handleLoginErr(err) {
      alert('Something went wrong, try again please');
    }
  });
  