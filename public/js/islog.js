$(document).ready(function() {
    /**
     * check if users?
     * $.get("/api/user_data").then(function(data){
     * if (!data){
     * ///show login/signup
     * $(#log-div).show();
     * $(#acc-div).hide();
     * }
     * else{
     * ///show link to account page
     * $(#log-div).hide();
     * $(#acc-div).show();
     * }
     * })
     */
    $.get("api/user_data").then(function(data){
        if(!data){
            /// show login sign up
            $("#login-link").show();
            $("#signup-link").show();
            $("#logout-link").hide();
            $("#acc-link").hide()
        }
        else{
            ///hide login signup 
            $("#login-link").hide();
            $("#signup-link").hide();
            // show logout 
            $("#logout-link").show();
            $("#acc-link").show()
            // and name
            let fullName = data.firstName + ' '+data.lastName;
            console.log(fullName);
        }
    })
});