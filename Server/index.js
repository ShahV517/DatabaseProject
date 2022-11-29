//Commands to create the server

const express = require('express');
const mysql = require('mysql');
const app = express();

// Create connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'hpk091397'// your password,
});

// Connect
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');

    // Drop previous database
    connection.query('DROP DATABASE IF EXISTS `BasketballUnited`', (err, result) => {
        if (err) throw err;
        console.log('Database dropped');
    });

    // Create new database
    connection.query('CREATE DATABASE IF NOT EXISTS BasketballUnited', (err, result) => {
        if (err) throw err;
        console.log(result);
    });

    // Use new database
    connection.query('USE BasketballUnited', (err, result) => {
        if (err) throw err;
        console.log(result);
    });

    // Create tables in new database

    // Create Teams table
    connection.query('CREATE TABLE IF NOT EXISTS Teams (TeamID INT NOT NULL AUTO_INCREMENT,TeamName VARCHAR(255) NOT NULL,City VARCHAR(255) NOT NULL,CoachName VARCHAR(255) NOT NULL,NumberOfWins INT NOT NULL,NumberOfLosses INT NOT NULL,PRIMARY KEY (TeamID),UNIQUE INDEX TeamID_UNIQUE (TeamID ASC) VISIBLE)', (err, result) => {
        if (err) throw err;
        console.log(result);
    });

    // Create Positions table
    connection.query('CREATE TABLE IF NOT EXISTS Positions (PositionID INT NOT NULL AUTO_INCREMENT,PositionName VARCHAR(255) NOT NULL,PRIMARY KEY (PositionID),UNIQUE INDEX PositionID_UNIQUE (PositionID ASC) VISIBLE,UNIQUE INDEX PositionName_UNIQUE (PositionName ASC) VISIBLE)', (err, result) => {
        if (err) throw err;
        console.log(result);
    });

    // Create Players table
    connection.query('CREATE TABLE IF NOT EXISTS Players (PlayerID INT NOT NULL AUTO_INCREMENT,PlayerName VARCHAR(255) NOT NULL,PlayerHeight INT NOT NULL,PlayerAge INT NOT NULL,PlayerWeight INT NOT NULL,PlayerWingspan INT NOT NULL,PlayerTeamID INT NOT NULL,PlayerPositionID INT NOT NULL,College VARCHAR(255) NOT NULL,JerseyNumber INT NOT NULL,Country VARCHAR(255) NOT NULL,InjuryStatus ENUM(\'Healthy\',\'Injured\') NOT NULL,PRIMARY KEY (PlayerID),UNIQUE INDEX PlayerID_UNIQUE (PlayerID ASC) VISIBLE,INDEX PlayerTeamID_idx (PlayerTeamID ASC) VISIBLE,INDEX PlayerPositionID_idx (PlayerPositionID ASC) VISIBLE,CONSTRAINT PlayerTeamID FOREIGN KEY (PlayerTeamID) REFERENCES Teams (TeamID) ON DELETE NO ACTION ON UPDATE NO ACTION,CONSTRAINT PlayerPositionID FOREIGN KEY (PlayerPositionID) REFERENCES Positions (PositionID) ON DELETE NO ACTION ON UPDATE NO ACTION)', (err, result) => {
        if (err) throw err;
        console.log(result);
    });

    // Create Referees table
    connection.query('CREATE TABLE IF NOT EXISTS Referees (RefereeID INT NOT NULL AUTO_INCREMENT,RefereeName VARCHAR(255) NOT NULL,PRIMARY KEY (RefereeID),UNIQUE INDEX RefereeID_UNIQUE (RefereeID ASC) VISIBLE)', (err, result) => {
        if (err) throw err;
        console.log(result);
    });

    // Create Games table
    connection.query('CREATE TABLE IF NOT EXISTS Games (GameID INT NOT NULL AUTO_INCREMENT,GameDate DATE NOT NULL,GameHomeTeamID INT NOT NULL,GameAwayTeamID INT NOT NULL,GameHomeTeamScore INT NOT NULL,GameAwayTeamScore INT NOT NULL,PRIMARY KEY (GameID),UNIQUE INDEX GameID_UNIQUE (GameID ASC) VISIBLE,INDEX GameHomeTeamID_idx (GameHomeTeamID ASC) VISIBLE,INDEX GameAwayTeamID_idx (GameAwayTeamID ASC) VISIBLE,CONSTRAINT GameHomeTeamID FOREIGN KEY (GameHomeTeamID) REFERENCES Teams (TeamID) ON DELETE NO ACTION ON UPDATE NO ACTION,CONSTRAINT GameAwayTeamID FOREIGN KEY (GameAwayTeamID) REFERENCES Teams (TeamID) ON DELETE NO ACTION ON UPDATE NO ACTION)', (err, result) => {
        if (err) throw err;
        console.log(result);
    });

    // Create GameReferees table
    connection.query('CREATE TABLE IF NOT EXISTS GameReferees (GameID INT NOT NULL,RefereeID1 INT NOT NULL,RefereeID2 INT NOT NULL,RefereeID3 INT NOT NULL,INDEX GameID_idx (GameID ASC) VISIBLE,INDEX RefereeID1_idx (RefereeID1 ASC) VISIBLE,INDEX RefereeID2_idx (RefereeID2 ASC) VISIBLE,INDEX RefereeID3_idx (RefereeID3 ASC) VISIBLE,CONSTRAINT GameID FOREIGN KEY (GameID) REFERENCES Games (GameID) ON DELETE NO ACTION ON UPDATE NO ACTION,CONSTRAINT RefereeID1 FOREIGN KEY (RefereeID1) REFERENCES Referees (RefereeID) ON DELETE NO ACTION ON UPDATE NO ACTION,CONSTRAINT RefereeID2 FOREIGN KEY (RefereeID2) REFERENCES Referees (RefereeID) ON DELETE NO ACTION ON UPDATE NO ACTION,CONSTRAINT RefereeID3 FOREIGN KEY (RefereeID3) REFERENCES Referees (RefereeID) ON DELETE NO ACTION ON UPDATE NO ACTION)', (err, result) => {
        if (err) throw err;
        console.log(result);
    });

    // Create GameLog table
    connection.query('CREATE TABLE IF NOT EXISTS GameLog (GameID INT NOT NULL,PlayerID INT NOT NULL,MinutesPlayed INT NOT NULL,Points INT NOT NULL,Rebounds INT NOT NULL,Assists INT NOT NULL,Steals INT NOT NULL,Blocks INT NOT NULL,Turnovers INT NOT NULL,Fouls INT NOT NULL,SeasonYear INT NOT NULL,INDEX GameID_idx (GameID ASC) VISIBLE,INDEX PlayerID_idx (PlayerID ASC) VISIBLE,CONSTRAINT GameLogID FOREIGN KEY (GameID) REFERENCES Games (GameID) ON DELETE NO ACTION ON UPDATE NO ACTION,CONSTRAINT PlayerID FOREIGN KEY (PlayerID) REFERENCES Players (PlayerID) ON DELETE NO ACTION ON UPDATE NO ACTION)', (err, result) => {
        if (err) throw err;
        console.log(result);
    });

    // Create Accolades table
    connection.query('CREATE TABLE IF NOT EXISTS Accolades (AccoladeID INT NOT NULL AUTO_INCREMENT,AccoladeName VARCHAR(255) NOT NULL,AccoladeDescription VARCHAR(255) NOT NULL,PRIMARY KEY (AccoladeID),UNIQUE INDEX AccoladeID_UNIQUE (AccoladeID ASC) VISIBLE,UNIQUE INDEX AccoladeName_UNIQUE (AccoladeName ASC) VISIBLE)', (err, result) => {
        if (err) throw err;
        console.log(result);
    });

    // Create AwardsBySeason table
    connection.query('CREATE TABLE IF NOT EXISTS AwardsBySeason (AccoladeID INT NOT NULL,PlayerID INT NOT NULL,SeasonYear INT NOT NULL,INDEX AccoladeID_idx (AccoladeID ASC) VISIBLE,INDEX PlayerID_idx (PlayerID ASC) VISIBLE,CONSTRAINT AccoladeID FOREIGN KEY (AccoladeID) REFERENCES Accolades (AccoladeID) ON DELETE NO ACTION ON UPDATE NO ACTION,CONSTRAINT AwardedPlayerID FOREIGN KEY (PlayerID) REFERENCES Players (PlayerID) ON DELETE NO ACTION ON UPDATE NO ACTION)', (err, result) => {
        if (err) throw err;
        console.log(result);
    });


    // Insert data into tables

    // Insert data into Positions table
    var positions = [
        ['Point Guard'],
        ['Shooting Guard'],
        ['Small Forward'],
        ['Power Forward'],
        ['Center']
    ];
    connection.query('INSERT INTO Positions (PositionName) VALUES ?', [positions], (err, result) => {
        if (err) throw err;
        console.log(result);
    });

    // Insert data into Teams table
    var teams = [
        ['Hawks', 'Atlanta', 'Nate McMillan', 43, 39],
        ['Celtics', 'Boston', 'Brad Stevens', 49, 33],
        ['Nets', 'Brooklyn', 'Kenny Atkinson', 42, 40],
        ['Hornets', 'Charlotte', 'James Borrego', 39, 43],
        ['Bulls', 'Chicago', 'Jim Boylen', 22, 60],
        ['Cavaliers', 'Cleveland', 'John Beilein', 19, 63],
        ['Mavericks', 'Dallas', 'Rick Carlisle', 42, 40],
        ['Nuggets', 'Denver', 'Michael Malone', 54, 28],
        ['Pistons', 'Detroit', 'Dwane Casey', 41, 41],
        ['Warriors', 'Golden State', 'Steve Kerr', 57, 25],
        ['Rockets', 'Houston', 'Mike D\'Antoni', 53, 29],
        ['Pacers', 'Indiana', 'Nate Bjorkgren', 48, 34],
        ['Clippers', 'Los Angeles', 'Doc Rivers', 48, 34],
        ['Lakers', 'Los Angeles', 'Frank Vogel', 52, 30],
        ['Grizzlies', 'Memphis', 'Taylor Jenkins', 32, 50],
        ['Heat', 'Miami', 'Erik Spoelstra', 44, 38],
        ['Bucks', 'Milwaukee', 'Mike Budenholzer', 53, 29],
        ['Timberwolves', 'Minnesota', 'Ryan Saunders', 19, 63],
        ['Pelicans', 'New Orleans', 'Alvin Gentry', 30, 52],
        ['Knicks', 'New York', 'Tom Thibodeau', 21, 61],
        ['Thunder', 'Oklahoma City', 'Billy Donovan', 44, 38],
        ['Magic', 'Orlando', 'Steve Clifford', 42, 40],
        ['76ers', 'Philadelphia', 'Doc Rivers', 49, 33],
        ['Suns', 'Phoenix', 'Monty Williams', 51, 31],
        ['Trail Blazers', 'Portland', 'Terry Stotts', 44, 38],
        ['Kings', 'Sacramento', 'Luke Walton', 39, 43],
        ['Spurs', 'San Antonio', 'Gregg Popovich', 48, 34],
        ['Raptors', 'Toronto', 'Nick Nurse', 46, 36],
        ['Jazz', 'Utah', 'Quin Snyder', 50, 32],
        ['Wizards', 'Washington', 'Scott Brooks', 24, 58]
    ];
    connection.query('INSERT INTO Teams (TeamName, City, CoachName, NumberOfWins, NumberOfLosses) VALUES ?', [teams], (err, result) => {
        if (err) throw err;
        console.log(result);
    });

    // Insert data into Players table
    var players = [
        // 2019-2020 Season
        // Atlanta Hawks starting lineup
        ['Trae Young', 73, 21, 180, 80, 1, 1, 'Oklahoma', 11, 'USA', 'Healthy'],
        ['Kevin Huerter', 77, 22, 205, 83, 1, 2, 'Maryland', 3, 'USA', 'Healthy'],
        ['De\'Andre Hunter', 79, 22, 225, 86, 1, 3, 'Virginia', 12, 'USA', 'Healthy'],
        ['John Collins', 81, 22, 235, 88, 1, 4, 'Wake Forest', 20, 'USA', 'Healthy'],
        ['Clint Capela', 84, 26, 240, 90, 1, 5, 'Switzerland', 15, 'France', 'Healthy'],
        // Boston Celtics starting lineup
        ['Kemba Walker', 73, 29, 184, 80, 2, 1, 'Connecticut', 8, 'USA', 'Healthy'],
        ['Jaylen Brown', 78, 23, 220, 84, 2, 2, 'California', 7, 'USA', 'Healthy'],
        ['Gordon Hayward', 80, 29, 225, 86, 2, 3, 'Butler', 20, 'USA', 'Healthy'],
        ['Jayson Tatum', 80, 21, 210, 86, 2, 4, 'Duke', 0, 'USA', 'Healthy'],
        ['Enes Kanter', 84, 27, 245, 90, 2, 5, 'Kentucky', 11, 'Turkey', 'Healthy'],
        // Washington Wizards starting lineup
        ['Bradley Beal', 77, 26, 210, 83, 30, 1, 'Florida', 3, 'USA', 'Healthy'],
        ['Rui Hachimura', 81, 22, 230, 87, 30, 2, 'Gonzaga', 8, 'Japan', 'Healthy'],
        ['Troy Brown Jr.', 78, 21, 210, 84, 30, 3, 'Oregon', 6, 'USA', 'Healthy'],
        ['Isaiah Thomas', 73, 29, 185, 80, 30, 4, 'Washington', 22, 'USA', 'Healthy'],
        ['Thomas Bryant', 82, 24, 245, 88, 30, 5, 'Indiana', 13, 'USA', 'Healthy'],
        // Chicago Bulls starting lineup
        ['Zach LaVine', 77, 25, 200, 83, 5, 1, 'UCLA', 8, 'USA', 'Healthy'],
        ['Coby White', 75, 21, 190, 82, 5, 2, 'North Carolina', 0, 'USA', 'Healthy'],
        ['Wendell Carter Jr.', 81, 21, 240, 87, 5, 3, 'Duke', 34, 'USA', 'Healthy'],
        ['Otto Porter Jr.', 80, 26, 220, 86, 5, 4, 'Georgetown', 22, 'USA', 'Healthy'],
        ['Lauri Markkanen', 83, 23, 240, 89, 5, 5, 'Arizona', 24, 'Finland', 'Healthy'],
        // Cleveland Cavaliers starting lineup
        ['Collin Sexton', 75, 21, 190, 81, 6, 1, 'Alabama', 2, 'USA', 'Healthy']
    ]
    connection.query('INSERT INTO Players (PlayerName, PlayerHeight, PlayerAge, PlayerWeight, PlayerWingspan, PlayerTeamID, PlayerPositionID, College, JerseyNumber, Country, InjuryStatus) VALUES ?', [players], (err, result) => {
        if (err) throw err;
        console.log(result);
    });

    // Insert data into Referees table
    var referees = [
        ['Bill Kennedy'],
        ['Scott Foster'],
        ['James Capers'],
        ['Mark Davis'],
        ['Derrick Stafford'],
        ['Derek Richardson'],
        ['Sean Wright'],
        ['James Williams'],
        ['Brent Barnaky'],
        ['Scott Twardoski']
    ];

    connection.query('INSERT INTO Referees (RefereeName) VALUES ?', [referees], (err, result) => {
        if (err) throw err;
        console.log(result);
    });

    // Insert data into Games table
    var games = [
        ['2019-10-22', 1, 2, 108, 100],
        ['2019-10-24', 3, 4, 135, 98],
        ['2019-10-26', 1, 3, 111, 110],
        ['2019-10-28', 2, 4, 110, 100]
    ];

    connection.query('INSERT INTO Games (GameDate, GameHomeTeamID, GameAwayTeamID, GameHomeTeamScore, GameAwayTeamScore) VALUES ?', [games], (err, result) => {
        if (err) throw err;
        console.log(result);
    });

    // Insert data into GameReferees table
    var gameReferees = [
        [1, 4, 3, 5],
        [2, 2, 5, 6],
        [3, 2, 9, 4],
        [4, 1, 7, 8]
    ];

    connection.query('INSERT INTO GameReferees (GameID, RefereeID1, RefereeID2, RefereeID3) VALUES ?', [gameReferees], (err, result) => {
        if (err) throw err;
        console.log(result);
    });

    // Insert data into GameLog table
    var gameLog = [
        // Sample Game 1
        // Atlanta Hawks starting lineup
        [1, 1, 40, 34, 5, 3, 2, 0, 2, 2, 2019],
        [1, 2, 38, 18, 3, 8, 1, 0, 1, 1, 2019],
        [1, 3, 32, 12, 3, 2, 1, 0, 1, 2, 2019],
        [1, 4, 38, 16, 7, 2, 1, 0, 2, 2, 2019],
        [1, 5, 35, 15, 8, 1, 1, 1, 1, 2, 2019],
        // Boston Celtics starting lineup
        [1, 6, 40, 15, 5, 3, 1, 0, 2, 2, 2019],
        [1, 7, 38, 32, 3, 8, 1, 0, 1, 1, 2019],
        [1, 8, 32, 35, 3, 2, 1, 0, 1, 2, 2019],
        [1, 9, 38, 10, 7, 2, 1, 0, 2, 2, 2019],
        [1, 10, 35, 12, 8, 1, 1, 1, 1, 2, 2019],

        // Sample Game 2
        // Washington Wizards starting lineup
        [2, 11, 40, 34, 5, 3, 2, 0, 2, 2, 2019],
        [2, 12, 38, 18, 3, 8, 1, 0, 1, 1, 2019],
        [2, 13, 32, 12, 3, 2, 1, 0, 1, 2, 2019],
        [2, 14, 38, 16, 7, 2, 1, 0, 2, 2, 2019],
        [2, 15, 35, 15, 8, 1, 1, 1, 1, 2, 2019],
        // Chicago Bulls starting lineup
        [2, 16, 40, 15, 5, 3, 1, 0, 2, 2, 2019],
        [2, 17, 38, 32, 3, 8, 1, 0, 1, 1, 2019],
        [2, 18, 32, 35, 3, 2, 1, 0, 1, 2, 2019],
        [2, 19, 38, 10, 7, 2, 1, 0, 2, 2, 2019],
        [2, 20, 35, 12, 8, 1, 1, 1, 1, 2, 2019],

        //Sample Game 3
        // Atlanta Hawks starting lineup
        [3, 1, 39, 27, 3, 9, 1, 0, 4, 3, 2019],
        [3, 2, 33, 14, 6, 2, 0, 1, 1, 1, 2019],
        [3, 3, 36, 17, 9, 1, 4, 2, 2, 4, 2019],
        [3, 4, 37, 15, 5, 3, 1, 0, 2, 2, 2019],
        [3, 5, 34, 12, 8, 1, 1, 1, 1, 2, 2019],
        // Washington Wizards starting lineup
        [3, 11, 39, 60, 3, 9, 1, 0, 4, 3, 2019],
        [3, 12, 33, 14, 6, 2, 0, 1, 1, 1, 2019],
        [3, 13, 36, 17, 9, 1, 4, 2, 2, 4, 2019],
        [3, 14, 37, 15, 5, 3, 1, 0, 2, 2, 2019],
        [3, 15, 34, 12, 8, 1, 1, 1, 1, 2, 2019],

        //Sample Game 4
        // Chicago Bulls starting lineup
        [4, 16, 39, 27, 3, 9, 1, 0, 4, 3, 2019],
        [4, 17, 33, 14, 6, 2, 0, 1, 1, 1, 2019],
        [4, 18, 36, 17, 9, 1, 4, 2, 2, 4, 2019],
        [4, 19, 37, 15, 5, 3, 1, 0, 2, 2, 2019],
        [4, 20, 34, 12, 8, 1, 1, 1, 1, 2, 2019],
        // Boston Celtics starting lineup
        [4, 6, 39, 27, 3, 9, 1, 0, 4, 3, 2019],
        [4, 7, 33, 14, 6, 2, 0, 1, 1, 1, 2019],
        [4, 8, 36, 17, 9, 1, 4, 2, 2, 4, 2019],
        [4, 9, 37, 15, 5, 3, 1, 0, 2, 2, 2019],
        [4, 10, 34, 12, 8, 1, 1, 1, 1, 2, 2019]
        
    ];

    connection.query('INSERT INTO GameLog (GameID, PlayerID, MinutesPlayed, Points, Rebounds, Assists, Steals, Blocks, Turnovers, Fouls, SeasonYear) VALUES ?', [gameLog], (err, result) => {
        if (err) throw err;
        console.log(result);
    });

    // Insert data into accolades table
    var accolades = [
        ['MVP', 'Most Valuable Player'],
        ['DPOY', 'Defensive Player of the Year'],
        ['MIP', 'Most Improved Player'],
        ['ROY', 'Rookie of the Year'],
        ['6MOY', 'Sixth man of the Year']
    ];

    connection.query('INSERT INTO Accolades (AccoladeName, AccoladeDescription) VALUES ?', [accolades], (err, result) => {
        if (err) throw err;
        console.log(result);
    });

    // Insert data into AwardsBySeason table
    var awardsBySeason = [
        [1, 1, 2019],
        [2, 2, 2019],
        [3, 3, 2019],
        [4, 4, 2019],
        [5, 5, 2019]
    ];

    connection.query('INSERT INTO AwardsBySeason (AccoladeID, PlayerID, SeasonYear) VALUES ?', [awardsBySeason], (err, result) => {
        if (err) throw err;
        console.log(result);
    });

