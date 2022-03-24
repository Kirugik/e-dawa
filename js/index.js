//Business Logic



//UI Logic 
$(document).ready(function() {
    //contact us, show message sent
    $("#contactus-btn").click(function(event) {
        event.preventDefault();

        let firstName = $("#first-name").val();
        // let lastName = $("#last-name").val();
        // let contactNum = $("#contact-num").val(); 
        // let contactEmail = $("#contact-email").val();
        // let textArea = $("#text-area").val();

        let messageSent = document.getElementById("message-sent");

        if(($("#first-name").val() && $("#last-name").val() && $("#contact-num").val() && $("#contact-email").val() && $("#text-area").val()) !== "") {
            messageSent.innerHTML = `<p>${firstName}, your message has been received. Thankyou for contacting us.</p>`
        } else {
            messageSent.innerHTML = `<p>Please fill all the required details.</p>`
        }
    })
});