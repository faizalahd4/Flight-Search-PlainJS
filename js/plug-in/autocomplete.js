/**
* AUTOCOMPLETE JS FILE - USE TO MAKE AUTOCOMPLETE DROPDOWN
* @AUTHOR - FAIZAL
* @DATE - 25/04/2017
**/
$(function () {
	/* NAMING THE PLUGIN */
	$.fn.autoCompleteFn =  function (params) {

		/* CREATING BASIC CONSTANT VARIABLE */
		var NO_RESULT = "No Result",
			
			/* ASSIGNING THE USER DEFINED PARAMS TO DEFAULT PARAMS */
			options = $.extend({filter: [], datas: []}, params),

			/**
			* GENERATING DROPDOWN USING DATAS AND SHOWING BELOW INPUT FIELD
			* @INPUT - NA
			* @RETURN - NA
			**/
			showOptions = function () {

				/* REMOVING RESTRICTED DATAS FROM MASTER DATAS  USING FILTER FUNCTION */
				var filteredValues = options.datas.filter(function (obj) {
						return options.filter.indexOf(obj.id) === -1;
					}),
					/* FINDING LEFT POSITION OF THE INPUT FIELD */
					boxLeft = $(this).offset().left,
					/* INITIATING TAG VARIABLE */
					optionsTag = "";

					/* LOOPING AND CREATING LIST TAG USING ALLOWED DATAS */
					$(filteredValues).each(function () {
						/* APPENDING EACH LIST TAG AFTER ADDING LABEL AND ID */
						optionsTag += "<li data-value='" + this.id + "'>" + this.label + " (" + this.id + ")</li>";
					});

				/* INSERTING AUTOCOMPLETE FINAL TAG AFTER THE INPUT FIELD */
				$(this).after("<div class='auto-complete' id ='" + $(this).attr("id") + "-options'><input type='text' id='autocomplete-search' placeholder='Search by Name'><ul>" + optionsTag + "</ul></div>");

				/* ASSIGNING LEFT, MARGIN LEFT AND WIDTH CSS CASE VALUE ON AUTO COMPLETE TAG */
				$(".auto-complete").css({"left": boxLeft, "margin-top": $(this).height() + 13, "width": $(this).width() + 18});

				/* FOCUSING INTO INPUT SEARCH FIELD */
				$("#autocomplete-search").focus();
				
				/* FINDING INPUT TAG ID */
				parentId = $(this).attr("id");
			},
			/**
			* REMOVING DROPDOWN FROM THE DOM
			* @INPUT - EVENT
			* @RETURN - NA
			**/
			hideOptions = function (e) {
				/* REMOVE AUTO COMPLETE DROPDOWN IF USER CLICK ANYWHERE ON WINDOW EXCEPT DROP DOWN INPUT FIELD AND CHECKING PARENT ID IS DEFINED */
				if(typeof parentId !== 'undefined' && $("#" + parentId + "-options") && parentId !== undefined && $(e.target).attr("id") !== parentId && $(e.target).attr("id") !== "autocomplete-search") {
					/* REMOVING THE AUTO COMPLETE DROP DOWN TAG FROM THE DOM */
					$("#" + parentId + "-options").remove();
				}
			},
			/**
			* ASSIGNING SELECTED VALUE INTO INPUT FIELD
			* @INPUT - NA
			* @RETURN - NA
			**/
			selectValue = function () {
				/* CHECKING WHETHER USER CLICK NO RESULT OPTIONS ('NO RESULT' OPTION WILL BE SHOWED IF OPTIONS NOT AVAILABLE AFTER FILTER EXCUTATION) */
				if ($(this).text() !== NO_RESULT) {
					/* ASSIGNING SELECTED VALUE INOT INPUT FIELD VALUE ATTRIBUTE */
					$("#" + parentId).val($(this).text());
				}
			},
			/**
			* FILTERING THE DROP DOWN VALUE BY USER INPUT
			* @INPUT - NA
			* @RETURN - NA
			**/
			filterByName = function () {
				/* GETTING USER ENTERED KEYWORD FOR FILTER PURPOSE */
				var keyword = $(this).val(),
					/* FILTERING THE DROP DOWN LIST USING USER ENTERED KEYWORD */
					filteredValues = options.datas.filter(function (obj) {
						return obj.id.toUpperCase().indexOf(keyword.toUpperCase()) !== -1 || obj.label.toUpperCase().indexOf(keyword.toUpperCase()) !== -1;
					}),
					/* INITATING TAG VARIABLE */
					optionsTag = "";
					/* LOOPING AND CREATING LIST TAG USING FILTERED DATAS */
					$(filteredValues).each(function () {
						/* APPENDING EACH LIST TAG AFTER ADDING LABEL AND ID */
						optionsTag += "<li data-value='" + this.id + "'>" + this.label + " (" + this.id + ")</li>";
					});
					/* CHECKING WHETHER FILTERED DATAS IS EMPTY */
					if (filteredValues.length === 0) {
						/* IF FILTERED DATA IS EMPTY THEN ADD NO RESULT LIST TAG */
						optionsTag += "<li data-value=''>" + NO_RESULT + "</li>";
					}
				/* INSERTING AUTOCOMPLETE FINAL TAG */				
				$("#" + parentId + "-options ul").html(optionsTag);
			}; 

		/* RETURNING THE AUTO COMPLETE THIS OBJECT AFTER MODIFICATION */
		return this.each(function () { 
			/* SHOW OPTION TRIGGERED AFTER USER CLICK ON INPUT FIELD TO SHOW AUTO COMPLETE DROP DOWN */
			$(this).click(showOptions);

			/* HIDE AUTO COMPELETE DROP DOWN IF USER CLICK ANYWHERE ON WINDOW EXCEPT DROP DOWN INPUT FIELD*/
			$(document).click(hideOptions);

			/* SELECT VALUE METHOD TRIGGED WHEN USER SELECT A OPTION FROM THE DROP DOWN AND ADDED INTO THE INPUT FIELD VALUE ATTRIBUTE */
			$(document).on("click", "#" + $(this).attr("id") + "-options ul li" , selectValue);

			/* FILTER BY NAME METHOD CALLED WHEN USER TYPE INSIDE DROP DOWN INPUT FIELD TO FILTER THE OPTIONS BY NAME */
			$(document).on("keyup", "#" + $(this).attr("id") + "-options #autocomplete-search" , filterByName);
		});
	};
});