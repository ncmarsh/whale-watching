///copy from example
$(document).ready(function() {
    // Getting references to our form and input
    var signUpForm = $("form.signup");
    var userNameInput = $("input#username-input");
    var lastNameInput = $("input#lastname-input");
    var firstNameInput = $("input#firstname-input");
    var emailInput = $("input#email-input");
    var phoneNumberInput = $("input#phonenumber-input");
    var passwordInput = $("input#password-input");
    var receiveNotification = $("input#receiveNotification")
    
    console.log(receiveNotification)
    // When the signup button is clicked, we validate the email and password are not blank
    signUpForm.on("submit", function(event) {
      event.preventDefault();
      var userData = {
        userName: userNameInput.val().trim(),
        lastName: lastNameInput.val().trim(),
        firstName: firstNameInput.val().trim(),  
        email: emailInput.val().trim(),
        phoneNumber: phoneNumberInput.val().trim(),
        password: passwordInput.val().trim(),
        receiveNotification:  receiveNotification.is(':checked')
      };
  
      if (!userData.userName ||!userData.lastName ||!userData.firstName ||!userData.email || !userData.password) {
        return;
      }
      // If we have an email and password, run the signUpUser function
      signUpUser(userData);
      //emailInput.val("");
      //passwordInput.val("");
    });
  
    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(userData) {
        console.log(userData)
      $.post("/api/signup", {
        userName: userData.userName,
        firstName: userData.firstName,
        lastName: userData.lastName,  
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        password: userData.password,
        receiveNotification: userData.receiveNotification
        
      })
        .then(function(data) {
          window.location.replace("/members"); ///change
          // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch(handleLoginErr);
    }
  
    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }
  });
  