//Display all information on Bradley Beal

    connection.query('SELECT * FROM Players WHERE PlayerName = "Bradley Beal"', (err, result) => {
        if (err) throw err;
        console.log(result);
    });


   
// What team does [Athlete name] play for?
    var athleteName = 'Bradley Beal';
    
    connection.query('SELECT TeamName FROM Teams WHERE TeamID = (SELECT PlayerTeamID FROM Players WHERE PlayerName = ?)', [athleteName], (err, result) => {
        if (err) throw err;
        console.log(result);
    });



// Is Zach Lavine healthy or injured?

    connection.query('SELECT InjuryStatus FROM Players WHERE PlayerName = "Zach Lavine"', (err, result) => {
        if (err) throw err;
        console.log(result);
    });


// How old is Kevin Huerter?

    connection.query('SELECT Players.PlayerAge FROM Players WHERE Players.PlayerName = "Kevin Huerter"', (err, result) => {
        if (err) throw err;
        console.log(result);
    });


// How many wins do the Boston Celtics have for the current season?

    connection.query('SELECT Teams.TeamName, Teams.NumberOfWins FROM Teams WHERE Teams.TeamName = "Celtics"', (err, result) => {
        if (err) throw err;
        console.log(result);
    });



// Display the team name for the team that has the lowest average age?

    connection.query('SELECT Teams.TeamName, AVG(Players.PlayerAge) AS AverageAge FROM Teams INNER JOIN Players ON Teams.TeamID = Players.PlayerTeamID GROUP BY Teams.TeamName ORDER BY AverageAge ASC LIMIT 1', (err, result) => {
        if (err) throw err;
        console.log(result);
    });



