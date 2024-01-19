const container = document.querySelector(".container"); //그리드 container
const showMoreBtn = document.querySelector(".event_Btn .orange_Btn");
let pageNum = 1;

async function fetchImages(pageNum){//이미지를 가져오는 함수
    try{
        const response = await fetch("https://picsum.photos/v2/list?page="+pageNum+"&limit=3");
        if(!response.ok){//통신실패시 Error객체 던짐
            throw new Error("네트워크 응답에 문제가 있습니다.")
        }

        const datas = await response.json();
        console.log(datas);
        makeImageList(datas); //makeImageList의 인자로 datas를 넘겨준다

    }catch(error){
        console.error('데이터를 가져오는데 문제가 발생했습니다 :', error);
    }
}

function makeImageList(datas){
    datas.forEach((item)=> {
        container.innerHTML += "<img src="+item.download_url+">"; //겉에 ""면 안에는 ''써야한다!!!
    });
}

const throttling = (callback, delay) => {
    let timer = null; //얘에 접근할 수 있는 유일한 함수는 return에 있는 함수이다.

    return () => {//이 내부 함수만이 timer변수에 접근 가능
        console.log(timer);

        if (timer === null) {
            timer = setTimeout(() => {
                callback(pageNum+=1);
                timer = null;
            }, delay);
        }
    };
};

let lastScrollTop = 0;
showMoreBtn.addEventListener('click', function handler(event){
    fetchImages(pageNum);
    showMoreBtn.removeEventListener('click', handler);
});
//showMore버튼을 처음 1번 클릭하면 이미지가 생성되어야함 -> 그 이후 무한스크롤


container.addEventListener('scroll', throttling(() => {
    const { scrollTop, scrollHeight, clientHeight } = container;
    console.log("scrollTop:"+scrollTop+" ,scrollHeight:"+scrollHeight+" ,clientHeight: "+clientHeight);
    console.log("lastScrollTop:"+lastScrollTop)

    // 스크롤 방향이 아래일 때만 이미지 로드
    if (scrollTop >= lastScrollTop && scrollTop + clientHeight >= scrollHeight - 10) {
        fetchImages(pageNum += 1);

    }
    lastScrollTop = scrollTop;
}, 1000));



