/**
* UP-DOWN-TOGGLE JS FILE - USE TO HIDE AND SHOW CONTENT
* @AUTHOR - FAIZAL
* @DATE - 25/04/2017
**/
$(function(){
	/* NAMING THE PLUGIN */
	$.fn.upDownToggle = function (params) {

		/* ASSIGNING THE USER DEFINED PARAMS TO DEFAULT PARAMS */
		var settings = $.extend({type: ""}, params);

		/* FADING OUT (REMOVING) ALREADY VISIBLE ALL CONTENT */
		$(".up-down-toggle-content").hide();

		/**
		* USED TO REMOVE CONTENT WHEN USER CLICK/UNCLICK THE ICON
		* @INPUT - NA
		* @RETURN - NA
		**/
		var showHideContentHandler = function () {
			/* CHECKING WHETHER CONTENT VISIBLE OR NOT */
			if (!$("." + $(this).data("up-down-content")).hasClass("hide")) {
				/* IF CONTENT VISIBLE, SHOW THE CONTENT BOX AND CHANGE THE ICON TO UP ARROW */

				$("." + $(this).data("up-down-content")).slideUp("slow").addClass("hide");
				$(this).removeClass("fa-angle-down").addClass("fa-angle-up");
			} else {
				/* IF CONTENT NOT VISIBLE, HIDE THE CONTENT BOX AND CHANGE THE ICON TO DOWN ARROW */
				$("." + $(this).data("up-down-content")).slideDown("slow").removeClass("hide");
				$(this).removeClass("fa-angle-up").addClass("fa-angle-down");
			}
		};

		/* FINDING ALL UP DOWN TOGGLE BOX BY FINDING CLASSNAME WITH 'UP-DOWN-TOGGLE' */
		this.each( function() {
			/* LOOPING EACH OBJECT */
			/* CHECKING WHETHER CONTENT VISIBLE OR NOT */
			if ($(this).data("default") === "OPEN" || !$("." + $(this).data("up-down-content")).hasClass("hide")) {
				/* IF CONTENT VISIBLE, SHOW THE CONTENT BOX AND CHANGE THE ICON TO UP ARROW */
				$("." + $(this).data("up-down-content")).slideDown("slow").removeClass("hide");
				$(this).removeClass("fa-angle-up").addClass("fa-angle-down");
			} else {
				/* IF CONTENT NOT VISIBLE, HIDE THE CONTENT BOX AND CHANGE THE ICON TO DOWN ARROW */
				$("." + $(this).data("up-down-content")).slideUp("slow").addClass("hide");
				$(this).removeClass("fa-angle-down").addClass("fa-angle-up");
			}
	    });
	    /* CALLING INIT METHOD, WHEN PAGE GET LOADED FIRST */

		/* RETURNING THE MODIFIED ALERTPOPUP OBJECT */
		return this.each(function () {
			$(this).click(showHideContentHandler);
		});
	};
});