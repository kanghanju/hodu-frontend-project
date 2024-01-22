
const subscribeBtn = document.querySelector(".subscribe_input .orange_Btn");
let modal = document.querySelector(".modal");
let form = document.querySelector(".emailForm");
form.addEventListener("submit",(event)=>{
    event.preventDefault();
    modal.style.display = "block";
})

const closeBtn = document.querySelector(".close_image");
closeBtn.addEventListener("click",(event)=>{
    modal.style.display="none";
})