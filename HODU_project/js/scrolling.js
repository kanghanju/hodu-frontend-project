const container = document.querySelector(".container");
const showMoreBtn = document.querySelector(".event_Btn .orange_Btn");

async function fetchImages(pageNum){
    try{
        const response = await fetch("https://picsum.photos/v2/list?page="+pageNum+"&limit=10");
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
        container.innerHTML += "<div><img src="+item.download_url+" alt=''></div>"; //겉에 ""면 안에는 ''써야한다!!!
    });
}

showMoreBtn.addEventListener('click',function (){
    fetchImages(1);
})
