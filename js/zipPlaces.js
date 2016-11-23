$.noConflict();
(function($) {
  $(document).ready(
    function() {
     // console.log('I am here');
       $('#cityZip-form').on('submit', function(event) {
        event.preventDefault();
       // console.log('got submitted'); 
        var zip = $('#zip').val();
        var url = 'http://api.zippopotam.us/us/' + zip;
        $.get(url,
          function(data,json) {
                  
          if (data != null) {
          var city = data.places[0]['place name'];
          var state = data.places[0].state;
          var longitude = data.places[0].longitude; 
          var latitue = data.places[0].latitude; 
          var latLng = new google.maps.LatLng(latitue, longitude);
          var mapOptions = {
            center: latLng,
            zoom: 10,
          };
          
          var infoStr = 'The city is ' + city + ' in ' + state + ' state';
          $('#cityInfo').text(infoStr);
  
          var map = new google.maps.Map(document.getElementById('map'), mapOptions); 
          var marker = new google.maps.Marker({
            position: latLng,
            map:map
          });
          } else {
            // This part of code is not yet working
            console.log('Invalid zip code');
          } 
          }
        )
      })
    }
    )
  })(jQuery);
  

 