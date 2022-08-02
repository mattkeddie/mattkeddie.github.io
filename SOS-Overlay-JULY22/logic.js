const ws = new WebSocket('ws://localhost:49122');

const tournamentName = "INDY GAMING LEAGUE | SUMMER CIRCUIT | WEEK 3 | TIER 2 3v3 | EUROPE";
//const tournamentName = "1v1 SHOWMATCH";
const bo1 = 0;
const bo3 = 0;
const bo5 = 1;
const bo7 = 0;

var blueWins = 0;
var orangeWins = 0;
var gameNumber = blueWins + orangeWins + 1;

var seriesLength = "";
var maxWins = 0;
var is1v1 = 0;
var is2v2 = 0;
var is3v3 = 0;

var isLive = 0;
var o1ticks = 0;
var o2ticks = 0;
var o3ticks = 0;
var b1ticks = 0;
var b2ticks = 0;
var b3ticks = 0;
var o1totSpeed = 0;
var o2totSpeed = 0;
var o3totSpeed = 0;
var b1totSpeed = 0;
var b2totSpeed = 0;
var b3totSpeed = 0;
var o1avgSpeed = 0;
var o2avgSpeed = 0;
var o3avgSpeed = 0;
var b1avgSpeed = 0;
var b2avgSpeed = 0;
var b3avgSpeed = 0;

var statfeed1 = "";
var statfeed2 = "";
var statfeed3 = "";
var statfeed4 = "";
var statfeed5 = "";
var statfeed6 = "";

//const stinger = document.getElementById("stinger");

var gameStarted = 1;
var goalScored = 0;

if (bo1 == 1) {
  seriesLength = "BEST OF 1";
  maxWins = 1;
  document.getElementById('blue-g4').style.background = "transparent";
  document.getElementById('orange-g4').style.background = "transparent";
  document.getElementById('blue-g3').style.background = "transparent";
  document.getElementById('orange-g3').style.background = "transparent";
  document.getElementById('blue-g2').style.background = "transparent";
  document.getElementById('orange-g2').style.background = "transparent";
}
else if (bo3 == 1) {
  seriesLength = "BEST OF 3";
  maxWins = 2;
  document.getElementById('blue-g4').style.background = "transparent";
  document.getElementById('orange-g4').style.background = "transparent";
  document.getElementById('blue-g3').style.background = "transparent";
  document.getElementById('orange-g3').style.background = "transparent";
}
else if (bo5 == 1) {
  seriesLength = "BEST OF 5";
  maxWins = 3;
  document.getElementById('blue-g4').style.background = "transparent";
  document.getElementById('orange-g4').style.background = "transparent";
}
else if (bo7 == 1) {
  seriesLength = "BEST OF 7";
  maxWins = 4;
}

var blueName = "";
var orangeName = "";
var finalBlueName = "";
var finalOrangeName = "";

var blueScore = 0;
var orangeScore = 0;
var finalBlueScore = 0;
var finalOrangeScore = 0;

var blueTeamColour = "";
var orangeTeamColour = "";

document.getElementById('tournamentName').innerHTML = tournamentName;
document.getElementById('seriesType').innerHTML = seriesLength;
document.getElementById('final-seriesType').innerHTML = seriesLength;
//document.getElementById('blueGameWins').innerHTML = blueWins;
//document.getElementById('orangeGameWins').innerHTML = orangeWins;
document.getElementById('gameNumber').innerHTML = gameNumber;
document.getElementById('ot-gameNumber').innerHTML = gameNumber;
document.getElementById('final-gameNumber').innerHTML = blueWins + orangeWins;

function orangeResetAll() {
  //$("div[id^='orange-player-']").text('')
  $("#orange-player-1, #orange-player-2, #orange-player-1").addClass('d-none')
  $('#orange-player-1-p-bar, #orange-player-2-p-bar, #orange-player-3-p-bar').width('0%')
}

function blueResetAll() {
  //$("div[id^='blue-player-']").text('')
  $("#blue-player-1, #blue-player-2, #blue-player-1").addClass('d-none')

  $('#blue-player-1-p-bar, #blue-player-2-p-bar, #blue-player-3-p-bar').width('0%')
}

/*
function xMath(x) {
  var xCoord = (190 / x)
  return xCoord;
}

function yMath(y) {
  var yCoord = (150 / y)
  return yCoord;
}

var dataSet = [
  [0, 0],
];


var w = 380,
  h = 300;

// calculate max/min for x and y here if necessary
/*
    var xScale = d3.scale.linear()
      .domain([-5140, 4074])
      .range([0, w]);

    var yScale = d3.scale.linear()
      .domain([5140, -4074])
      .range([0, h]);

    var svg = d3.select("#mapy")
      .append("svg")
      .attr("width", w + 80) //was + 100
      .attr("height", h + 65) //was + 100
      .append('svg:g')
      .attr('transform', 'translate(15,15)');



    svg.selectAll("circle")
      .data(dataSet)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return xScale(d[0]);
      })
      .attr("cy", function (d) {
        return yScale(d[1]);
      })
      .attr("r", 4);

    var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient('bottom')
      .tickSize(1);

    var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left')
      .tickSize(1);
  */

ws.onopen = () => {
  //  ws.send('Message From Client')
}

ws.onerror = (error) => {
  console.log(`WebSocket error: ${error}`)
}

