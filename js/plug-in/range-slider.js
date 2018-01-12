/**
* RANGE-SLIDER JS FILE - USE TO MAKE SLIDER FOR MIN AND MAX NUMBER.
* @AUTHOR - FAIZAL
* @DATE - 25/04/2017
**/
$(function () {
	/* NAMING THE PLUGIN */
	$.fn.rangeSlider = function (params) {

		/* ASSIGNING THE USER DEFINED PARAMS TO DEFAULT PARAMS */
		var settings = $.extend({min:0, max: 200, default:0, targetId: ""}, params);

		/**
		* CONVERT PLAIN NUMBER INTO CURRENCY VALUE WHICH INCLUDE COMMAS
		* @INPUT - PLAIN NUMBER
		* @RETURN - CURRENCY WITH COMMAS (WITHOU SYMBOL)
		**/
		var numberToCurrency = function (no) {

			/* CONVERTING PLAIN NUMBER INTO STRING */
			no = no.toString();

			/* SUBSTRING LAST THREE DIGITS */
			var lastThree = no.substring(no.length - 3);

			/* SUBSTRING OTHER DIGITS EXCEPT LAST THREE DIGITS */
			var otherNumbers = no.substring(0, no.length - 3);

			/* CHECKING WHETHER OTHER DIGITS EXCEPT LAST THREE DIGITS ARE NOT EMPTY, TO ADD COMMAS BEFORE FIRST THREE DIGITS */
			if(otherNumbers != '')
				/* ADDING COMMAS BEFORE LAST THREE DIGIT */
    			lastThree = ',' + lastThree;
    		/* ADDING COMMAS ON EVERY TWO DIGIT IN OTHERS NUMBER DIGITIS AND APPENDING FIRST THREE NUMBER DIGITS */
			return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
		},
		/**
		* GENERATING RANGE SLIDER HTML TAGS AND APPENDING INTO DOM ELEMENT
		* @INPUT - CURRENT OBJ
		* @RETURN - NA
		**/
		generateSliderHTMLTags = function (currentObj) {
			/* GETTING SLIDER BAR HTML TEMPLATE FROM SCRIPT TAG */
			var tags = $("#slider-bar-html-template").text();
			/* CALLING UPPLANT WITH OBJECTS TO GENERATE HTML TAGS WITH KEY & VALUE PAIR */
			tags = tags.supplant(generateSupplantObject());

			/* INSERTING THE GENERATED TAGS INTO DOM ELEMENT */
			$(currentObj).html(tags);
		},
		/**
		* GENERATE OBJECT
		* @INPUT - OBJ
		* @RETURN - SLIDER BAR OBJECT
		**/
		generateSupplantObject = function () {
			var sliderObj = {minValue: numberToCurrency(settings.min),
			        	maxValue: numberToCurrency(settings.max)};
			return sliderObj;
		},
		/**
		* RANGE SLIDER INIT METHOD
		* @INPUT - CURRENT OBJ
		* @RETURN - NA
		**/
		init = function (currentObj) {
			/* CALLING GENERATE RANGE SLIDER HTML TAGS */
			generateSliderHTMLTags(currentObj);

			/* SETTING DEFAULT MAX VALUE IN THE DOM ELEMENT */
			$("#" + settings.targetId).text(numberToCurrency(settings.max));
		},
		/**
		* RANGE SLIDER ANIMATION EFFECT
		* @INPUT - EVENT
		* @RETURN - NA
		**/
		sliderHandler = function (event) {

			/* FINDING THE DISTANCE BETWEEN START OF THE SLIDER AND WHERE THE USER CLICKED */
			var point = event.pageX - $("#slider-liner").position().left;

			/* ALLOWING SLIDER TO MOVE ONLY IF ITS CLICKED ON THE SLIDER LINE ALONE BY CHECKING EVENT ID*/
			if (event.target.id === "slider-liner" || event.target.id === "slider") {

				/* MOVING THE SLIDER POINTER USING LEFT STYLE CASE */
	         	$(this).find(".slider").animate({"left": point - 10});

	         	/* FINDING HOW MUCH PERCENTAGE SLIDER POINT MOVED ON THE SLIDER LINE */
	            var completedPercentage = (parseInt(point, 10)/parseInt($(this).find(".slider-liner").css("width").replace("px", ""), 10)) * 100;

	            /* FINDING THE SLIDER POINT VALUE BETWEEN THE MIN AND MAX VALUE */
	            var pointValue = (((settings.max - settings.min)/100) * completedPercentage) + settings.min;

	            /* CHECKING WHETHER NEW POINT VALUE CROSSED PLUGIN MAX VALUE SETTING IF IT CROSSED THEN ASSIGN MAX VALUE SETTING TO NEW POINT VALUE */
	            pointValue = (pointValue > settings.max) ? settings.max : pointValue;
	            
	            /* CONVERTING NUMBER INTO CURRENCY WITH ZERO DECIMAL POINT AND INSERTING INTO DOM ELEMENT */
	            $("#" + settings.targetId).text(numberToCurrency(pointValue.toFixed(0)));
	        }
	    };

	    /* CALLING INIT METHOD WHEN RANGE-SLIDER.JS PLUG-IN LOADED FIRST */
	    init(this);

	    /* RETURNING THE RANGE-SLIDER THIS OBJECT AFTER MODIFICATION */
		return this.each(function () {

			/* BINDING SLIDERHANDLER METHOD WHEN USER CLICK SLIDER LINE */
			$(this).click(sliderHandler);
		});
	};
});