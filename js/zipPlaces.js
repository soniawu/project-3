$.noConflict();
(function($) {
  $(document).ready(
    function() {
       $('#city-zip-form').on('submit', function(event) {
        $('#zip-error').text(''); 
        var zip = $('#zip').val();
        var url = 'http://api.zippopotam.us/us/' + zip;
        $.get(url).done(
          function(data,json) {
            /* Parsing data from zip API */
            var city = data.places[0]['place name'];
            var state = data.places[0].state;
            var longitude = data.places[0].longitude; 
            var latitue = data.places[0].latitude; 
            var stateAB = data.places[0]['state abbreviation'];
            var latLng = new google.maps.LatLng(latitue, longitude);
            var mapOptions = {
              center: latLng,
              zoom: 10,
            };
            var infoStr = 'The city is ' + city + ' in state of ' + state;
            $('#city-info').text(infoStr);
  
            /* Load the map and marker of the city */
            var map = new google.maps.Map(document.getElementById('map'), mapOptions); 
            var marker = new google.maps.Marker({
              position: latLng,
              map:map
            });
          
            var sUrl = 'http://api.wunderground.com/api/5c122fcc2f912983/astronomy/q/'+stateAB+'/'+city+'.json';
            $.get(sUrl,
              function(data,json){
                /* Get sunrise, sunset data */
                var sunriseH = data.moon_phase.sunrise.hour;
                var sunriseM = data.moon_phase.sunrise.minute;
                var sunsetH = data.moon_phase.sunset.hour - 12;
                var sunsetM = data.moon_phase.sunset.minute;
                var dayInfoStr = 'In ' + city + ' Sunrise is at ' + sunriseH  + ':' + sunriseM + ' A.M. Sunset is at ' + sunsetH + ':' + sunsetM + ' P.M.';
                $('#day-info').text(dayInfoStr);
              })
            
            var sSUrl = 'http://api.wunderground.com/api/5c122fcc2f912983/conditions/q/'+stateAB+'/'+city+'.json';
            $.get(sSUrl,
              function(data,json){
                /* Ge weather condition data */
                var weather = data.current_observation.weather;
                var temp = data.current_observation.temperature_string;
                var wInfoStr = 'It\'s ' + weather + ' with a temperture of ' + temp;
                $('#w-info').text(wInfoStr);        
              })
          }
        ).fail(function() {$('#zip-error').text('Invalid zip code');})
        event.preventDefault();
      })
    }
    )
  })(jQuery);
  

 