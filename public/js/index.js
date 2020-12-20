$(document).ready(function() {

    /// Future code for filtering
    $("#select-city").on("click", function(event) {
        let city = $("#city").val().trim();
        window.location.replace("/sightings/city/"+city);
    });
    $("#select-both").on("click", function(event) {
        let city = $("#city").val().trim();
        let whale = $("#whale").val().trim();
        let filters = {city:city, whaleTyoe:whale};
        /// will not work that way
        /// shoukd be reload location filter/city/whale
        $.get("/sightings/filter",filters).then(function(data){});
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
   // $("#submit-post-btn").on("click",handlePostCreateWithoutLogging);
    $("#submit-post-btn").on("click",handlePostCreate);
    $("button.delete").on("click",handlePostDelete);
    $("button.update").on("click",handlePostUpdate);
    function handlePostUpdate(event){
        let postId = $(this).attr("data-id");
        let userId = parseInt( $(this).attr("data-userid"));
        console.log(postId, userId);
        $.get("/api/user_data").then(function(data){
            console.log(data.id);
            if (userId === data.id){
                //postUpdate(postId);
                UIkit.notification({
                    message: 'This is your post!',
                    status: 'success',
                    pos: 'top-center',
                    timeout: 2000
                });
            }
            else{
                //alert("this is not your post !!!!");
                UIkit.notification({
                    message: 'This is not your post!',
                    status: 'danger',
                    pos: 'top-center',
                    timeout: 2000
                });
            }
        })
    }

    function handlePostDelete(event){
        let postId = $(this).attr("data-id");
        let userId = parseInt( $(this).attr("data-userid"));
        console.log(postId, userId);
        $.get("/api/user_data").then(function(data){
            console.log(data.id);
            if (userId === data.id){
                deletePost(postId);
            }
            else{
                //alert("this is not your post !!!!");
                UIkit.notification({
                    message: 'This is not your post!',
                    status: 'danger',
                    pos: 'top-center',
                    timeout: 2000
                });
            }
        })
    }

    function handlePostCreate(event) {
        event.preventDefault();
        $.get("/api/user_data").then(function(data) {
            //console.log(data);
            //console.log(!data);
            ///console.log(data ==={});
            ///console.log(JSON.stringify(data)==='{}');
            if (JSON.stringify(data)==='{}'){
                ///show instead of form error message
                let npEl = $("#new-post");
                let html = `<div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical" uk-overflow-auto>
                <h2 class="uk-modal-title">You not logged</h2> </div>`;
                npEl.html(html);
            }
            else{
                console.log('data'+JSON.stringify(data));
                let userId = data.id   
                let city = $("#new-post-city").val();
                let specificLocation = city;
                let description = $("#new-post-description").val().trim();
                ///data from form maybe changed depend of form
                let new_sighting = {
                    UserId: userId,
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
          })
          .catch(function(err) {
            //alert("something went wrong, try again");
            UIkit.notification({
              message: 'Not your post anyway!',
              status: 'danger',
              pos: 'top-center',
              timeout: 2000
          });
            console.log(err);
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