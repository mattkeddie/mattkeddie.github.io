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
var pendingBlueWin = 0;
var pendingOrangeWin = 0;

var seriesLength = "";
document.getElementById('final-seriesType').innerHTML = "BEST OF 5";
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

document.getElementById('final-gameNumber').innerHTML = blueWins + orangeWins;

var gameVoided = 0;


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

      if (gameTime < 300 && gameTime > 0) {
        gameStarted = 1;
      }



      //team names
      blueName = _.get(teamData, [0, 'name'])
      orangeName = _.get(teamData, [1, 'name'])

      if (blueName.length > 1 && orangeName.length > 1) {
        if (goalScored == 0) {
          $('#blue-name-endscoreboard').text(blueName)
          $('#orange-name-endscoreboard').text(orangeName)
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


      //colours
      blueTeamColour = _.get(teamData, [0, 'color_primary'])
      orangeTeamColour = _.get(teamData, [1, 'color_primary'])

      document.getElementById('blue-name-endscoreboard').style.background = "linear-gradient(90deg, #" + blueTeamColour + ", #262626 50%)";
      document.getElementById('blue-score-endscoreboard').style.background = "#" + blueTeamColour;
      document.getElementById('blue-name-endscoreboard').style.borderBottomColor = "#" + blueTeamColour;
      document.getElementById('blue-score-endscoreboard').style.borderBottomColor = "#" + blueTeamColour;

      document.getElementById('orange-name-endscoreboard').style.background = "linear-gradient(270deg, #" + orangeTeamColour + ", #262626 50%)";
      document.getElementById('orange-score-endscoreboard').style.background = "#" + orangeTeamColour;
      document.getElementById('orange-name-endscoreboard').style.borderBottomColor = "#" + orangeTeamColour;
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

      //all player logic
      var playerList = jEvent.data.players;
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
    document.getElementById('final-gameNumber').innerHTML = gameNumber;
  }

  // PREPARING FOR END OF GAME SCORES
  else if (jEvent.event == "game:match_ended") {
    console.log('match ended / podium')
    isLive = 0;
    finalBlueScore = blueScore;
    finalOrangeScore = orangeScore;
    finalBlueName = blueName;
    finalOrangeName = orangeName;
    $('#blue-name-endscoreboard').text(finalBlueName)
    $('#orange-name-endscoreboard').text(finalOrangeName)
    document.getElementById('final-gameNumber').innerHTML = gameNumber;
    gameVoided = 0;
    if (jEvent.data.winner_team_num == 0) {
      pendingBlueWin = 1;
    } else if (jEvent.data.winner_team_num == 1) {
      pendingOrangeWin = 1;
    }
  }

  else if (jEvent.event == "game:goal_scored") {
    isLive = 0;
  }

  else if (jEvent.event == "game:round_started_go") {
    isLive = 1;
  }

  else if (jEvent.event == "game:initialized") {
    console.log(blueWins + " - " + orangeWins);
    blueWins = pendingBlueWin + blueWins;
    orangeWins = pendingOrangeWin + orangeWins;
    pendingBlueWin = 0;
    pendingOrangeWin = 0;
    console.log(blueWins + " - " + orangeWins);
    gameNumber = blueWins + orangeWins + 1;
    console.log(gameNumber);
    document.getElementById('final-gameNumber').innerHTML = gameNumber;
    gameVoided = 1;
    o1ticks = 0;
    o2ticks = 0;
    o3ticks = 0;
    b1ticks = 0;
    b2ticks = 0;
    b3ticks = 0;
    o1totSpeed = 0;
    o2totSpeed = 0;
    o3totSpeed = 0;
    b1totSpeed = 0;
    b2totSpeed = 0;
    b3totSpeed = 0;
    o1avgSpeed = 0;
    o2avgSpeed = 0;
    o3avgSpeed = 0;
    b1avgSpeed = 0;
    b2avgSpeed = 0;
    b3avgSpeed = 0;

    blueTotalScore = 0;
    blueTotalGoals = 0;
    blueTotalAssists = 0;
    blueTotalSaves = 0;
    blueTotalShots = 0;
    blueTotalDemos = 0;
    blueTotalTouches = 0;

    orangeTotalScore = 0;
    orangeTotalGoals = 0;
    orangeTotalAssists = 0;
    orangeTotalSaves = 0;
    orangeTotalShots = 0;
    orangeTotalDemos = 0;
    orangeTotalTouches = 0;

  }
}
