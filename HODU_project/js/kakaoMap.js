let where = document.querySelector(".section-03-intro p:nth-child(2)");

var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 마커가 표시될 위치입니다
var markerPosition  = new kakao.maps.LatLng(33.450701, 126.570667);

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
    position: markerPosition
});

// 지도에 클릭 이벤트를 등록합니다
// 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
kakao.maps.event.addListener(map, 'click', function(mouseEvent) {

    // 클릭한 위도, 경도 정보를 가져옵니다
    var latlng = mouseEvent.latLng;

    // 마커 위치를 클릭한 위치로 옮깁니다
    marker.setPosition(latlng);

    let geocoder = new kakao.maps.services.Geocoder();

    let coord = new kakao.maps.LatLng(latlng.getLat(),latlng.getLng());

    let result = geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);

});

let address = "";

function callback(result, status) {
    if (status === kakao.maps.services.Status.OK) {
        console.log(result[0].address.address_name);

        fetch("https://www.juso.go.kr/addrlink/addrEngApi.do?keyword="+result[0].address.address_name+"&resultType=json&confmKey=devU01TX0FVVEgyMDI0MDEyMzEwMjIwMjExNDQ2MTk=")
            .then((response) => response.json())
            .then((data) => address = (data.results.juso[0].roadAddr))
            .then((data) => where.innerHTML = address)
            .catch((error) => {
                where.innerHTML="waiting...."
                // 데이터 요청이 실패하거나 응답이 없는 경우, 5초 후에 메시지 업데이트
                setTimeout(() => {
                    where.innerHTML = "It's a place that can't be converted into a road name address";
                }, 3000);
            });
}}



// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);
















