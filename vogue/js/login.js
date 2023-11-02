// 보그 PJ 로그인 페이지 JS - login.js

$(()=>{

    /*************************************************
        로그인 페이지 유효성 검사
    *************************************************/
    // 검사대상 : #mid, #mpw
    const mid = $('#mid');
    const mpw = $('#mpw');

    // 유효성 검사 기준 : 전송시 아이디, 비번 모두 있어야 함.

    // 이벤트 대상 : #sbtn
    // 이벤트 종류 : click
    $('#sbtn').click(function(e){
        // 기본 이동 서브밋 막기
        e.preventDefault();

        // 공백데이터 처리 함수
        const groSpace = x => x.replace(/\s/g, '');

        // 유효성 검사
        // 불통과시
        if(groSpace(mid.val())=='' || groSpace(mpw.val())=='' ){
            alert('아이디, 비밀번호를 모두 입력해야 합니다.');
            // 초기화 + 아이디에 포커스
            mid.val('').focus();
            mpw.val('');
        }
        // 통과시
        else{
            // DB 조회 페이지 호출하여 결과를 받아서 처리
            // Ajax의 post() 메서드 사용
            // $.post(URL, data, callback)
            $.post(
                // 1. 전송할 페이지
                "./process/loginSet.php",
                // 2. 전송할 데이터
                {
                    "mid" : mid.val(), // 아이디
                    "mpw" : mpw.val(), // 비밀번호
                },
                // 3. 결과처리 함수 (콜백함수)
                function(res){
                    console.log('결과 :', res);
                    // 3-1. 로그인 성공시 : ok
                    if(res == 'ok'){
                        alert('로그인에 성공하였습니다!');
                        // 메인 페이지로 이동
                        location.href = 'index.php';
                    }
                    // 3-2. 비밀번호가 틀린경우 : again
                    else if(res == 'again'){
                        alert('비밀번호가 일치하지 않습니다.');
                        // 비밀번호 지우고 비번에 포커스
                        mpw.val('').focus();
                    }
                    // 3-3. 아이디가 없는 경우 : no
                    else if(res == 'no'){
                        alert('존재하지 않는 아이디입니다.');
                        // 초기화 + 아이디에 포커스
                        mid.val('').focus();
                        mpw.val('');
                    }
                } /// 결과처리함수 ////////

            );  // post 메서드 //////////////

            // DB 조회후 결과는 아래와 같이 나누어짐
            // 1. 아이디가 없음 - 백엔드리턴 "no"
            // -> '존재하지 않는 아이디입니다.'
            // 2. 아이디가 있으나 비밀번호 틀림 - 백엔드리턴 "again"
            // -> '비밀번호가 일치하지 않습니다.'
            // 3. 로그인 성공 - 백엔드 리턴 "ok" 
            // -> '로그인에 성공하였습니다.'
            // -> 첫페이지로 이동 (로그인 표시)
            // alert('로그인에 성공하였습니다!');
        } 
    });
}); 