////just copy from example
$(document).ready(function() {
    // Getting references to our form and inputs
    //var loginForm = $("form.login");
    //var userNameInput = $("input#username-input");
    //var passwordInput = $("input#password-input");
  
    // When the form is submitted, we validate there's an email and password entered
    loginForm.on("submit", function(event) {
      let userNameInput = $("#login-username");
      let passwordInput = $("#login-password");
      event.preventDefault();
      let userData = {
        userName: userNameInput.val().trim(),
        password: passwordInput.val().trim()
      };
  
      if (!userData.userName || !userData.password) {
        return;
      }
  
      // If we have an email and password we run the loginUser function and clear the form
      loginUser(userData.userName, userData.password);
      userNameInput.val("");
      passwordInput.val("");
    });
  
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(userName, password) {
        //console.log(userName,password,'api/login');
      $.post("/api/login", {
        userName: userName,
        password: password
      })
        .then(function() {
          window.location.reload();  ///Change this
          // If there's an error, log the error
        })
        .catch(function(err) {
          console.log(err);
        });
    }
    //test function DELETE
    /* function loginUser2(userName, password) {
        console.log(userName,password,'api/login');
      
        
          window.location.reload()  ///Change this
          // If there's an error, log the error   
    } */

  });
  