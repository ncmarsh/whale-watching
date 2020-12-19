
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
    $.get("/api/user_data").then(function(data){
        if(JSON.stringify(data)==='{}'){
            /// show login sign up
            $("#login").show();
            $("#signup").show();
            // hide manage acc, logout
            $("#logout").hide();
            $("#manage").hide()
        }
        else{
            ///hide login signup 
            $("#login").hide();
            $("#signup").hide();
            // show logout 
            $("#logout").show();
            $("#manage").show()
            // and name
            let fullName = data.firstName + ' '+data.lastName;
            console.log(fullName);
        }
    })
});