document.querySelector('.modal button').addEventListener('click', () => {
    const heart = document.createElement('div');//div element 생성
    heart.classList.add('heart'); //class 'heart'부여
    console.log("heart!!");

    // 현재 보고 있는 뷰포트의 상대적 위치에 하트를 배치
    heart.style.top = (window.scrollY + window.innerHeight / 2) + 'px';
    heart.style.left = (50 + (Math.random() - 0.5) * 100) + '%'; // 가로축 중앙에서 ±15% 범위 내에서 랜덤

    document.getElementById('heartContainer').appendChild(heart);

    // 하트가 사라지도록 타이머 설정
    setTimeout(() => {
        heart.remove();
    }, 2000); // 2000ms = 2초 후에 하트 제거
});