(function() {

    //  'use strict';

    angular
        .module('app')
        .controller('WeatherCtrl', WeatherCtrl);

    WeatherCtrl.$inject = ['WeatherFactory'];

    /* @ngInject */
    function WeatherCtrl(WeatherFactory) {
        var vm = this;
        vm.title = 'WeatherCtrl';
        vm.searchHistory = [];
        vm.city = '';

        vm.activate = function(cityPassed) {
            WeatherFactory.getWeather(cityPassed).then(
                function(response) {
                    vm.WeatherResponse = response.data;
                    console.log(vm.WeatherResponse);



                },
                function(error) {
                    $log.error('failed to get weatherAPI', error);
                });


            vm.searchHistory.unshift({ city: cityPassed, time: moment().format('MMMM Do YYYY, h:mm:ss a') });


            if (vm.searchHistory.length > 5) {
                vm.searchHistory.pop();
            }

            console.log(vm.searchHistory);

            vm.city = '';


        };

        vm.activate('San Diego');
    }

    var vm = this;
    vm.directive('myEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keypress", function(event) {
                if (event.which === 13) {
                    scope.$apply(function() {
                        scope.$eval(attrs.myEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    });

})();
