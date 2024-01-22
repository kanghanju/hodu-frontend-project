const container = document.querySelector(".container"); //그리드 container
const showMoreBtn = document.querySelector(".show-more-box .btn-orange");
let pageNum = 1;

async function fetchImages(pageNum){//이미지를 가져오는 함수

    try{
        // console.log("fetchImages!");
        const response = await fetch("https://picsum.photos/v2/list?page="+pageNum+"&limit=3");
        if(!response.ok){//통신실패시 Error객체 던짐
            throw new Error("네트워크 응답에 문제가 있습니다.")
        }

        const datas = await response.json();
        // console.log(datas);
        makeImageList(datas); //makeImageList의 인자로 datas를 넘겨준다

    }catch(error){
        console.error('데이터를 가져오는데 문제가 발생했습니다 :', error);
    }
}
function makeImageList(datas){
    datas.forEach((item) => {
        const img = document.createElement('img');
        img.src = item.download_url;
        container.appendChild(img);
    });
}


showMoreBtn.addEventListener('click', function handler(event){
    fetchImages(pageNum);
    showMoreBtn.removeEventListener('click', handler);
});
//showMore버튼을 처음 1번 클릭하면 이미지가 생성되어야함 -> 그 이후 무한스크롤


let timer;
container.addEventListener('scroll', function(e){

    if(timer)return; //timer에 값이 있다면 return;

    timer = setTimeout(()=>{
        if(container.scrollTop + container.clientHeight >= container.scrollHeight-20){
            fetchImages(pageNum += 1);
            // console.log("scrolling!");
        }
        timer=null;
    },300);
});



