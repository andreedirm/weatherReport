"use strict";

//describe the behavior we are testing
describe("weather api factory", function() {
    var WeatherFactory, httpBackend;

    // the top level module
    beforeEach(module("app"));

    //inject the factory and httpbackend
    beforeEach(inject(function(_WeatherFactory_, $httpBackend) {
        WeatherFactory = _WeatherFactory_;
        httpBackend = $httpBackend;
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });


it("should have a getWeather method", function() {
    expect(angular.isFunction(WeatherFactory.getWeather)).toBe(true);
});

//verify a successful api call

// it("should work", function() {

//     $httpBackend
//     	.whenGET("http://api.openweathermap.org/data/2.5/weather?q=london&appid=7bb251471198d4ac538e3f9acb720948")
//         .respond({ name: London });

//     WeatherFactory.getWeather({ APPID: "7bb251471198d4ac538e3f9acb720948", name: London })

//     //test the response
//    .then(function(response) {
//         expect(response.data.name).toBe("London");
//         expect(response.status).toEqual(200);
//     });

//     httpBackend.flush();

// });


// verify the error handler is working

it("should throw an error on a server exception", function() {
    var result, error;

    //setup http backend
    httpBackend
        .expectGET("http://api.openweathermap.org/data/2.5/weather?q=london&appid=7bb251471198d4ac538e3f9acb720948")
        .respond(500);

        //fake the call
    var promise = WeatherFactory.getWeather({ apiKey: '7bb251471198d4ac538e3f9acb720948', name: London });

    promise.then(function(data) {
            result = data;
        },

        function(data) {
            error = data;
        });

        httpBackend.flush();

        //test the response

        expect(result).toBeUndefined();
        expect(error.status).toEqual(500);

    });

	it('good work', function(){
		expect(angular.isFunction(WeatherFactory)).toexsist;
	});
	
});


