/* MOBILE CATERING FORM 
 * 
 * This JavaScript file contains a few functions:
 * 
 * openModal() - used to open the modal element when the user clicks on the "Enquire Now" button
 * 
 * jQuery:
 *  dateErrorMessage() - fades in/out an alert box if the user selects an inappropriate date
 *  timeErrorMessage() - fades in/out an alert box if the user selects an inappropriate time
 * 
 * validateForm() - validates the input for the mobile catering enquiry form
 *  calculateDates() - calculates the time between todays date and the event start date
 *  calculateTime() - calculates the time between the event start and end time
 * 
 * sendEnquiry() - captures the form information to generate a customised mailto: link
 * */
 
// MODAL JAVASCRIPT
function openModal() {
	// Get the modal
	  var modal = document.getElementById("myModal");
	
	// Get the button that opens the modal
	  var button = document.getElementById("modalButton");
	
	// Get the <span> element that closes the modal
	  var span = document.getElementsByClassName("close")[0];
	
	// When the user clicks on the button, open the modal
	  button.onclick = function() {
	  modal.style.display = "block";
	};
	
	// When the user clicks on <span> (x), close the modal
	  span.onclick = function() {
	  modal.style.display = "none";
	};
	
	// When the user clicks anywhere outside of the modal, close it
	  window.onclick = function(event) {
	  if (event.target == modal ) {
	    modal.style.display = "none";
	  }
	};
}

/* 
 * jQuery functions to display a warning if the customer selects an event date
 * on or before today, or if the event date is less than a week from today, as 
 * well as displaying a warning if the event end time is less than two hours from
 * the start time, or if the end time is before the start time
*/
$(document).ready(function() {
	
	// dateErrorMessage() is the function name
	dateErrorMessage = function() {
		document.getElementById("alertDate").innerHTML = "Please choose a date at least one week from today";
		// Fade in, hold for a few seconds, then fade out
		$( "div.alertDate" ).fadeIn( 300 ).delay( 4500 ).fadeOut( 400 );
	};
	
	/* timeErrorMessage() has a parameter 'x' that displays a certain error message, depending if
	 * the user selected an end time before the start time (0) or an end time less than two hours from
	 * the start time (120) */
	timeErrorMessage = function(x) {
		if ( x == 0 )
			document.getElementById("alertTime").innerHTML = "Event cannot end before starting. Who are you, Doc Brown? GREAT SCOTT!";
		if ( x == 120 )
		document.getElementById("alertTime").innerHTML = "Minimum event booking time is 2 hours.";
		
		$( "div.alertTime" ).fadeIn( 300 ).delay( 4500 ).fadeOut( 400 );
	};
});

/* validateForm() is called when the modals "Submit" button is clicked.
 * It calls the validation functions, assigning their return values to two
 * (Boolean) variables. If these variables are both 'true' i.e. the input
 * is valid, then call the sendEnquiry() function with the valid information */
function validateForm() {
	
	var dateCheck = calculateDates();
	var timeCheck = calculateTime();
	
	if (dateCheck == true && timeCheck == true)
		sendEnquiry();
} 

function calculateDates() {
	// Validate the event date and todays date - event date has to be at least one week ahead of todays date
	
	// Create a new Date
	var today = new Date();
	// Get todays date
	var todaysDate = today.getFullYear() + '-' + ( today.getMonth()+1 ) + '-' + today.getDate();
	
	// Get the event date
	var eventDate = new Date(document.form.eventdate.value);
	
	// Calculate the time difference between two dates - .getTime() returns value in milliseconds
	var timeDifference = eventDate.getTime() - today.getTime();
	
	/* Calculate the number of days between two dates:
	 * 
	 * 1000 = 1000ms or 1s. 3600 = number of seconds in an hour.
	 * 24 = number of hours in a day. Therefore, timeDifference / (1000 * 3600 * 24)
	 * returns the number of 24 hour days between the events start time and
	 * todays current time.
	 * 
	 * Math.ceil returns the upper 'ceiling' value, rounding the value up to the next largest integer */
	var daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
	
	if (daysDifference <= 0 || daysDifference < 7) {
		dateErrorMessage();
		return false;
	} else
		return true;
}

function calculateTime() {
		// Validate the event start time and end time - end time has to be after start time, and by at least two hours
		var startTime = document.form.starttime.value;
		var endTime = document.form.endtime.value;
		
		// Create date format
		// Get event start hours and minutes
		var timeStartHours = new Date("01/01/2022 " + startTime).getHours();		// There NEEDS to be a space after the year and before the last ". Javascript is weird.
		var timeStartMins = new Date("01/01/2022 " + startTime).getMinutes();
		
		// Get event end hours and minutes
		var timeEndHours = new Date("01/01/2022 " + endTime).getHours();
		var timeEndMins = new Date("01/01/2022 " + endTime).getMinutes();
				
		// Calculate the time difference in both hours and minutes
		var timeDiffHours = timeEndHours - timeStartHours;
		var timeDiffMins = ((timeEndHours * 60) + timeEndMins) - ((timeStartHours * 60) + timeStartMins);

		if (timeDiffHours < 0) {
			/* If the hour difference is negative, then the end time is
			 * before the start time, so display an error message */
			timeErrorMessage(0);
			return false;
		}
		else if (timeDiffHours >= 0 && timeDiffMins < 120) {
			/* If the end time is not before the start time, but the total 
			time is less than 120 minutes (2 hours), then display an error message */
			timeErrorMessage(120);
			return false;
		}
		else
			return true;
}

/* This function captures the forms information and creates a customised
 * mailto: link, so the e-mail is already populated with the relevant information */
function sendEnquiry() {
	var nl = "%20%0A";
	
	var firstName = document.form.fname.value;
	var lastName = document.form.lname.value;
	
	var email = "E-mail: " + document.form.email.value + nl;
	
	var phoneNo = "Phone Number: " + document.form.phone.value + nl;
	var companyName = "Company Name: " + document.form.company.value + nl;
	var eventDate = "Event Date: " + document.form.eventdate.value + nl;
	var eventLocation = "Event Location: " + document.form.location.value + nl;
	var startTime = "Start Time: " + document.form.starttime.value + nl;
	var endTime = "End Time: " + document.form.endtime.value + nl;
	var eventType = "Event Type: " + document.form.eventtype.value + nl;
	var noOfPeople = "Number of People: " + document.form.noofpeople.value + nl;
	var addInfo = "Additional Information: " + document.form.additionalinfo.value + nl;
	
	var subject = "Enquiry from: " + firstName + ' ' + lastName;
	var body = email + phoneNo + companyName + eventDate + eventLocation + startTime + endTime + eventType + noOfPeople + addInfo;
	
	window.location.href = 'mailto:juan@rossinispizzapizzeria.com?&subject=' + subject + '&body=' + body;
}
