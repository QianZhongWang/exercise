$("input").focus(function () {
    $(this).parent("label").addClass("active")
})
$("input").blur(function () {
    if ($(this).val() == '') {
        $(this).parent("label").removeClass("active")
    }
})