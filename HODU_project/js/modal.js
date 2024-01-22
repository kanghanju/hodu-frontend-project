
const modal = document.querySelector(".modal");
const form = document.querySelector(".email-form");
form.addEventListener("submit",(event)=>{
    event.preventDefault();
    modal.style.display = "block";
})

const closeBtn = document.querySelector(".close-image");
closeBtn.addEventListener("click",()=>{
    modal.style.display="none";
})