// How many points does Zach Lavine average in 2019?

    connection.query('SELECT Players.PlayerName, AVG(GameLog.points) AS AveragePoints FROM GameLog INNER JOIN Players ON GameLog.playerID = Players.PlayerID WHERE Players.PlayerName = "Collin Sexton"', (err, result) => {
        if (err) throw err;
        console.log(result);
    });


// Who averages the Most points for 2019-2020?

    connection.query('SELECT Players.PlayerName, AVG(GameLog.points) AS AveragePoints FROM GameLog INNER JOIN Players ON GameLog.playerID = Players.PlayerID GROUP BY Players.PlayerName ORDER BY AveragePoints DESC LIMIT 1', (err, result) => {
        if (err) throw err;
        console.log(result);
    });


// Which team has the most wins when teams.teamid = games.GameHomeTeamID?

    connection.query('SELECT Teams.TeamName, COUNT(Games.GameHomeTeamID) AS HomeWins FROM Teams INNER JOIN Games ON Teams.TeamID = Games.GameHomeTeamID GROUP BY Teams.TeamName ORDER BY HomeWins DESC LIMIT 1', (err, result) => {
        if (err) throw err;
        console.log(result);
    });


// Which two players on the same team have the highest combined average of rebounds?

    connection.query('SELECT Players.PlayerName, AVG(GameLog.rebounds) AS AverageRebounds FROM GameLog INNER JOIN Players ON GameLog.playerID = Players.PlayerID GROUP BY Players.PlayerName ORDER BY AverageRebounds DESC LIMIT 2', (err, result) => {
        if (err) throw err;
        console.log(result);
    });

});

