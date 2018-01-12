/**
* SEARCH FILTER JS FILE - USE TO MAKE FLIGHT SEARCH
* @AUTHOR - FAIZAL
* @DATE - 25/04/2017
**/
$(document).ready(function() {
	/* CREATING FAI OBJECT, IF ITS UNDEFINED, CREATE FAI OBJECT */
	if (typeof FAI === 'undefined') {
		/* CREATE FAI OBJECT */
		FAI = {};
	}
	
	/* CREATING FAI.FN OBJECT, IF ITS UNDEFINED, CREATE FAI.FN OBJECT */
	if (typeof FAI.FN === 'undefined') {
		/* CREATE FAI.FN OBJECT */
		FAI.FN = {}
	}

	/* DECLARING GLOBAL VAIRBALE*/
	var searchResult = [];
	
	/* NAMING FLIGHT SEARCH OBJECT*/
	FAI.FN.SEARCH =  {

		/**
		* VALIDATING FIGHT SEARCH FORM FIELDS
		* @INPUT - FROM LOCATION, TO LOCATION, DEPARTURE DATE, RETURN DATE, PASSENGER AND TRIP TYPE
		* @RETURN - ISVALID OR NOT
		**/
		validateSearch : function (originLocation, destinationLocation, departureDate, returnDate, passenger, tripType) {
			/* DECLARING ISVALID VARIABLE AND MAKING IT AS TRUE */
			var isValid = true;

			/* CHECKING WHETHER ORIGIN LOCATION IS SELECTED */
			if (originLocation === "") {
				/* IF ORIGIN LOCATION IS NOT SELECTED THEN SHOW FOLLOWING ERROR MSG IN ALERT POP AND MAKE ISVALID TO FALSE*/
				$(".error-alert").alertpopup({msg: "Please select the Origin location.", type: "ERROR"});
				isValid = false;
			}
			/* CHECKING WHETHER DESTINATION LOCATION IS SELECTED */
			else if (destinationLocation === "") {
				/* IF DESTINATION LOCATION IS NOT SELECTED THEN SHOW FOLLOWING ERROR MSG IN ALERT POP AND MAKE ISVALID TO FALSE*/
				$(".error-alert").alertpopup({msg: "Please select the Destination location.", type: "ERROR"});
				isValid = false;
			}
			/* CHECKING WHETHER DESTINATION LOCATION AND ORIGIN LOCATION ARE EQUAL */
			else if (destinationLocation === originLocation) {
				/* IF DESTINATION LOCATION AND ORIGIN LOCATION ARE EQUAL THEN SHOW FOLLOWING ERROR MSG IN ALERT POP AND MAKE ISVALID TO FALSE*/
				$(".error-alert").alertpopup({msg: "Destination location should not be same as Origin location. Please change the destination location.", type: "ERROR"});
				isValid = false;
			}
			/* CHECKING WHETHER DEPARTURE DATE IS SELECTED */
			else if (departureDate === "") {
				/* IF DEPARTURE DATE IS NOT SELECTED THEN SHOW FOLLOWING ERROR MSG IN ALERT POP AND MAKE ISVALID TO FALSE*/
				$(".error-alert").alertpopup({msg: "Please select the Departure date.", type: "ERROR"});
				isValid = false;
			}
			/* CHECKING WHETHER RETURN DATE IS SELECTED AND MAKE SURE TRIP TYPE IS NOT ONEWAY */
			else if (tripType !== "ONEWAY" && returnDate === "") {
				/* IF RETURN DATE IS NOT SELECTED THEN SHOW FOLLOWING ERROR MSG IN ALERT POP AND MAKE ISVALID TO FALSE*/
				$(".error-alert").alertpopup({msg: "Please select the Return date.", type: "ERROR"});
				isValid = false;
			}
			/* CHECKING WHETHER NUMBER OF PASSENGERS IS SELECTED */
			else if (passenger === "") {
				/* IF NUMBER OF PASSENGERS IS NOT SELECTED THEN SHOW FOLLOWING ERROR MSG IN ALERT POP AND MAKE ISVALID TO FALSE*/
				$(".error-alert").alertpopup({msg: "Please select number of passengers.", type: "ERROR"});
				isValid = false;
			} 
			/* RETURNING ISVALID VARIABLE */
			return isValid;
		},
		/**
		* SEARCH FLIGHT METHOD USING USER INPUT
		* @INPUT - NA
		* @RETURN - NA
		**/
		searchFlight : function() { 
			/* GETTING ORIGIN LOCATION VALUE FROM USER INPUT FIELD */
			var originLocation = document.getElementById("originLocation").value,
				/* GETTING DESTINATION LOCATION VALUE FROM USER INPUT FIELD */
				destinationLocation = document.getElementById("destinationLocation").value,
				/* GETTING DEPARTURE DATE VALUE FROM USER INPUT FIELD */
				departureDate = document.getElementById("departureDate").value
				/* GETTING RETURN DATE VALUE FROM USER INPUT FIELD */
				returnDate = document.getElementById("returnDate").value,
				/* GETTING NUMBER OF PASSENGER VALUE FROM USER INPUT FIELD */
				passenger = document.getElementById("passenger").value,
				/* GETTING TRIP TYPE VALUE FROM USER INPUT FIELD */
				tripType = $("#tripType").filter(':checked').val();
				/* CHECKING WHETHER VALIDATION METHOD IS PASSED OR NOT */
				if (!this.validateSearch(originLocation, destinationLocation, departureDate, returnDate, passenger, tripType)) {
					/* IF VALIDATION METHID FAILED THEN RETURN, STOP DOING AFTER PROCESS */
					return;
				}
				/* GETTING ORIGIN LOCATION CODE */
				originLocation = originLocation.substring(originLocation.indexOf("(") + 1, originLocation.length).replace(")", "");
				/* GETTING DEPARTURE LOCATION CODE */
				destinationLocation = destinationLocation.substring(destinationLocation.indexOf("(") + 1, destinationLocation.length).replace(")", "");
				/* INSERTING TRIP TYPE VALUE INTO TRIP TYPE TILES */
				$("#triptype-tiles").html(tripType);
				/* INSERTING LOCATIONS VALUE INTO LOCATIONS TILES */
				$("#location-tiles").html(originLocation + " to " + destinationLocation);
				/* INSERTING DEPARTURE DATE VALUE INTO DEPARTURE DATE TILES */
				$("#departureDate-tiles").html(this.convertDateToTilesFormat(departureDate));
				/* INSERTING RETURN DATE VALUE INTO RETURN DATE TILES */
				$("#returnDate-tiles").html(this.convertDateToTilesFormat(returnDate));
				/* INSERTING NUMBER OF PASSENGER COUNT VALUE INTO NUMBER OF PASSENGER COUNT TILES */
				$("#passenger-tiles").html(passenger);

				/* GETTING AVAILABLE FLIGHTS RESULT FROM JSON */
				var obj = flightDatas.coll,
					/* GETTING AVAILABLE DEPARTURE FLIGHT */
					departureFlights =  this.depatureFightsFilter(obj, originLocation, destinationLocation);
					/* GETTING AVAILABLE RETURN FLIGHT */
					returnFlights =  (tripType !== "ONEWAY") ? this.returnFightsFilter(obj, originLocation, destinationLocation) : [];
					/* COMBINATION OF DEPARTURE AND RETURN FLIGHTS IF THE TRIP IS ROUND TRIP ELSE DEPARTURE FLIGHTS ALONE */
					obj = this.generateFlights(departureFlights, returnFlights);
					/* ASSIGNING FINAL AVAILABLE FLIGHTS COMBINATION INTO GLOBAL VARIABLE */
					searchResult = obj;
					/* FILTERING FINAL AVAILABLE FLIGHTS ACCORDING TO USER SELECTED PRICE RANGE */
					obj = this.filterByPriceRange();
					/* FINDING TOTAL AVAILABLE FLIGHTS */
					totalResult = obj.length;
					/* CALLING GENERATE SEARCH RESULT TAGS METHOD TO GENERATE HTML TAGS */
					this.generateSearchResultTags(totalResult, obj, tripType);
		},
		/**
		* USE TO GENERATE AVAILABLE FLIGHTS HTML TAGS
		* @INPUT - TOTAL AVAILABLE FLIGHTS, FLIGHT OBJ AND TRIP TYPE
		* @RETURN - NA
		**/
		generateSearchResultTags : function (totalResult, obj, tripType) {
			/* DECLARING LOCAL VARIABLE */
			var i = 0, targetHTML = "", targetHTMLText = "";
			/* CLEARING PREVIOUS AVAIABLE FLIGHTS HTML TAGS FROM THE DOM */
			$("#search-filter-container").html("");
			/* LOOPING THROUGH EACH FLIGHT OBJECT USING TOTAL AVAILABLE FLIGHT */
			targetHTMLText = $("#flight-search-result-html-template").text();
			for (i = 0; i < totalResult; i++){
					/* CALLING UPPLANT WITH OBJECTS TO GENERATE HTML TAGS WITH KEY & VALUE PAIR */
			        targetHTML = targetHTMLText.supplant(this.generateSupplantObject(obj[i]));

			        /* REMOVING RETURN FLIGHT DETAILS FROM GENERATED HTML IF ITS ONE WAY TRIP */
					if (tripType === "ONEWAY") {
						/* CONVERTING STRING INTO HTML */
						targetHTML = $(targetHTML);
						/* REMOVING THE RETURN FLIGHT TAGS FROM GENERATED TAGS */
						targetHTML.find("#return-trip-box").remove();
						/* CHANGING THE ONE WAY TAG SIZE */
						targetHTML.find("#oneway-trip-box").removeClass("col-5").addClass("col-10");
					}
					/* APPENDING GENERATED HTML INTO DOM ELEMENT */
			    	$("#search-filter-container").append(targetHTML);
				}
				/* CHECKING WHETHER NO FLIGHTS AVAILABLE TO SHOW MESSAGE ON SCREEN*/
				this.checkNoFlights(totalResult);
		},
		/**
		* GENERATE OBJECT
		* @INPUT - OBJ
		* @RETURN - FLIGHTOBJ
		**/
		generateSupplantObject : function (obj) {
			var flightObj = {departureInfo: obj.departure.info,
			        	departureFlightId: obj.departure.flightId,
			    		departureFlightName: obj.departure.flightName,
			    		departureFlightNo: obj.departure.flightNo,
			    		departureDepartureTime: obj.departure.departureTime,
			    		departureDepartureLocation: obj.departure.departureLocation,
			    		departureArrivalTime: obj.departure.arrivalTime,
			    		departureArrivalLocation: obj.departure.arrivalLocation,
			    		returnFlightId: obj.return.flightId,
			    		returnFlightName: obj.return.flightName,
			    		returnFlightNo: obj.return.flightNo,
			    		returnDepartureTime: obj.return.departureTime,
			    		returnDepartureLocation: obj.return.departureLocation,
			    		returnArrivalTime: obj.return.arrivalTime,
			    		returnArrivalLocation: obj.return.arrivalLocation,
			    		finalPrice: this.numberToCurrency(obj.departure.price + obj.return.price)};
			return flightObj;
		},
		/**
		* FILTER SELECTED ROUTE DEPARTURE FLIGHTS FROM FLIGHST OBJECTS
		* @INPUT - ALL AVAILABLE FLIGHTS, FROM LOCATION AND TO LOCATION
		* @RETURN - FILTER SELECTED ROUTE DEPARTURE FLIGHTS
		**/
		depatureFightsFilter : function (allFlights, originLocation, destinationLocation) {
			/* LOOPING ALL AVAILABLE FLIGHTS AND PASSING EACH FLIGHT OBJECT INSIDE THE LOOP FUNCTION */
			return allFlights.filter(function (details) {
				/* FILTERING THE SELECTED ROUTE DEPATURE FLIGHTS ALONE FROM ALL FLIGHT OBJECTS */
				return details.departureLocation == originLocation && details.arrivalLocation == destinationLocation;
			});
		},
		/**
		* FILTER SELECTED ROUTE RETURN FLIGHTS FROM FLIGHST OBJECTS
		* @INPUT - ALL AVAILABLE FLIGHTS, FROM LOCATION AND TO LOCATION
		* @RETURN - FILTER SELECTED ROUTE RETURN FLIGHTS
		**/
		returnFightsFilter : function (allFlights, originLocation, destinationLocation) {
			/* LOOPING ALL AVAILABLE FLIGHTS AND PASSING EACH FLIGHT OBJECT INSIDE THE LOOP FUNCTION */
			return allFlights.filter(function (details) {
				/* FILTERING THE SELECTED ROUTE RETURN FLIGHTS ALONE FROM ALL FLIGHT OBJECTS */
				return details.departureLocation == destinationLocation && details.arrivalLocation == originLocation;
			});
		},
		/**
		* FILTER AVAILABLE FLIGHTS USING PRICE RANGE FILTER
		* @INPUT - NA
		* @RETURN - NA
		**/
		filterByPriceRange : function () {
			/* GETTING USER SELECTED RANGE VALUE */
			var maxRange = $("#rangePriceId").text().replace(/\,/g, ''),
				/* GETTING USER SELECTED TRIP TYPE */
				tripType = $("#tripType").filter(':checked').val()
				/* FILTER AVAILABLE FLIGHT ACCORDING TO THE USER SELECTED PRICE RANGE VALUE */
				filteredResult = searchResult.filter(function (obj) {
					return ((tripType === "ONEWAY" && obj.departure.price < maxRange) || (tripType !== "ONEWAY" && (obj.departure.price + obj.return.price) < maxRange));
				});
			/* RETURNING FILTERED FLIGHTS */
			return filteredResult;
		},
		/**
		* FILTER AVAILABLE FLIGHTS USING PRICE RANGE FILTER AND GENERATE FINAL HTML TAGS TO SHOW IN DOM
		* @INPUT - NA
		* @RETURN - NA
		**/
		filterByPriceRangeAndGenerateTags : function () {
			/* GETTING AVAILABLE FLIGHT BY APPLYING PRICE RANGE FILTER */
			var filteredResult = this.filterByPriceRange();
			/* GENERATE AVAILABLE FLIGHTS HTML TAGS */
			this.searchFlight();
			/* SHOWING PRICE RANGE TAGS */
			$("#price-range-filter").show();
		},
		/**
		* GENERATE COMBINATION OF DEPARTUE AND RETURN FLIGHT IF THE TRIP TYPE IS ROUND TRIP ELSE DEPATURE FLIGHT ALONE
		* @INPUT - DEPARTURE FLIGHTS AND RETURN FLIGHTS
		* @RETURN - COMBINED AVAILABLE FLIGHTS
		**/
		generateFlights :  function (departureFlights, returnFlights) {
			/* DECLARING LOCAL VARIABLE */
			var i = -1, flights = [], totalReturnFlight = returnFlights.length;
			/* CHECKING WHETHER RETURN FILGHT IS NOT EMPTY */
			if (returnFlights.length > 0) {
				/* COMBINATING AND CREATING NEW OBJECTS OF ARRAYS USING DEPARTURE AND RETURN FLIGHTS  - LOOPING DEPARTURE FLIGHTS */
			    departureFlights.map(function (obj) {
			    	/* LOOPING RETURN FLIGHTS */
			    	for (i = 0; i < totalReturnFlight; i++) {
			    		/* PUSHING DEPATURE AND RETURN FLIGHT COMBINATION */
			    		flights.push({"departure": obj, "return": returnFlights[i]});
			    	}
			    	/* RETURNING NEW OBJECT */
			    	return obj;
			    });
			} else {
				/* COMBINATING AND CREATING NEW OBJECTS OF ARRAYS USING DEPARTURE FLIGHTS - LOOPING DEPARTURE FLIGHTS */
				flights = departureFlights.map(function (obj) {
					/* RETURNING NEW OBJECT */
			    	return {"departure": obj, "return": {price: 0}}
			    });
			}
			/* RETURNING COMBINED AVAILABLE FLIGHTS */
			return flights;
		},
		/**
		* SEARCH FLIGHT INIT METHOD
		* @INPUT - NA
		* @RETURN - NA
		**/
		init : function() {
			/* CALLING CLEAR ALL METHOD TO CLEAR ALL INPUT FIELD ON PAGE LOAD */
			this.clearAll();
			/* SHOWING NO FLIGHT MESSAGE CONTENT */
			$("#error-msg-no-flights").hide();
			/* HIDDING TILES */
			$("#search-filter-inputs").hide();
			/* HIDDING PRICE RANGE FILED */
			$("#price-range-filter").hide();
		},
		/**
		* CONVERT PLAIN NUMBER INTO CURRENCY VALUE WHICH INCLUDE COMMAS
		* @INPUT - PLAIN NUMBER
		* @RETURN - CURRENCY WITH COMMAS (WITHOU SYMBOL)
		**/
		numberToCurrency : function (no) {

			/* CONVERTING PLAIN NUMBER INTO STRING */
			no = no.toString();

			/* SUBSTRING LAST THREE DIGITS */
			var lastThree = no.substring(no.length - 3);

			/* SUBSTRING OTHER DIGITS EXCEPT LAST THREE DIGITS */
			var otherNumbers = no.substring(0, no.length - 3);

			/* CHECKING WHETHER OTHER DIGITS EXCEPT LAST THREE DIGITS ARE NOT EMPTY, TO ADD COMMAS BEFORE FIRST THREE DIGITS */
			if(otherNumbers != '') {
				/* ADDING COMMAS BEFORE LAST THREE DIGIT */
    			lastThree = ',' + lastThree;
    		}

    		/* ADDING COMMAS ON EVERY TWO DIGIT IN OTHERS NUMBER DIGITIS AND APPENDING FIRST THREE NUMBER DIGITS */
			return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
		},
		/**
		* CONVERT FROM ONE FROMAT INTO ANOTHER DATE FORMAT FOR TILE DISPLAY
		* @INPUT - DATE AS STRING AS '22/06/2016'
		* @RETURN - FORMATTED DATE AS EXAMPLE 2nd Jan 2016
		**/
		convertDateToTilesFormat : function (dateString) {
			/* CHECKING WHETHER DATE STRING PARAM IS NOT EMPTY */
			if (dateString !== "") {
				/* SPLITTING DATE STRING USING FORWARD SLASH */
				var dateArray = dateString.split("/"),
					/* FORMATTING THE DATE STRING INTO ANOTHER FORMAT */
					formatedDateString = this.suffixNumber(dateArray[1]) + " " + this.convertNumberIntoMonth(dateArray[0]) + " " + dateArray[2];
				/* RETURNING FORMATTED DATE */	
				return formatedDateString;
			}	
		},
		/**
		* WHEN USER CHANGE THE TRIP TYPE (ROUND TRIP OR ONE WAY TRIP), FOLLOWING METHID WILL BE CALLED
		* @INPUT - OBJECT
		* @RETURN - NA
		**/
		changeTripType : function(obj) {
			/* MAKING PASSED TRIP TYPE AS SELECTED RADIO INPUT FIELD */
			$(obj).prop('checked', true);
			/* IF THE TRIP TYPE IS ONEWAY */
			if ($(obj).attr("value") === "ONEWAY") {
				/* HIDE RETURN DATE FIELDSET */
				$("#returnDate-fieldset").hide();	
				/* CLEARING RETURN DATE FIELD VALUE */
				$("#returnDate").val("");
				/* HIDDING RETURN DATE INPUT FIELD */
				$(".returnDate-box").hide();
			} else {
				/* SHOWING RETURE DATE FIELDSET */
				$("#returnDate-fieldset").show();
				/* SHOWING RETURN DATE INPUT FIELD */	
				$(".returnDate-box").show();
			}
		},
		/**
		* CONVERTING NUMBER INTO MONTH(MMM)
		* @INPUT - MONTH IN NUMBER
		* @RETURN - MONTH IN MMM FORMAT
		**/
		convertNumberIntoMonth : function (monthNum) {
			/* DECLARING MONTHS IN MMM FORMAT*/
 			var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
 			/* FINDING MONTH FROM ARRAY USING THE MONTH NUMBER AND RETURNING */
 			return months[parseInt(monthNum, 10) - 1];
		},
		/**
		* ADDING SUFFIC AFTER A NUMBER
		* @INPUT - NUMBER
		* @RETURN - NUMBER WITH SUFFIX
		**/
		suffixNumber : function (num) {
			/* CONVERTING NUMBER INTO STRING AND TAKING THE LAST CHARACTER ALONE*/
			var last = num.toString().slice(-1),
		        ord = '';
		    switch (last) {
		    	/* CHECKING IF ITS 1, THEN ADD SUFFIX ST */
		        case '1':
		            ord = 'st';
		            break;
		        /* CHECKING IF ITS 2, THEN ADD SUFFIX ND */
		        case '2':
		            ord = 'nd';
		            break;
		        /* CHECKING IF ITS 3, THEN ADD SUFFIX RD */
		        case '3':
		            ord = 'rd';
		            break;
		        /* CHECKING IF ITS 4, 5, 6, 7, 8, 9 OR 0 THEN ADD SUFFIX TH */
		        case '4':
		        case '5':
		        case '6':
		        case '7':
		        case '8':
		        case '9':
		        case '0':
		            ord = 'th';
		            break;
		    }
		    /* CONVERTING WHOLE NUMBER INTO STRING AND ADDING SELECTED SUFFIX TO IT */
		    return num.toString() + ord;
		},
		/**
		* CLEARING ALL SUER DEFINED INPUT FIELD
		* @INPUT - NA
		* @RETURN - NA
		**/
		clearAll : function () {
			/* RESETTING TRIP TYPE TO ONE WAY */
			$("#tripType").filter("[value='ONEWAY']").prop('checked', true);
			/* HIDDING RETURN DATE FIELD */
			$("#returnDate-fieldset").hide();
			/* CLEARING RETURN DATE VALUE FROM RETURN DATE INPUT FIELD */
			$("#returnDate").val("");
			/* HIDDING RETURN DATE FIELDSET */
			$(".returnDate-box").hide();
			/* GETTING ALL ELEMENTS INSIDE A FORM */
			var elements = document.getElementById("searchFrom").elements;
			/* LOOPING THE FORM ELEMENTS */
			for (var i = 0, element; element = elements[i++];) {
				/* CLEARING THE FIELD VALUE ONLY IF THE INPUT FIELD TYPE IS TEXT OR SELECT FIELD */
			    if (element.type === "text" || element.type === "select-one") {
			    	/* CLEARING THE INPUT FIELD VALUE */
			        element.value = "";
			    }
			}	
		},
		/**
		* CHECKING WHETHER NO FLIGHTS AVAIBALE FOR THE SELECTED ROUTE
		* @INPUT - ALL AVAILABLE FLIGHTS FOR THE SELECTED ROUTE
		* @RETURN - NA
		**/
		checkNoFlights : function (flights){
			/* BY DEFAULT SHOWING SEARCH INPUTS */
			$("#search-filter-inputs").show();
			/* HIDING INFO CONTENT */
			$("#info-filter").hide();
			/* IF AVAILABLE FLIGHT IS ZERO */
			if (flights === 0) {
				/* SHOWING NO FLIGHT MESSAGE CONTENT */
				$("#error-msg-no-flights").show();
				/* HIDDING RANGE SLIDER */
				if (!$("#price-range-filter").is(':visible')) {
					/* HIDDING RANGE SLIDER */
					$("#price-range-filter").hide();		
				}
			} else {
				/* HIDDING NO FLIGHT MESSAGE CONTENT */
				$("#error-msg-no-flights").hide();
				/* SHOWING RANGE SLIDER */
				$("#price-range-filter").show();
			}
		}
	}
	/* CALLING INIT METHOD ON PAGE LOADED*/
	FAI.FN.SEARCH.init();
});