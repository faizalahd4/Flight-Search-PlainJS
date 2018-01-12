/**
* DATA JSON JS FILE - USE TO HAVE FLIGHT JSON AS SAMPLE OUTPUT FILE FROM SERVER SIDE
* @AUTHOR - FAIZAL
* @DATE - 25/04/2017
**/

/* AVAILABLE FLIGHTS ARRAY OF OBJECTS - STARTS */
var flightDatas = {
	"successCode": 0,
	"coll": [{
		"flightNo": "AL-201",
		"flightId": "indgo",
		"flightName": "Indgo",
		"departureLocation": "MAA",
		"departureTime": "10:00 AM",
		"arrivalLocation": "MUM",
		"arrivalTime": "01:00 PM",
		"price": 16000,
		"meal": true,
		"info": "Only Hand baggage (7kgs) allowed"
	}, {
		"flightNo": "AL-202",
		"flightId": "airindia",
		"flightName": "Air India",
		"departureLocation": "MUM",
		"departureTime": "02:00 PM",
		"arrivalLocation": "MAA",
		"arrivalTime": "06:00 PM",
		"price": 32000,
		"meal": false,
		"info": "Buy Zero Cancellation now @ only 199 and cancel your ticket for FREE!!"
	}, {
		"flightNo": "AL-202",
		"flightId": "airindia",
		"flightName": "Air India",
		"departureLocation": "MUM",
		"departureTime": "05:00 PM",
		"arrivalLocation": "MAA",
		"arrivalTime": "06:00 PM",
		"price": 10000,
		"meal": false,
		"info": "Buy Zero Cancellation now @ only 199 and cancel your ticket for FREE!!"
	}, {
		"flightNo": "AL-202",
		"flightId": "airindia",
		"flightName": "Air India",
		"departureLocation": "MUM",
		"departureTime": "03:00 AM",
		"arrivalLocation": "MAA",
		"arrivalTime": "06:00 AM",
		"price": 23000,
		"meal": false,
		"info": "Buy Zero Cancellation now @ only 199 and cancel your ticket for FREE!!"
	}, {
		"flightNo": "AL-202",
		"flightId": "airindia",
		"flightName": "Air India",
		"departureLocation": "MAA",
		"departureTime": "03:00 PM",
		"arrivalLocation": "MUM",
		"arrivalTime": "04:00 PM",
		"price": 31000,
		"meal": false,
		"info": "Buy Zero Cancellation now @ only 199 and cancel your ticket for FREE!!"
	}],
	"valid": true
},
/* AVAILABLE FLIGHTS ARRAY OF OBJECTS - ENDS */

/* AVAILABLE LOCATION ARRAY OF OBJECTS - STARTS */
locationsDatas = [{
		"label": "Chennai",
		"id": "MAA"
	}, {
		"label": "Delhi",
		"id": "DEL"
	}, {
		"label": "Mumbai",
		"id": "MUM"
	},
	{
		"label": "Bangalore",
		"id": "BGL"
	},
	{
		"label": "Kolkata",
		"id": "KOL"
	}
];
/* AVAILABLE LOCATION ARRAY OF OBJECTS - ENDS */