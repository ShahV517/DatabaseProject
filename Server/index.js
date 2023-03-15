const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Create connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
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
    ]

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
});

// routing

// Create

// Create a new team
app.post('/teams', (req, res) => {
    const teamName = req.body.TeamName;
    const city = req.body.City;
    const coachName = req.body.CoachName;
    const numberOfWins = req.body.NumberOfWins;
    const numberOfLosses = req.body.NumberOfLosses;
    // check if number of wins and losses equal 82
    if (numberOfWins + numberOfLosses != 82) {
        res.send({ 'Message': 'Number of wins and losses must equal 82' });
    } else {
        connection.query('INSERT INTO Teams (TeamName, City, CoachName, NumberOfWins, NumberOfLosses) VALUES (?, ?, ?, ?, ?)', [teamName, city, coachName, numberOfWins, numberOfLosses], (err, result) => {
            if (err) throw err;
            res.send('Team created successfully');
        });
    }
});
    
// Create a new player
app.post('/players', (req, res) => {
    const playerName = req.body.PlayerName;
    const playerHeight = req.body.PlayerHeight;
    const playerAge = req.body.PlayerAge;
    const playerWeight = req.body.PlayerWeight;
    const playerWingspan = req.body.PlayerWingspan;
    const playerTeamID = req.body.PlayerTeamID;
    const playerPositionID = req.body.PlayerPositionID;
    const college = req.body.College;
    const jerseyNumber = req.body.JerseyNumber;
    const country = req.body.Country;
    const injuryStatus = req.body.InjuryStatus;
    // check if team exists
    connection.query('SELECT * FROM Teams WHERE TeamID = ?', [playerTeamID], (err, result) => {
        if (err) throw err;
        if (result.length == 0) {
            res.send({ 'Message': 'Team does not exist' });
        } else { 
            // check if position exists
            connection.query('SELECT * FROM Positions WHERE PositionID = ?', [playerPositionID], (err, result) => {
                if (err) throw err;
                if (result.length == 0) {  
                    res.send({ 'Message': 'Position does not exist' });
                } else {                                    
                    connection.query('INSERT INTO Players (PlayerName, PlayerHeight, PlayerAge, PlayerWeight, PlayerWingspan, PlayerTeamID, PlayerPositionID, College, JerseyNumber, Country, InjuryStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [playerName, playerHeight, playerAge, playerWeight, playerWingspan, playerTeamID, playerPositionID, college, jerseyNumber, country, injuryStatus], (err, result) => {
                        if (err) throw err;
                        res.send('Player created successfully');
                    });
                }
            });
        }
    });
});

// Create a new game
app.post('/games', (req, res) => {
    const gameDate = req.body.GameDate;
    const gameHomeTeamID = req.body.GameHomeTeamID;
    const gameAwayTeamID = req.body.GameAwayTeamID;
    const gameHomeTeamScore = req.body.GameHomeTeamScore;
    const gameAwayTeamScore = req.body.GameAwayTeamScore;
    // check if home team is the same as away team
    if (gameHomeTeamID == gameAwayTeamID) {
        res.send({'Message': 'Home team and away team cannot be the same'});
    } 
    // check if either team already has a game on the same date
    else {
        connection.query('SELECT * FROM Games WHERE GameDate = ? AND (GameHomeTeamID = ? OR GameAwayTeamID = ?)', [gameDate, gameHomeTeamID, gameHomeTeamID], (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                res.send({'Message':'Home team already has a game on this date'});
            } else {
                connection.query('SELECT * FROM Games WHERE GameDate = ? AND (GameHomeTeamID = ? OR GameAwayTeamID = ?)', [gameDate, gameAwayTeamID, gameAwayTeamID], (err, result) => {
                    if (err) throw err;
                    if (result.length > 0) {
                        res.send({'Message':'Away team already has a game on this date'});
                    }
                    // if no games on the same date, insert game
                    else {
                        connection.query('INSERT INTO Games (GameDate, GameHomeTeamID, GameAwayTeamID, GameHomeTeamScore, GameAwayTeamScore) VALUES (?, ?, ?, ?, ?)', [gameDate, gameHomeTeamID, gameAwayTeamID, gameHomeTeamScore, gameAwayTeamScore], (err, result) => {
                            if (err) throw err;
                            res.send({'Message':'Game created successfully'});
                        });
                    }
                });
            }
        });
    }
});

