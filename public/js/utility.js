$(function() {
                $('.visits').scrollTableBody({rowsToDisplay:5});
                $(".profile-card :input").attr("disabled", true);
});

$(function() {
    $( ".datepicker" ).datepicker({
    dateFormat : 'mm/dd/yy',
    changeMonth : true,
    changeYear : true,
    yearRange: '-100y:c+nn',
    maxDate: '-1d'
    });
});

$(function() {
    $(".edit-card").on("click", function () {
        $(this).addClass('hidden');
        $(this).siblings(".close-card").removeClass('hidden');
        $(this).parents(".profile-card").css("background-color","#f5f5f5");
        $(this).siblings(".edit-submit").removeClass('hidden');
        $(this).parents(".profile-card :input").attr("disabled", false);
    })
});

$(function() {
    $(".close-card").on("click", function () {
        $(this).addClass('hidden');
        $(this).siblings(".edit-card").removeClass('hidden');
        $(this).parents(".profile-card").css("background-color","#ffffff");
        $(this).siblings(".edit-submit").addClass('hidden');
        $(this).parents(".profile-card :input").attr("disabled", true);
    })
});
