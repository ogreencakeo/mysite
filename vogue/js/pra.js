const chkAll = $('#chk_all');
const chkEach = $('.chk');

chkAll.change(function(){
    let isChk = $(this).prop('checked');
    chkEach.prop('checked', isChk)
});

chkEach.change(function(){
    let num = $('.chk:checked').length;
    if(num == 3) chkAll.prop('checked', true);
    else chkAll.prop('checked', false);
});

$('.YNbox button').click(function(){
    let isBtn = $(this).is('#btnY');
    if(isBtn){
        if($('#termsService').prop('checked') &&
        $('#termsPerivacy').props('checkde')){
            $('#conf').fadeOut(300, ()=>{
                $('.scont').fadeIn(300);
            });
        }else{
            alert('비동의 하였으므로 메인 페이지로 이동합니다.');
            location.href = 'index.php';
        }
    }
})

$(`form.logF input[type=text][id!=email2],
form.logF input[type=password]`)
.blur(function(){
    let cid = $(this).attr('id');
    const groSpace = x => x.replace(/s/g, '');
    let cv = cid == 'mnm'? $(this).val().trim() : groSpace($(this).val());

    $(this).val(cv);

    if(cv == ''){
        $(this).siblings('.msg').text('필수입력').removeClass('on');
        pass = false;
    }else if(cid == 'mid'){
        if(!vReg(cv, cid)){
            $(this).siblings('.msg').text('영문자로 시작하는 6~20글자 영문자/숫자').removeClass('on');
            pass = false;
        }else{
            $.ajax({
                url : './process.chkID.php',
                type : 'post',
                data : {'mid' : $('#mid').val()},
                dataType : 'html',
                async : false,
                sucess : function(res){
                    if(res == 'ok'){
                        $('#mid').siblings('.msg').text('멋진 아이디네요~').addClass('on');
                    }else{
                        $('#mid').siblings('.msg').removeClass('on');
                        pass = false;
                        console.log('중복 아이디')
                    }
                },
                error : function(xhr, status, error){
                    alert('연결처리 실패 :' + error);
                }
            })
        }
    }else if(cid == 'mpw'){
        if(!vReg(cv, cid)){
            $(this).siblings('.msg').text('특수문자,문자,숫자포함 형태의 5~15자리');
            pass = false;
        }else{
            $(this).siblings('.msg').empty();
        }
    }else if(cid == 'mpw2'){
        if(cv != $('#mpw').val()){
            $(this).siblings('.msg').text('비밀번호가 일치하지 않습니다!');
            pass = false;
        }else{
            $(this).siblings('.msg').empty();
        }
    }else if(cid == 'email1'){
        let comp = eml1.val() + '@' + 
        (seleml.val() == 'free'? eml2.val() : seleml.val())
        
    }
});

const eml1 = $('#email1');
const eml2 = $('#email2');
const seleml = $('#seleml');

seleml.change(function(){
    let cv = $(this).val();
    if(cv == 'init'){
        eml1.siblings('.msg').text('이메일 옵션 선택 필수').removeClass('on');
        eml2.fadeOut(300);
    }else if(cv == 'free'){
        
    }
})

function vReg(val, cid) {
    // val - 검사할값, cid - 처리구분아이디
    // console.log("검사:"+val+"/"+cid);

    // 정규식 변수
    let reg;

    // 검사할 아이디에 따라 정규식을 변경함
    switch (cid) {
        case "mid": // 아이디
            reg = /^[a-z]{1}[a-z0-9]{5,19}$/g;
            // 영문자로 시작하는 6~20글자 영문자/숫자
            // /^[a-z]{1} 첫글자는 영문자로 체크!
            // [a-z0-9]{5,19} 첫글자 다음 문자는 영문 또는 숫자로
            // 최소 5글자에서 최대 19글자를 유효범위로 체크!
            // 첫글자 한글자를 더하면 최소 6글자에서 최대 20글자체크!
            break;
        case "mpw": // 비밀번호
            reg = /^.*(?=^.{5,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
            // 특수문자,문자,숫자포함 형태의 5~15자리
            // (?=^.{5,15}$) 시작부터 끝까지 전체 5~15자릿수 체크!
            // (?=.*\d) 숫자 사용체크!
            // (?=.*[a-zA-Z]) 영문자 대문자 또는 소문자 사용체크!
            // (?=.*[!@#$%^&+=]) 특수문자 사용체크!
            break;
        case "eml": // 이메일
            reg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
            // 이메일 형식에 맞는지 검사하는 정규식
            break;
    } //////////// switch case문 //////////////////

    // //console.log("정규식:"+reg);

    // 정규식 검사를 위한 JS메서드 
    // -> 정규식.test(검사할값) : 결과 true/false
    return reg.test(val); //호출한 곳으로 검사결과리턴!

} //////////// vReg 함수 //////////////////////////////