// Create a new game log
app.post('/gameLogs', (req, res) => {
    const gameID = req.body.GameID;
    const playerID = req.body.PlayerID;
    const minutesPlayed = req.body.MinutesPlayed;
    const points = req.body.Points;
    const rebounds = req.body.Rebounds;
    const assists = req.body.Assists;
    const steals = req.body.Steals;
    const blocks = req.body.Blocks;
    const turnovers = req.body.Turnovers;
    const fouls = req.body.Fouls;
    const seasonYear = req.body.SeasonYear;
    // check if game exists
    connection.query('SELECT * FROM Games WHERE GameID = ?', [gameID], (err, result) => {
        if (err) throw err;
        if (result.length == 0) {
            res.send({'Message':'Game does not exist'});
        } else {
            // check if player exists
            connection.query('SELECT * FROM Players WHERE PlayerID = ?', [playerID], (err, result) => {
                if (err) throw err;
                if (result.length == 0) {
                    res.send({'Message':'Player does not exist'});
                } else {
                    // check if player played in game
                    connection.query('SELECT * FROM GameLog WHERE GameID = ? AND PlayerID = ?', [gameID, playerID], (err, result) => {
                        if (err) throw err;
                        if (result.length > 0) {
                            res.send({'Message':'Player already played in this game'});
                        } else {
                            // check if player is on the team playing in the game
                            connection.query('SELECT * FROM Players WHERE PlayerID = ? AND PlayerTeamID = (SELECT GameHomeTeamID FROM Games WHERE GameID = ?)', [playerID, gameID], (err, result) => {
                                if (err) throw err;
                                if (result.length > 0) {
                                    connection.query('INSERT INTO GameLog (GameID, PlayerID, MinutesPlayed, Points, Rebounds, Assists, Steals, Blocks, Turnovers, Fouls, SeasonYear) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [gameID, playerID, minutesPlayed, points, rebounds, assists, steals, blocks, turnovers, fouls, seasonYear], (err, result) => {
                                        if (err) throw err;
                                        res.send({'Message':'Game log created successfully'});
                                    });
                                } else {
                                    connection.query('SELECT * FROM Players WHERE PlayerID = ? AND PlayerTeamID = (SELECT GameAwayTeamID FROM Games WHERE GameID = ?)', [playerID, gameID], (err, result) => {
                                        if (err) throw err;
                                        if (result.length > 0) {
                                            connection.query('INSERT INTO GameLog (GameID, PlayerID, MinutesPlayed, Points, Rebounds, Assists, Steals, Blocks, Turnovers, Fouls, SeasonYear) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [gameID, playerID, minutesPlayed, points, rebounds, assists, steals, blocks, turnovers, fouls, seasonYear], (err, result) => {
                                                if (err) throw err;
                                                res.send({'Message':'Game log created successfully'});
                                            });
                                        } else {
                                            res.send({'Message':'Player is not on the team playing in the game'});
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
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

// Retrieve all referees (with their games)
app.get('/referees', (req, res) => {
    connection.query('SELECT * FROM Referees', (err, result) => {
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

// Retrieve game logs using game ID
app.get('/gameLogs/:id', (req, res) => {
    const gameID = req.params.id;
    connection.query('SELECT * FROM GameLog WHERE GameID = ?', [gameID], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Update

// Update a team by ID
// TeamName, City, CoachName, NumberOfWins, NumberOfLosses
app.put('/teams/:id', (req, res) => {
    const teamID = req.params.id;
    const teamName = req.body.TeamName;
    const city = req.body.City;
    const coachName = req.body.CoachName;
    const numberOfWins = req.body.NumberOfWins;
    const numberOfLosses = req.body.NumberOfLosses;
    // update non-null values
    connection.query('UPDATE Teams SET TeamName = ?, City = ?, CoachName = ?, NumberOfWins = ?, NumberOfLosses = ? WHERE TeamID = ?', [teamName, city, coachName, numberOfWins, numberOfLosses, teamID], (err, result) => {
        if (err) throw err;
        res.send('Team updated successfully');
    });
});

// Update a player by ID
// PlayerName, PlayerHeight, PlayerAge, PlayerWeight, PlayerWingspan, PlayerTeamID, PlayerPositionID, College, JerseyNumber, Country, InjuryStatus
app.put('/players/:id', (req, res) => {
    const playerID = req.params.id;
    const playerName = req.body.PlayerName;
    const playerHeight = req.body.PlayerHeight;
    const playerAge = req.body.PlayerAge;
    const playerWeight = req.body.PlayerWeight;
    const playerWingspan = req.body.PlayerWingspan;
    const playerTeamID = req.body.PlayerTeamID;
    const playerPositionID = req.body.PlayerPositionID;
    const college = req.body.College;
    const jerseyNumber = req.body.JerseyNumber;
    const country = req.body.Country;
    const injuryStatus = req.body.InjuryStatus;
    // update non-null values
    connection.query('UPDATE Players SET PlayerName = ?, PlayerHeight = ?, PlayerAge = ?, PlayerWeight = ?, PlayerWingspan = ?, PlayerTeamID = ?, PlayerPositionID = ?, College = ?, JerseyNumber = ?, Country = ?, InjuryStatus = ? WHERE PlayerID = ?', [playerName, playerHeight, playerAge, playerWeight, playerWingspan, playerTeamID, playerPositionID, college, jerseyNumber, country, injuryStatus, playerID], (err, result) => {
        if (err) throw err;
        res.send('Player updated successfully');
    });
});

// Update a game by ID
// GameDate, GameHomeTeamID, GameAwayTeamID, GameHomeTeamScore, GameAwayTeamScore
app.put('/games/:id', (req, res) => {
    const gameID = req.params.id;
    const gameDate = req.body.GameDate;
    const gameHomeTeamID = req.body.GameHomeTeamID;
    const gameAwayTeamID = req.body.GameAwayTeamID;
    const gameHomeTeamScore = req.body.GameHomeTeamScore;
    const gameAwayTeamScore = req.body.GameAwayTeamScore;
    // update non-null values
    connection.query('UPDATE Games SET GameDate = ?, GameHomeTeamID = ?, GameAwayTeamID = ?, GameHomeTeamScore = ?, GameAwayTeamScore = ? WHERE GameID = ?', [gameDate, gameHomeTeamID, gameAwayTeamID, gameHomeTeamScore, gameAwayTeamScore, gameID], (err, result) => {
        if (err) throw err;
        res.send('Game updated successfully');
    });
});

// Update a game log by ID
app.put('/gameLogs/:id', (req, res) => {
    const gameLogID = req.params.id;
    const gameID = req.body.GameID;
    const playerID = req.body.PlayerID;
    const minutesPlayed = req.body.MinutesPlayed;
    const points = req.body.Points;
    const rebounds = req.body.Rebounds;
    const assists = req.body.Assists;
    const steals = req.body.Steals;
    const blocks = req.body.Blocks;
    const turnovers = req.body.Turnovers;
    const fouls = req.body.Fouls;
    const seasonYear = req.body.SeasonYear;
    // update non-null values
    connection.query('UPDATE GameLog SET GameID = ?, PlayerID = ?, MinutesPlayed = ?, Points = ?, Rebounds = ?, Assists = ?, Steals = ?, Blocks = ?, Turnovers = ?, Fouls = ?, SeasonYear = ? WHERE GameLogID = ?', [gameID, playerID, minutesPlayed, points, rebounds, assists, steals, blocks, turnovers, fouls, seasonYear, gameLogID], (err, result) => {
        if (err) throw err;
        res.send('Game log updated successfully');
    });
});


// Delete

// Delete a team by ID
// when deleting a team, also delete all players on that team
// fix this
app.delete('/teams/:id', (req, res) => {
    const teamID = parseInt(req.params.id);
    // delete all game logs where team is home or away team
    connection.query('DELETE FROM GameLog WHERE GameID IN (SELECT GameID FROM Games WHERE GameHomeTeamID = ? OR GameAwayTeamID = ?)', [teamID, teamID], (err, result) => {
        if (err) throw err;
    });

    const gamelogs = connection.query('SELECT * FROM GameLog', (err, result) => {
        if (err) throw err;
    });

    console.log(gamelogs);

    // delete all players on team
    connection.query('DELETE FROM Players WHERE PlayerTeamID = ?', [teamID], (err, result) => {
        if (err) throw err;
    });

    // delete gamereferees where team is home or away
    connection.query('DELETE FROM GameReferees WHERE GameID IN (SELECT GameID FROM Games WHERE GameHomeTeamID = ? OR GameAwayTeamID = ?)', [teamID, teamID], (err, result) => {
        if (err) throw err;
    });

    // delete games where team is home or away
    connection.query('DELETE FROM Games WHERE GameHomeTeamID = ? OR GameAwayTeamID = ?', [teamID, teamID], (err, result) => {
        if (err) throw err;
    });

    // delete team
    connection.query('DELETE FROM Teams WHERE TeamID = ?', [teamID], (err, result) => {
        if (err) throw err;
        res.send('Team deleted successfully');
    });
});

// Delete a player by ID
app.delete('/players/:id', (req, res) => {
    const playerID = req.params.id;
    // delete game logs associated with player
    connection.query('DELETE FROM GameLog WHERE PlayerID = ?', [playerID], (err, result) => {
        if (err) throw err;
    });
    // delete awardsbyseason associated with player
    connection.query('DELETE FROM AwardsBySeason WHERE PlayerID = ?', [playerID], (err, result) => {
        if (err) throw err;
    });
    // delete player
    connection.query('DELETE FROM Players WHERE PlayerID = ?', [playerID], (err, result) => {
        if (err) throw err;
        res.send('Player deleted successfully');
    });
});

// Delete a game by ID
app.delete('/games/:id', (req, res) => {
    const gameID = req.params.id;
    // delete game logs associated with game
    connection.query('DELETE FROM GameLog WHERE GameID = ?', [gameID], (err, result) => {
        if (err) throw err;
    });
    // delete gamereferees associated with game
    connection.query('DELETE FROM GameReferees WHERE GameID = ?', [gameID], (err, result) => {
        if (err) throw err;
    });
    // delete game
    connection.query('DELETE FROM Games WHERE GameID = ?', [gameID], (err, result) => {
        if (err) throw err;
        res.send('Game deleted successfully');
    });
});

// queries
// Query 1
// Get a player's specific average stat for a given season (points, rebounds, assists, steals, blocks, turnovers, fouls)
app.get('/query1/:id/:seasonYear/:stat', (req, res) => {
    const playerID = req.params.id;
    const seasonYear = req.params.seasonYear;
    const stat = req.params.stat;
    console.log("playerID: " + playerID);
    console.log("seasonYear: " + seasonYear);
    console.log("stat: " + stat);
    // get player name and average stat
    if (stat.toLowerCase() == "points") {
        connection.query('SELECT PlayerName, AVG(Points) AS AveragePoints FROM Players NATURAL JOIN GameLog WHERE PlayerID = ? AND SeasonYear = ?', [playerID, seasonYear], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } else if (stat.toLowerCase() == "rebounds") {
        connection.query('SELECT PlayerName, AVG(Rebounds) AS AverageRebounds FROM Players NATURAL JOIN GameLog WHERE PlayerID = ? AND SeasonYear = ?', [playerID, seasonYear], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } else if (stat.toLowerCase() == "assists") {
        connection.query('SELECT PlayerName, AVG(Assists) AS AverageAssists FROM Players NATURAL JOIN GameLog WHERE PlayerID = ? AND SeasonYear = ?', [playerID, seasonYear], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } else if (stat.toLowerCase() == "steals") {
        connection.query('SELECT PlayerName, AVG(Steals) AS AverageSteals FROM Players NATURAL JOIN GameLog WHERE PlayerID = ? AND SeasonYear = ?', [playerID, seasonYear], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } else if (stat.toLowerCase() == "blocks") {
        connection.query('SELECT PlayerName, AVG(Blocks) AS AverageBlocks FROM Players NATURAL JOIN GameLog WHERE PlayerID = ? AND SeasonYear = ?', [playerID, seasonYear], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } else if (stat.toLowerCase() == "turnovers") {
        connection.query('SELECT PlayerName, AVG(Turnovers) AS AverageTurnovers FROM Players NATURAL JOIN GameLog WHERE PlayerID = ? AND SeasonYear = ?', [playerID, seasonYear], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } else if (stat.toLowerCase() == "fouls") {
        connection.query('SELECT PlayerName, AVG(Fouls) AS AverageFouls FROM Players NATURAL JOIN GameLog WHERE PlayerID = ? AND SeasonYear = ?', [playerID, seasonYear], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } else {
        res.status(400).json({ error: "Invalid stat" });
    }
});

// Query 2
// Which team has the highest/lowest average stat (height, weight, points, rebounds, assists, steals, blocks, turnovers, fouls) for a given season?
app.get('/query2/:seasonYear/:stat/:highestOrLowest', (req, res) => {
    const seasonYear = req.params.seasonYear;
    const stat = req.params.stat;
    let highestOrLowest = req.params.highestOrLowest;
    console.log("seasonYear: " + seasonYear);
    console.log("stat: " + stat);
    console.log("highestOrLowest: " + highestOrLowest);
    if (highestOrLowest.toLowerCase() == "highest") {
        highestOrLowest = "DESC";
    } else if (highestOrLowest.toLowerCase() == "lowest") {
        highestOrLowest = "ASC";
    } else {
        res.status(400).json({ error: "Invalid highestOrLowest" });
    }
    if (stat.toLowerCase() == "height") {
        connection.query('SELECT Teams.TeamName, AVG(Players.PlayerHeight) AS AverageHeight FROM Teams INNER JOIN Players ON Teams.TeamID = Players.PlayerTeamID GROUP BY Teams.TeamName ORDER BY AverageHeight ' + highestOrLowest + ' LIMIT 1', (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } else if (stat.toLowerCase() == "age") {
        connection.query('SELECT Teams.TeamName, AVG(Players.PlayerAge) AS AverageAge FROM Teams INNER JOIN Players ON Teams.TeamID = Players.PlayerTeamID GROUP BY Teams.TeamName ORDER BY AverageAge ' + highestOrLowest + ' LIMIT 1', (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } else if (stat.toLowerCase() == "weight") {
        connection.query('SELECT Teams.TeamName, AVG(Players.PlayerWeight) AS AverageWeight FROM Teams INNER JOIN Players ON Teams.TeamID = Players.PlayerTeamID GROUP BY Teams.TeamName ORDER BY AverageWeight ' + highestOrLowest + ' LIMIT 1', (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } else if (stat.toLowerCase() == "points") {
        connection.query('SELECT Teams.TeamName, SUM(GameLog.Points) / COUNT(DISTINCT GameLog.GameID) AS AveragePoints FROM Teams INNER JOIN Players ON Teams.TeamID = Players.PlayerTeamID INNER JOIN GameLog ON Players.PlayerID = GameLog.PlayerID WHERE GameLog.SeasonYear = ? GROUP BY Teams.TeamName ORDER BY AveragePoints ' + highestOrLowest + ' LIMIT 1', [seasonYear], (err, result) => {
            if (err) throw err;
            res.send(result);
        });

    } else if (stat.toLowerCase() == "rebounds") {
        connection.query('SELECT Teams.TeamName, SUM(GameLog.Rebounds) / COUNT(DISTINCT GameLog.GameID) AS AverageRebounds FROM Teams INNER JOIN Players ON Teams.TeamID = Players.PlayerTeamID INNER JOIN GameLog ON Players.PlayerID = GameLog.PlayerID WHERE GameLog.SeasonYear = ? GROUP BY Teams.TeamName ORDER BY AverageRebounds ' + highestOrLowest + ' LIMIT 1', [seasonYear], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } else if (stat.toLowerCase() == "assists") {
        connection.query('SELECT Teams.TeamName, SUM(GameLog.Assists) / COUNT(DISTINCT GameLog.GameID) AS AverageAssists FROM Teams INNER JOIN Players ON Teams.TeamID = Players.PlayerTeamID INNER JOIN GameLog ON Players.PlayerID = GameLog.PlayerID WHERE GameLog.SeasonYear = ? GROUP BY Teams.TeamName ORDER BY AverageAssists ' + highestOrLowest + ' LIMIT 1', [seasonYear], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } else if (stat.toLowerCase() == "steals") {
        connection.query('SELECT Teams.TeamName, SUM(GameLog.Steals) / COUNT(DISTINCT GameLog.GameID) AS AverageSteals FROM Teams INNER JOIN Players ON Teams.TeamID = Players.PlayerTeamID INNER JOIN GameLog ON Players.PlayerID = GameLog.PlayerID WHERE GameLog.SeasonYear = ? GROUP BY Teams.TeamName ORDER BY AverageSteals ' + highestOrLowest + ' LIMIT 1', [seasonYear], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } else if (stat.toLowerCase() == "blocks") {
        connection.query('SELECT Teams.TeamName, SUM(GameLog.Blocks) / COUNT(DISTINCT GameLog.GameID) AS AverageBlocks FROM Teams INNER JOIN Players ON Teams.TeamID = Players.PlayerTeamID INNER JOIN GameLog ON Players.PlayerID = GameLog.PlayerID WHERE GameLog.SeasonYear = ? GROUP BY Teams.TeamName ORDER BY AverageBlocks ' + highestOrLowest + ' LIMIT 1', [seasonYear], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } else if (stat.toLowerCase() == "turnovers") {
        connection.query('SELECT Teams.TeamName, SUM(GameLog.Turnovers) / COUNT(DISTINCT GameLog.GameID) AS AverageTurnovers FROM Teams INNER JOIN Players ON Teams.TeamID = Players.PlayerTeamID INNER JOIN GameLog ON Players.PlayerID = GameLog.PlayerID WHERE GameLog.SeasonYear = ? GROUP BY Teams.TeamName ORDER BY AverageTurnovers ' + highestOrLowest + ' LIMIT 1', [seasonYear], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } else if (stat.toLowerCase() == "fouls") {
        connection.query('SELECT Teams.TeamName, SUM(GameLog.Fouls) / COUNT(DISTINCT GameLog.GameID) AS AverageFouls FROM Teams INNER JOIN Players ON Teams.TeamID = Players.PlayerTeamID INNER JOIN GameLog ON Players.PlayerID = GameLog.PlayerID WHERE GameLog.SeasonYear = ? GROUP BY Teams.TeamName ORDER BY AverageFouls ' + highestOrLowest + ' LIMIT 1', [seasonYear], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } else {
        res.status(400).json({ error: "Invalid stat" });
    }
});

// Query 3: Display the top/bottom n players in a given stat (height, weight, points, rebounds, assists, steals, blocks, turnovers, fouls) for a given season
app.get('/query3/:seasonYear/:stat/:n/:topOrBottom', (req, res) => {
    const seasonYear = req.params.seasonYear;
    const stat = req.params.stat;
    const n = parseInt(req.params.n);
    if (n < 1) {
        res.status(400).json({ error: "Invalid n" });
        return;
    }
    let topOrBottom = req.params.topOrBottom;

    if (topOrBottom.toLowerCase() == "top") {
        topOrBottom = "DESC";
    } else if (topOrBottom.toLowerCase() == "bottom") {
        topOrBottom = "ASC";
    } else {
        res.status(400).json({ error: "Invalid topOrBottom" });
    }

    if (stat.toLowerCase() == "height") {
        connection.query('SELECT Players.PlayerName, Players.PlayerHeight FROM Players INNER JOIN GameLog ON Players.PlayerID = GameLog.PlayerID WHERE GameLog.SeasonYear = ? ORDER BY Players.PlayerHeight ' + topOrBottom + ' LIMIT ?', [seasonYear, n], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } else if (stat.toLowerCase() == "age") {
        connection.query('SELECT Players.PlayerName, Players.PlayerAge FROM Players INNER JOIN GameLog ON Players.PlayerID = GameLog.PlayerID WHERE GameLog.SeasonYear = ? ORDER BY Players.PlayerAge ' + topOrBottom + ' LIMIT ?', [seasonYear, n], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } else if (stat.toLowerCase() == "weight") {
        connection.query('SELECT Players.PlayerName, Players.PlayerWeight FROM Players INNER JOIN GameLog ON Players.PlayerID = GameLog.PlayerID WHERE GameLog.SeasonYear = ? ORDER BY Players.PlayerWeight ' + topOrBottom + ' LIMIT ?', [seasonYear, n], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } else if (stat.toLowerCase() == "points") {
        connection.query('SELECT Players.PlayerName, SUM(GameLog.Points) / COUNT(DISTINCT GameLog.GameID) AS AveragePoints FROM Players INNER JOIN GameLog ON Players.PlayerID = GameLog.PlayerID WHERE GameLog.SeasonYear = ? GROUP BY Players.PlayerName ORDER BY AveragePoints ' + topOrBottom + ' LIMIT ?', [seasonYear, n], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } else if (stat.toLowerCase() == "rebounds") {
        connection.query('SELECT Players.PlayerName, SUM(GameLog.Rebounds) / COUNT(DISTINCT GameLog.GameID) AS AverageRebounds FROM Players INNER JOIN GameLog ON Players.PlayerID = GameLog.PlayerID WHERE GameLog.SeasonYear = ? GROUP BY Players.PlayerName ORDER BY AverageRebounds ' + topOrBottom + ' LIMIT ?', [seasonYear, n], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } else if (stat.toLowerCase() == "assists") {
        connection.query('SELECT Players.PlayerName, SUM(GameLog.Assists) / COUNT(DISTINCT GameLog.GameID) AS AverageAssists FROM Players INNER JOIN GameLog ON Players.PlayerID = GameLog.PlayerID WHERE GameLog.SeasonYear = ? GROUP BY Players.PlayerName ORDER BY AverageAssists ' + topOrBottom + ' LIMIT ?', [seasonYear, n], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } else if (stat.toLowerCase() == "steals") {
        connection.query('SELECT Players.PlayerName, SUM(GameLog.Steals) / COUNT(DISTINCT GameLog.GameID) AS AverageSteals FROM Players INNER JOIN GameLog ON Players.PlayerID = GameLog.PlayerID WHERE GameLog.SeasonYear = ? GROUP BY Players.PlayerName ORDER BY AverageSteals ' + topOrBottom + ' LIMIT ?', [seasonYear, n], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } else if (stat.toLowerCase() == "blocks") {
        connection.query('SELECT Players.PlayerName, SUM(GameLog.Blocks) / COUNT(DISTINCT GameLog.GameID) AS AverageBlocks FROM Players INNER JOIN GameLog ON Players.PlayerID = GameLog.PlayerID WHERE GameLog.SeasonYear = ? GROUP BY Players.PlayerName ORDER BY AverageBlocks ' + topOrBottom + ' LIMIT ?', [seasonYear, n], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } else if (stat.toLowerCase() == "turnovers") {
        connection.query('SELECT Players.PlayerName, SUM(GameLog.Turnovers) / COUNT(DISTINCT GameLog.GameID) AS AverageTurnovers FROM Players INNER JOIN GameLog ON Players.PlayerID = GameLog.PlayerID WHERE GameLog.SeasonYear = ? GROUP BY Players.PlayerName ORDER BY AverageTurnovers ' + topOrBottom + ' LIMIT ?', [seasonYear, n], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } else if (stat.toLowerCase() == "fouls") {
        connection.query('SELECT Players.PlayerName, SUM(GameLog.Fouls) / COUNT(DISTINCT GameLog.GameID) AS AverageFouls FROM Players INNER JOIN GameLog ON Players.PlayerID = GameLog.PlayerID WHERE GameLog.SeasonYear = ? GROUP BY Players.PlayerName ORDER BY AverageFouls ' + topOrBottom + ' LIMIT ?', [seasonYear, n], (err, result) => {
            if (err) throw err;
            res.send(result);
        });
    } else {
        res.status(400).json({ error: "Invalid stat" });
    }
});

// Query 4: Retrieve the n referees who have officiated the most games in a given season
app.get('/query4/:seasonYear/:n', (req, res) => {
    const seasonYear = req.params.seasonYear;
    const n = parseInt(req.params.n);
    if (n < 1) {
        res.status(400).json({ error: "Invalid n" });
        return;
    }
    connection.query('SELECT Referees.RefereeName, COUNT(DISTINCT GameReferees.GameID) AS NumGames FROM Referees INNER JOIN GameReferees ON Referees.RefereeID = GameReferees.RefereeID1 OR Referees.RefereeID = GameReferees.RefereeID2 OR Referees.RefereeID = GameReferees.RefereeID3 INNER JOIN GameLog ON GameReferees.GameID = GameLog.GameID WHERE GameLog.SeasonYear = ? GROUP BY Referees.RefereeName ORDER BY NumGames DESC LIMIT ?', [seasonYear, n], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});


const port = 8000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});