
const formname = document.querySelector('#myForm');
//const valreg = /^[a-zA-Z ]{4,}[a-zA-Z ]{5,}$/  
const valreg1 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ //regex pattern for email field
const valreg2 = /^[0-9]+$/


//Getting references to the form elements
var nameFlag = emailFlag = phoneSubFlag = phoneStateFlag = false
let username = formname.elements.namedItem("username");
let email = formname.elements.namedItem("email");
let phone1 = formname.elements.namedItem("phone1");
let phone2 = formname.elements.namedItem("phone2");
let phone3 = formname.elements.namedItem("phone3");


var wordCount = 0
var stateCode;
var numFlag = [];
var charFlag = [];
var emailArr2 = [];
var emailNum = [];
var emailNumFlag;
var url1 = "";
var url2 = "";
//Setting event listeners
username.addEventListener("keyup", validate);
email.addEventListener("keydown", validate);
phone1.addEventListener("keydown", validate);
phone2.addEventListener("input", validate);
phone3.addEventListener("input", validate);


//Function called on onSubmit()
function validateForm() {
  // if (nameFlag === true && emailFlag === true && phoneFlag === true) {
  if (document.getElementById("NameMessage1").innerHTML === "" &&
    document.getElementById("NameMessage2").innerHTML === "" &&
    document.getElementById("NameMessage3").innerHTML === "" &&
    document.getElementById("message1").innerHTML === "" && phoneSubFlag === true) {

    document.getElementById("FinalMessage").innerHTML = "";
    return true;
  }
  else {
    document.getElementById("FinalMessage").innerHTML = "Please enter accurate information";
    return false;
  }
}

