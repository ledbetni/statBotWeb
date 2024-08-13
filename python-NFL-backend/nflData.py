import datetime
import pandas as pd
import numpy as np
import rpy2.robjects as robjects
from rpy2.robjects.packages import importr
import nfl_data_py as nfl
import os
import urllib.request
import matplotlib.pyplot as pit
from matplotlib.offsetbox import AnnotationBbox
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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

    ### Parse all relevant stats for all positions weekly recap ####
    playerImage = playerWeekData['headshot_url']
    playerImageURL = playerImage.iloc[0]
    playerPosition = playerWeekData['position'].to_string(index=False)
    playerTeam = playerWeekData['recent_team'].to_string(index=False)
    playerSeason = playerWeekData['season'].to_string(index=False)
    playerOpponent = playerWeekData['opponent_team'].to_string(index=False)
    playerCompletions = playerWeekData['completions'].to_string(index=False)
    playerAttempts = playerWeekData['attempts'].to_string(index=False)
    playerPassingYards = playerWeekData['passing_yards'].to_string(index=False)
    playerPassingTds = playerWeekData['passing_tds'].to_string(index=False)
    playerInterceptionsThrown = playerWeekData['interceptions'].to_string(index=False)
    playerSacksTaken = playerWeekData['sacks'].to_string(index=False)
    playerSackYardsTaken = playerWeekData['sack_yards'].to_string(index=False)
    playerSackFumbles = playerWeekData['sack_fumbles'].to_string(index=False)
    playerSackFumblesLost = playerWeekData['sack_fumbles_lost'].to_string(index=False)
    playerPassing2ptConversions = playerWeekData['passing_2pt_conversions'].to_string(index=False)
    playerCarries = playerWeekData['carries'].to_string(index=False)
    playerRushingYards = playerWeekData['rushing_yards'].to_string(index=False)
    playerRushingTds = playerWeekData['rushing_tds'].to_string(index=False)
    playerRushingFumbles = playerWeekData['rushing_fumbles'].to_string(index=False)
    playerRushingFumblesLost = playerWeekData['rushing_fumbles_lost'].to_string(index=False)
    playerRushing2ptConversions = playerWeekData['rushing_2pt_conversions'].to_string(index=False)
    playerReceptions = playerWeekData['receptions'].to_string(index=False)
    playerTargets = playerWeekData['targets'].to_string(index=False)
    playerReceivingYards = playerWeekData['receiving_yards'].to_string(index=False)
    playerReceivingTds = playerWeekData['receiving_tds'].to_string(index=False)
    playerReceivingFumbles = playerWeekData['receiving_fumbles'].to_string(index=False)
    playerReceivingFumblesLost = playerWeekData['receiving_fumbles_lost'].to_string(index=False)
    playerYardsAfterCatch = playerWeekData['receiving_yards_after_catch'].to_string(index=False)
    playerReceiving2ptConversions = playerWeekData['receiving_2pt_conversions'].to_string(index=False)
    playerTargetShare = playerWeekData['target_share'].to_string(index=False)
    playerSpecialTeamsTds = playerWeekData['special_teams_tds'].to_string(index=False)
    playerFantasyPPR = playerWeekData['fantasy_points_ppr'].to_string(index=False)
    ###########################################################################

    playerTotalFumbles = playerWeekData['sack_fumbles'] + playerWeekData['rushing_fumbles'] + playerWeekData['receiving_fumbles']
    playerTotalFumblesStr = playerTotalFumbles.to_string(index=False)
    playerFumblesLost = playerWeekData['sack_fumbles_lost'] + playerWeekData['rushing_fumbles_lost'] + playerWeekData['receiving_fumbles_lost']
    playerFumblesLostStr = playerFumblesLost.to_string(index=False)

    cleanTargetShare = playerWeekData['target_share'] * 100
    cleanShare = cleanTargetShare.to_string(index=False)

    # Example of a recap response for a QB
    if stat == 'recap':
        #print(playerImage)
        if playerPosition == 'QB':
            recap_data = {
                "image": playerImageURL,
                "player": cleanName,
                "week": cleanWeek,
                "season": playerSeason,
                "team": playerTeam,
                "position": playerPosition,
                "opponent": playerOpponent,
                "passing": {
                    "completions": playerCompletions,
                    "attempts": playerAttempts,
                    "yards": playerPassingYards,
                    "touchdowns": playerPassingTds,
                    "2pt_conversions": playerPassing2ptConversions,
                    "sacks": playerSacksTaken,
                    "sack_yards": playerSackYardsTaken
                },
                "rushing": {
                    "carries": playerCarries,
                    "yards": playerRushingYards,
                    "touchdowns": playerRushingTds,
                    "2pt_conversions": playerRushing2ptConversions
                },
                "receiving": {
                    "receptions": playerReceptions,
                    "targets": playerTargets,
                    "yards": playerReceivingYards,
                    "yards_after_catch": playerYardsAfterCatch,
                    "touchdowns": playerReceivingTds,
                    "2pt_conversions": playerReceiving2ptConversions,
                    "target_share": cleanShare + "%"
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
        elif playerPosition == 'WR':
            recap_data = {
                "image": playerImageURL,
                "player": cleanName,
                "week": cleanWeek,
                "season": playerSeason,
                "team": playerTeam,
                "position": playerPosition,
                "opponent": playerOpponent,
                "passing": {
                    "completions": playerCompletions,
                    "attempts": playerAttempts,
                    "yards": playerPassingYards,
                    "touchdowns": playerPassingTds,
                    "2pt_conversions": playerPassing2ptConversions,
                    "sacks": playerSacksTaken,
                    "sack_yards": playerSackYardsTaken
                },
                "rushing": {
                    "carries": playerCarries,
                    "yards": playerRushingYards,
                    "touchdowns": playerRushingTds,
                    "2pt_conversions": playerRushing2ptConversions
                },
                "receiving": {
                    "receptions": playerReceptions,
                    "targets": playerTargets,
                    "yards": playerReceivingYards,
                    "yards_after_catch": playerYardsAfterCatch,
                    "touchdowns": playerReceivingTds,
                    "2pt_conversions": playerReceiving2ptConversions,
                    "target_share": cleanShare + "%"
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
                "team": playerTeam,
                "position": playerPosition,
                "opponent": playerOpponent,
                "passing": {
                    "completions": playerCompletions,
                    "attempts": playerAttempts,
                    "yards": playerPassingYards,
                    "touchdowns": playerPassingTds,
                    "2pt_conversions": playerPassing2ptConversions,
                    "sacks": playerSacksTaken,
                    "sack_yards": playerSackYardsTaken
                },
                "rushing": {
                    "carries": playerCarries,
                    "yards": playerRushingYards,
                    "touchdowns": playerRushingTds,
                    "2pt_conversions": playerRushing2ptConversions
                },
                "receiving": {
                    "receptions": playerReceptions,
                    "targets": playerTargets,
                    "yards": playerReceivingYards,
                    "yards_after_catch": playerYardsAfterCatch,
                    "touchdowns": playerReceivingTds,
                    "2pt_conversions": playerReceiving2ptConversions,
                    "target_share": cleanShare + "%"
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
                "team": playerTeam,
                "position": playerPosition,
                "opponent": playerOpponent,
                "passing": {
                    "completions": playerCompletions,
                    "attempts": playerAttempts,
                    "yards": playerPassingYards,
                    "touchdowns": playerPassingTds,
                    "2pt_conversions": playerPassing2ptConversions,
                    "sacks": playerSacksTaken,
                    "sack_yards": playerSackYardsTaken
                },
                "rushing": {
                    "carries": playerCarries,
                    "yards": playerRushingYards,
                    "touchdowns": playerRushingTds,
                    "2pt_conversions": playerRushing2ptConversions
                },
                "receiving": {
                    "receptions": playerReceptions,
                    "targets": playerTargets,
                    "yards": playerReceivingYards,
                    "yards_after_catch": playerYardsAfterCatch,
                    "touchdowns": playerReceivingTds,
                    "2pt_conversions": playerReceiving2ptConversions,
                    "target_share": cleanShare + "%"
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
        # Add elif conditions for other positions (RB, WR, TE) here, following a similar structure
    
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

    
    


if __name__ == "__main__":
    app.run(debug=True)