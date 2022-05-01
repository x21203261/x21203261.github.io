/* Funtion to capture the information from the Contact Us form and
 * generate a customised mailto: link with that information */

function sendMail() {
	var firstName = document.contactForm.fname.value;
	var lastName = document.contactForm.lname.value;
	var fullName = firstName + ' ' + lastName;
	
	var subject = document.contactForm.subject.value;
	var body = document.contactForm.body.value;
	/* The below line concatenates two newline characters (%20%0A) and the
	 * full name to the body of the message */
	body += "%20%0A%20%0AFrom: " + fullName; 
	
	/* window.location.href property returns the URL of the current page */
	window.location.href = 'mailto:juan@rossinispizzapizzeria.com?&subject=' + subject + '&body=' + body;
}