// routing

// Create

// Create a new team
app.post('/teams', (req, res) => {
    const teamName = req.body.teamName;
    const city = req.body.city;
    const coachName = req.body.coachName;
    const numberOfWins = req.body.numberOfWins;
    const numberOfLosses = req.body.numberOfLosses;
    connection.query('INSERT INTO Teams (TeamName, City, CoachName, NumberOfWins, NumberOfLosses) VALUES (?, ?, ?, ?, ?)', [teamName, city, coachName, numberOfWins, numberOfLosses], (err, result) => {
        if (err) throw err;
        res.send('Team created successfully');
    });
});
    
// Create a new player
app.post('/players', (req, res) => {
    const playerName = req.body.playerName;
    const playerHeight = req.body.playerHeight;
    const playerAge = req.body.playerAge;
    const playerWeight = req.body.playerWeight;
    const playerWingspan = req.body.playerWingspan;
    const playerTeamID = req.body.playerTeamID;
    const playerPositionID = req.body.playerPositionID;
    const college = req.body.college;
    const jerseyNumber = req.body.jerseyNumber;
    const country = req.body.country;
    const injuryStatus = req.body.injuryStatus;
    connection.query('INSERT INTO Players (PlayerName, PlayerHeight, PlayerAge, PlayerWeight, PlayerWingspan, PlayerTeamID, PlayerPositionID, College, JerseyNumber, Country, InjuryStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [playerName, playerHeight, playerAge, playerWeight, playerWingspan, playerTeamID, playerPositionID, college, jerseyNumber, country, injuryStatus], (err, result) => {
        if (err) throw err;
        res.send('Player created successfully');
    });
});

