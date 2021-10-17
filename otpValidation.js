const formname = document.querySelector('#otpForm');

let otp = formname.elements.namedItem("otp");
otp.addEventListener("input", validate);
var attempt = 0;
var uname = localStorage.name;
var uphone1 = localStorage.phone1;

//generating a random number between 1000 & 9999
var random = Math.floor(Math.random() * 8999) + 1000;

document.getElementById("message").innerHTML = `Dear ${uname}, A 4 digit verification number has been sent to your phone number ${uphone1}, please enter in the following box and submit for confirmation:`
alert(random + " is the verification code to login to your account");

function validateOTP() {
  console.log(otp.value)
  if (random === parseInt(otp.value)) {
    // setTimeout(function () { window.location.assign("http://pixel6.co/") }, 1000);
    return true;
   
    //redirect to pixel6 page
  }
  else {
    document.getElementById("message1").innerHTML = "Wrong otp. Try again";
    if (otp.value === '') {
      document.getElementById("message1").innerHTML = "";
    }
    else{
      otp.value = ''
      attempt++;
      if (attempt === 3) {
        document.getElementById("message1").innerHTML = "Sorry!! Validation Unsuccessful";
        //redirect to 404 page after 2 seconds
        setTimeout(function () { window.location.assign("http://pixel6.co/404") }, 500);
       //return false;
      }
      
    }
    return false;
  }

}

function validate(e) {

  let target = e.target;

  if (/[a-zA-Z ~`@!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(target.value)) {
    document.getElementById("message1").innerHTML = "Alphabets and special characters not allowed";
  }

}