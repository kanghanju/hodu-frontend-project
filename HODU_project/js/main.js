const downloadButtons = document.querySelectorAll(".btn-download");
const goUpButton = document.querySelector(".vector");
downloadButtons.forEach(button=>{
    button.addEventListener('click',function () {
        let link = document.createElement('a');
        link.href = 'media/image/madeByHanju.jpg';
        link.download = '축하합니다당신은따봉고양이의축복을받았습니다'
        link.click();
    })
})

goUpButton.addEventListener("click",function (){
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // 부드러운 스크롤 효과
    });
})
