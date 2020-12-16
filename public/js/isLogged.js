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
    $,get("api/user-data").then(function(data){
        if(!data){
            /// show login sign up
        }
        else{
            ///hide login signup 
            // show logout 
            // and name
            let fullName = data.firstName + ' '+data.lastName;
            
        }
    })
});