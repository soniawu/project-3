$.noConflict();
(function($) {
  $(document).ready(
    function() {
     // console.log('I am here');
       $('#cityZip-form').on('submit', function(event) {
        event.preventDefault();
        $('.error').text('');
       // console.log('got submitted'); 
        var zip = $('#zip').val();
        var url = 'https://api.zippopotam.us/us/' + zip;
        $.get(url).done(
          function(data,json) {
                  
          if (data != null) {
          var city = data.places[0]['place name'];
          var state = data.places[0].state;
          var longitude = data.places[0].longitude; 
          var latitue = data.places[0].latitude; 
          var stateAB = data.places[0]['state abbreviation']
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
          
          var sUrl = 'http://api.wunderground.com/api/5c122fcc2f912983/astronomy/q/'+stateAB+'/'+city+'.json';
          $.get(sUrl,
          function(data,json){
            
            if (data != null)
            {
              var sunriseH = data.moon_phase.sunrise.hour;
              var sunriseM = data.moon_phase.sunrise.minute;
              var sunsetH = data.moon_phase.sunset.hour - 12;
              var sunsetM = data.moon_phase.sunset.minute;
              var dayInfoStr = 'In ' + city + ' Sunrise is at ' + sunriseH  + ':' + sunriseM + ' A.M. Sunset is at ' + sunsetH + ':' + sunsetM + ' P.M.';
              $('#dayInfo').text(dayInfoStr);
            }
            else
            {
              consol.log('error');
            }})
            
          var sSUrl = 'http://api.wunderground.com/api/5c122fcc2f912983/conditions/q/'+stateAB+'/'+city+'.json';
          $.get(sSUrl,
          function(data,json){
                
            if (data != null)
            {
              var weather = data.current_observation.weather;
              var temp = data.current_observation.temperature_string;
              var wInfoStr = 'It\'s ' + weather + ' with a temperture of ' + temp;
              $('#wInfo').text(wInfoStr);
            }
            else
            {
              consol.log('error');
            }})
          
          } else {
            // This part of code is not yet working
            console.log('Invalid zip code');
          } 
          }
        ).fail(function() {$('.error').text('Invalid zip code');})
      })
    }
    )
  })(jQuery);
  

 
