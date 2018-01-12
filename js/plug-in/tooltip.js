/**
* TOOLTIP JS FILE - USE TO MAKE TOOLTIP
* @AUTHOR - FAIZAL
* @DATE - 25/04/2017
**/
$.fn.tooltipfn = function () {

	/**
	* USED TO SHOW TOOLTIP
	* @INPUT - NA
	* @RETURN - NA
	**/
	var handlerOnHover = function () {
		/* FINDING THE POSITION TO PLACE THE TOOLTIP INSIDE DOM */
		var offsetLeft = $(this).offset().left,
			offsetRight = ($(window).width()) - ($(this).offset().left + $(this).width()),
			offsetTop = $(this).offset().top,
			offsetBottom = ($(window).height()) - ($(this).offset().top + $(this).height());

			/* GETTING TOOLTIP HTML TEMPLATE FROM SCRIPT TAG */
			var tags = $("#tooltip-html-template").text();
			/* CALLING UPPLANT WITH OBJECTS TO GENERATE HTML TAGS WITH KEY & VALUE PAIR */
			tags = tags.supplant({title: this.title});
			/* APPENDING TOOLTIP TAG INSIDE DOM */
			$(this).append(tags);

			/* FINDING WHETHER LEFT SIDE OF WINDOW IS GREATER THAN RIGHT SIDE OF THE WINDOW WHERE THE USER CLICKED */
			if (offsetRight < offsetLeft) {
				/* PLACE THE TOOLTIP TO VISIBLE FROM THE RIGHT SIDE OF INPUT TAG */
				$("#tooltip-popup").css("right", offsetRight);
			} else {
				/* PLACE THE TOOLTIP TO VISIBLE FROM THE LEFT SIDE OF INPUT TAG */
				$("#tooltip-popup").css("left", offsetLeft);	
			}

			/* FINDING WHETHER TOP  OF WINDOW IS GREATER THAN BOTTOM OF THE WINDOW WHERE THE USER CLICKED */
			if (offsetTop < offsetBottom) {
				/* PLACE THE TOOLTIP TO VISIBLE FROM THE TOP SIDE OF INPUT TAG */
				$("#tooltip-popup").css("top", offsetTop + 20);
			} else {
				/* PLACE THE TOOLTIP TO VISIBLE FROM THE BOTTOM SIDE OF INPUT TAG */
				$("#tooltip-popup").css("bottom", offsetBottom + 20);	
			}
			/* SHOW TOOLTIP TAG BY SLIDING DOWN AFTER 0.5 SECOND */
			$("#tooltip-popup").hide().slideDown(500);
			/* MAKING TITLE ATTRIBUTE VALUE EMPTY */
			this.title = "";
		};
		
		/**
		* USED TO REMOVE TOOLTIP WHEN USER MOVE AWAY FROM THE LINK
		* @INPUT - NA
		* @RETURN - NA
		**/
		var handlerRemove = function () {
			/* ASSIGNING TITLE VALUE INSIDE TITLE ATTRIBUTE WHEN USER MOVE AWAY FROM THE LINK */
			this.title = $("#tooltip-popup").text();
			/* REMOVING THE TOOLTIP TAG FROM THE DOM USING ID */
			$("#tooltip-popup").remove();
		};

		/* RETURNING THE TOOLTIP THIS OBJECT AFTER MODIFICATION */
		return this.each(function () {
			/* HANDLERONHOVER AND HANDLERREMOVE METHOD CALLED WHEN USER MOUSE OVER AND AWAY FROM THE ELEMENT */
			$(this).hover(handlerOnHover, handlerRemove);
		});
};