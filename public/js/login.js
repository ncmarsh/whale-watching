////just copy from example
$(document).ready(function() {
    


    logBtn = $("#login-btn");
    logBtn.on("click", function(event) {
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
        console.log(userName,password);
      $.post("/api/login", {
        userName: userName,
        password: password
      })
        .then(function() {
          window.location.replace("/sightings");  ///Change this
          // If there's an error, log the error
        })
      //  .catch(function(err) {
      //     alert("something went wrong, try again");
      //     console.log(err);
      //   });
    }
    //test function DELETE
    /* function loginUser2(userName, password) {
        console.log(userName,password,'api/login');
      
        
          window.location.reload()  ///Change this
          // If there's an error, log the error   
    } */

  });
  