$(document).ready(function() {

    //initial variables defined
    var clockRunning = false;
    var correct = 0;
    var incorrect = 0;
    var total = 10;

    //initial hides
    $(".questionsDiv").hide();
    $(".score").hide();
    $("#display").hide();
    $("#done").hide();

    //trivia questions in an array / key with questions/answers/correct index
    var triviaQuestions = {
        1: {
            "question": "The Simpsons live on the following street...",
            "answers": ["Woodview Terrace", "Pine Tree Terrace", "State Street", "Evergreen Terrace"],
            "correctIndex": 3
        },

        2: {
            "question": "Homer Simpsons is a...",
            "answers": ["Telephone Repair Man", "IRS Collection Agent", "City Bus Driver", "Nuclear Power Plant Saftey Inspector"],
            "correctIndex": 3
        },

        3: {
            "question": "Which of the following characters is a non-smoker ?",
            "answers": ["Krusty", "Nelson", "Grandpa Simpson", "Mrs. Krabapple"],
            "correctIndex": 2
        },

        4: {
            "question": "Which of the following names did Bart not use in a prank call to Moe ?",
            "answers": ["Ivana Tinkle", "Bea O'Problem", "Amanda Huggenkiss", "Hugh Johnson"],
            "correctIndex": 3
        },

        5: {
            "question": 'What word is missing in the following quote "_______, is there anything they cant do',
            "answers": ["Doughnuts", "Kids", "Computers", "Women"],
            "correctIndex": 0
        },

        6: {
            "question": "Who shot Mr. Burns ?",
            "answers": ["Bart", "Homer", "Maggie", "Lisa"],
            "correctIndex": 2
        },

        7: {
            "question": "How much money did Marge lose on Jeopardy ?",
            "answers": ["$6200", "$4200", "$5200", "$3200"],
            "correctIndex": 2
        },

        8: {
            "question": "Name the cinema in Springfield ?",
            "answers": ["Googolplex", "Monties Movies", "Mega Movies", "Springfield Screen"],
            "correctIndex": 0
        },

        9: {
            "question": "What is the Simpsons' dog's name?",
            "answers": ["Santa's Little Helper", "Snowball", "Elfy", "Paintball"],
            "correctIndex": 0
        },

        10: {
            "question": "What was the secret ingredient in a Flaming Moe/Homer ?",
            "answers": ["Bleach", "Cough Syrup", "Denture Cleaner", "Shampoo"],
            "correctIndex": 1
        },

    }

    //When the start game button is clicked run this. Hide the start game box. show the questions div/ display/ and the done button
    $("#startGame").on("click", function(event) {

        $("#startGame").hide();
        $(".questionsDiv").show();
        $("#display").show();
        $("#done").show();
        stopwatch.start();

        for (var i = 1; i < 11; i++) {
            $("<p id=questionP" + i + "'>" + triviaQuestions[i].question + "</p>").appendTo(".questionsDiv");

            for (var j = 0; j < 4; j++) {

                $("<input id='answer' type='radio' name=" + i + " data-index-number=" + j + " data-hyper-number=" + triviaQuestions[i].correctIndex + ">" + triviaQuestions[i].answers[j] + "</p>").appendTo(".questionsDiv");
            }
        }
    });

    //This function decides whether the answer is correct or wrong.
    $("body").on("click", "#answer", function() {
        var rbInputIndex = $(this).data("index-number"); //Contains users Input index
        var corrNumber = $(this).data("hyper-number"); //Contains correct answer


        if (rbInputIndex === corrNumber) {
            correct++
        } else {
            incorrect++
        }

        var radioName = $(this).attr("name");
        $(":radio[name='" + radioName + "']").attr("disabled", true);
    });

    // Stop watch function to calculate time in 00:00 format
    var stopwatch = {

        time: 60,

        start: function() {

            if (!clockRunning) {
                intervalId = setInterval(stopwatch.count, 1000);
                clockRunning = true;
            }
        },

        count: function() {

            stopwatch.time--;

            var converted = stopwatch.timeConverter(stopwatch.time);

            $("#display").html(converted);
            //If the time counts down to 00:00 display results. Hide show certain windows.
            if (converted == "00:00") {
                $("#done").hide();
                $(".questionsDiv").hide();
                $(".score").show();

                clearInterval(intervalId);
                clockRunning = false;

                var total = correct + incorrect;
                var unanswered = 10 - total;

                $("<h2>" + "Times Up!" + "</h2>").appendTo(".score");
                $("<p>" + "Correct: " + correct + "</p>").appendTo(".score");
                $("<p>" + "Incorrect: " + incorrect + "</p>").appendTo(".score");
                $("<p>" + "Unanswered: " + unanswered + "</p>").appendTo(".score");
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

    //Once the user preses the done button if the time does not run out display results

    $("#done").on("click", function(event) {

        $("#done").hide();
        $(".questionsDiv").hide();
        $(".score").show();

        clearInterval(intervalId);
        clockRunning = false;

        var total = correct + incorrect;
        var unanswered = 10 - total;

        $("<h2>" + "Finished!" + "</h2>").appendTo(".score");
        $("<p>" + "Correct: " + correct + "</p>").appendTo(".score");
        $("<p>" + "Incorrect: " + incorrect + "</p>").appendTo(".score");
        $("<p>" + "Unanswered: " + unanswered + "</p>").appendTo(".score");

    });

});