ws.onmessage = (e) => {

  var jEvent = JSON.parse(event.data);


  // console.log(jEvent.data) // ONLY UNCOMMENT FOR DEBUGGING

  if (jEvent.event == "game:update_state") {
    //gonna be used in a few spots
    var teamData = jEvent.data.game.teams

    if (jEvent.data.game.hasWinner == false) {
      $("#post-game-scores").addClass("invisible")
    }

    //console.log(jEvent.data.game.hasWinner)
    if (jEvent.data.game.hasWinner == true) { // || jEvent.data.game.isReplay == true will be added on prod

      //console.log(jEvent.data.game.isReplay)
      gameStarted = 0;
    } else {
      //show the ui
      //$('#main-ui').removeClass('invisible');

      //time
      var gameTime = jEvent.data.game.time_seconds
      var round = Math.round(gameTime)

      if (gameTime < 300 || jEvent.data.game.isOT == true) {
        $('#main-ui').removeClass('invisible');
        $('#blueTeam').removeClass('invisible');
        $('#orangeTeam').removeClass('invisible');
      }

      if (gameTime < 300 && gameTime > 0) {
        gameStarted = 1;
      }

      if (gameStarted == 0) {
        document.getElementById('scorebug-div').style.opacity = "0";
        document.getElementById('blueTeam').style.opacity = "0";
        document.getElementById('orangeTeam').style.opacity = "0";
        document.getElementById('league-logo').style.opacity = "0";
      } else if (gameStarted == 1) {
        document.getElementById('scorebug-div').style.opacity = "1";
        document.getElementById('blueTeam').style.opacity = "1";
        document.getElementById('orangeTeam').style.opacity = "1";
        document.getElementById('league-logo').style.opacity = "1";
      }


      function myTime(time) {

        var min = ~~((time % 3600) / 60);
        var sec = time % 60;
        var sec_min = "";
        sec_min += "" + min + ":" + (sec < 10 ? "0" : "");
        sec_min += "" + sec;
        return sec_min;
      }

      $('#timer-text').text(myTime(round))

      //team names
      blueName = _.get(teamData, [0, 'name'])
      orangeName = _.get(teamData, [1, 'name'])

      if (blueName.length > 1 && orangeName.length > 1) {
        if (goalScored == 0) {
          $('#blue-team-name-text').text(blueName)
          $('#orange-team-name-text').text(orangeName)
          //console.log(blueName + " vs " + orangeName);
        }
      }

      //score
      blueScore = _.get(teamData, [0, 'score'])
      orangeScore = _.get(teamData, [1, 'score'])

      $('#blue-score-text').text(blueScore)
      $('#blue-score-endscoreboard').text(blueScore)
      $('#orange-score-text').text(orangeScore)
      $('#orange-score-endscoreboard').text(orangeScore)

      if (blueScore >= 10) {
        document.getElementById('blue-score').style.paddingLeft = "9px";
        document.getElementById('blue-score').style.paddingRight = "9px";
      } else {
        document.getElementById('blue-score').style.paddingLeft = "20px";
        document.getElementById('blue-score').style.paddingRight = "20px";
      }

      if (orangeScore >= 10) {
        document.getElementById('orange-score').style.paddingLeft = "9px";
        document.getElementById('orange-score').style.paddingRight = "9px";
      } else {
        document.getElementById('orange-score').style.paddingLeft = "20px";
        document.getElementById('orange-score').style.paddingRight = "20px";
      }

      //colours
      blueTeamColour = _.get(teamData, [0, 'color_primary'])
      orangeTeamColour = _.get(teamData, [1, 'color_primary'])

      document.getElementById('blue-team-name').style.background = "linear-gradient(90deg, #" + blueTeamColour + ", #262626 50%)";
      document.getElementById('blue-name-endscoreboard').style.background = "linear-gradient(90deg, #" + blueTeamColour + ", #262626 50%)";
      document.getElementById('blue-score').style.background = "#" + blueTeamColour;
      document.getElementById('blue-score-endscoreboard').style.background = "#" + blueTeamColour;
      document.getElementById('blue-team-name').style.borderBottomColor = "#" + blueTeamColour;
      document.getElementById('blue-name-endscoreboard').style.borderBottomColor = "#" + blueTeamColour;
      document.getElementById('blue-score').style.borderBottomColor = "#" + blueTeamColour;
      document.getElementById('blue-score-endscoreboard').style.borderBottomColor = "#" + blueTeamColour;

      document.getElementById('orange-team-name').style.background = "linear-gradient(270deg, #" + orangeTeamColour + ", #262626 50%)";
      document.getElementById('orange-name-endscoreboard').style.background = "linear-gradient(270deg, #" + orangeTeamColour + ", #262626 50%)";
      document.getElementById('orange-score').style.background = "#" + orangeTeamColour;
      document.getElementById('orange-score-endscoreboard').style.background = "#" + orangeTeamColour;
      document.getElementById('orange-team-name').style.borderBottomColor = "#" + orangeTeamColour;
      document.getElementById('orange-name-endscoreboard').style.borderBottomColor = "#" + orangeTeamColour;
      document.getElementById('orange-score').style.borderBottomColor = "#" + orangeTeamColour;
      document.getElementById('orange-score-endscoreboard').style.borderBottomColor = "#" + orangeTeamColour;

      document.getElementById("score-comparison").style.backgroundColor = "#" + orangeTeamColour;
      document.getElementById("score-comparison-bg").style.backgroundColor = "#" + blueTeamColour;
      document.getElementById("goals-comparison").style.backgroundColor = "#" + orangeTeamColour;
      document.getElementById("goals-comparison-bg").style.backgroundColor = "#" + blueTeamColour;
      document.getElementById("assists-comparison").style.backgroundColor = "#" + orangeTeamColour;
      document.getElementById("assists-comparison-bg").style.backgroundColor = "#" + blueTeamColour;
      document.getElementById("saves-comparison").style.backgroundColor = "#" + orangeTeamColour;
      document.getElementById("saves-comparison-bg").style.backgroundColor = "#" + blueTeamColour;
      document.getElementById("shots-comparison").style.backgroundColor = "#" + orangeTeamColour;
      document.getElementById("shots-comparison-bg").style.backgroundColor = "#" + blueTeamColour;
      document.getElementById("demos-comparison").style.backgroundColor = "#" + orangeTeamColour;
      document.getElementById("demos-comparison-bg").style.backgroundColor = "#" + blueTeamColour;
      document.getElementById("touches-comparison").style.backgroundColor = "#" + orangeTeamColour;
      document.getElementById("touches-comparison-bg").style.backgroundColor = "#" + blueTeamColour;
      document.getElementById("avg-speed-comparison").style.backgroundColor = "#" + orangeTeamColour;
      document.getElementById("speed-comparison-bg").style.backgroundColor = "#" + blueTeamColour;

      if (blueWins == '1') {
        document.getElementById('blue-g1').style.background = "#" + blueTeamColour;
      }
      if (blueWins == '2') {
        document.getElementById('blue-g1').style.background = "#" + blueTeamColour;
        document.getElementById('blue-g2').style.background = "#" + blueTeamColour;
      }
      if (blueWins == '3') {
        document.getElementById('blue-g1').style.background = "#" + blueTeamColour;
        document.getElementById('blue-g2').style.background = "#" + blueTeamColour;
        document.getElementById('blue-g3').style.background = "#" + blueTeamColour;
      }
      if (blueWins == '4') {
        document.getElementById('blue-g1').style.background = "#" + blueTeamColour;
        document.getElementById('blue-g2').style.background = "#" + blueTeamColour;
        document.getElementById('blue-g3').style.background = "#" + blueTeamColour;
        document.getElementById('blue-g4').style.background = "#" + blueTeamColour;
      }
      if (orangeWins == '1') {
        document.getElementById('orange-g1').style.background = "#" + orangeTeamColour;
      }
      if (orangeWins == '2') {
        document.getElementById('orange-g1').style.background = "#" + orangeTeamColour;
        document.getElementById('orange-g2').style.background = "#" + orangeTeamColour;
      }
      if (orangeWins == '3') {
        document.getElementById('orange-g1').style.background = "#" + orangeTeamColour;
        document.getElementById('orange-g2').style.background = "#" + orangeTeamColour;
        document.getElementById('orange-g3').style.background = "#" + orangeTeamColour;
      }
      if (orangeWins == '4') {
        document.getElementById('orange-g1').style.background = "#" + orangeTeamColour;
        document.getElementById('orange-g2').style.background = "#" + orangeTeamColour;
        document.getElementById('orange-g3').style.background = "#" + orangeTeamColour;
        document.getElementById('orange-g4').style.background = "#" + orangeTeamColour;
      }

      //overtime logic
      //console.log(jEvent.data.game.isOT)
      if (jEvent.data.game.isOT == false) {
        document.getElementById('overtime-text').style.opacity = "0";
        document.getElementById('timer').style.backgroundColor = "#262626";
        document.getElementById('timer').style.borderBottom = "#262626 10px solid";
        
        if (gameTime >= 600) {
          document.getElementById('timer').style.fontSize = "24pt";
          document.getElementById('timer').style.paddingRight = "5px";
        } else {
          document.getElementById('timer').style.fontSize = "28pt";
          document.getElementById('timer').style.paddingRight = "3px";
        }
      } 
      if (jEvent.data.game.isOT == true){
        document.getElementById('overtime-text').style.opacity = "1";
        document.getElementById('timer').style.backgroundColor = "red";
        document.getElementById('timer').style.borderBottom = "red 10px solid";
        if (jEvent.data.game.time_seconds >= 600) {
          document.getElementById('timer').style.fontSize = "20pt";
        } else {
          document.getElementById('timer').style.fontSize = "24pt";
          document.getElementById('timer').style.paddingRight = "10px";
        }
        //$('#timer-text').text("10:00")
        $('#timer-text').text("+" + myTime(round))
      }

      //active player logic
      var activeTarget = jEvent.data.game.target;
      var playerList = jEvent.data.players;
      var activePlayerData = _.get(playerList, activeTarget);
      var activePlayerName = "";
      if (jEvent.data.game.hasTarget == true) {
        var activePlayerName = activePlayerData.name;
      }

      if (activeTarget.length > 1) {
        $('#active-player').removeClass('invisible');
        $('#active-boost').removeClass('invisible');
        $('#active-name-text').text(activePlayerData.name.toUpperCase())
        //$('#active-name-text').text("NAMEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
        $('#active-score').text(activePlayerData.score)
        //$('#active-score').text("0000")
        $('#active-goals').text(activePlayerData.goals)
        $('#active-shots').text(activePlayerData.shots)
        $('#active-assists').text(activePlayerData.assists)
        $('#active-saves').text(activePlayerData.saves)
        $('#active-demos').text(activePlayerData.demos)
        $('#active-boost-number').text(activePlayerData.boost)
        var boostmetre = document.getElementById('boost-metre');
        var radius = boostmetre.r.baseVal.value;
        var circumference = radius * 2 * Math.PI;

        boostmetre.style.strokeDasharray = `${circumference} ${circumference}`;
        boostmetre.style.strokeDashoffset = `${circumference}`;


        function setProgress(percent) {
          const offset = circumference - percent / 133.3 * circumference;
          boostmetre.style.strokeDashoffset = offset;
        }

        setProgress(activePlayerData.boost);
        if (activePlayerData.team == 0) {
          document.getElementById('active-name').style.background = "#" + blueTeamColour;
          document.getElementById('active-player').style.borderTopColor = "#" + blueTeamColour;
          //document.getElementById('active-player').style.borderRightColor = "#" + blueTeamColour;
          document.getElementById('boost-metre').setAttribute("stroke", "#" + blueTeamColour);
          document.getElementById('boost-metre').setAttribute("fill", "transparent");
          document.getElementById('blueChangeable').setAttribute("stop-color", "#" + blueTeamColour);
          document.getElementById('innerCircle1').setAttribute("fill", "url('#blueBoostGradient')");
          document.getElementById('innerCircle1').setAttribute("stroke", "black");
          document.getElementById('innerCircle2').setAttribute("fill", "url('#blueBoostGradient')");

        } else if (activePlayerData.team == 1) {
          document.getElementById('active-name').style.background = "#" + orangeTeamColour;
          document.getElementById('active-player').style.borderTopColor = "#" + orangeTeamColour;
          //document.getElementById('active-player').style.borderRightColor = "#" + orangeTeamColour;
          document.getElementById('boost-metre').setAttribute("stroke", "#" + orangeTeamColour);
          document.getElementById('boost-metre').setAttribute("fill", "transparent");
          document.getElementById('orangeChangeable').setAttribute("stop-color", "#" + orangeTeamColour);
          document.getElementById('innerCircle1').setAttribute("fill", "url('#orangeBoostGradient')");
          document.getElementById('innerCircle1').setAttribute("stroke", "black");
          document.getElementById('innerCircle2').setAttribute("fill", "url('#orangeBoostGradient')");
        } else {
          console.log('oopsie')
        }

      } else {
        $('#blue-team-active').addClass('invisible');
        $('#orange-team-active').addClass('invisible');
        $('#active-player').addClass('invisible');
        $('#active-boost').addClass('invisible');
      }

      //all player logic

      //blue
      var team0 = _.filter(playerList, {
        'team': 0
      })
      //orange
      var team1 = _.filter(playerList, {
        'team': 1
      })

      var blueTotalScore = 0;
      var blueTotalGoals = 0;
      var blueTotalAssists = 0;
      var blueTotalSaves = 0;
      var blueTotalShots = 0;
      var blueTotalDemos = 0;
      var blueTotalTouches = 0;
      var blue1GoalPart = 0;
      var blue2GoalPart = 0;
      var blue3GoalPart = 0;
      var blueTotalSpeed = 0;
      var blueTotalTicks = 0;
      var blueAverageSpeed = 0;

      var orangeTotalScore = 0;
      var orangeTotalGoals = 0;
      var orangeTotalAssists = 0;
      var orangeTotalSaves = 0;
      var orangeTotalShots = 0;
      var orangeTotalDemos = 0;
      var orangeTotalTouches = 0;
      var orange1GoalPart = 0;
      var orange2GoalPart = 0;
      var orange3GoalPart = 0;
      var orangeTotalSpeed = 0;
      var orangeTotalTicks = 0;
      var orangeAverageSpeed = 0;

      //does blue team exist?
      if (team0 != undefined) {
        //it does

        //blue players btw
        var blue1 = _.get(team0, [0])
        var blue2 = _.get(team0, [1])
        var blue3 = _.get(team0, [2])

        if (blue1 != undefined && blue2 != undefined && blue3 != undefined) {

          $("div[id^='blue-player-']").removeClass('d-none')

          blueTotalScore = blue1.score + blue2.score + blue3.score;
          blueTotalGoals = blue1.goals + blue2.goals + blue3.goals;
          blueTotalAssists = blue1.assists + blue2.assists + blue3.assists;
          blueTotalSaves = blue1.saves + blue2.saves + blue3.saves;
          blueTotalShots = blue1.shots + blue2.shots + blue3.shots;
          blueTotalDemos = blue1.demos + blue2.demos + blue3.demos;
          blueTotalTouches = blue1.touches + blue2.touches + blue3.touches;

          if (blueTotalGoals == 0) {
            blue1GoalPart = 0;
            blue2GoalPart = 0;
            blue3GoalPart = 0;
          } else {
            blue1GoalPart = ((blue1.goals + blue1.assists) / blueTotalGoals) * 100;
            blue2GoalPart = ((blue2.goals + blue2.assists) / blueTotalGoals) * 100;
            blue3GoalPart = ((blue3.goals + blue3.assists) / blueTotalGoals) * 100;
          }

          if (blue3.isDead == false && isLive == 1) {
            b3ticks = b3ticks + 1;
            b3totSpeed = b3totSpeed + blue3.speed;
          }
          b3avgSpeed = b3totSpeed / b3ticks;
          if (blue2.isDead == false && isLive == 1) {
            b2ticks = b2ticks + 1;
            b2totSpeed = b2totSpeed + blue2.speed;
          }
          b2avgSpeed = b2totSpeed / b2ticks;
          if (blue1.isDead == false && isLive == 1) {
            b1ticks = b1ticks + 1;
            b1totSpeed = b1totSpeed + blue1.speed;
          }
          b1avgSpeed = b1totSpeed / b1ticks;

          blueTotalSpeed = b1totSpeed + b2totSpeed + b3totSpeed;
          blueTotalTicks = b1ticks + b2ticks + b3ticks;
          blueAverageSpeed = blueTotalSpeed / blueTotalTicks;

          $('#blue-player-3').removeClass('d-none')
          $('#blue-player-3-name').text(blue3.name.toUpperCase())
          $('#blue-player-3-name-endsb').text(blue3.name.toUpperCase())
          $('#blue-player-3-score').text(blue3.score)
          $('#blue-player-3-goals').text(blue3.goals)
          $('#blue-player-3-shots').text(blue3.shots)
          $('#blue-player-3-saves').text(blue3.saves)
          $('#blue-player-3-assists').text(blue3.assists)
          $('#blue-player-3-boost').text(blue3.boost)
          $('#blue-player-3-demos').text(blue3.demos)
          $('#blue-player-3-touches').text(blue3.touches)
          $('#blue-player-3-goalPart').text(blue3GoalPart.toFixed(0) + "%")
          $('#blue-player-3-p-bar').width(blue3.boost + "%")
          if (activePlayerName == blue3.name) {
            $('#blue-player-3').addClass('blue-active-player')
            $('#blue-player-3').removeClass('blue-player')
            document.getElementById("blue-player-3-p-bar").style.backgroundColor = "white";
            document.getElementById("blue-player-3").style.background = "linear-gradient(90deg, #" + blueTeamColour + ", #262626 50%)";

          } else {
            $('#blue-player-3').removeClass('blue-active-player')
            $('#blue-player-3').addClass('blue-player')
            document.getElementById("blue-player-3-p-bar").style.backgroundColor = "#" + blueTeamColour;
            document.getElementById("blue-player-3").style.background = "#262626";

          }

          $('#blue-player-3-avg-speed').text(b3avgSpeed.toFixed(0) + "KPH")

          $('#blue-player-2').removeClass('d-none')
          $('#blue-player-2-name').text(blue2.name.toUpperCase())
          $('#blue-player-2-name-endsb').text(blue2.name.toUpperCase())
          $('#blue-player-2-score').text(blue2.score)
          $('#blue-player-2-goals').text(blue2.goals)
          $('#blue-player-2-shots').text(blue2.shots)
          $('#blue-player-2-saves').text(blue2.saves)
          $('#blue-player-2-assists').text(blue2.assists)
          $('#blue-player-2-boost').text(blue2.boost)
          $('#blue-player-2-demos').text(blue2.demos)
          $('#blue-player-2-touches').text(blue2.touches)
          $('#blue-player-2-goalPart').text(blue2GoalPart.toFixed(0) + "%")
          $('#blue-player-2-p-bar').width(blue2.boost + "%")
          if (activePlayerName == blue2.name) {
            $('#blue-player-2').addClass('blue-active-player')
            $('#blue-player-2').removeClass('blue-player')
            document.getElementById("blue-player-2-p-bar").style.backgroundColor = "white";
            document.getElementById("blue-player-2").style.background = "linear-gradient(90deg, #" + blueTeamColour + ", #262626 50%)";
          } else {
            $('#blue-player-2').removeClass('blue-active-player')
            $('#blue-player-2').addClass('blue-player')
            document.getElementById("blue-player-2-p-bar").style.backgroundColor = "#" + blueTeamColour;
            document.getElementById("blue-player-2").style.background = "#262626";
          }

          $('#blue-player-2-avg-speed').text(b2avgSpeed.toFixed(0) + "KPH")

          //remove invis for p1 and do other shit
          $('#blue-player-1').removeClass('d-none')
          $('#blue-player-1-name').text(blue1.name.toUpperCase())
          $('#blue-player-1-name-endsb').text(blue1.name.toUpperCase())
          $('#blue-player-1-score').text(blue1.score)
          $('#blue-player-1-goals').text(blue1.goals)
          $('#blue-player-1-shots').text(blue1.shots)
          $('#blue-player-1-saves').text(blue1.saves)
          $('#blue-player-1-assists').text(blue1.assists)
          $('#blue-player-1-boost').text(blue1.boost)
          $('#blue-player-1-demos').text(blue1.demos)
          $('#blue-player-1-touches').text(blue1.touches)
          $('#blue-player-1-goalPart').text(blue1GoalPart.toFixed(0) + "%")
          $('#blue-player-1-p-bar').width(blue1.boost + "%")
          if (activePlayerName == blue1.name) {
            $('#blue-player-1').addClass('blue-active-player')
            $('#blue-player-1').removeClass('blue-player')
            document.getElementById("blue-player-1-p-bar").style.backgroundColor = "white";
            document.getElementById("blue-player-1").style.background = "linear-gradient(90deg, #" + blueTeamColour + ", #262626 50%)";
          } else {
            $('#blue-player-1').removeClass('blue-active-player')
            $('#blue-player-1').addClass('blue-player')
            document.getElementById("blue-player-1-p-bar").style.backgroundColor = "#" + blueTeamColour;
            document.getElementById("blue-player-1").style.background = "#262626";
          }

          $('#blue-player-1-avg-speed').text(b1avgSpeed.toFixed(0) + "KPH")

        } else if (blue1 != undefined && blue2 != undefined && blue3 == undefined) {

          blueTotalScore = blue1.score + blue2.score;
          blueTotalGoals = blue1.goals + blue2.goals;
          blueTotalAssists = blue1.assists + blue2.assists;
          blueTotalSaves = blue1.saves + blue2.saves;
          blueTotalShots = blue1.shots + blue2.shots;
          blueTotalDemos = blue1.demos + blue2.demos;
          blueTotalTouches = blue1.touches + blue2.touches;

          if (blueTotalGoals == 0) {
            blue1GoalPart = 0;
            blue2GoalPart = 0;
          } else {
            blue1GoalPart = ((blue1.goals + blue1.assists) / blueTotalGoals) * 100;
            blue2GoalPart = ((blue2.goals + blue2.assists) / blueTotalGoals) * 100;
          }

          if (blue2.isDead == false && isLive == 1) {
            b2ticks = b2ticks + 1;
            b2totSpeed = b2totSpeed + blue2.speed;
          }
          b2avgSpeed = b2totSpeed / b2ticks;
          if (blue1.isDead == false && isLive == 1) {
            b1ticks = b1ticks + 1;
            b1totSpeed = b1totSpeed + blue1.speed;
          }
          b1avgSpeed = b1totSpeed / b1ticks;

          blueTotalSpeed = b1totSpeed + b2totSpeed;
          blueTotalTicks = b1ticks + b2ticks;
          blueAverageSpeed = blueTotalSpeed / blueTotalTicks;

          $('#blue-player-1').removeClass('d-none')
          $('#blue-player-1-name').text(blue1.name.toUpperCase())
          $('#blue-player-1-name-endsb').text(blue1.name.toUpperCase())
          $('#blue-player-1-score').text(blue1.score)
          $('#blue-player-1-goals').text(blue1.goals)
          $('#blue-player-1-shots').text(blue1.shots)
          $('#blue-player-1-saves').text(blue1.saves)
          $('#blue-player-1-assists').text(blue1.assists)
          $('#blue-player-1-boost').text(blue1.boost)
          $('#blue-player-1-demos').text(blue1.demos)
          $('#blue-player-1-touches').text(blue1.touches)
          $('#blue-player-1-goalPart').text(blue1GoalPart.toFixed(0) + "%")
          $('#blue-player-1-p-bar').width(blue1.boost + "%")
          if (activePlayerName == blue1.name) {
            $('#blue-player-1').addClass('blue-active-player')
            $('#blue-player-1').removeClass('blue-player')
            document.getElementById("blue-player-1-p-bar").style.backgroundColor = "white";
            document.getElementById("blue-player-1").style.background = "linear-gradient(90deg, #" + blueTeamColour + ", #262626 50%)";
          } else {
            $('#blue-player-1').removeClass('blue-active-player')
            $('#blue-player-1').addClass('blue-player')
            document.getElementById("blue-player-1-p-bar").style.backgroundColor = "#" + blueTeamColour;
            document.getElementById("blue-player-1").style.background = "#262626";
          }
          $('#blue-player-1-avg-speed').text(b1avgSpeed.toFixed(0) + "KPH")

          $('#blue-player-2').removeClass('d-none')
          $('#blue-player-2-name').text(blue2.name.toUpperCase())
          $('#blue-player-2-name-endsb').text(blue2.name.toUpperCase())
          $('#blue-player-2-score').text(blue2.score)
          $('#blue-player-2-goals').text(blue2.goals)
          $('#blue-player-2-shots').text(blue2.shots)
          $('#blue-player-2-saves').text(blue2.saves)
          $('#blue-player-2-assists').text(blue2.assists)
          $('#blue-player-2-boost').text(blue2.boost)
          $('#blue-player-2-demos').text(blue2.demos)
          $('#blue-player-2-touches').text(blue2.touches)
          $('#blue-player-2-goalPart').text(blue2GoalPart.toFixed(0) + "%")
          $('#blue-player-2-p-bar').width(blue2.boost + "%")
          if (activePlayerName == blue2.name) {
            $('#blue-player-2').addClass('blue-active-player')
            $('#blue-player-2').removeClass('blue-player')
            document.getElementById("blue-player-2-p-bar").style.backgroundColor = "white";
            document.getElementById("blue-player-2").style.background = "linear-gradient(90deg, #" + blueTeamColour + ", #262626 50%)";
          } else {
            $('#blue-player-2').removeClass('blue-active-player')
            $('#blue-player-2').addClass('blue-player')
            document.getElementById("blue-player-2-p-bar").style.backgroundColor = "#" + blueTeamColour;
            document.getElementById("blue-player-2").style.background = "#262626";
          }
          $('#blue-player-2-avg-speed').text(b2avgSpeed.toFixed(0) + "KPH")

        } else if (blue1 != undefined && blue2 == undefined && blue3 == undefined) {

          blueTotalScore = blue1.score;
          blueTotalGoals = blue1.goals;
          blueTotalAssists = blue1.assists;
          blueTotalSaves = blue1.saves;
          blueTotalShots = blue1.shots;
          blueTotalDemos = blue1.demos;
          blueTotalTouches = blue1.touches;

          if (blueTotalGoals == 0) {
            blue1GoalPart = 0;
          } else {
            blue1GoalPart = ((blue1.goals + blue1.assists) / blueTotalGoals) * 100;
          }

          if (blue1.isDead == false && isLive == 1) {
            b1ticks = b1ticks + 1;
            b1totSpeed = b1totSpeed + blue1.speed;
          }
          b1avgSpeed = b1totSpeed / b1ticks;

          blueTotalSpeed = b1totSpeed + b2totSpeed;
          blueTotalTicks = b1ticks + b2ticks;
          blueAverageSpeed = blueTotalSpeed / blueTotalTicks;

          $('#blue-player-1').removeClass('d-none')
          $('#blue-player-1-name').text(blue1.name.toUpperCase())
          $('#blue-player-1-name-endsb').text(blue1.name.toUpperCase())
          $('#blue-player-1-score').text(blue1.score)
          $('#blue-player-1-goals').text(blue1.goals)
          $('#blue-player-1-shots').text(blue1.shots)
          $('#blue-player-1-saves').text(blue1.saves)
          $('#blue-player-1-assists').text(blue1.assists)
          $('#blue-player-1-boost').text(blue1.boost)
          $('#blue-player-1-demos').text(blue1.demos)
          $('#blue-player-1-touches').text(blue1.touches)
          $('#blue-player-1-goalPart').text(blue1GoalPart.toFixed(0) + "%")
          $('#blue-player-1-p-bar').width(blue1.boost + "%")
          if (activePlayerName == blue1.name) {
            $('#blue-player-1').addClass('blue-active-player')
            $('#blue-player-1').removeClass('blue-player')
            document.getElementById("blue-player-1-p-bar").style.backgroundColor = "white";
            document.getElementById("blue-player-1").style.background = "linear-gradient(90deg, #" + blueTeamColour + ", #262626 50%)";
          } else {
            $('#blue-player-1').removeClass('blue-active-player')
            $('#blue-player-1').addClass('blue-player')
            document.getElementById("blue-player-1-p-bar").style.backgroundColor = "#" + blueTeamColour;
            document.getElementById("blue-player-1").style.background = "#262626";
          }
          $('#blue-player-1-avg-speed').text(b1avgSpeed.toFixed(0) + "KPH")
        }

      } else {
        blueResetAll()
      }

      //does orange team exist?
      if (team1 != undefined) {
        //it does

        //orange players btw
        var orange1 = _.get(team1, [0])
        var orange2 = _.get(team1, [1])
        var orange3 = _.get(team1, [2])

        if (orange1 != undefined && orange2 != undefined && orange3 != undefined) {

          orangeTotalScore = orange1.score + orange2.score + orange3.score;
          orangeTotalGoals = orange1.goals + orange2.goals + orange3.goals;
          orangeTotalAssists = orange1.assists + orange2.assists + orange3.assists;
          orangeTotalSaves = orange1.saves + orange2.saves + orange3.saves;
          orangeTotalShots = orange1.shots + orange2.shots + orange3.shots;
          orangeTotalDemos = orange1.demos + orange2.demos + orange3.demos;
          orangeTotalTouches = orange1.touches + orange2.touches + orange3.touches;

          if (orangeTotalGoals == 0) {
            orange1GoalPart = 0;
            orange2GoalPart = 0;
            orange3GoalPart = 0;
          } else {
            orange1GoalPart = ((orange1.goals + orange1.assists) / orangeTotalGoals) * 100;
            orange2GoalPart = ((orange2.goals + orange2.assists) / orangeTotalGoals) * 100;
            orange3GoalPart = ((orange3.goals + orange3.assists) / orangeTotalGoals) * 100;
          }

          if (orange3.isDead == false && isLive == 1) {
            o3ticks = o3ticks + 1;
            o3totSpeed = o3totSpeed + orange3.speed;
          }
          o3avgSpeed = o3totSpeed / o3ticks;
          if (orange2.isDead == false && isLive == 1) {
            o2ticks = o2ticks + 1;
            o2totSpeed = o2totSpeed + orange2.speed;
          }
          o2avgSpeed = o2totSpeed / o2ticks;
          if (orange1.isDead == false && isLive == 1) {
            o1ticks = o1ticks + 1;
            o1totSpeed = o1totSpeed + orange1.speed;
          }
          o1avgSpeed = o1totSpeed / o1ticks;

          orangeTotalSpeed = o1totSpeed + o2totSpeed + o3totSpeed;
          orangeTotalTicks = o1ticks + o2ticks + o3ticks;
          orangeAverageSpeed = orangeTotalSpeed / orangeTotalTicks;

          $("div[id^='orange-player-']").removeClass('d-none')
          // orange player 3
          $('#orange-player-3').removeClass('d-none')
          $('#orange-player-3-name').text(orange3.name.toUpperCase())
          $('#orange-player-3-name-endsb').text(orange3.name.toUpperCase())
          $('#orange-player-3-score').text(orange3.score)
          $('#orange-player-3-goals').text(orange3.goals)
          $('#orange-player-3-shots').text(orange3.shots)
          $('#orange-player-3-saves').text(orange3.saves)
          $('#orange-player-3-assists').text(orange3.assists)
          $('#orange-player-3-boost').text(orange3.boost)
          $('#orange-player-3-demos').text(orange3.demos)
          $('#orange-player-3-touches').text(orange3.touches)
          $('#orange-player-3-goalPart').text(orange3GoalPart.toFixed(0) + "%")
          $('#orange-player-3-p-bar').width(orange3.boost + "%")
          if (activePlayerName == orange3.name) {
            $('#orange-player-3').addClass('orange-active-player')
            $('#orange-player-3').removeClass('orange-player')
            document.getElementById("orange-player-3-p-bar").style.backgroundColor = "white";
            document.getElementById("orange-player-3").style.background = "linear-gradient(270deg, #" + orangeTeamColour + ", #262626 50%)";
          } else {
            $('#orange-player-3').removeClass('orange-active-player')
            $('#orange-player-3').addClass('orange-player')
            document.getElementById("orange-player-3-p-bar").style.backgroundColor = "#" + orangeTeamColour;
            document.getElementById("orange-player-3").style.background = "#262626";
          }
          $('#orange-player-3-avg-speed').text(o3avgSpeed.toFixed(0) + "KPH")
          // orange player 2
          $('#orange-player-2').removeClass('d-none')
          $('#orange-player-2-name').text(orange2.name.toUpperCase())
          $('#orange-player-2-name-endsb').text(orange2.name.toUpperCase())
          $('#orange-player-2-score').text(orange2.score)
          $('#orange-player-2-goals').text(orange2.goals)
          $('#orange-player-2-shots').text(orange2.shots)
          $('#orange-player-2-saves').text(orange2.saves)
          $('#orange-player-2-assists').text(orange2.assists)
          $('#orange-player-2-boost').text(orange2.boost)
          $('#orange-player-2-demos').text(orange2.demos)
          $('#orange-player-2-touches').text(orange2.touches)
          $('#orange-player-2-goalPart').text(orange2GoalPart.toFixed(0) + "%")
          $('#orange-player-2-p-bar').width(orange2.boost + "%")
          if (activePlayerName == orange2.name) {
            $('#orange-player-2').addClass('orange-active-player')
            $('#orange-player-2').removeClass('orange-player')
            document.getElementById("orange-player-2-p-bar").style.backgroundColor = "white";
            document.getElementById("orange-player-2").style.background = "linear-gradient(270deg, #" + orangeTeamColour + ", #262626 50%)";
          } else {
            $('#orange-player-2').removeClass('orange-active-player')
            $('#orange-player-2').addClass('orange-player')
            document.getElementById("orange-player-2-p-bar").style.backgroundColor = "#" + orangeTeamColour;
            document.getElementById("orange-player-2").style.background = "#262626";
          }
          $('#orange-player-2-avg-speed').text(o2avgSpeed.toFixed(0) + "KPH")
          // orange player 1
          $('#orange-player-1').removeClass('d-none')
          $('#orange-player-1-name').text(orange1.name.toUpperCase())
          $('#orange-player-1-name-endsb').text(orange1.name.toUpperCase())
          $('#orange-player-1-score').text(orange1.score)
          $('#orange-player-1-goals').text(orange1.goals)
          $('#orange-player-1-shots').text(orange1.shots)
          $('#orange-player-1-saves').text(orange1.saves)
          $('#orange-player-1-assists').text(orange1.assists)
          $('#orange-player-1-boost').text(orange1.boost)
          $('#orange-player-1-demos').text(orange1.demos)
          $('#orange-player-1-touches').text(orange1.touches)
          $('#orange-player-1-goalPart').text(orange1GoalPart.toFixed(0) + "%")
          $('#orange-player-1-p-bar').width(orange1.boost + "%")
          if (activePlayerName == orange1.name) {
            $('#orange-player-1').addClass('orange-active-player')
            $('#orange-player-1').removeClass('orange-player')
            document.getElementById("orange-player-1-p-bar").style.backgroundColor = "white";
            document.getElementById("orange-player-1").style.background = "linear-gradient(270deg, #" + orangeTeamColour + ", #262626 50%)";
          } else {
            $('#orange-player-1').removeClass('orange-active-player')
            $('#orange-player-1').addClass('orange-player')
            document.getElementById("orange-player-1-p-bar").style.backgroundColor = "#" + orangeTeamColour;
            document.getElementById("orange-player-1").style.background = "#262626";
          }
          $('#orange-player-1-avg-speed').text(o1avgSpeed.toFixed(0) + "KPH")
        } else if (orange1 != undefined && orange2 != undefined && orange3 == undefined) {

          orangeTotalScore = orange1.score + orange2.score;
          orangeTotalGoals = orange1.goals + orange2.goals;
          orangeTotalAssists = orange1.assists + orange2.assists;
          orangeTotalSaves = orange1.saves + orange2.saves;
          orangeTotalShots = orange1.shots + orange2.shots;
          orangeTotalDemos = orange1.demos + orange2.demos;
          orangeTotalTouches = orange1.touches + orange2.touches;

          if (orangeTotalGoals == 0) {
            orange1GoalPart = 0;
            orange2GoalPart = 0;
          } else {
            orange1GoalPart = ((orange1.goals + orange1.assists) / orangeTotalGoals) * 100;
            orange2GoalPart = ((orange2.goals + orange2.assists) / orangeTotalGoals) * 100;
          }

          if (orange2.isDead == false && isLive == 1) {
            o2ticks = o2ticks + 1;
            o2totSpeed = o2totSpeed + orange2.speed;
          }
          o2avgSpeed = o2totSpeed / o2ticks;
          if (orange1.isDead == false && isLive == 1) {
            o1ticks = o1ticks + 1;
            o1totSpeed = o1totSpeed + orange1.speed;
          }
          o1avgSpeed = o1totSpeed / o1ticks;

          orangeTotalSpeed = o1totSpeed + o2totSpeed;
          orangeTotalTicks = o1ticks + o2ticks;
          orangeAverageSpeed = orangeTotalSpeed / orangeTotalTicks;

          // orange player 1
          $('#orange-player-1').removeClass('d-none')
          $('#orange-player-1-name').text(orange1.name.toUpperCase())
          $('#orange-player-1-name-endsb').text(orange1.name.toUpperCase())
          $('#orange-player-1-score').text(orange1.score)
          $('#orange-player-1-goals').text(orange1.goals)
          $('#orange-player-1-shots').text(orange1.shots)
          $('#orange-player-1-saves').text(orange1.saves)
          $('#orange-player-1-assists').text(orange1.assists)
          $('#orange-player-1-boost').text(orange1.boost)
          $('#orange-player-1-demos').text(orange1.demos)
          $('#orange-player-1-touches').text(orange1.touches)
          $('#orange-player-1-goalPart').text(orange1GoalPart.toFixed(0) + "%")
          $('#orange-player-1-p-bar').width(orange1.boost + "%")
          if (activePlayerName == orange1.name) {
            $('#orange-player-1').addClass('orange-active-player')
            $('#orange-player-1').removeClass('orange-player')
            document.getElementById("orange-player-1-p-bar").style.backgroundColor = "white";
            document.getElementById("orange-player-1").style.background = "linear-gradient(270deg, #" + orangeTeamColour + ", #262626 50%)";
          } else {
            $('#orange-player-1').removeClass('orange-active-player')
            $('#orange-player-1').addClass('orange-player')
            document.getElementById("orange-player-1-p-bar").style.backgroundColor = "#" + orangeTeamColour;
            document.getElementById("orange-player-1").style.background = "#262626";
          }
          $('#orange-player-1-avg-speed').text(o1avgSpeed.toFixed(0) + "KPH")
          // orange player 2
          $('#orange-player-2').removeClass('d-none')
          $('#orange-player-2-name').text(orange2.name.toUpperCase())
          $('#orange-player-2-name-endsb').text(orange2.name.toUpperCase())
          $('#orange-player-2-score').text(orange2.score)
          $('#orange-player-2-goals').text(orange2.goals)
          $('#orange-player-2-shots').text(orange2.shots)
          $('#orange-player-2-saves').text(orange2.saves)
          $('#orange-player-2-assists').text(orange2.assists)
          $('#orange-player-2-boost').text(orange2.boost)
          $('#orange-player-2-demos').text(orange2.demos)
          $('#orange-player-2-touches').text(orange2.touches)
          $('#orange-player-2-goalPart').text(orange2GoalPart.toFixed(0) + "%")
          $('#orange-player-2-p-bar').width(orange2.boost + "%")
          if (activePlayerName == orange2.name) {
            $('#orange-player-2').addClass('orange-active-player')
            $('#orange-player-2').removeClass('orange-player')
            document.getElementById("orange-player-2-p-bar").style.backgroundColor = "white";
            document.getElementById("orange-player-2").style.background = "linear-gradient(270deg, #" + orangeTeamColour + ", #262626 50%)";
          } else {
            $('#orange-player-2').removeClass('orange-active-player')
            $('#orange-player-2').addClass('orange-player')
            document.getElementById("orange-player-2-p-bar").style.backgroundColor = "#" + orangeTeamColour;
            document.getElementById("orange-player-2").style.background = "#262626";
          }
          $('#orange-player-2-avg-speed').text(o2avgSpeed.toFixed(0) + "KPH")
        } else if (orange1 != undefined && orange2 == undefined && orange3 == undefined) {

          orangeTotalScore = orange1.score;
          orangeTotalGoals = orange1.goals;
          orangeTotalAssists = orange1.assists;
          orangeTotalSaves = orange1.saves;
          orangeTotalShots = orange1.shots;
          orangeTotalDemos = orange1.demos;
          orangeTotalTouches = orange1.touches;

          if (orangeTotalGoals == 0) {
            orange1GoalPart = 0;
          } else {
            orange1GoalPart = ((orange1.goals + orange1.assists) / orangeTotalGoals) * 100;
          }

          o2avgSpeed = o2totSpeed / o2ticks;
          if (orange1.isDead == false && isLive == 1) {
            o1ticks = o1ticks + 1;
            o1totSpeed = o1totSpeed + orange1.speed;
          }
          o1avgSpeed = o1totSpeed / o1ticks;

          orangeTotalSpeed = o1totSpeed;
          orangeTotalTicks = o1ticks;
          orangeAverageSpeed = orangeTotalSpeed / orangeTotalTicks;

          $('#orange-player-1').removeClass('d-none')
          $('#orange-player-1-name').text(orange1.name.toUpperCase())
          $('#orange-player-1-name-endsb').text(orange1.name.toUpperCase())
          $('#orange-player-1-score').text(orange1.score)
          $('#orange-player-1-goals').text(orange1.goals)
          $('#orange-player-1-shots').text(orange1.shots)
          $('#orange-player-1-saves').text(orange1.saves)
          $('#orange-player-1-assists').text(orange1.assists)
          $('#orange-player-1-boost').text(orange1.boost)
          $('#orange-player-1-demos').text(orange1.demos)
          $('#orange-player-1-touches').text(orange1.touches)
          $('#orange-player-1-goalPart').text(orange1GoalPart.toFixed(0) + "%")
          $('#orange-player-1-p-bar').width(orange1.boost + "%")
          if (activePlayerName == orange1.name) {
            $('#orange-player-1').addClass('orange-active-player')
            $('#orange-player-1').removeClass('orange-player')
            document.getElementById("orange-player-1-p-bar").style.backgroundColor = "white";
            document.getElementById("orange-player-1").style.background = "linear-gradient(270deg, #" + orangeTeamColour + ", #262626 50%)";
          } else {
            $('#orange-player-1').removeClass('orange-active-player')
            $('#orange-player-1').addClass('orange-player')
            document.getElementById("orange-player-1-p-bar").style.backgroundColor = "#" + orangeTeamColour;
            document.getElementById("orange-player-1").style.background = "#262626";
          }
          $('#orange-player-1-avg-speed').text(o1avgSpeed.toFixed(0) + "KPH")
        }
      } else {
        orangeResetAll()
      }

      orangeScorePC = orangeTotalScore / (orangeTotalScore + blueTotalScore) * 100;
      //console.log(orangeScorePC);
      $('#score-comparison').width(orangeScorePC + "%")

      orangeGoalsPC = orangeTotalGoals / (orangeTotalGoals + blueTotalGoals) * 100;
      //console.log(orangeScorePC);
      $('#goals-comparison').width(orangeGoalsPC + "%")

      orangeAssistsPC = orangeTotalAssists / (orangeTotalAssists + blueTotalAssists) * 100;
      //console.log(orangeScorePC);
      $('#assists-comparison').width(orangeAssistsPC + "%")

      orangeSavesPC = orangeTotalSaves / (orangeTotalSaves + blueTotalSaves) * 100;
      //console.log(orangeScorePC);
      $('#saves-comparison').width(orangeSavesPC + "%")

      orangeShotsPC = orangeTotalShots / (orangeTotalShots + blueTotalShots) * 100;
      //console.log(orangeScorePC);
      $('#shots-comparison').width(orangeShotsPC + "%")

      orangeDemosPC = orangeTotalDemos / (orangeTotalDemos + blueTotalDemos) * 100;
      //console.log(orangeScorePC);
      $('#demos-comparison').width(orangeDemosPC + "%")

      orangeTouchesPC = orangeTotalTouches / (orangeTotalTouches + blueTotalTouches) * 100;
      //console.log(orangeScorePC);
      $('#touches-comparison').width(orangeTouchesPC + "%")

      orangeAvgSpeedPC = orangeAverageSpeed / (orangeAverageSpeed + blueAverageSpeed) * 100;
      //console.log(orangeScorePC);
      $('#avg-speed-comparison').width(orangeAvgSpeedPC + "%")
    }
  }

  // PREPARING FOR END OF GAME SCORES
  else if (jEvent.event == "game:match_ended") {
    isLive = 0;
    console.log('match ended / podium')

    document.getElementById('blueTeam').style.opacity = "1";
    document.getElementById('orangeTeam').style.opacity = "1";
    document.getElementById('blue-player-3').style.animationName = "bluePlayersOut";
    document.getElementById('blue-player-3').style.opacity = "1";
    document.getElementById('orange-player-3').style.animationName = "orangePlayersOut";
    document.getElementById('orange-player-3').style.opacity = "1";
    setTimeout(function () {
      document.getElementById('blue-player-2').style.animationName = "bluePlayersOut";
      document.getElementById('blue-player-2').style.opacity = "1";
      document.getElementById('orange-player-2').style.animationName = "orangePlayersOut";
      document.getElementById('orange-player-2').style.opacity = "1";
      setTimeout(function () {
        document.getElementById('blue-player-1').style.animationName = "bluePlayersOut";
        document.getElementById('blue-player-1').style.opacity = "1";
        document.getElementById('orange-player-1').style.animationName = "orangePlayersOut";
        document.getElementById('orange-player-1').style.opacity = "1";
      }, 333)
      setTimeout(function () {
        document.getElementById('blue-player-3').style.opacity = "0";
        document.getElementById('orange-player-3').style.opacity = "0";
        document.getElementById('scorebug-div').style.opacity = "1";
        document.getElementById('league-logo').style.opacity = "1";
        document.getElementById('scorebug-div').style.animationName = "scorebugOut";
        document.getElementById('league-logo').style.animationName = "leagueLogoOut";
        setTimeout(function () {
          document.getElementById('blue-player-2').style.opacity = "0";
          document.getElementById('orange-player-2').style.opacity = "0";
          setTimeout(function () {
            document.getElementById('blue-player-1').style.opacity = "0";
            document.getElementById('orange-player-1').style.opacity = "0";
            document.getElementById('blueTeam').style.opacity = "0";
            document.getElementById('orangeTeam').style.opacity = "0";
            setTimeout(function () {
              document.getElementById('scorebug-div').style.opacity = "0";
              document.getElementById('league-logo').style.opacity = "0";
            }, 1200)
          }, 333)
        }, 333)
      }, 333)
    }, 333)
    document.getElementById('timer').style.backgroundColor = "#262626";
    document.getElementById('timer').style.borderBottom = "#262626 10px solid";
    finalBlueScore = blueScore;
    finalOrangeScore = orangeScore;
    finalBlueName = blueName;
    finalOrangeName = orangeName;
    $('#blue-name-endscoreboard').text(finalBlueName)
    $('#orange-name-endscoreboard').text(finalOrangeName)
    $('#active-player').addClass('invisible');
    $('#active-boost').addClass('invisible');

    if (jEvent.data.winner_team_num == 0) {
      if (blueWins < maxWins) {
        blueWins = blueWins + 1;
        gameNumber = blueWins + orangeWins + 1;
        setTimeout(function() {
          document.getElementById('gameNumber').innerHTML = gameNumber;
          document.getElementById('ot-gameNumber').innerHTML = gameNumber;
        },5000) 
        if (blueWins == maxWins) {
          document.getElementById('final-gameNumber').innerHTML = blueWins + orangeWins;
          setTimeout(function() {
            document.getElementById('gameNumber').innerHTML = gameNumber;
            document.getElementById('ot-gameNumber').innerHTML = gameNumber;
          },5000) 
          blueWins = 0;
          document.getElementById('blue-g1').style.background = "rgb(52, 52, 52)";
          document.getElementById('blue-g2').style.background = "rgb(52, 52, 52)";
          document.getElementById('blue-g3').style.background = "rgb(52, 52, 52)";
          document.getElementById('blue-g4').style.background = "rgb(52, 52, 52)";
          orangeWins = 0;
          document.getElementById('orange-g1').style.background = "rgb(52, 52, 52)";
          document.getElementById('orange-g2').style.background = "rgb(52, 52, 52)";
          document.getElementById('orange-g3').style.background = "rgb(52, 52, 52)";
          document.getElementById('orange-g4').style.background = "rgb(52, 52, 52)";
          gameNumber = blueWins + orangeWins + 1;
          //setTimeout(function () {
          //document.body.style.backgroundImage = "url('./zero-g-sv.png')";
          //}, 2000);
        } else {
          //setTimeout(function () {
          //document.body.style.backgroundImage = "url('./zero-g-gv.png')";
          //}, 2000);
        }
        if (blueWins == '1') {
          document.getElementById('blue-g1').style.background = "#" + blueTeamColour;
        }
        if (blueWins == '2') {
          document.getElementById('blue-g1').style.background = "#" + blueTeamColour;
          document.getElementById('blue-g2').style.background = "#" + blueTeamColour;
        }
        if (blueWins == '3') {
          document.getElementById('blue-g1').style.background = "#" + blueTeamColour;
          document.getElementById('blue-g2').style.background = "#" + blueTeamColour;
          document.getElementById('blue-g3').style.background = "#" + blueTeamColour;
        }
        if (blueWins == '4') {
          document.getElementById('blue-g1').style.background = "#" + blueTeamColour;
          document.getElementById('blue-g2').style.background = "#" + blueTeamColour;
          document.getElementById('blue-g3').style.background = "#" + blueTeamColour;
          document.getElementById('blue-g4').style.background = "#" + blueTeamColour;
        }  
        document.getElementById('gameNumber').innerHTML = gameNumber;
        document.getElementById('ot-gameNumber').innerHTML = gameNumber;
        document.getElementById('final-gameNumber').innerHTML = blueWins + orangeWins;
      }
    } else if (jEvent.data.winner_team_num == 1) {
      if (orangeWins < maxWins) {
        orangeWins = orangeWins + 1;
        gameNumber = blueWins + orangeWins + 1;
        setTimeout(function() {
          document.getElementById('gameNumber').innerHTML = gameNumber;
          document.getElementById('ot-gameNumber').innerHTML = gameNumber;
        },5000) 
        document.getElementById('final-gameNumber').innerHTML = blueWins + orangeWins;
        if (orangeWins == maxWins) {
          document.getElementById('final-gameNumber').innerHTML = blueWins + orangeWins;
          blueWins = 0;
          document.getElementById('blue-g1').style.background = "rgb(52, 52, 52)";
          document.getElementById('blue-g2').style.background = "rgb(52, 52, 52)";
          document.getElementById('blue-g3').style.background = "rgb(52, 52, 52)";
          document.getElementById('blue-g4').style.background = "rgb(52, 52, 52)";
          orangeWins = 0;
          document.getElementById('orange-g1').style.background = "rgb(52, 52, 52)";
          document.getElementById('orange-g2').style.background = "rgb(52, 52, 52)";
          document.getElementById('orange-g3').style.background = "rgb(52, 52, 52)";
          document.getElementById('orange-g4').style.background = "rgb(52, 52, 52)";
          gameNumber = blueWins + orangeWins + 1;
          setTimeout(function() {
            document.getElementById('gameNumber').innerHTML = gameNumber;
            document.getElementById('ot-gameNumber').innerHTML = gameNumber;
          },5000) 
          //setTimeout(function () {
          //document.body.style.backgroundImage = "url('./ethereal-sv.png')";
          //}, 2000);
        } else {
          //setTimeout(function () {
          //document.body.style.backgroundImage = "url('./ethereal-gv.png')";
          //}, 2000);
        }
        if (orangeWins == '1') {
          document.getElementById('orange-g1').style.background = "#" + orangeTeamColour;
        }
        if (orangeWins == '2') {
          document.getElementById('orange-g1').style.background = "#" + orangeTeamColour;
          document.getElementById('orange-g2').style.background = "#" + orangeTeamColour;
        }
        if (orangeWins == '3') {
          document.getElementById('orange-g1').style.background = "#" + orangeTeamColour;
          document.getElementById('orange-g2').style.background = "#" + orangeTeamColour;
          document.getElementById('orange-g3').style.background = "#" + orangeTeamColour;
        }
        if (orangeWins == '4') {
          document.getElementById('orange-g1').style.background = "#" + orangeTeamColour;
          document.getElementById('orange-g2').style.background = "#" + orangeTeamColour;
          document.getElementById('orange-g3').style.background = "#" + orangeTeamColour;
          document.getElementById('orange-g4').style.background = "#" + orangeTeamColour;
        }  
      }
    }
    setTimeout(function () {
      //stinger.play();
      setTimeout(function () {
        console.log("scoreboard visible");
        /*
        document.body.style.background = "radial-gradient(circle, rgb(38, 38, 38), rgb(26, 26, 26))";
        $('#post-game-scores').removeClass('invisible');
        $('#rl-logo').removeClass('invisible');
        document.getElementById('post-game-scores').style.opacity = "1";
        */
        statfeed1 = "";
        statfeed2 = "";
        statfeed3 = "";
        statfeed4 = "";
        statfeed5 = "";
        statfeed6 = "";
        document.getElementById("statfeed1").style.opacity = "0";
        document.getElementById("statfeed2").style.opacity = "0";
        document.getElementById("statfeed3").style.opacity = "0";
        document.getElementById("statfeed4").style.opacity = "0";
        document.getElementById("statfeed5").style.opacity = "0";
        document.getElementById("statfeed6").style.opacity = "0";
      }, 1000)
    }, 3500);
  }
  // GET GOAL INFO (SCORER/SPEED/ASSIST)
  else if (jEvent.event == "game:goal_scored") {
    isLive = 0;
    var scorer = jEvent.data.scorer.name.toUpperCase();
    var goalSpeed = parseInt(jEvent.data.goalspeed);
    $('#scorer-name').text(scorer);
    $('#goal-speed-value').text(goalSpeed + " KPH");
    //$('#goal-speed-value').text("000 KPH");
    //$('#scorer-name').text("NAMEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
    //console.log('goal scored by: ' + scorer + " / speed: " + goalSpeed)
    //console.log('team number: ' + jEvent.data.scorer.teamnum)
    setTimeout(function () {
      //stinger.removeClass('invisible')
      //stinger.play();
    }, 2600)
    if (jEvent.data.scorer.teamnum == '0') {
      goalScored = 1;
      document.getElementById("goal-team-colour").style.background = "#" + blueTeamColour;
      $("#blue-team-name-text").text("GOAL!!!")
      $("#blue-team-name-text").addClass("goalScoredAnimation")
      setTimeout(function () {
        goalScored = 0;
        $("#blue-team-name-text").removeClass("goalScoredAnimation")
      }, 2800)
    } else {
      goalScored = 1;
      document.getElementById("goal-team-colour").style.background = "#" + orangeTeamColour;
      $("#orange-team-name-text").text("GOAL!!!")
      $("#orange-team-name-text").addClass("goalScoredAnimation")
      setTimeout(function () {
        goalScored = 0;
        $("#orange-team-name-text").removeClass("goalScoredAnimation")
      }, 2800)
    }
  }
  determinedisplaystat: if (jEvent.event == "game:statfeed_event") {
    console.log(jEvent.data);
    if (jEvent.data.event_name == "LongGoal" || jEvent.data.event_name == "HatTrick" || jEvent.data.event_name == "PoolShot" || jEvent.data.event_name == "Extermination" || jEvent.data.event_name == "LowFive" || jEvent.data.event_name == "HighFive" || jEvent.data.event_name == "AerialGoal" || jEvent.data.event_name == "BicycleGoal" || jEvent.data.event_name == "BackwardsGoal" || jEvent.data.event_name == "Juggle" || jEvent.data.event_name == "OvertimeGoal" || jEvent.data.event_name == "Savior" || jEvent.data.event_name == "Playmaker" || jEvent.data.event_name == "AerialHit" || jEvent.data.event_name == "TurtleGoal" || jEvent.data.event_name == "ClearBall" || jEvent.data.event_name == "CenterBall" || jEvent.data.event_name == "TimePlayed" || jEvent.data.event_name == "CompletedMatch" || jEvent.data.event_name == "SwishGoal" || jEvent.data.event_name == "Damage" || jEvent.data.event_name == "UltraDamage" || jEvent.data.event_name == "BicycleHit") {
      break determinedisplaystat;
    }
    determineStatPosition: if (statfeed1 == "") {
      statfeed1 = jEvent.data;
      document.getElementById("statfeed1").style.opacity = "1";
      $("#statfeed1").addClass('statfeedIn');
      setTimeout(function () {
        $("#statfeed1").removeClass('statfeedIn');
      }, 1000)
      if (jEvent.data.event_name == "Assist") {
        var assister = jEvent.data.main_target.name.toUpperCase();
        console.log('Statfeed 1 - assist by: ' + assister)
        $('#assister').removeClass('invisible');
        $('#assister-name').text(assister);
        $('#sf1-mt-text').text(assister);
        $('#sf1-en-text').text("ASSIST");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed1-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed1-maintarget').style.background = "#" + orangeTeamColour;
        }
        assister = "";
      } else if (jEvent.data.event_name == "Goal") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        console.log('Statfeed 1 - goal by: ' + maintarget)
        $('#sf1-mt-text').text(maintarget);
        $('#sf1-en-text').text("GOAL");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed1-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed1-maintarget').style.background = "#" + orangeTeamColour;
        }
        maintarget = "";
      } else if (jEvent.data.event_name == "Shot") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        console.log('Statfeed 1 - shot by: ' + maintarget)
        $('#sf1-mt-text').text(maintarget);
        $('#sf1-en-text').text("SHOT");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed1-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed1-maintarget').style.background = "#" + orangeTeamColour;
        }
        maintarget = "";
      } else if (jEvent.data.event_name == "Save") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        console.log('Statfeed 1 - save by: ' + maintarget)
        $('#sf1-mt-text').text(maintarget);
        $('#sf1-en-text').text("SAVE");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed1-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed1-maintarget').style.background = "#" + orangeTeamColour;
        }
        maintarget = "";
      } else if (jEvent.data.event_name == "EpicSave") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        console.log('Statfeed 1 - epic save by: ' + maintarget)
        $('#sf1-mt-text').text(maintarget);
        $('#sf1-en-text').text("EPIC SAVE");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed1-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed1-maintarget').style.background = "#" + orangeTeamColour;
        }
        maintarget = "";
      } else if (jEvent.data.event_name == "Demolish") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        var secondarytarget = jEvent.data.secondary_target.name.toUpperCase();
        console.log('Statfeed 1 - demo on ' + maintarget + "by " + secondarytarget)
        $('#sf1-mt-text').text(maintarget);
        $('#sf1-en-text').text("DEMO");
        $('#sf1-st-text').text(secondarytarget);
        document.getElementById('statfeed1-maintarget').style.width = "150px";
        document.getElementById('statfeed1-maintarget').style.minWidth = "150px";
        document.getElementById('statfeed1-maintarget').style.maxWidth = "150px";
        document.getElementById('statfeed1-secondarytarget').style.width = "150px";
        document.getElementById('statfeed1-secondarytarget').style.minWidth = "150px";
        document.getElementById('statfeed1-secondarytarget').style.maxWidth = "150px";
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed1-maintarget').style.background = "#" + blueTeamColour;
          document.getElementById('statfeed1-secondarytarget').style.background = "#" + orangeTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed1-maintarget').style.background = "#" + orangeTeamColour;
          document.getElementById('statfeed1-secondarytarget').style.background = "#" + blueTeamColour;
        }
        maintarget = "";
        secondarytarget = "";
      } else if (jEvent.data.event_name == "Win") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        console.log('Statfeed 1 - Win for ' + maintarget)
        $('#sf1-mt-text').text(maintarget);
        $('#sf1-en-text').text("WIN");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed1-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed1-maintarget').style.background = "#" + orangeTeamColour;
        }
        maintarget = "";
      } else if (jEvent.data.event_name == "MVP") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        $('#sf1-mt-text').text(maintarget);
        $('#sf1-en-text').text("MVP");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed1-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed1-maintarget').style.background = "#" + orangeTeamColour;
        } console.log('Statfeed 1 - MVP for ' + maintarget)
        maintarget = "";
      } else {
        console.log("Statfeed 1 - other")
      }
      setTimeout(function () {
        statfeed1 = "";
        console.log("clearing statfeed 1")
        $("#statfeed1").addClass('statfeedOut');
        setTimeout(function () {
          document.getElementById("statfeed1").style.opacity = "0";
          $("#statfeed1").removeClass('statfeedOut');
        }, 1000)
        $('#sf1-mt-text').text("");
        $('#sf1-en-text').text("");
        $('#sf1-st-text').text("");
        document.getElementById('statfeed1-maintarget').style.width = "300px";
        document.getElementById('statfeed1-maintarget').style.minWidth = "300px";
        document.getElementById('statfeed1-maintarget').style.maxWidth = "300px";
        document.getElementById('statfeed1-secondarytarget').style.width = "0px";
        document.getElementById('statfeed1-secondarytarget').style.minWidth = "0px";
        document.getElementById('statfeed1-secondarytarget').style.maxWidth = "0px";
        document.getElementById('statfeed1-secondarytarget').style.background = "#262626";
      }, 4000)
      break determineStatPosition;
    }
    else if (statfeed2 == "") {
      statfeed2 = jEvent.data;
      document.getElementById("statfeed2").style.opacity = "1";
      $("#statfeed2").addClass('statfeedIn');
      setTimeout(function () {
        $("#statfeed2").removeClass('statfeedIn');
      }, 1000)
      if (jEvent.data.event_name == "Assist") {
        var assister = jEvent.data.main_target.name.toUpperCase();
        console.log('Statfeed 2 - assist by: ' + assister)
        $('#assister').removeClass('invisible');
        $('#assister-name').text(assister);
        $('#sf2-mt-text').text(assister);
        $('#sf2-en-text').text("ASSIST");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed2-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed2-maintarget').style.background = "#" + orangeTeamColour;
        }
        assister = "";
      } else if (jEvent.data.event_name == "Goal") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        console.log('Statfeed 2 - goal by: ' + maintarget)
        $('#sf2-mt-text').text(maintarget);
        $('#sf2-en-text').text("GOAL");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed2-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed2-maintarget').style.background = "#" + orangeTeamColour;
        }
        maintarget = "";
      } else if (jEvent.data.event_name == "Shot") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        console.log('Statfeed 2 - shot by: ' + maintarget)
        $('#sf2-mt-text').text(maintarget);
        $('#sf2-en-text').text("SHOT");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed2-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed2-maintarget').style.background = "#" + orangeTeamColour;
        }
        maintarget = "";
      } else if (jEvent.data.event_name == "Save") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        console.log('Statfeed 2 - save by: ' + maintarget)
        $('#sf2-mt-text').text(maintarget);
        $('#sf2-en-text').text("SAVE");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed2-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed2-maintarget').style.background = "#" + orangeTeamColour;
        }
        maintarget = "";
      } else if (jEvent.data.event_name == "EpicSave") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        console.log('Statfeed 2 - epic save by: ' + maintarget)
        $('#sf2-mt-text').text(maintarget);
        $('#sf2-en-text').text("EPIC SAVE");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed2-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed2-maintarget').style.background = "#" + orangeTeamColour;
        }
        maintarget = "";
      } else if (jEvent.data.event_name == "Demolish") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        var secondarytarget = jEvent.data.secondary_target.name.toUpperCase();
        console.log('Statfeed 2 - demo on ' + maintarget + " by " + secondarytarget)
        $('#sf2-mt-text').text(maintarget);
        $('#sf2-en-text').text("DEMO");
        $('#sf2-st-text').text(secondarytarget);
        document.getElementById('statfeed2-maintarget').style.width = "150px";
        document.getElementById('statfeed2-maintarget').style.minWidth = "150px";
        document.getElementById('statfeed2-maintarget').style.maxWidth = "150px";
        document.getElementById('statfeed2-secondarytarget').style.width = "150px";
        document.getElementById('statfeed2-secondarytarget').style.minWidth = "150px";
        document.getElementById('statfeed2-secondarytarget').style.maxWidth = "150px";
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed2-maintarget').style.background = "#" + blueTeamColour;
          document.getElementById('statfeed2-secondarytarget').style.background = "#" + orangeTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed2-maintarget').style.background = "#" + orangeTeamColour;
          document.getElementById('statfeed2-secondarytarget').style.background = "#" + blueTeamColour;
        }
        maintarget = "";
        secondarytarget = "";
      } else if (jEvent.data.event_name == "Win") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        console.log('Statfeed 2 - Win for ' + maintarget)
        $('#sf2-mt-text').text(maintarget);
        $('#sf2-en-text').text("WIN");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed2-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed2-maintarget').style.background = "#" + orangeTeamColour;
        }
        maintarget = "";
      } else if (jEvent.data.event_name == "MVP") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        $('#sf2-mt-text').text(maintarget);
        $('#sf2-en-text').text("MVP");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed2-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed2-maintarget').style.background = "#" + orangeTeamColour;
        }
        console.log('Statfeed 2 - MVP for ' + maintarget)
        maintarget = "";
      } else {
        console.log("Statfeed 2 - other")
      }
      setTimeout(function () {
        statfeed2 = "";
        console.log("clearing statfeed 2")
        $("#statfeed2").addClass('statfeedOut');
        setTimeout(function () {
          $("#statfeed2").removeClass('statfeedOut');
          document.getElementById("statfeed2").style.opacity = "0";
        }, 1000)
        $('#sf2-mt-text').text("");
        $('#sf2-en-text').text("");
        $('#sf2-st-text').text("");
        document.getElementById('statfeed2-maintarget').style.width = "300px";
        document.getElementById('statfeed2-maintarget').style.minWidth = "300px";
        document.getElementById('statfeed2-maintarget').style.maxWidth = "300px";
        document.getElementById('statfeed2-secondarytarget').style.width = "0px";
        document.getElementById('statfeed2-secondarytarget').style.minWidth = "0px";
        document.getElementById('statfeed2-secondarytarget').style.maxWidth = "0px";
        document.getElementById('statfeed2-secondarytarget').style.background = "#262626";
      }, 4000)
      break determineStatPosition;
    } else if (statfeed3 == "") {
      statfeed3 = jEvent.data;
      document.getElementById("statfeed3").style.opacity = "1";
      $("#statfeed3").addClass('statfeedIn');
      setTimeout(function () {
        $("#statfeed3").removeClass('statfeedIn');
      }, 1000)
      if (jEvent.data.event_name == "Assist") {
        var assister = jEvent.data.main_target.name.toUpperCase();
        console.log('Statfeed 3 - assist by: ' + assister)
        $('#assister').removeClass('invisible');
        $('#assister-name').text(assister);
        $('#sf3-mt-text').text(assister);
        $('#sf3-en-text').text("ASSIST");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed3-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed3-maintarget').style.background = "#" + orangeTeamColour;
        }
        assister = "";
      } else if (jEvent.data.event_name == "Goal") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        console.log('Statfeed 3 - goal by: ' + maintarget)
        $('#sf3-mt-text').text(maintarget);
        $('#sf3-en-text').text("GOAL");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed3-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed3-maintarget').style.background = "#" + orangeTeamColour;
        }
        maintarget = "";
      } else if (jEvent.data.event_name == "Shot") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        console.log('Statfeed 3 - shot by: ' + maintarget)
        $('#sf3-mt-text').text(maintarget);
        $('#sf3-en-text').text("SHOT");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed3-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed3-maintarget').style.background = "#" + orangeTeamColour;
        }
        maintarget = "";
      } else if (jEvent.data.event_name == "Save") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        console.log('Statfeed 3 - save by: ' + maintarget)
        $('#sf3-mt-text').text(maintarget);
        $('#sf3-en-text').text("SAVE");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed3-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed3-maintarget').style.background = "#" + orangeTeamColour;
        }
        maintarget = "";
      } else if (jEvent.data.event_name == "EpicSave") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        console.log('Statfeed 3 - epic save by: ' + maintarget)
        $('#sf3-mt-text').text(maintarget);
        $('#sf3-en-text').text("EPIC SAVE");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed3-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed3-maintarget').style.background = "#" + orangeTeamColour;
        }
        maintarget = "";
      } else if (jEvent.data.event_name == "Demolish") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        var secondarytarget = jEvent.data.secondary_target.name.toUpperCase();
        console.log('Statfeed 3 - demo on ' + maintarget + "by " + secondarytarget)
        $('#sf3-mt-text').text(maintarget);
        $('#sf3-en-text').text("DEMO");
        $('#sf3-st-text').text(secondarytarget);
        document.getElementById('statfeed3-maintarget').style.width = "150px";
        document.getElementById('statfeed3-maintarget').style.minWidth = "150px";
        document.getElementById('statfeed3-maintarget').style.maxWidth = "150px";
        document.getElementById('statfeed3-secondarytarget').style.width = "150px";
        document.getElementById('statfeed3-secondarytarget').style.minWidth = "150px";
        document.getElementById('statfeed3-secondarytarget').style.maxWidth = "150px";
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed3-maintarget').style.background = "#" + blueTeamColour;
          document.getElementById('statfeed3-secondarytarget').style.background = "#" + orangeTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed3-maintarget').style.background = "#" + orangeTeamColour;
          document.getElementById('statfeed3-secondarytarget').style.background = "#" + blueTeamColour;
        }
        maintarget = "";
        secondarytarget = "";
      } else if (jEvent.data.event_name == "Win") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        console.log('Statfeed 3 - Win for ' + maintarget)
        $('#sf3-mt-text').text(maintarget);
        $('#sf3-en-text').text("WIN");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed3-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed3-maintarget').style.background = "#" + orangeTeamColour;
        }
        maintarget = "";
      } else if (jEvent.data.event_name == "MVP") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        $('#sf3-mt-text').text(maintarget);
        $('#sf3-en-text').text("MVP");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed3-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed3-maintarget').style.background = "#" + orangeTeamColour;
        } console.log('Statfeed 3 - MVP for ' + maintarget)
        maintarget = "";
      } else {
        console.log("Statfeed 3 - other")
      }
      setTimeout(function () {
        statfeed3 = "";
        console.log("clearing statfeed 3")
        $("#statfeed3").addClass('statfeedOut');
        setTimeout(function () {
          document.getElementById("statfeed3").style.opacity = "0";
          $("#statfeed3").removeClass('statfeedOut');
        }, 1000)
        $('#sf3-mt-text').text("");
        $('#sf3-en-text').text("");
        $('#sf3-st-text').text("");
        document.getElementById('statfeed3-maintarget').style.width = "300px";
        document.getElementById('statfeed3-maintarget').style.minWidth = "300px";
        document.getElementById('statfeed3-maintarget').style.maxWidth = "300px";
        document.getElementById('statfeed3-secondarytarget').style.width = "0px";
        document.getElementById('statfeed3-secondarytarget').style.minWidth = "0px";
        document.getElementById('statfeed3-secondarytarget').style.maxWidth = "0px";
        document.getElementById('statfeed3-secondarytarget').style.background = "#262626";
      }, 4000)
      break determineStatPosition;
    } else if (statfeed4 == "") {
      statfeed4 = jEvent.data;
      document.getElementById("statfeed4").style.opacity = "1";
      $("#statfeed4").addClass('statfeedIn');
      setTimeout(function () {
        $("#statfeed4").removeClass('statfeedIn');
      }, 1000)
      if (jEvent.data.event_name == "Assist") {
        var assister = jEvent.data.main_target.name.toUpperCase();
        console.log('Statfeed 4 - assist by: ' + assister)
        $('#assister').removeClass('invisible');
        $('#assister-name').text(assister);
        $('#sf4-mt-text').text(assister);
        $('#sf4-en-text').text("ASSIST");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed4-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed4-maintarget').style.background = "#" + orangeTeamColour;
        }
        assister = "";
      } else if (jEvent.data.event_name == "Goal") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        console.log('Statfeed 4 - goal by: ' + maintarget)
        $('#sf4-mt-text').text(maintarget);
        $('#sf4-en-text').text("GOAL");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed4-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed4-maintarget').style.background = "#" + orangeTeamColour;
        }
        maintarget = "";
      } else if (jEvent.data.event_name == "Shot") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        console.log('Statfeed 4 - shot by: ' + maintarget)
        $('#sf4-mt-text').text(maintarget);
        $('#sf4-en-text').text("SHOT");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed4-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed4-maintarget').style.background = "#" + orangeTeamColour;
        }
        maintarget = "";
      } else if (jEvent.data.event_name == "Save") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        console.log('Statfeed 4 - save by: ' + maintarget)
        $('#sf4-mt-text').text(maintarget);
        $('#sf4-en-text').text("SAVE");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed4-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed4-maintarget').style.background = "#" + orangeTeamColour;
        }
        maintarget = "";
      } else if (jEvent.data.event_name == "EpicSave") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        console.log('Statfeed 4 - epic save by: ' + maintarget)
        $('#sf4-mt-text').text(maintarget);
        $('#sf4-en-text').text("EPIC SAVE");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed4-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed4-maintarget').style.background = "#" + orangeTeamColour;
        }
        maintarget = "";
      } else if (jEvent.data.event_name == "Demolish") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        var secondarytarget = jEvent.data.secondary_target.name.toUpperCase();
        console.log('Statfeed 4 - demo on ' + maintarget + "by " + secondarytarget)
        $('#sf4-mt-text').text(maintarget);
        $('#sf4-en-text').text("DEMO");
        $('#sf4-st-text').text(secondarytarget);
        document.getElementById('statfeed4-maintarget').style.width = "150px";
        document.getElementById('statfeed4-maintarget').style.minWidth = "150px";
        document.getElementById('statfeed4-maintarget').style.maxWidth = "150px";
        document.getElementById('statfeed4-secondarytarget').style.width = "150px";
        document.getElementById('statfeed4-secondarytarget').style.minWidth = "150px";
        document.getElementById('statfeed4-secondarytarget').style.maxWidth = "150px";
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed4-maintarget').style.background = "#" + blueTeamColour;
          document.getElementById('statfeed4-secondarytarget').style.background = "#" + orangeTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed4-maintarget').style.background = "#" + orangeTeamColour;
          document.getElementById('statfeed4-secondarytarget').style.background = "#" + blueTeamColour;
        }
        maintarget = "";
        secondarytarget = "";
      } else if (jEvent.data.event_name == "Win") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        console.log('Statfeed 4 - Win for ' + maintarget)
        $('#sf4-mt-text').text(maintarget);
        $('#sf4-en-text').text("WIN");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed4-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed4-maintarget').style.background = "#" + orangeTeamColour;
        }
        maintarget = "";
      } else if (jEvent.data.event_name == "MVP") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        $('#sf4-mt-text').text(maintarget);
        $('#sf4-en-text').text("MVP");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed4-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed4-maintarget').style.background = "#" + orangeTeamColour;
        } console.log('Statfeed 4 - MVP for ' + maintarget)
        maintarget = "";
      } else {
        console.log("Statfeed 4 - other")
      }
      setTimeout(function () {
        statfeed4 = "";
        console.log("clearing statfeed 4")
        $("#statfeed4").addClass('statfeedOut');
        setTimeout(function () {
          document.getElementById("statfeed4").style.opacity = "0";
          $("#statfeed4").removeClass('statfeedOut');
        }, 1000)
        $('#sf4-mt-text').text("");
        $('#sf4-en-text').text("");
        $('#sf4-st-text').text("");
        document.getElementById('statfeed4-maintarget').style.width = "300px";
        document.getElementById('statfeed4-maintarget').style.minWidth = "300px";
        document.getElementById('statfeed4-maintarget').style.maxWidth = "300px";
        document.getElementById('statfeed4-secondarytarget').style.width = "0px";
        document.getElementById('statfeed4-secondarytarget').style.minWidth = "0px";
        document.getElementById('statfeed4-secondarytarget').style.maxWidth = "0px";
        document.getElementById('statfeed4-secondarytarget').style.background = "#262626";
      }, 4000)
      break determineStatPosition;
    } else if (statfeed5 == "") {
      statfeed5 = jEvent.data;
      document.getElementById("statfeed5").style.opacity = "1";
      $("#statfeed5").addClass('statfeedIn');
      setTimeout(function () {
        $("#statfeed5").removeClass('statfeedIn');
      }, 1000)
      if (jEvent.data.event_name == "Assist") {
        var assister = jEvent.data.main_target.name.toUpperCase();
        console.log('Statfeed 5 - assist by: ' + assister)
        $('#assister').removeClass('invisible');
        $('#assister-name').text(assister);
        $('#sf5-mt-text').text(assister);
        $('#sf5-en-text').text("ASSIST");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed5-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed5-maintarget').style.background = "#" + orangeTeamColour;
        }
        assister = "";
      } else if (jEvent.data.event_name == "Goal") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        console.log('Statfeed 5 - goal by: ' + maintarget)
        $('#sf5-mt-text').text(maintarget);
        $('#sf5-en-text').text("GOAL");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed5-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed5-maintarget').style.background = "#" + orangeTeamColour;
        }
        maintarget = "";
      } else if (jEvent.data.event_name == "Shot") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        console.log('Statfeed 5 - shot by: ' + maintarget)
        $('#sf5-mt-text').text(maintarget);
        $('#sf5-en-text').text("SHOT");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed5-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed5-maintarget').style.background = "#" + orangeTeamColour;
        }
        maintarget = "";
      } else if (jEvent.data.event_name == "Save") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        console.log('Statfeed 5 - save by: ' + maintarget)
        $('#sf5-mt-text').text(maintarget);
        $('#sf5-en-text').text("SAVE");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed5-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed5-maintarget').style.background = "#" + orangeTeamColour;
        }
        maintarget = "";
      } else if (jEvent.data.event_name == "EpicSave") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        console.log('Statfeed 5 - epic save by: ' + maintarget)
        $('#sf5-mt-text').text(maintarget);
        $('#sf5-en-text').text("EPIC SAVE");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed5-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed5-maintarget').style.background = "#" + orangeTeamColour;
        }
        maintarget = "";
      } else if (jEvent.data.event_name == "Demolish") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        var secondarytarget = jEvent.data.secondary_target.name.toUpperCase();
        console.log('Statfeed 5 - demo on ' + maintarget + "by " + secondarytarget)
        $('#sf5-mt-text').text(maintarget);
        $('#sf5-en-text').text("DEMO");
        $('#sf5-st-text').text(secondarytarget);
        document.getElementById('statfeed5-maintarget').style.width = "150px";
        document.getElementById('statfeed5-maintarget').style.minWidth = "150px";
        document.getElementById('statfeed5-maintarget').style.maxWidth = "150px";
        document.getElementById('statfeed5-secondarytarget').style.width = "150px";
        document.getElementById('statfeed5-secondarytarget').style.minWidth = "150px";
        document.getElementById('statfeed5-secondarytarget').style.maxWidth = "150px";
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed5-maintarget').style.background = "#" + blueTeamColour;
          document.getElementById('statfeed5-secondarytarget').style.background = "#" + orangeTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed5-maintarget').style.background = "#" + orangeTeamColour;
          document.getElementById('statfeed5-secondarytarget').style.background = "#" + blueTeamColour;
        }
        maintarget = "";
        secondarytarget = "";
      } else if (jEvent.data.event_name == "Win") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        console.log('Statfeed 5 - Win for ' + maintarget)
        $('#sf5-mt-text').text(maintarget);
        $('#sf5-en-text').text("WIN");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed5-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed5-maintarget').style.background = "#" + orangeTeamColour;
        }
        maintarget = "";
      } else if (jEvent.data.event_name == "MVP") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        $('#sf5-mt-text').text(maintarget);
        $('#sf5-en-text').text("MVP");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed5-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed5-maintarget').style.background = "#" + orangeTeamColour;
        } console.log('Statfeed 5 - MVP for ' + maintarget)
        maintarget = "";
      } else {
        console.log("Statfeed 5 - other")
      }
      setTimeout(function () {
        statfeed5 = "";
        console.log("clearing statfeed 5")
        $("#statfeed5").addClass('statfeedOut');
        setTimeout(function () {
          document.getElementById("statfeed5").style.opacity = "0";
          $("#statfeed5").removeClass('statfeedOut');
        }, 1000)
        $('#sf5-mt-text').text("");
        $('#sf5-en-text').text("");
        $('#sf5-st-text').text("");
        document.getElementById('statfeed5-maintarget').style.width = "300px";
        document.getElementById('statfeed5-maintarget').style.minWidth = "300px";
        document.getElementById('statfeed5-maintarget').style.maxWidth = "300px";
        document.getElementById('statfeed5-secondarytarget').style.width = "0px";
        document.getElementById('statfeed5-secondarytarget').style.minWidth = "0px";
        document.getElementById('statfeed5-secondarytarget').style.maxWidth = "0px";
        document.getElementById('statfeed5-secondarytarget').style.background = "#262626";
      }, 4000)
      break determineStatPosition;
    } else if (statfeed6 == "") {
      statfeed6 = jEvent.data;
      document.getElementById("statfeed6").style.opacity = "1";
      $("#statfeed6").addClass('statfeedIn');
      setTimeout(function () {
        $("#statfeed6").removeClass('statfeedIn');
      }, 1000)
      if (jEvent.data.event_name == "Assist") {
        var assister = jEvent.data.main_target.name.toUpperCase();
        console.log('Statfeed 6 - assist by: ' + assister)
        $('#assister').removeClass('invisible');
        $('#assister-name').text(assister);
        $('#sf6-mt-text').text(assister);
        $('#sf6-en-text').text("ASSIST");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed6-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed6-maintarget').style.background = "#" + orangeTeamColour;
        }
        assister = "";
      } else if (jEvent.data.event_name == "Goal") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        console.log('Statfeed 6 - goal by: ' + maintarget)
        $('#sf6-mt-text').text(maintarget);
        $('#sf6-en-text').text("GOAL");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed6-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed6-maintarget').style.background = "#" + orangeTeamColour;
        }
        maintarget = "";
      } else if (jEvent.data.event_name == "Shot") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        console.log('Statfeed 6 - shot by: ' + maintarget)
        $('#sf6-mt-text').text(maintarget);
        $('#sf6-en-text').text("SHOT");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed6-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed6-maintarget').style.background = "#" + orangeTeamColour;
        }
        maintarget = "";
      } else if (jEvent.data.event_name == "Save") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        console.log('Statfeed 6 - save by: ' + maintarget)
        $('#sf6-mt-text').text(maintarget);
        $('#sf6-en-text').text("SAVE");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed6-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed6-maintarget').style.background = "#" + orangeTeamColour;
        }
        maintarget = "";
      } else if (jEvent.data.event_name == "EpicSave") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        console.log('Statfeed 6 - epic save by: ' + maintarget)
        $('#sf6-mt-text').text(maintarget);
        $('#sf6-en-text').text("EPIC SAVE");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed6-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed6-maintarget').style.background = "#" + orangeTeamColour;
        }
        maintarget = "";
      } else if (jEvent.data.event_name == "Demolish") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        var secondarytarget = jEvent.data.secondary_target.name.toUpperCase();
        console.log('Statfeed 6 - demo on ' + maintarget + "by " + secondarytarget)
        $('#sf6-mt-text').text(maintarget);
        $('#sf6-en-text').text("DEMO");
        $('#sf6-st-text').text(secondarytarget);
        document.getElementById('statfeed6-maintarget').style.width = "150px";
        document.getElementById('statfeed6-maintarget').style.minWidth = "150px";
        document.getElementById('statfeed6-maintarget').style.maxWidth = "150px";
        document.getElementById('statfeed6-secondarytarget').style.width = "150px";
        document.getElementById('statfeed6-secondarytarget').style.minWidth = "150px";
        document.getElementById('statfeed6-secondarytarget').style.maxWidth = "150px";
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed6-maintarget').style.background = "#" + blueTeamColour;
          document.getElementById('statfeed6-secondarytarget').style.background = "#" + orangeTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed6-maintarget').style.background = "#" + orangeTeamColour;
          document.getElementById('statfeed6-secondarytarget').style.background = "#" + blueTeamColour;
        }
        maintarget = "";
        secondarytarget = "";
      } else if (jEvent.data.event_name == "Win") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        console.log('Statfeed 6 - Win for ' + maintarget)
        $('#sf6-mt-text').text(maintarget);
        $('#sf6-en-text').text("WIN");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed6-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed6-maintarget').style.background = "#" + orangeTeamColour;
        }
        maintarget = "";
      } else if (jEvent.data.event_name == "MVP") {
        var maintarget = jEvent.data.main_target.name.toUpperCase();
        $('#sf6-mt-text').text(maintarget);
        $('#sf6-en-text').text("MVP");
        if (jEvent.data.main_target.team_num == '0') {
          document.getElementById('statfeed6-maintarget').style.background = "#" + blueTeamColour;
        } else if (jEvent.data.main_target.team_num == '1') {
          document.getElementById('statfeed6-maintarget').style.background = "#" + orangeTeamColour;
        } console.log('Statfeed 6 - MVP for ' + maintarget)
        maintarget = "";
      } else {
        console.log("Statfeed 6 - other")
      }
      setTimeout(function () {
        statfeed6 = "";
        console.log("clearing statfeed 6")
        $("#statfeed6").addClass('statfeedOut');
        setTimeout(function () {
          document.getElementById("statfeed6").style.opacity = "0";
          $("#statfeed6").removeClass('statfeedOut');
        }, 1000)
        $('#sf6-mt-text').text("");
        $('#sf6-en-text').text("");
        $('#sf6-st-text').text("");
        document.getElementById('statfeed6-maintarget').style.width = "300px";
        document.getElementById('statfeed6-maintarget').style.minWidth = "300px";
        document.getElementById('statfeed6-maintarget').style.maxWidth = "300px";
        document.getElementById('statfeed6-secondarytarget').style.width = "0px";
        document.getElementById('statfeed6-secondarytarget').style.minWidth = "0px";
        document.getElementById('statfeed6-secondarytarget').style.maxWidth = "0px";
        document.getElementById('statfeed6-secondarytarget').style.background = "#262626";
      }, 4000)
      break determineStatPosition;
    }
  }
  // DETECT WHEN GOAL REPLAY STARTS TO DISPLAY REPLAY INTERFACE
  else if (jEvent.event == "game:replay_start") {
    console.log('replay started')
    $('#goal-replay').removeClass('invisible');
    $('#goal-info-table').removeClass('invisible');
    document.getElementById('replay-banner').style.opacity = "1";
    document.getElementById('replay-banner').style.animationName = "replayIn";
    setTimeout(function () {
      document.getElementById('replay-banner').style.animationName = "";
    }, 1000)
  } else if (jEvent.event == "game:replay_end") {
    console.log('replay ended')
    document.getElementById('replay-banner').style.animationName = "replayOut";
    setTimeout(function () {
      document.getElementById('replay-banner').style.animationName = "";
      document.getElementById('replay-banner').style.opacity = "0";
      $('#goal-replay').addClass('invisible');
    }, 1000)
    $('#goal-info-table').addClass('invisible');
    $('#assister').addClass('invisible');
  }
  else if (jEvent.event == "game:replay_will_end") {
    setTimeout(function () {
      //stinger.removeClass('invisible')
      //stinger.play();
    }, 1900)
  }
  // OTHER EVENTS
  else if (jEvent.event == "game:match_destroyed") {
    console.log('match destroyed')
    statfeed1 = "";
    statfeed2 = "";
    statfeed3 = "";
    statfeed4 = "";
    statfeed5 = "";
    statfeed6 = "";
    document.getElementById("statfeed1").style.opacity = "0";
    document.getElementById("statfeed2").style.opacity = "0";
    document.getElementById("statfeed3").style.opacity = "0";
    document.getElementById("statfeed4").style.opacity = "0";
    document.getElementById("statfeed5").style.opacity = "0";
    document.getElementById("statfeed6").style.opacity = "0";
    //$('#main-ui').addClass('invisible');
    //$('#blueTeam').addClass('invisible');
    //$('#orangeTeam').addClass('invisible');
    blueResetAll()
    orangeResetAll()
  }
  else if (jEvent.event == "game:match_created") {
    console.log('new match')
    gameStarted = 0;
    statfeed1 = "";
    statfeed2 = "";
    statfeed3 = "";
    statfeed4 = "";
    statfeed5 = "";
    statfeed6 = "";
    document.getElementById("statfeed1").style.opacity = "0";
    document.getElementById("statfeed2").style.opacity = "0";
    document.getElementById("statfeed3").style.opacity = "0";
    document.getElementById("statfeed4").style.opacity = "0";
    document.getElementById("statfeed5").style.opacity = "0";
    document.getElementById("statfeed6").style.opacity = "0";
    document.getElementById('scorebug-div').style.opacity = "0";
    document.getElementById('blueTeam').style.opacity = "0";
    document.getElementById('orangeTeam').style.opacity = "0";
    $('#blue-team-name-text').text(blueName)
    $('#orange-team-name-text').text(orangeName)
  }
  else if (jEvent.event == "game:pre_countdown_begin") {
    document.body.style.background = "none";
    document.getElementById('post-game-scores').style.opacity = "0";/*
    if (gameStarted == 0) {
      document.getElementById('scorebug-div').style.opacity = "0";
      document.getElementById('blueTeam').style.opacity = "0";
      document.getElementById('orangeTeam').style.opacity = "0";
    }
    
    $('#post-game-scores').addClass('invisible');
    $('#rl-logo').addClass('invisible');
    $('#end-scorebug-div').addClass('invisible');*/
    console.log('countdown beginning')
    finalBlueName = blueName;
    finalOrangeName = orangeName;
    $('#blue-name-endscoreboard').text(finalBlueName)
    $('#orange-name-endscoreboard').text(finalOrangeName)
    /*
    if (gameStarted == 1) {
      setTimeout(function() {
        gameStarted = 1;
        console.log("animating overlay")
        document.getElementById('scorebug-div').style.opacity = "1";
        document.getElementById('scorebug-div').style.animationName = "scorebugIn";
        document.getElementById('blueTeam').style.opacity = "1";
        document.getElementById('orangeTeam').style.opacity = "1";
        document.getElementById('blueTeam').style.animationName = "bluePlayersIn";
        document.getElementById('orangeTeam').style.animationName = "orangePlayersIn";
      },1000)
    }*/
  }
  else if (jEvent.event == "game:post_countdown_begin") {
    console.log('countdown ending')


  }
  else if (jEvent.event == "game:round_started_go") {
    console.log('kickoff')
    isLive = 1;
  }
  else if (jEvent.event == "game:initialized") {
    console.log('game initialised')
    gameStarted = 0;
    document.getElementById('blueTeam').style.opacity = "0";
    document.getElementById('orangeTeam').style.opacity = "0";
    document.getElementById('scorebug-div').style.opacity = "0";
    document.getElementById('league-logo').style.opacity = "0";
    document.getElementById('blueTeam').style.animationName = "";
    document.getElementById('orangeTeam').style.animationName = "";
    document.getElementById('scorebug-div').style.animationName = "";
    setTimeout(function () {
      gameStarted = 1;
      console.log("animating overlay on")
      //$('#main-ui').removeClass('invisible');
      //$('#blueTeam').removeClass('invisible');
      //$('#orangeTeam').removeClass('invisible');
      document.getElementById('scorebug-div').style.opacity = "1";
      document.getElementById('league-logo').style.opacity = "1";
      document.getElementById('scorebug-div').style.animationName = "scorebugIn";
      document.getElementById('league-logo').style.animationName = "leagueLogoIn";
      document.getElementById('blueTeam').style.opacity = "1";
      document.getElementById('orangeTeam').style.opacity = "1";
      document.getElementById('blue-player-3').style.opacity = "0";
      document.getElementById('blue-player-2').style.opacity = "0";
      document.getElementById('blue-player-1').style.opacity = "0";
      document.getElementById('orange-player-3').style.opacity = "0";
      document.getElementById('orange-player-2').style.opacity = "0";
      document.getElementById('orange-player-1').style.opacity = "0";
      console.log("moving teams in from sides - b: " + document.getElementById('blueTeam').style.opacity + " , o: " + document.getElementById('orangeTeam').style.opacity);
      setTimeout(function () {
        document.getElementById('blue-player-1').style.animationName = "bluePlayersIn";
        document.getElementById('blue-player-1').style.opacity = "1";
        document.getElementById('orange-player-1').style.animationName = "orangePlayersIn";
        document.getElementById('orange-player-1').style.opacity = "1";
        setTimeout(function () {
          document.getElementById('blue-player-2').style.animationName = "bluePlayersIn";
          document.getElementById('blue-player-2').style.opacity = "1";
          document.getElementById('orange-player-2').style.animationName = "orangePlayersIn";
          document.getElementById('orange-player-2').style.opacity = "1";
          setTimeout(function () {
            document.getElementById('blue-player-3').style.animationName = "bluePlayersIn";
            document.getElementById('blue-player-3').style.opacity = "1";
            document.getElementById('orange-player-3').style.animationName = "orangePlayersIn";
            document.getElementById('orange-player-3').style.opacity = "1";
          }, 333)
        }, 333)
      }, 1000)
      document.getElementById('orangeTeam').style.animationName = "orangePlayersIn";
    }, 1000)
  }
}