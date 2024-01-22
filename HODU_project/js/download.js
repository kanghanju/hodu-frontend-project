const downloadButtons = document.querySelectorAll(".download_image");

downloadButtons.forEach(button=>{
    button.addEventListener('click',function () {
        let link = document.createElement('a');
        link.href = 'media/image/madeByHanju.jpg';
        link.download = '축하합니다당신은따봉고양이의축복을받았습니다'
        link.click();
    })
})