// Create a new game
app.post('/games', (req, res) => {
    const gameDate = req.body.gameDate;
    const gameHomeTeamID = req.body.gameHomeTeamID;
    const gameAwayTeamID = req.body.gameAwayTeamID;
    const gameHomeTeamScore = req.body.gameHomeTeamScore;
    const gameAwayTeamScore = req.body.gameAwayTeamScore;
    connection.query('INSERT INTO Games (GameDate, GameHomeTeamID, GameAwayTeamID, GameHomeTeamScore, GameAwayTeamScore) VALUES (?, ?, ?, ?, ?)', [gameDate, gameHomeTeamID, gameAwayTeamID, gameHomeTeamScore, gameAwayTeamScore], (err, result) => {
        if (err) throw err;
        res.send('Game created successfully');
    });
});

// Create a new game log
app.post('/gameLogs', (req, res) => {
    const gameID = req.body.gameID;
    const playerID = req.body.playerID;
    const minutesPlayed = req.body.minutesPlayed;
    const points = req.body.points;
    const rebounds = req.body.rebounds;
    const assists = req.body.assists;
    const steals = req.body.steals;
    const blocks = req.body.blocks;
    const turnovers = req.body.turnovers;
    const fouls = req.body.fouls;
    const seasonYear = req.body.seasonYear;
    connection.query('INSERT INTO GameLog (GameID, PlayerID, MinutesPlayed, Points, Rebounds, Assists, Steals, Blocks, Turnovers, Fouls, SeasonYear) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [gameID, playerID, minutesPlayed, points, rebounds, assists, steals, blocks, turnovers, fouls, seasonYear], (err, result) => {
        if (err) throw err;
        res.send('Game log created successfully');
    });
});

