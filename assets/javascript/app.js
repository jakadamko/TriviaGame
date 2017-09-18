$(document).ready(function() {

    $(".questions").hide();
    $(".score").hide();


    $("#startGame").on("click", function(event) {

        $("#startGame").hide();
        $(".questions").show();
        stopwatch.start();
    });

    $("#done").on("click", function(event) {

        $(".questions").hide();
        $(".score").show();

        clearInterval(intervalId);
        clockRunning = false;
    });

    var clockRunning = false;
    var correct = 0;
    var incorrect = 0;
    var unanswered = 0;
    var sum = 0;
    var total = 10;


    var stopwatch = {

        time: 0,

        start: function() {

            if (!clockRunning) {
                intervalId = setInterval(stopwatch.count, 1000);
                clockRunning = true;
            }
        },


        count: function() {

            stopwatch.time++;

            var converted = stopwatch.timeConverter(stopwatch.time);
            console.log(converted);

            $("#display").html(converted);

            if (converted == "00:10") {
                $(".questions").hide();
                $(".score").show();

                clearInterval(intervalId);
                clockRunning = false;
            }
        },


        timeConverter: function(t) {

            var minutes = Math.floor(t / 60);
            var seconds = t - (minutes * 60);

            if (seconds < 10) {
                seconds = "0" + seconds;
            }

            if (minutes === 0) {
                minutes = "00";
            } else if (minutes < 10) {
                minutes = "0" + minutes;
            }

            return minutes + ":" + seconds;
        }
    };


    $(":radio").click(function() {
        var radioName = $(this).attr("name");
        $(":radio[name='" + radioName + "']").attr("disabled", true);

        sum++
        console.log("sum= " + sum);
       var unans = total - sum;
        $("#unanswered").html("UNANSWERED: " + unans);
    });

    
    $("#unanswered").html("UNANSWERED: " + total);


    $('input:radio[id="answer"]').change(
        function() {
            if ($(this).is(':checked')) {
                correct++
                console.log("correct " + correct);
                $("#correct").html("CORRECT: " + correct);
            }
        });


    $('input:radio[id="incorr"]').change(
        function() {
            if ($(this).is(':checked')) {
                incorrect++
                console.log("incorrect " + incorrect);
                $("#incorrect").html("INCORRECT: " + incorrect);
            }
        });


});