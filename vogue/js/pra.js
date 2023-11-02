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
        $('#termsPerivacy').props('checkde')
    }
})