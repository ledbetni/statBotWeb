import datetime
import pandas as pd
import numpy as np
import nfl_data_py as nfl
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config.update(
    SESSION_COOKIE_SECURE=True,
    SESSION_COOKIE_HTTPONLY=True,
    SESSION_COOKIE_SAMESITE='Lax'
)

@app.route('/columns', methods=['GET'])
async def get_columns():
    year = int(2023)
    cleanYear = int(year)
    weekly = nfl.import_weekly_data([int(cleanYear)])
    df = pd.DataFrame(weekly)
    columns = df.columns.tolist()
    return jsonify(columns)

@app.route('/statbot', methods=['POST'])
async def statbot():
    data = request.json
    args = data.get('args', [])
    
    # if len(args) >= 2:
    #     playerName = ' '.join(args[:2])
    # else:
    #     return jsonify({"error": "Invalid command format. Provide at least a player name and week number."}), 400

    if len(args) < 3:
        return jsonify({"error": "Invalid command format. $statbot <player name> <week> <stat> <year>"}), 400

    playerName = args[0]
    weekNum = args[1]
    stat = args[2]
    if len(args) < 4:
        year = datetime.datetime.now().year
    else:
        year = args[3]

    cleanWeek = int(weekNum)
    cleanYear = int(year)
    cleanName = playerName.title()

    weekly = nfl.import_weekly_data([int(cleanYear)])
    pd.set_option('display.max_colwidth', None)
    df = pd.DataFrame(weekly)
    playerData = df[df['player_display_name'] == cleanName]
    playerWeekData = playerData[playerData['week'] == cleanWeek]

    if playerWeekData.empty:
        return jsonify({"message": f"It appears that {cleanName} was inactive for week #{cleanWeek}"}), 200

    ### Player Info All Positions ####
    playerID = playerWeekData['player_id']
    playerPosition = playerWeekData['position'].to_string(index=False)
    playerPositionGroup = playerWeekData['position_group'].to_string(index=False)
    playerImage = playerWeekData['headshot_url']
    playerImageURL = playerImage.iloc[0]
    playerTeam = playerWeekData['recent_team'].to_string(index=False)
    playerSeason = playerWeekData['season'].to_string(index=False)
    playerSeasonType = playerWeekData['season_type'].to_string(index=False)
    playerOpponent = playerWeekData['opponent_team'].to_string(index=False)
    ######### Passing Statistics ################
    playerCompletions = playerWeekData['completions'].to_string(index=False)
    playerAttempts = playerWeekData['attempts'].to_string(index=False)
    playerPassingYards = playerWeekData['passing_yards'].to_string(index=False)
    playerPassingTds = playerWeekData['passing_tds'].to_string(index=False)
    playerInterceptionsThrown = playerWeekData['interceptions'].to_string(index=False)
    playerSacksTaken = playerWeekData['sacks'].to_string(index=False)
    playerSackYardsTaken = playerWeekData['sack_yards'].to_string(index=False)
    playerSackFumbles = playerWeekData['sack_fumbles'].to_string(index=False)
    playerSackFumblesLost = playerWeekData['sack_fumbles_lost'].to_string(index=False)
    playerPassingAirYards = playerWeekData['passing_air_yards'].to_string(index=False)
    playerPassingYAC = playerWeekData['passing_yards_after_catch'].to_string(index=False)
    playerPassingFirstDowns = playerWeekData['passing_first_downs'].to_string(index=False)
    playerPassingEPA = playerWeekData['passing_epa'].to_string(index=False)# Expected Points Added measures how well a team performs compared to their expectation on a play-by-play basis
    playerPassing2ptConversions = playerWeekData['passing_2pt_conversions'].to_string(index=False)
    playerPACR = playerWeekData['pacr'].to_string(index=False)# PACR = passing_yards / passing_air_yards
    ############ ??? Statistics ??? Google These ############################
    playerDakota = playerWeekData['dakota'].to_string(index=False) # Adjusted EPA + CPOE composite based on coefficients which best predict adjusted EPA/play in the following year.
    ############ Rushing Statistics #########################
    playerCarries = playerWeekData['carries'].to_string(index=False)
    playerRushingYards = playerWeekData['rushing_yards'].to_string(index=False)
    playerRushingTds = playerWeekData['rushing_tds'].to_string(index=False)
    playerRushingFumbles = playerWeekData['rushing_fumbles'].to_string(index=False)
    playerRushingFumblesLost = playerWeekData['rushing_fumbles_lost'].to_string(index=False)
    playerRushingFirstDowns = playerWeekData['rushing_first_downs'].to_string(index=False)
    playerRushingEPA = playerWeekData['rushing_epa'].to_string(index=False)
    playerRushing2ptConversions = playerWeekData['rushing_2pt_conversions'].to_string(index=False)
    ############## Receiving Statistics ###################
    playerReceptions = playerWeekData['receptions'].to_string(index=False)
    playerTargets = playerWeekData['targets'].to_string(index=False)
    playerReceivingYards = playerWeekData['receiving_yards'].to_string(index=False)
    playerReceivingTds = playerWeekData['receiving_tds'].to_string(index=False)
    playerReceivingFumbles = playerWeekData['receiving_fumbles'].to_string(index=False)
    playerReceivingFumblesLost = playerWeekData['receiving_fumbles_lost'].to_string(index=False)
    playerReceivingAirYards = playerWeekData['receiving_air_yards'].to_string(index=False)
    playerReceivingYardsAfterCatch = playerWeekData['receiving_yards_after_catch'].to_string(index=False)
    playerReceivingFirstDowns = playerWeekData['receiving_first_downs'].to_string(index=False)
    playerReceivingEPA = playerWeekData['receiving_epa'].to_string(index=False)
    playerReceiving2ptConversions = playerWeekData['receiving_2pt_conversions'].to_string(index=False)
    playerRacr = playerWeekData['racr'].to_string(index=False)# ratio dividing receiving yards by total air yards
    playerTargetShare = playerWeekData['target_share'].to_string(index=False)
    playerAirYardsShare = playerWeekData['air_yards_share'].to_string(index=False)
    playerWopr = playerWeekData['wopr'].to_string(index=False)# WOPR = 1.5 × Target Market Share + 0.7 × Air Yards Market Share
    playerSpecialTeamsTds = playerWeekData['special_teams_tds'].to_string(index=False)
    playerFantasyPoints = playerWeekData['fantasy_points'].to_string(index=False)
    playerFantasyPointsPPR = playerWeekData['fantasy_points_ppr'].to_string(index=False)
    ###########################################################################

    playerTotalFumbles = playerWeekData['sack_fumbles'] + playerWeekData['rushing_fumbles'] + playerWeekData['receiving_fumbles']
    playerTotalFumblesStr = playerTotalFumbles.to_string(index=False)
    playerFumblesLost = playerWeekData['sack_fumbles_lost'] + playerWeekData['rushing_fumbles_lost'] + playerWeekData['receiving_fumbles_lost']
    playerFumblesLostStr = playerFumblesLost.to_string(index=False)

    cleanTargetSharePercent = playerWeekData['target_share'].iloc[0] * 100.0
    cleanTargetShare = round(cleanTargetSharePercent, 2)
    cleanTargetShareStr = str(cleanTargetShare)

    cleanAirYardSharePercent = playerWeekData['air_yards_share'].iloc[0] * 100.0
    cleanAirYardShare = round(cleanAirYardSharePercent, 2)
    cleanAirYardShareStr = str(cleanAirYardShare)

    cleanPACR = round(playerWeekData['pacr'], 2)
    cleanPACRStr = cleanPACR.to_string(index=False)

    cleanPassingEPA = round(playerWeekData['passing_epa'], 2)
    cleanPassingEPAStr = cleanPassingEPA.to_string(index=False)

    cleanRushingEPA = round(playerWeekData['rushing_epa'], 2)
    cleanRushingEPAStr = cleanRushingEPA.to_string(index=False)

    cleanReceivingEPA = round(playerWeekData['receiving_epa'], 2)
    cleanReceivingEPAStr = cleanReceivingEPA.to_string(index=False)

    cleanReceivingWOPR = round(playerWeekData['wopr'], 2)
    cleanReceivingWOPRStr = cleanReceivingWOPR.to_string(index=False)

    cleanReceivingRACR = round(playerWeekData['racr'], 2)
    cleanReceivingRACRStr = cleanReceivingRACR.to_string(index=False)

    cleanFantasyPointsPPR = round(playerWeekData['fantasy_points_ppr'].iloc[0], 2)
    cleanFantasyPointsPPRStr = str(cleanFantasyPointsPPR)
    

    # Example of a recap response for a QB
    if stat == 'recap':
        #print(playerImage)
        if playerPosition == 'QB':
            recap_data = {
                "image": playerImageURL,
                "player": cleanName,
                "week": cleanWeek,
                "season": playerSeason,
                "season_type": playerSeasonType,
                "team": playerTeam,
                "position": playerPosition,
                "opponent": playerOpponent,
                "dakota": playerDakota,
                "fantasy_points": playerFantasyPoints,
                "fantasy_points_ppr": cleanFantasyPointsPPRStr,
                "passing": {
                    "completions": playerCompletions,
                    "attempts": playerAttempts,
                    "yards": playerPassingYards,
                    "touchdowns": playerPassingTds,
                    # "2pt_conversions": playerPassing2ptConversions,
                    "sacks": playerSacksTaken,
                    "sack_yards": playerSackYardsTaken,
                    "passing_air_yards": playerPassingAirYards,
                    "passing_yards_after_catch": playerPassingYAC,
                    "passing_first_downs": playerPassingFirstDowns,
                    "passing_epa": cleanPassingEPAStr,
                    "pacr": cleanPACRStr,
                },
                "rushing": {
                    "carries": playerCarries,
                    "yards": playerRushingYards,
                    "touchdowns": playerRushingTds,
                    # "2pt_conversions": playerRushing2ptConversions,
                    "rushing_first_downs": playerRushingFirstDowns,
                    "rushing_epa": cleanRushingEPAStr,
                },
                # "receiving": {
                #     "receptions": playerReceptions,
                #     "targets": playerTargets,
                #     "yards": playerReceivingYards,
                #     "yards_after_catch": playerReceivingYardsAfterCatch,
                #     "touchdowns": playerReceivingTds,
                #     # "2pt_conversions": playerReceiving2ptConversions,
                #     "target_share": cleanTargetShareStr + "%",
                #     "receiving_air_yards": playerReceivingAirYards,
                #     "receiving_first_downs": playerReceivingFirstDowns,
                #     "receiving_epa": cleanReceivingEPAStr,
                #     "racr": cleanReceivingRACRStr,
                #     "air_yards_share": cleanAirYardShareStr + "%",
                #     "wopr": cleanReceivingWOPRStr,
                # },
                "turnovers": {
                    "interceptions": playerInterceptionsThrown,
                    "fumbles": playerTotalFumblesStr,
                    "fumbles_lost": playerFumblesLostStr
                },
                # "special_teams": {
                #     "touchdowns": playerSpecialTeamsTds
                # }
            }
        elif playerPosition == 'WR':
            recap_data = {
                "image": playerImageURL,
                "player": cleanName,
                "week": cleanWeek,
                "season": playerSeason,
                "season_type": playerSeasonType,
                "team": playerTeam,
                "position": playerPosition,
                "opponent": playerOpponent,
                "dakota": playerDakota,
                "fantasy_points": playerFantasyPoints,
                "fantasy_points_ppr": cleanFantasyPointsPPRStr,
                "passing": {
                    "completions": playerCompletions,
                    "attempts": playerAttempts,
                    "yards": playerPassingYards,
                    "touchdowns": playerPassingTds,
                    # "2pt_conversions": playerPassing2ptConversions,
                    "sacks": playerSacksTaken,
                    "sack_yards": playerSackYardsTaken,
                    "passing_air_yards": playerPassingAirYards,
                    "passing_yards_after_catch": playerPassingYAC,
                    "passing_first_downs": playerPassingFirstDowns,
                    "passing_epa": cleanPassingEPAStr,
                    "pacr": cleanPACRStr,
                },
                "rushing": {
                    "carries": playerCarries,
                    "yards": playerRushingYards,
                    "touchdowns": playerRushingTds,
                    # "2pt_conversions": playerRushing2ptConversions,
                    "rushing_first_downs": playerRushingFirstDowns,
                    "rushing_epa": cleanRushingEPAStr,
                },
                "receiving": {
                    "receptions": playerReceptions,
                    "targets": playerTargets,
                    "yards": playerReceivingYards,
                    "yards_after_catch": playerReceivingYardsAfterCatch,
                    "touchdowns": playerReceivingTds,
                    # "2pt_conversions": playerReceiving2ptConversions,
                    "target_share": cleanTargetShareStr + "%",
                    "receiving_air_yards": playerReceivingAirYards,
                    "receiving_first_downs": playerReceivingFirstDowns,
                    "receiving_epa": cleanReceivingEPAStr,
                    "racr": cleanReceivingRACRStr,
                    "air_yards_share": cleanAirYardShareStr + "%",
                    "wopr": cleanReceivingWOPRStr,
                },
                "turnovers": {
                    "interceptions": playerInterceptionsThrown,
                    "fumbles": playerTotalFumblesStr,
                    "fumbles_lost": playerFumblesLostStr
                },
                "special_teams": {
                    "touchdowns": playerSpecialTeamsTds
                }
            }
        elif playerPosition == 'RB':
            recap_data = {
                "image": playerImageURL,
                "player": cleanName,
                "week": cleanWeek,
                "season": playerSeason,
                "season_type": playerSeasonType,
                "team": playerTeam,
                "position": playerPosition,
                "opponent": playerOpponent,
                "dakota": playerDakota,
                "fantasy_points": playerFantasyPoints,
                "fantasy_points_ppr": cleanFantasyPointsPPRStr,
                "passing": {
                    "completions": playerCompletions,
                    "attempts": playerAttempts,
                    "yards": playerPassingYards,
                    "touchdowns": playerPassingTds,
                    # "2pt_conversions": playerPassing2ptConversions,
                    "sacks": playerSacksTaken,
                    "sack_yards": playerSackYardsTaken,
                    "passing_air_yards": playerPassingAirYards,
                    "passing_yards_after_catch": playerPassingYAC,
                    "passing_first_downs": playerPassingFirstDowns,
                    "passing_epa": cleanPassingEPAStr,
                    "pacr": cleanPACRStr,
                },
                "rushing": {
                    "carries": playerCarries,
                    "yards": playerRushingYards,
                    "touchdowns": playerRushingTds,
                    # "2pt_conversions": playerRushing2ptConversions,
                    "rushing_first_downs": playerRushingFirstDowns,
                    "rushing_epa": cleanRushingEPAStr,
                },
                "receiving": {
                    "receptions": playerReceptions,
                    "targets": playerTargets,
                    "yards": playerReceivingYards,
                    "yards_after_catch": playerReceivingYardsAfterCatch,
                    "touchdowns": playerReceivingTds,
                    # "2pt_conversions": playerReceiving2ptConversions,
                    "target_share": cleanTargetShareStr + "%",
                    "receiving_air_yards": playerReceivingAirYards,
                    "receiving_first_downs": playerReceivingFirstDowns,
                    "receiving_epa": playerReceivingEPA,
                    "racr": cleanReceivingRACRStr,
                    "air_yards_share": cleanAirYardShareStr + "%",
                    "wopr": cleanReceivingWOPRStr,
                },
                "turnovers": {
                    "interceptions": playerInterceptionsThrown,
                    "fumbles": playerTotalFumblesStr,
                    "fumbles_lost": playerFumblesLostStr
                },
                "special_teams": {
                    "touchdowns": playerSpecialTeamsTds
                }
            }
        elif playerPosition == 'TE':
            recap_data = {
                "image": playerImageURL,
                "player": cleanName,
                "week": cleanWeek,
                "season": playerSeason,
                "season_type": playerSeasonType,
                "team": playerTeam,
                "position": playerPosition,
                "opponent": playerOpponent,
                "dakota": playerDakota,
                "fantasy_points": playerFantasyPoints,
                "fantasy_points_ppr": cleanFantasyPointsPPRStr,
                "passing": {
                    "completions": playerCompletions,
                    "attempts": playerAttempts,
                    "yards": playerPassingYards,
                    "touchdowns": playerPassingTds,
                    # "2pt_conversions": playerPassing2ptConversions,
                    "sacks": playerSacksTaken,
                    "sack_yards": playerSackYardsTaken,
                    "passing_air_yards": playerPassingAirYards,
                    "passing_yards_after_catch": playerPassingYAC,
                    "passing_first_downs": playerPassingFirstDowns,
                    "passing_epa": cleanPassingEPAStr,
                    "pacr": cleanPACRStr,
                },
                "rushing": {
                    "carries": playerCarries,
                    "yards": playerRushingYards,
                    "touchdowns": playerRushingTds,
                    # "2pt_conversions": playerRushing2ptConversions,
                    "rushing_first_downs": playerRushingFirstDowns,
                    "rushing_epa": cleanRushingEPAStr,
                },
                "receiving": {
                    "receptions": playerReceptions,
                    "targets": playerTargets,
                    "yards": playerReceivingYards,
                    "yards_after_catch": playerReceivingYardsAfterCatch,
                    "touchdowns": playerReceivingTds,
                    # "2pt_conversions": playerReceiving2ptConversions,
                    "target_share": cleanTargetShareStr + "%",
                    "receiving_air_yards": playerReceivingAirYards,
                    "receiving_first_downs": playerReceivingFirstDowns,
                    "receiving_epa": playerReceivingEPA,
                    "racr": cleanReceivingRACRStr,
                    "air_yards_share": cleanAirYardShareStr + "%",
                    "wopr": cleanReceivingWOPRStr,
                },
                "turnovers": {
                    "interceptions": playerInterceptionsThrown,
                    "fumbles": playerTotalFumblesStr,
                    "fumbles_lost": playerFumblesLostStr
                },
                "special_teams": {
                    "touchdowns": playerSpecialTeamsTds
                }
            }
        elif playerName == 'Taysom Hill':
            recap_data = {
                "image": playerImageURL,
                "player": cleanName,
                "week": cleanWeek,
                "season": playerSeason,
                "season_type": playerSeasonType,
                "team": playerTeam,
                "position": playerPosition,
                "opponent": playerOpponent,
                "dakota": playerDakota,
                "fantasy_points": playerFantasyPoints,
                "fantasy_points_ppr": cleanFantasyPointsPPRStr,
                "passing": {
                    "completions": playerCompletions,
                    "attempts": playerAttempts,
                    "yards": playerPassingYards,
                    "touchdowns": playerPassingTds,
                    # "2pt_conversions": playerPassing2ptConversions,
                    "sacks": playerSacksTaken,
                    "sack_yards": playerSackYardsTaken,
                    "passing_air_yards": playerPassingAirYards,
                    "passing_yards_after_catch": playerPassingYAC,
                    "passing_first_downs": playerPassingFirstDowns,
                    "passing_epa": cleanPassingEPAStr,
                    "pacr": cleanPACRStr,
                },
                "rushing": {
                    "carries": playerCarries,
                    "yards": playerRushingYards,
                    "touchdowns": playerRushingTds,
                    # "2pt_conversions": playerRushing2ptConversions,
                    "rushing_first_downs": playerRushingFirstDowns,
                    "rushing_epa": cleanRushingEPAStr,
                },
                "receiving": {
                    "receptions": playerReceptions,
                    "targets": playerTargets,
                    "yards": playerReceivingYards,
                    "yards_after_catch": playerReceivingYardsAfterCatch,
                    "touchdowns": playerReceivingTds,
                    # "2pt_conversions": playerReceiving2ptConversions,
                    "target_share": cleanTargetShareStr + "%",
                    "receiving_air_yards": playerReceivingAirYards,
                    "receiving_first_downs": playerReceivingFirstDowns,
                    "receiving_epa": playerReceivingEPA,
                    "racr": cleanReceivingRACRStr,
                    "air_yards_share": cleanAirYardShareStr + "%",
                    "wopr": cleanReceivingWOPRStr,
                },
                "turnovers": {
                    "interceptions": playerInterceptionsThrown,
                    "fumbles": playerTotalFumblesStr,
                    "fumbles_lost": playerFumblesLostStr
                },
                "special_teams": {
                    "touchdowns": playerSpecialTeamsTds
                }
            }
        return jsonify(recap_data), 200
    
    else:
        playerWeekStatData = playerWeekData[stat].to_string(index=False)
        cleanStat = snakeToTitle(stat)
        response = {
            "stat": cleanStat,
            "value": playerWeekStatData
        }
        return jsonify(response), 200

def snakeToTitle(stat):
    return ' '.join([word.capitalize() for word in stat.split('_')])

    
# def main(request):
#     return app(request)   


if __name__ == "__main__":
    app.run(debug=True)