//Function called on keyup event of text inputs
function validate(e) {
  let target = e.target;
  //  console.log("You pressed : " + e.key);

  //when username is being entered
  if (target.name === "username") {

    strArr = target.value.split(" ");
    strCharArr = target.value.split("");


    nameChLengthFlag = []; //name character length flag array
    nameWLengthFlag = [];  //name word length flag array
    for (var i = 0; i < strArr.length; i++) {

      //Checking for minimum no. of characters in each word being entered
      if (strArr[i].length < 4) {

        document.getElementById("NameMessage1").innerHTML = "Name should be minimum 4 characters long";
        nameChLengthFlag[i] = false;
        nameFlag = false;

      }
      else if (strArr[i].length >= 4) {
        document.getElementById("NameMessage1").innerHTML = "";
        document.getElementById("FinalMessage").innerHTML = "";
        nameChLengthFlag[i] = true;
        nameFlag = true;

      }

      //Checking for no. of minimum no. of words being entered
      if (strArr.length < 2) {
        document.getElementById("NameMessage2").innerHTML = "Name should be minimum 2 words long";
        nameWLengthFlag[i] = false;
      }
      else {
        document.getElementById("NameMessage2").innerHTML = "";
        document.getElementById("FinalMessage").innerHTML = "";
        nameWLengthFlag[i] = true;
      }

    }
    //using the every function, here we check if the nameChFlag and nameWFlag arrays contain all true values or not. 
    //If all true, it means there are minimum 2 words with min 4 character length
    nameChFlag = nameChLengthFlag.every((flag) => flag === true);
    nameWFlag = nameWLengthFlag.every((flag) => flag === true);

    if (nameChFlag) {
      document.getElementById("NameMessage1").innerHTML = "";
      document.getElementById("FinalMessage").innerHTML = "";
      nameFlag = true;
    }
    else {
      document.getElementById("NameMessage1").innerHTML = "Name should be minimum 4 characters long";
      nameFlag = false;
    }

    if (nameWFlag) {
      document.getElementById("NameMessage2").innerHTML = "";
      document.getElementById("FinalMessage").innerHTML = "";
      nameFlag = true;
    }
    else {
      document.getElementById("NameMessage2").innerHTML = "Name should be minimum 2 words long";
      nameFlag = false;
    }



    charFlag = []; //special char flag array
    numFlag = []; //num flag array

    //Iterating through the entire string in the input box and checking for numbers and special characters
    for (var j in strCharArr) {
      //checking if any number is present or not in the entire text box input
      if (Number.isInteger(parseInt(strCharArr[j]))) {
        numFlag[j] = true;
      }
      else {
        numFlag[j] = false;
      }

      //checking if any special character is present or not in the entire text box input
      if (/[~`@!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(strCharArr[j])) {
        charFlag[j] = true;
      }
      else {
        charFlag[j] = false;
      }


    }

    //using the every function, here we check if the numFlag and charFlag arrays contain all false values or not. 
    //If all false, it means no number or no special character is present in the entire data in the text box
    numAbsent = numFlag.every((flag) => flag === false);
    charAbsent = charFlag.every((flag) => flag === false);

    //setting the text in <p> depending on above outcome
    if (numAbsent) {
      document.getElementById("NameMessage3").innerHTML = "";
      document.getElementById("FinalMessage").innerHTML = "";
    }
    else {
      document.getElementById("NameMessage3").innerHTML = "Numbers not allowed";
    }

    if (charAbsent) {
      document.getElementById("NameMessage4").innerHTML = "";
      document.getElementById("FinalMessage").innerHTML = "";
    }
    else {
      document.getElementById("NameMessage4").innerHTML = "Special Characters not allowed";
    }


    // }
    // }


    fullName = target.value.split(" ")
    localStorage.name = fullName[0];
  }


  //when email is being entered
  if (target.name === "email") {
    if (valreg1.test(target.value)) {


      emailArr1 = target.value.split(/[@.]+/)
      console.log(emailArr1)
      console.log(emailArr1.length)

      emailFlag = false;

      for (j = 0; j < emailArr1.length; j++) {
        if (isNaN(emailArr1[j])) {
          console.log(emailArr1[j] + " its a word")
          emailNum[j] = false;
        }
        else {
          console.log(emailArr1[j] + " its a number")
          emailNum[j] = true;
        }
      }
      emailNumFlag = emailNum.every((flag) => flag === false);

      if (emailNumFlag === true) {
        document.getElementById("message1").innerHTML = "";
        document.getElementById("FinalMessage").innerHTML = "";
      }
      else {
        document.getElementById("message1").innerHTML = " Enter a valid email id";
      }

      emailArr1 = [];
    }
    else {
      document.getElementById("message1").innerHTML = " Enter a valid email id";

    }

  }

  //when first 3 digits of phone number is being entered
  if (target.name === "phone1" && e.key != 'Backspace') {

    str = target.value;
    size = str.length;
    console.log(size)
    if(target.value.match( /^[0-9]+$/)){
    strFormat = target.value.split('')
    strFormat = '(' + str;
    }
    

    /*********************************************** */

    if (size === 0) {
      console.log("size: " + size)
     
      strFormat = '(' + str;
      phone1.value = strFormat;
    }
    if (size === 1 && e.key !== "Backspace") {
     
      phone1.value = strFormat;
    }
    if (size === 4) {
   
      strFormat = str + ')' + '-';
   
      phone1.value = strFormat;
    }

    if (size === 9) {

      strFormat = str + '-';
      stateCode = str.substring(6, 9);
      if (stateCode != undefined) {
        checkState(parseInt(stateCode));
      }
      phone1.value = strFormat;
    }

    /******************************************** */
str = target.value;
if (stateCode != undefined) {
  checkState(parseInt(stateCode));
}
console.log("string: " + target.value)

    if (parseInt(str.substring(1, 4)) > 621 && parseInt(str.substring(1, 4)) <= 799) {
      document.getElementById("message2").innerHTML = "Jio, ";
      document.getElementById("FinalMessage").innerHTML = "";
      
      phoneSubFlag = true;
    }
    else if (parseInt(str.substring(1, 4)) > 801 && parseInt(str.substring(1, 4)) <= 920) {
      document.getElementById("message2").innerHTML = "Idea, ";
      document.getElementById("FinalMessage").innerHTML = "";
      
      phoneSubFlag = true;
    }
    else if (parseInt(str.substring(1, 4)) > 921 && parseInt(str.substring(1, 4)) <= 999) {
      document.getElementById("message2").innerHTML = "Vodafone, ";
      document.getElementById("FinalMessage").innerHTML = "";
      
      phoneSubFlag = true;
    }
    else {
      document.getElementById("message2").innerHTML = "Invalid";
      document.getElementById("message3").innerHTML = "";
      phoneSubFlag = false;
    }
    // phone1.value = strFormat;
    stateCode = str.substring(6, 9);
    if (stateCode != undefined) {
      checkState(parseInt(stateCode));
    }

    localStorage.phone1 = target.value;
  }


}


//Function to get the state names depending on the state code(second set of 3 digits in the phone number)
function checkState(stateCodeInt) {
  if (document.getElementById("message2").innerHTML !== 'Invalid') {
    switch (true) {
      case (stateCodeInt >= 0 && stateCodeInt < 28): document.getElementById("message3").innerHTML = "Andhra Pradesh";
        break;
      case (stateCodeInt >= 29 && stateCodeInt < 56): document.getElementById("message3").innerHTML = "Arunachal Pradesh";
        break;
      case (stateCodeInt >= 57 && stateCodeInt < 84): document.getElementById("message3").innerHTML = "Assam";
        break;
      case (stateCodeInt >= 85 && stateCodeInt < 112): document.getElementById("message3").innerHTML = "Bihar";
        break;
      case (stateCodeInt >= 113 && stateCodeInt < 140): document.getElementById("message3").innerHTML = "Chhattisgarh";
        break;
      case (stateCodeInt >= 141 && stateCodeInt < 168): document.getElementById("message3").innerHTML = "Goa";
        break;
      case (stateCodeInt >= 169 && stateCodeInt < 196): document.getElementById("message3").innerHTML = "Gujarat";
        break;
      case (stateCodeInt >= 197 && stateCodeInt < 224): document.getElementById("message3").innerHTML = "Haryana";
        break;
      case (stateCodeInt >= 225 && stateCodeInt < 252): document.getElementById("message3").innerHTML = "Himachal Pradesh";
        break;
      case (stateCodeInt >= 253 && stateCodeInt < 280): document.getElementById("message3").innerHTML = "Jharkhand";
        break;
      case (stateCodeInt >= 281 && stateCodeInt < 308): document.getElementById("message3").innerHTML = "Karnataka";
        break;
      case (stateCodeInt >= 309 && stateCodeInt < 336): document.getElementById("message3").innerHTML = "Kerela";
        break;
      case (stateCodeInt >= 337 && stateCodeInt < 364): document.getElementById("message3").innerHTML = "Madhya Pradesh";
        break;
      case (stateCodeInt >= 365 && stateCodeInt < 392): document.getElementById("message3").innerHTML = "Maharashtra";
        break;
      case (stateCodeInt >= 393 && stateCodeInt < 420): document.getElementById("message3").innerHTML = "Manipur";
        break;
      case (stateCodeInt >= 421 && stateCodeInt < 448): document.getElementById("message3").innerHTML = "Meghalaya";
        break;
      case (stateCodeInt >= 449 && stateCodeInt < 476): document.getElementById("message3").innerHTML = "Mizoram";
        break;
      case (stateCodeInt >= 477 && stateCodeInt < 504): document.getElementById("message3").innerHTML = "Nagaland";
        break;
      case (stateCodeInt >= 505 && stateCodeInt < 532): document.getElementById("message3").innerHTML = "Odisha";
        break;
      case (stateCodeInt >= 533 && stateCodeInt < 560): document.getElementById("message3").innerHTML = "Punjab";
        break;
      case (stateCodeInt >= 561 && stateCodeInt < 588): document.getElementById("message3").innerHTML = "Rajasthan";
        break;
      case (stateCodeInt >= 589 && stateCodeInt < 616): document.getElementById("message3").innerHTML = "Sikkim";
        break;
      case (stateCodeInt >= 617 && stateCodeInt < 644): document.getElementById("message3").innerHTML = "Tamil Nadu";
        break;
      case (stateCodeInt >= 645 && stateCodeInt < 672): document.getElementById("message3").innerHTML = "Telangana";
        break;
      case (stateCodeInt >= 673 && stateCodeInt < 700): document.getElementById("message3").innerHTML = "Tripura";
        break;
      case (stateCodeInt >= 701 && stateCodeInt < 728): document.getElementById("message3").innerHTML = "Uttar Pradesh";
        break;
      case (stateCodeInt >= 729 && stateCodeInt < 756): document.getElementById("message3").innerHTML = "Uttarakhand";
        break;
      case (stateCodeInt >= 757 && stateCodeInt < 784): document.getElementById("message3").innerHTML = "West Bengal";
        break;
      case (stateCodeInt >= 785 && stateCodeInt < 812): document.getElementById("message3").innerHTML = "Andaman and Nicobar Islands";
        break;
      case (stateCodeInt >= 813 && stateCodeInt < 840): document.getElementById("message3").innerHTML = "Chandigarh";
        break;
      case (stateCodeInt >= 841 && stateCodeInt < 868): document.getElementById("message3").innerHTML = "Dadra Nagar Haveli and Daman Diu";
        break;
      case (stateCodeInt >= 869 && stateCodeInt < 896): document.getElementById("message3").innerHTML = "Delhi";
        break;
      case (stateCodeInt >= 897 && stateCodeInt < 924): document.getElementById("message3").innerHTML = "Jammu and Kashmir";
        break;
      case (stateCodeInt >= 925 && stateCodeInt < 952): document.getElementById("message3").innerHTML = "Ladakh";
        break;
      case (stateCodeInt >= 953 && stateCodeInt < 980): document.getElementById("message3").innerHTML = "Lakshadweep";
        break;
      case (stateCodeInt >= 981 && stateCodeInt <= 999): document.getElementById("message3").innerHTML = "Puducherry";
        break;

    }
  }
}