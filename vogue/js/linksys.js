// 보그 PJ 링크 시스템 JS - linksys.js

// 제이쿼리 로드 구역 ///////////
$(()=>{
    // 모든 a요소 기본이동막기
    $('a').click(e=>e.preventDefault());

    // 요구사항: 각 네비게이션 클릭시 페이지이동하기
    // 1. 대상선정 
    // 1-1. 로고링크 : .logo a
    const logo = $('.logo a');
    // 1-2. GNB 메뉴 : .gnb a + 모바일메뉴 추가 : .mognb a
    const gnb = $('.gnb a, .mognb a');
    // console.log('대상:',logo,gnb);

    // 2. 이벤트 설정 및 이동기능 구현하기
    // 2-1. 로고클릭시 홈이동
    logo.click(()=>location.href='index.php');

    // 2-2. gnb 메뉴 클릭시 카테고리 서브 이동
    gnb.click(e=>
        location.href='category.php?cat='+
        $(e.target).text().toLowerCase());
        // console.log($(e.target).text().toLowerCase()))

    // e.target -> 이벤트발생요소(a요소)
    // text() -> a요소 텍스트읽기
    // toLowerCase() -> 소문자전환
    // 참고) toUpperCase() -> 대문자전환

    /***********************************************************
        로그인, 회원가입, 갤러리 아이콘 넣기
        - 대상 : .sns a:last (마지막 카카오스토리 a요소)
        - 대상추가 : 모바일모드
        - 변경내용 : 대상요소 앞에 형제요소로 a요소 추가
        - 제이쿼리 메서드 : 
        - before(요소) -> 선택요소 앞에 형제요소 추가
        - after(요소) -> 선택요소 뒤에 형제요소 추가
    ***********************************************************/

    // $('.sns a:last').before(`<헐></헐>`);
    // $('.sns a:last').after(`<크></크>`);

    $('.sns a:last, .mosns a:last').before(`
        <a href="#" class="fi fi-laptop">
            <span class="ir">로그인</span>
        </a>
        <a href="#" class="fi fi-user-secret">
            <span class="ir">회원가입</span>
        </a>
        <a href="#" class="fi fi-camera">
            <span class="ir">갤러리</span>
        </a>
    `);

    // sns파트 a요소에 툴팁 넣기
    // 새로 추가된 a요소까지 다시 선택하여 
    // each() 메서드로 돌면서 글자를 읽어와서 
    // title 속성으로 넣는다. -> attr('title', 값)
    $('.sns a, .mosns a').each((idx, ele)=>{
        // ele - 각 a요소
        $(ele).attr('title', $(ele).text().trim());
    })

    // 위에서 이어서 a요소에 링크 설정하기
    .click(function(){
        // 1. 클릭시 해당 요소 텍스트 읽기
        let atxt = $(this).text().trim();
        console.log('sns 파트메뉴 (atxt) :', atxt);

        // 2. 이동할 페이지 주소 할당
        let url;
        switch(atxt){
            // 외부시스템 페이지
            case '인스타그램' : 
                url = 'https://www.instagram.com/VOGUEKOREA/';
                break;
            case '페이스북' : 
                url = 'https://www.facebook.com/VOGUEkr';
                break;
            case '트위터' : 
                url = 'https://twitter.com/VogueKorea';
                break;
            case '유튜브' : 
                url = 'https://www.youtube.com/user/VogueKorea';
                break;
            case '카카오스토리' : 
                url = 'https://story.kakao.com/ch/voguekr';
                break;
            // 내부 시스템 페이지
            case '로그인' : 
                url = 'login';
                break;
            case '회원가입' : 
                url = 'member';
                break;
            case '갤러리' : 
                url = 'gallery';
                break;
            case '로그아웃' : 
                url = 'index';
                break;
        }

        // 3. 페이지 이동하기
        // 내부 페이지는 현재 페이지에서 이동하기
        if(atxt=='로그인' || atxt=='회원가입' || atxt=='갤러리' || atxt=='로그아웃'){
            location.href = url + '.php';
        }else{
            // SNS 타 시스템은 새창열기
            // window.open(주소) - 새창열기(브라우저 탭메뉴)
            window.open(url);
        }
    });

    // 모바일 메뉴 박스의 sns 링크 중 4번째 요소
    // 다음에 <br> 태그 넣고 줄바꿈
    // .mosns a
    $('.mosns a').eq(3).after('<br />');

}); //////////// jQB ///////////////////