// Retrieve

// Retrieve all teams
app.get('/teams', (req, res) => {
    connection.query('SELECT * FROM Teams', (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Retrieve all players
app.get('/players', (req, res) => {
    connection.query('SELECT * FROM Players', (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Retrieve all games
app.get('/games', (req, res) => {
    connection.query('SELECT * FROM Games', (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Retrieve all game logs
app.get('/gameLogs', (req, res) => {
    connection.query('SELECT * FROM GameLog', (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Retrieve a team by ID
app.get('/teams/:id', (req, res) => {
    const teamID = req.params.id;
    connection.query('SELECT * FROM Teams WHERE TeamID = ?', [teamID], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Retrieve a player by ID
app.get('/players/:id', (req, res) => {
    const playerID = req.params.id;
    connection.query('SELECT * FROM Players WHERE PlayerID = ?', [playerID], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Retrieve a game by ID
app.get('/games/:id', (req, res) => {
    const gameID = req.params.id;
    connection.query('SELECT * FROM Games WHERE GameID = ?', [gameID], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Retrieve a game log by game ID and player ID
app.get('/gameLogs/:gameID/:playerID', (req, res) => {
    const gameID = req.params.gameID;
    const playerID = req.params.playerID;
    connection.query('SELECT * FROM GameLog WHERE GameID = ? AND PlayerID = ?', [gameID, playerID], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Update

// Delete

const port = 8000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});



// goofy code
// Display the player names and their team names

// connection.query('SELECT Players.PlayerName, Teams.TeamName FROM Players INNER JOIN Teams ON Players.PlayerTeamID = Teams.TeamID', (err, result) => {
//     if (err) throw err;
//     console.log(result);
// });

// Display the player names and their team names for the teams that have won more than 40 games

// connection.query('SELECT Players.PlayerName, Teams.TeamName FROM Players INNER JOIN Teams ON Players.PlayerTeamID = Teams.TeamID WHERE Teams.NumberOfWins > 40', (err, result) => {
//     if (err) throw err;
//     console.log(result);
// });

/*
        ['LeBron James', 81, 35, 250, 84, 14, 3, 'Did not attend college', 23, 'USA', `Healthy`],
        ['Anthony Davis', 82, 27, 253, 86, 14, 4, 'University of Kentucky', 3, 'USA', `Healthy`],
        ['Luka Doncic', 81, 21, 240, 83, 7, 1, 'Real Madrid', 77, 'Slovenia', `Healthy`],
        ['James Harden', 77, 31, 220, 81, 11, 1, 'Arizona State University', 13, 'USA', `Healthy`],
        ['Giannis Antetokounmpo', 83, 26, 242, 88, 17, 4, 'Did not attend college', 34, 'Greece', `Healthy`],
        ['Joel Embiid', 84, 26, 280, 90, 23, 5, 'University of Kansas', 21, 'Cameroon', `Healthy`],
        ['Kawhi Leonard', 79, 28, 230, 83, 13, 3, 'University of San Diego', 2, 'USA', `Healthy`],
        ['Damian Lillard', 75, 30, 195, 79, 25, 1, 'Weber State University', 0, 'USA', `Healthy`],
        ['Stephen Curry', 75, 32, 190, 79, 10, 1, 'University of Davidson', 30, 'USA', `Healthy`],
        ['Nikola Jokic', 84, 25, 250, 88, 8, 5, 'Did not attend college', 15, 'Serbia', `Healthy`],
        ['Karl-Anthony Towns', 84, 25, 244, 88, 18, 5, 'University of Kentucky', 32, 'USA', `Healthy`],
        ['Bradley Beal', 77, 27, 207, 81, 30, 2, 'University of Florida', 3, 'USA', `Healthy`],
        ['Kemba Walker', 73, 30, 184, 77, 2, 1, 'University of Connecticut', 8, 'USA', `Healthy`],
        ['Kyrie Irving', 75, 28, 193, 79, 3, 1, 'Duke University', 11, 'USA', `Healthy`],
        ['Paul George', 79, 30, 220, 83, 13, 3, 'University of Fresno State', 13, 'USA', `Healthy`],
        ['Jimmy Butler', 78, 31, 230, 82, 16, 3, 'University of Marquette', 22, 'USA', `Healthy`],
        ['Devin Booker', 77, 24, 206, 81, 24, 2, 'University of Kentucky', 1, 'USA', `Healthy`],
        ['Zion Williamson', 78, 20, 284, 82, 19, 4, 'Duke University', 1, 'USA', `Healthy`],
        ['Khris Middleton', 79, 29, 230, 83, 17, 3, 'University of Texas at Austin', 22, 'USA', `Healthy`],
        ['Rudy Gobert', 87, 28, 270, 92, 29, 5, 'Did not attend college', 27, 'France', `Healthy`],
        ['Nikola Vucevic', 84, 29, 260, 88, 22, 5, 'University of Southern California', 9, 'Croatia', `Healthy`],
        ['DeMar DeRozan', 78, 31, 220, 82, 27, 2, 'University of Southern California', 10, 'USA', `Healthy`],
        ['Trae Young', 75, 22, 180, 79, 1, 1, 'University of Oklahoma', 11, 'USA', `Healthy`],
        ['Ben Simmons', 83, 24, 240, 88, 23, 1, 'Louisiana State University', 25, 'Australia', `Healthy`],
        ['Jayson Tatum', 80, 22, 210, 84, 2, 2, 'Duke University', 0, 'USA', `Healthy`],
        ['Donovan Mitchell', 77, 24, 215, 81, 29, 2, 'University of Louisville', 45, 'USA', `Healthy`],
        ['Klay Thompson', 77, 30, 215, 81, 10, 2, 'University of Washington', 11, 'USA', `Healthy`],
        ['Dejounte Murray', 77, 24, 210, 81, 27, 1, 'University of Washington', 5, 'USA', `Healthy`],
        ['DeAndre Ayton', 84, 22, 250, 88, 24, 5, 'University of Arizona', 22, 'USA', `Healthy`],
        ['Domantas Sabonis', 83, 24, 250, 88, 12, 5, 'University of Gonzaga', 11, 'Lithuania', `Healthy`],
        ['Jrue Holiday', 76, 30, 205, 80, 19, 1, 'University of UCLA', 11, 'USA', `Healthy`],
        ['Kyle Lowry', 75, 35, 196, 79, 28, 1, 'Villanova University', 7, 'USA', `Healthy`]
*/