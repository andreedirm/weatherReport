(function() {
    'use strict';

    angular
        .module('app')
        .factory('WeatherFactory', WeatherFactory);

    WeatherFactory.$inject = ['$http','$q', '$log'];

    /* @ngInject */
    function WeatherFactory($http,$q, $log) {
        var service = {
            getWeather: getWeather
        };
        return service;


        ////////////////

        function getWeather(city) {

   			var apiKey = '&appid=7bb251471198d4ac538e3f9acb720948&units=imperial';
    		var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
        var defer = $q.defer();
	
          $http({
        		method: 'GET',
        		url: apiUrl + city + apiKey
        		// url: 'http://api.openweathermap.org/data/2.5/weather?q=london&appid=7bb251471198d4ac538e3f9acb720948'

            
        	})
        	 .then(
	          function(response) {
	            if(typeof response.data === 'object'){
	          defer.resolve(response);
	          toastr.success('Weather is Working!');
	        } else {
	          defer.reject(response);
	          toastr.warning('no weather found<br/>' + response.config.url);
	        }
	    },
	    // failure
          function(error) {
              defer.reject(error);
              $log.error(error);
              toastr.error('error: ' + error.data + '<br/>status: ' + error.statusText);
          });
                    
         

          return defer.promise;
      	}
    };
})();







