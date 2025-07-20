/** @format */

const avatarInput = document.getElementById("avatar");
const uploadedImage = document.querySelector(".uploaded-image");
const dragDropParagraph = document.querySelector(".drag-drop-p");
const avatarBtns = document.querySelector(".avatar-btns");
const removeImgButton = document.querySelector(".remove-image")
const changeImgButton = document.querySelector(".change-image")
const errorMsgParagraph = document.querySelector(".note p");
const emailInput = document.getElementById("email");
const emailErrorMsg = document.querySelector(".valid-email-msg ");
const form = document.querySelector(".generate-ticket-form");
const ticket = document.querySelector(".generate-ticket");


avatarInput.addEventListener("change", (e) => {
  const file = e.target.files[0];

  if (file) {
    const fileSizeInKb = file.size / 1024;
    if (fileSizeInKb > 500) {
      errorMsgParagraph.textContent =
        "File is too large. Please select a file under 500 KB.";
        errorMsgParagraph.style.color="red"
      console.log("File is too large. Please select a file under 500 KB.");
    } else {
      errorMsgParagraph.textContent =
        "Upload your photo (JPG or PNG, max size:500KB)";
      errorMsgParagraph.style.color = "hsl(245, 15%, 58%)";
      const reader = new FileReader();
      reader.onload = (e) => {
        uploadedImage.src = e.target.result;
      };

      reader.readAsDataURL(file);

      dragDropParagraph.style.display = "none";
      avatarBtns.style.display = "flex";
      removeAvatar()
      changeAvatar()
     
    }
  } else {
    console.log("No file selected.");
  }
});



// handle remove change avatar image

const removeAvatar = () => {
 removeImgButton.addEventListener("click", () => {
   avatarInput.value = "";
   uploadedImage.src = "../assets/images/icon-upload.svg";
   dragDropParagraph.style.display = "block";
   avatarBtns.style.display = "none";
   errorMsgParagraph.textContent =
     "Upload your photo (JPG or PNG, max size:500KB)";
   errorMsgParagraph.style.color = "hsl(245, 15%, 58%)";
 });
}

const changeAvatar = () => {
  changeImgButton.addEventListener("click", () => { 
    avatarInput.click();
  })

}

// Valid Email Address
emailInput.addEventListener("keyup", (e)=>{
  
  const email = e.target.value
   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if(!emailPattern.test(email)) {
    emailInput.style.border = "1px solid red";
    emailInput.style.outline = "1px solid red";
    emailErrorMsg.classList.remove("hide");
   } else {
     emailInput.style.border = "1px solid hsl(252, 6%, 83%)";
     emailInput.style.outline = "1px solid hsl(252, 6%, 83%)";
     emailErrorMsg.classList.add("hide");
   }
})

// show Errors if submit form without valid email and image 
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if(avatarInput.value === "" || emailInput.value === "") {
   
     emailInput.style.border = "1px solid red";
     emailInput.style.outline = "1px solid red";
     emailErrorMsg.classList.remove("hide");
      errorMsgParagraph.textContent =
        "File is too large. Please select a file under 500 KB.";
      errorMsgParagraph.style.color = "red";
     
  } else {
    
     emailInput.style.border = "1px solid hsl(252, 6%, 83%)";
     emailInput.style.outline = "1px solid hsl(252, 6%, 83%)";
     emailErrorMsg.classList.add("hide");
     errorMsgParagraph.textContent =
       "Upload your photo (JPG or PNG, max size:500KB)";
     errorMsgParagraph.style.color = "hsl(245, 15%, 58%)";

     form.style.display = "none"
     displayTicket();
     
  }
})

// display ticket 
const mainHeading = document.querySelector(".main-title");
const inputName = document.getElementById('name')
const inputEmail = document.getElementById("email");
const subParagraph = document.querySelector(".secure");
const ticketName = document.querySelector(".nam-github .name");
const ticketImage = document.querySelector(".ticket-img-nam img");
function displayTicket(){
  const namOfUser = inputName.value.trim();
  const emailOfUser = email.value.trim();
  
  const userNameSpan = document.createElement("span");
  const paragraphSpan = document.createElement("span");

  userNameSpan.classList.add("ticket-user-name");
  paragraphSpan.classList.add("ticket-email");

  userNameSpan.textContent = namOfUser;
  paragraphSpan.textContent = emailOfUser;
  ticketName.textContent = namOfUser

  // mainHeading.innerHTML = `Congrats,`;
  // mainHeading.appendChild(userNameSpan)
  // mainHeading.innerHTML += `<br>`;
  // mainHeading.innerHTML += `Your ticket is ready,`;

  changeTextElement(
    mainHeading,
    "Congrats,",
    userNameSpan,
    "Your ticket is ready,"
  );
  changeTextElement(
    subParagraph,
    "We have emailed your ticket to ",
    paragraphSpan,
    "and will send updates in the run up the event."
  );

  ticket.classList.add('show')

}

// function to change text in element and add element 
function changeTextElement(element, text1, variable, text2, color) {
  element.innerHTML = text1;
  element.appendChild(variable)
  element.innerHTML += `<br/>`;
  element.innerHTML += text2
}