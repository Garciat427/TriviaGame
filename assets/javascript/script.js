$(document).ready(function() {

    var GameObj = { //Game Object
        
        //Variable Properties
        topic: null, //Topic Property of GameObj
        loadedArr : null, //Property of game array to be loaded
        loadedQuestion :null, //Property of loaded Word of current game
        readyState : false, //Boolean to prevent false starts without a topic
        questionNum : 0,
        finishedStatus : false,
        corrAns : 0,
        incorAns : 0,
        //GameArrays

        topic1 : [
            q1 = {
                question : "t1Question1", corrAns: "A",
                a1: "t1Ans1", a2: "t1Ans2", a3: "t1Ans3", a4: "t1Ans4"
            },
            q2 = {
                question : "t1Question2", corrAns: "C",
                a1: "t1Ans1", a2: "t1Ans2", a3: "t1Ans3", a4: "t1Ans4"
            },
            q3 = {
                question : "t1Question3", corrAns: "B",
                a1: "t1Ans1", a2: "t1Ans2", a3: "t1Ans3", a4: "t1Ans4"
            },
            q4 = {
                question : "t1Question4", corrAns: "D",
                a1: "t1Ans1", a2: "t1Ans2", a3: "t1Ans3", a4: "t1Ans4"
            },
            q5 = {
                question : "t1Question5", corrAns: "B",
                a1: "t1Ans1", a2: "t1Ans2", a3: "t1Ans3", a4: "t1Ans4"
            }
        ],

        topic2 : [
            q1 = {
                question : "t2Question1", corrAns: "B",
                a1: "t2Ans1", a2: "t2Ans2", a3: "t2Ans3", a4: "t2Ans4"
            },
            q2 = {
                question : "t2Question2", corrAns: "D",
                a1: "t2Ans1", a2: "t2Ans2", a3: "t2Ans3", a4: "t2Ans4"
            },
            q3 = {
                question : "t2Question3", corrAns: "C",
                a1: "t2Ans1", a2: "t2Ans2", a3: "t2Ans3", a4: "t2Ans4"
            },
            q4 = {
                question : "t2Question4", corrAns: "A",
                a1: "t2Ans1", a2: "t2Ans2", a3: "t2Ans3", a4: "t2Ans4"
            },
            q5 = {
                question : "t2Question5", corrAns: "A",
                a1: "t2Ans1", a2: "t2Ans2", a3: "t2Ans3", a4: "t2Ans4"
            }
        ],

        topic3 : [
            q1 = {
                question : "t3Question1", corrAns: "D",
                a1: "t3Ans1", a2: "t3Ans2", a3: "t3Ans3", a4: "t3Ans4"
            },
            q2 = {
                question : "t3Question1", corrAns: "B",
                a1: "t3Ans1", a2: "t3Ans2", a3: "t3Ans3", a4: "t3Ans4"
            },
            q3 = {
                question : "t3Question1", corrAns: "D",
                a1: "t3Ans1", a2: "t3Ans2", a3: "t3Ans3", a4: "t3Ans4"
            },
            q4 = {
                question : "t3Question1", corrAns: "D",
                a1: "t3Ans1", a2: "t3Ans2", a3: "t3Ans3", a4: "t3Ans4"
            },
            q5 = {
                question : "t3Question1", corrAns: "C",
                a1: "t3Ans1", a2: "t3Ans2", a3: "t3Ans3", a4: "t3Ans4"
            }
        ],

        letters : ["A", "B", "C", "D"],

        //Functions
        randTopic: function(){ //Function used to generate random game topic
            var randNum = Math.floor((Math.random() * 3) + 1) //Gen rand num between 1-3 (topic 1-3)
            if (this.topic === randNum){ //If random topic is the same as previous topic
                this.randTopic(); //Recursive Function Call to prevent duplicate topics
            }
            else{ //If not the same
                this.selTopic(randNum); //Calls selTopic to select random topic
            }
        },
        
        startLetter: function(){ //Dynamically Creates Buttons 
            //Function used to dynamically create letters
            this.letters.forEach(function(letter,i) {
                var letterBtn = $("<button>");
                letterBtn.addClass("btn btn-secondary btn-space letter-button");
                letterBtn.attr("data-letter", letter);
                letterBtn.text(letter);
                $("#buttonBox").append(letterBtn);
            });
        },

        selTopic: function(sel) { //Function Used to select game topic
            this.topic = sel;
            switch (this.topic){
                case (1): //Canadian Cities
                $(".topicSelected").text("topic1"); //Displays Current Topic : Canadian Cities
                this.loadedArr = this.topic1;  //Loads Current Topic array
                break;   

                case (2): //Auto Makers
                $(".topicSelected").text("topic2"); //Displays Current Topic : Auto Manu
                this.loadedArr = this.topic2; //Loads Current Topic array
                break;

                case (3): //Schools
                $(".topicSelected").text("topic3"); //Displays Current Topic : Schools
                this.loadedArr = this.topic3; //Loads Current Topic array
                break;
            };
            //Changes Button Color
            $("#startGameBtn").removeClass("btn-danger"); 
            $("#startGameBtn").addClass("btn-success");
            //Changes Game State
            this.readyState = true;
            console.log(this.loadedArr);
        },
        
        startGame: function(){ //Function used to start game
            //Show game card and remove topic selector
            
            $("#topicSel").empty();
            $("#gameCard").animate({ opacity: "1" });
            //Select first question
            this.selQuestion();
        },

        selQuestion: function () { //Function used to select random word from topic array
            this.loadedQuestion = this.loadedArr[this.questionNum];
            
            //set HTML content of the loaded question
            $("#questionNum").text( this.questionNum + 1 );
            $("#questionText").text( this.loadedQuestion.question );
            $("#choiceA").text( this.loadedQuestion.a1 );
            $("#choiceB").text( this.loadedQuestion.a2 );
            $("#choiceC").text( this.loadedQuestion.a3 );
            $("#choiceD").text( this.loadedQuestion.a4 );
        
            if (this.questionNum < (this.loadedArr.length - 1)){
                this.questionNum++; //Increase 
            }
            else{
                this.finishedStatus = true;
            }
        },

        onClickLetter: function(btnClicked){ //Function performed on every letter button press
            //Pull Val from pressed button
            letterClicked = $(btnClicked).attr("data-letter")
            //Disable all letter buttons
            $(".letter-button").attr("disabled",true);
            //If statement to check if Selection is correct or not
            if (letterClicked === this.loadedQuestion.corrAns){ //Correct Ans
                $(btnClicked).addClass("btn-success");
                $("#questionText").text("Good Job! You answered correctly!");
                this.corrAns++;
            }
            else if (letterClicked !== this.loadedQuestion.corrAns){ //Incorrect Ans
                $(btnClicked).addClass("btn-danger");
                $("#questionText").text("Sorry! The correct answer is: " + this.loadedQuestion.corrAns);
                this.incorAns++;
            }
            else{ //Time ran out
                $("#questionText").text("Sorry! You ran out of time! The correct answer is: " + this.loadedQuestion.corrAns);
                this.incorAns++;
            }
            //Checks for last Q
            if (!this.finishedStatus) 
                $("#nextQBtn").removeClass("invisible");
            else{
                $("#nextQBtn").addClass("invisible");
                $("#resultsBtn").animate({ opacity: "1" });
            }
        },

        resetGameBtns: function(){ //Function to update game screen
            $(".letter-button").attr("disabled",false);
            $(".letter-button").removeClass("btn-success btn-danger");
            $(".letter-button").addClass("btn-secondary");
            $("#nextQBtn").addClass("invisible");
        },
        results : function(){
            $("#resultsCard").animate({ opacity: "1" });
            $("#incTotal").text(this.incorAns);
            $("#corTotal").text(this.corrAns);
        }
    }
    
    GameObj.startLetter(); //Dynamically create Letter buttons

    //Random Topic Event
    $("#randTopicBtn").on("click", function(){
        GameObj.randTopic();
    });
    //Drop Down Events
    //Topic 1
    $("#topic1DD").on("click", function(){
        GameObj.selTopic(1);
    });
    //Topic 2
    $("#topic2DD").on("click", function(){
        GameObj.selTopic(2);
    });
    //Topic 3
    $("#topic3DD").on("click", function(){
        GameObj.selTopic(3);
    });

    //Button Events
    $("#startGameBtn").on("click", function() {
        if (GameObj.readyState){
            GameObj.startGame();   
        }   
        else
            alert("No topic selected! Please select topic first!");
    });

    $(".letter-button").on("click", function(){
        GameObj.onClickLetter(this);
    });
    $("#nextQBtn").on("click", function() {
        GameObj.resetGameBtns();
        GameObj.selQuestion();
    });
    $("#resultsBtn").on("click", function() {
        $("#gameCard").empty();
        GameObj.results();
    });
});




