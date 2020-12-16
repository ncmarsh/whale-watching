$(document).ready(function() {


    $("#select-city").on("click", function(event) {
        let city = $("#city").val().trim();
        window.location.replace("/city/"+city);
    });

    /**
     * CREATE NEW POST
     * Click button create-post
     * Check if user not logged in: ////How to do this
     *      give alert that you mast login or signup
     *      else // if looged
     *          collect user data (id or username)
     *          show modal with form 
     *          on submit button call POST (/api/sightings)
     *          then go to /sightings
     */
    $("#submit-post-btn").on("click",handlePostCreateWithoutLogging);
    
    function handlePostCreate() {
        $.get("/api/user_data").then(function(data) {
            if (!data){
                ///show instead of form error message
            }
            else{
                let userId = data.id   
                let city = $("#new-city").val();
                let specificLocation = $("#specificLocation").val().trim();
                let description = $("#description").val().trim();
                ///data from form maybe changed depend of form
                new_sighting = {
                    UserID: userId,
                    city: city,
                    specificLocation: specificLocation,
                    description: description
                }
                postCreate(new_sighting); 
            }
            
          }); 
    }

    function handlePostCreateWithoutLogging(event){
        event.preventDefault();
        let userId = 1; 
        let city = $("#new-post-city").val();
        //let specificLocation = $("#specificLocation").val().trim();
        let description = $("#new-post-description").val().trim();
                ///data from form maybe changed depend of form
        new_sighting = {
            UserId: userId,
            city: city,
            specificLocation: city,
            description: description
            }
        console.log(new_sighting);
        postCreate(new_sighting); 
    }
    /**
     * Edit or delete post
     * check if user not logged .get("api/user_data")
     * check that user id == post.user_id
     * collect new data and set PUT
     *$.ajax("/api/cats", {
      type: "PUT" 
      data: newCat
      
    }).then( window.location.reload());
    for DELETE 
     */
    function postCreate(data){
        $.post('/api/sightings',data).then(function(){
            window.location.reload();
        })
    }

    function postUpdate(data){
        $.ajax({
            method: "PUT",
            url: "/api/sightings",
            data: data
          })
        .then(function(){
            window.location.reload();
        })
    }

    function deletePost(id) {
        $.ajax({
          method: "DELETE",
          url: "/api/sightings/" + id
        })
          .then(function() {
            window.location.reload();
          });
      }



    
 //// Example of conditional modal   
 /* 
    $("#my-test-btn").on("click",function(event){
        let data = 0; ///=1
        if (data===0){
            errMsg = `<h2>You should be logged to create new posts</h2>`;
            $("#my-test-modal").html(errMsg)
        }
    })
*/

    ///Change to post request
})