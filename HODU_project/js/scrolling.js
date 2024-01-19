const container = document.querySelector(".container");
const showMoreBtn = document.querySelector(".event_Btn .orange_Btn");
let pageNum = 2;

async function fetchImages(pageNum){
    try{
        const response = await fetch("https://picsum.photos/v2/list?page="+pageNum+"&limit=3");
        if(!response.ok){//통신실패시 Error객체 던짐
            throw new Error("네트워크 응답에 문제가 있습니다.")
        }

        const datas = await response.json();
        console.log(datas);

        //makeImageList의 인자로 datas를 넘겨준다
        makeImageList(datas);

    }catch(error){
        console.error('데이터를 가져오는데 문제가 발생했습니다 :', error);
    }
}


function makeImageList(datas){
    datas.forEach((item)=> {
        container.innerHTML += "<div><img src="+item.download_url+"alt=''></div>"; //겉에 ""면 안에는 ''써야한다!!!
    });
}

const throttling = (callback, delay) => {
    let timer = null; //얘에 접근할 수 있는 유일한 함수는 return에 있는 함수이다.

    return () => {//이 내부 함수만이 timer변수에 접근 가능
        console.log(timer);

        if (timer === null) {
            timer = setTimeout(() => {
                callback();
                timer = null;
            }, delay);
        }
    };
};
//
showMoreBtn.addEventListener('click', fetchImages(pageNum));//함수뒤에 소괄호 2개면 실행 ,
// //add이벤트도 바로 실행하고 이씅ㅁ, 스크립트는 바로 ㅁddEventListener을 실행한다. click,throttling이라고 되어있으면 클릭이벤트가
// //발생해야 나는게 맞는데 , 이건 딱 한번만 실행된다.


container.addEventListener('scroll',()=>{
    //스크롤이 상단으로부터 얼마나 이동했는지 알아야한다 (뷰포트의 높이 + 스크롤된 길이)
    //화면에 로딩된 페이지의 전체 높이를 알아야한다
    //뷰포트의 높이 + 스크롤된 길이 + 10 === 화면에 로딩된 페이지의 전체 높이
    
        //윈도우의 뷰포트 높이 + 문서에게 스크롤 얼마나 됐는지
        if(container.scrollHeight - container.scrollTop - container.clientHeight < 1000)
            {//요소의 총 높이
            throttling(fetchImages(pageNum+=1), 1000)
        }

})
//1. 한번 로딩했던 이미지도 추가 이미지를 로딩할 때 다시 로딩된다
//2. bottom이 여러번 찍힌다. -> 이미지 로딩이 너무 많이 된다 -> 스크롤 이벤트를 무디게 만들어줘야 한다
//3. 따라서 쓰로틀링을 검색해서 관련된 자료를 찾아보자