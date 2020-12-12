$(document).ready(function() {
    $("#select-city").on("click", function(event) {
        city = $("#city").val().trim();
        window.location.replace("/city/"+city);
      });
})