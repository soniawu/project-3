$.noConflict();
(function($) {
  $(document).ready(
    function() {
       $('#cityZip-form').on('submit', function(event) {
         console.log('I am here');
        var zip = $('#zip').val();
        var url = 'http://api.zippopotam.us/us/' + zip;
        $.get(url,
          function(data,json) {
        
          var city = data.places[0]['place name'];
          var country = data.country;
          var longitude = data.places[0].longitude; 
          var latitue = data.places[0].latitude; 
          var mapOptions = {
            center: new google.maps.LatLng(latitue, longitude),
            zoom: 12,
          };
          $('#cityZip').append('<p>The city is '+city+' lat : '+ latitue+' lng : '+longitude+'</p>');
          var map = new google.maps.Map(document.getElementById('map'), mapOptions); 
          }
        )
      })
    }
    )
  })(jQuery);
  

 