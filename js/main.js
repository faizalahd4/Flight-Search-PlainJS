/**
* MAIN JS FILE - USE TO CALL PLUG-IN
* @AUTHOR - FAIZAL
* @DATE - 25/04/2017
**/
$(function () {

  /* APPLYING UP DOWN TOGGLE PLUG-IN */
  $(".up-down-toggle").upDownToggle();

  /* CALLING INTRO PLUG-IN */
  $(".intro").intro();

  /* CALLING TOOLTIP PLUG-IN */
	$(".tooltip").tooltipfn();

  /* CALLING AUTOCOMPLETE PLUG-IN  FOR FROM AND TO INPUT FIELD FOR SEARCHING FLIGHTS BY PASSING AVAILABLE LOCATION AS AUTOCOMPLETE DROP DOWN */
	$("#originLocation, #destinationLocation").autoCompleteFn({datas: locationsDatas});

  /* CALLING SLIDER PLUG-IN TO MAKE PRICE FILTER TO FILTER THE AVAILABLE FLIGHTS */
	$(".slider-container").rangeSlider({min: 0, max: 100000, targetId: "rangePriceId"});

  /* DEPATURE AND RETURN DATE PLUG-IN - STARTS */
  /* DATE FORMAT AS mm/dd/yy */
  var dateFormat = "mm/dd/yy",
      /* INITATING FROM DATE PIKCTER */
      from = $( "#departureDate" ).datepicker({minDate: 0, changeMonth: true}).on( "change", function() {
        var dt = new Date(getDate(this));
            dt.setDate(dt.getDate() + 1);
          to.datepicker( "option", "minDate", dt);
      }),
      /* INITATING TO DATE PIKCTER */
      to = $( "#returnDate" ).datepicker({defaultDate: "+1w", changeMonth: true}).on( "change", function() {
        var dt = new Date(getDate(this));
            dt.setDate(dt.getDate() - 1);
        from.datepicker( "option", "maxDate", dt);
      });
  
  /**
  * GETTING FORMATTED DATE
  * @INPUT - ELEMENT
  * @RETURN - FORMATTED DATE
  **/
  function getDate( element ) {
    /* INITATING DATE VARIABLE */
    var date;
    try {
      /* CONVERTING NORMAL DATE INTO FORMATTED DATE */
      date = $.datepicker.parseDate( dateFormat, element.value );
    } catch( error ) {
      /* ASSIGNING NULL IF ERROR OCCUR */
      date = null;
    } 
    /* RETURNING FORMATTED DATE */
    return date;
  }
  /* DEPATURE AND RETURN DATE PLUG-IN - ENDS */
});