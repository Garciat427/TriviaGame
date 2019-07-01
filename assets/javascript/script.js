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
        timeRem : 10,
        timeRunning : false,
        intervalId : null,
        flag : false,

        //GameArrays

        topic1 : [ //Javascript Trivia
            q1 = {
                question : "Inside which HTML element do we put the JavaScript?", corrAns: "A",
                a1: "<script>", a2: "<js>", a3: "<scripting>", a4: "<javascript>"
            },
            q2 = {
                question : "Which of the following is the correct syntax to display “HelloWorld!” in an alert box using JavaScript?", corrAns: "C",
                a1: "alertbox(“HelloWorld!”);", a2: "msg(“HelloWorld!”);", a3: "alert(“HelloWorld!”);", a4: "msgbox(“HelloWorld!”);"
            },
            q3 = {
                question : "What is the correct syntax for referring to an external script called “fun.js”?", corrAns: "B",
                a1: "<script href=”fun.js”>", a2: "<script src=”fun.js”>", a3: " <script ref=”fun.js”>", a4: "<script name=”fun.js”>"
            },
            q4 = {
                question : "What is the syntax for creating a function in JavaScript named as Adamfunc?", corrAns: "D",
                a1: "function = Adamfunc()", a2: "function := Adamfunc()", a3: "function : Adamfunc()", a4: "function Adamfunc()"
            },
            q5 = {
                question : "What is the JavaScript syntax for printing values in Console?", corrAns: "B",
                a1: "print(5)", a2: "console.log(5);", a3: "console.print(5);", a4: "print.console(5);"
            }
        ],

        topic2 : [ //Canada
            q1 = {
                question : "How many points does a canadian leaf have?", corrAns: "B",
                a1: "8", a2: "11", a3: "12", a4: "10"
            },
            q2 = {
                question : "Which city is home to North Amercian's Largest Mall?", corrAns: "D",
                a1: "Mississagua", a2: "Vancouver", a3: "Toronto", a4: "Edmonton"
            },
            q3 = {
                question : "What is Canada's Oldest City?", corrAns: "C",
                a1: "Toronto", a2: "Charlotte", a3: "St. John's", a4: "Halifax"
            },
            q4 = {
                question : "Which provience is officially declared Bilingual?", corrAns: "A",
                a1: "New Brunswick", a2: "Nova Scotia", a3: "Quebec", a4: "Ontario"
            },
            q5 = {
                question : "How many time zones does Canada have?", corrAns: "A",
                a1: "6", a2: "5", a3: "4", a4: "3"
            }
        ],

        topic3 : [ // Pokemon
            q1 = {
                question : "What is the most effective pokeball?", corrAns: "D",
                a1: "Great Ball", a2: "Ultra Ball", a3: "Timer Ball", a4: "Master Ball"
            },
            q2 = {
                question : "What device do trainers use to keep record of pokemon encountered?", corrAns: "B",
                a1: "Pokecounter", a2: "Pokedex", a3: "PokeFinder", a4: "PokeList"
            },
            q3 = {
                question : "If you need to find supplies, where do you go?", corrAns: "D",
                a1: "PokeDepot", a2: "PokeMall", a3: "PokeCenter", a4: "PokeMart"
            },
            q4 = {
                question : "If you need to revive your fainted Pokemon to full health, where do you go?", corrAns: "C",
                a1: "Pokehome", a2: "Pokesave", a3: "Pokecenter", a4: "PokeHospital"
            },
            q5 = {
                question : "Which of these Legendary Pokemon is known to appear randomly throughout the Johto region?", corrAns: "C",
                a1: "Registeel", a2: "Celebi", a3: "Suicune", a4: "Keldeo"
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
                case (1): //JavaScript
                $(".topicSelected").text("JavaScript"); //Displays Current Topic : JavaScript
                this.loadedArr = this.topic1;  //Loads Current Topic array
                break;   

                case (2): //Canada
                $(".topicSelected").text("Canada"); //Displays Current Topic : Canada
                this.loadedArr = this.topic2; //Loads Current Topic array
                break;

                case (3): //Pokemon
                $(".topicSelected").text("Pokemon"); //Displays Current Topic : Pokemon
                this.loadedArr = this.topic3; //Loads Current Topic array
                break;
            };
            //Changes Button Color
            $("#startGameBtn").removeClass("btn-danger"); 
            $("#startGameBtn").addClass("btn-success");
            //Changes Game State
            this.readyState = true;
        },
        
        startGame: function(){ //Function used to start game
            //Show game card and remove topic selector
            
            $("#topicSel").empty();
            $("#gameCard").animate({ opacity: "1" });
            $("#resultsBtn").attr("disabled",true);
            //Select first question
            this.selQuestion();
        },

        selQuestion: function () { //Function used to select random word from topic array
            this.start();
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
            this.stop();
            this.resetTime();
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
            else if (letterClicked == undefined){ //Time ran out
                $("#questionText").text("Sorry! You ran out of time! The correct answer is: " + this.loadedQuestion.corrAns);
                this.incorAns++;
            }
            else{ //Incorrect Ans
                $(btnClicked).addClass("btn-danger");
                $("#questionText").text("Sorry! The correct answer is: " + this.loadedQuestion.corrAns);
                this.incorAns++;
            }
            
            //Checks for last Q
            if (!this.finishedStatus) {
                setTimeout(this.resetGameBtns, 5000);
            }
            else{
                $("#nextQBtn").addClass("invisible");
                $("#resultsBtn").animate({ opacity: "1" });
                $("#resultsBtn").attr("disabled",false);
            }
        },

        resetGameBtns: function(){ //Function to update game screen
            $(".letter-button").attr("disabled",false);
            $(".letter-button").removeClass("btn-success btn-danger");
            $(".letter-button").addClass("btn-secondary");
            GameObj.selQuestion();
        },
        results : function(){
            $("#resultsCard").animate({ opacity: "1" });
            $("#incTotal").text(this.incorAns);
            $("#corTotal").text(this.corrAns);
        },

        start : function(){
            if (!this.timeRunning) {
                $("#timeDisp").text(10);
                this.intervalId = setInterval(this.count, 1000);
                this.timeRunning = true;
             }
        },
        stop : function(){
            clearInterval(this.intervalId);
            this.timeRunning = false;
        },
        count : function(){
            if (GameObj.timeRem !== 0){
                GameObj.timeRem--
                $("#timeDisp").text(GameObj.timeRem);

                if (GameObj.timeRem < 5){ //Flash Buttons
                    $(".letter-button").animate({ opacity: "0.25" });
                    $(".letter-button").animate({ opacity: "1" });
                }

            }
            else {
                GameObj.onClickLetter(null);
            }
        },
        resetTime : function(){
            this.timeRem = 10;
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
    });
    $("#resultsBtn").on("click", function() {
        $("#gameCard").empty();
        GameObj.results();
    });
});




