/**
* GENERIC JS FILE - USE TO CREATE GENERIC FUNCTION METHODS
* @AUTHOR - FAIZAL
* @DATE - 25/04/2017
**/

/**
* USER DEFINED REPLACEALL METHOD
* @AUTHOR - FAIZAL
* @INPUT - SEARCH AND REPLACEMENT
* @RETURN - REPLACED STRING 
**/
String.prototype.replaceAll = function (search, replacement) {
	/* REPLACING THE ORIGINAL INPUTG WITH REPLACEMENT INPUT */
	return this.replace(new RegExp(search, 'g'), replacement);
};

/**
* USER DEFINED CONVERT ANGULAR KEY WITH OBJECT VALUES METHOD
* @AUTHOR - FAIZAL
* @INPUT - OBJECT
* @RETURN - REPLACED OBJECT 
**/
String.prototype.supplant = function (obj) {
	/* CONVERTING ARRAY OF STRING INTO SINGLE HTML STRING */
	var targetHTML = this.toString();

	/* LOOPING EACH PROPERTY INSIDE OBJECT*/
	for (var k in obj) {
		/* REPLACING ALL KEYS WITH VALUES */
		targetHTML = targetHTML.replaceAll("{"+k+"}", obj[k]);
	}
	/* RETURNING THE REPLACED (KEY TO VALUES) HTML TAGS */
	return targetHTML;
};