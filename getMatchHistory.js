const https = require('https');


var getRecentMatches = async(playerId = 197955412) => {
  var recent_matches = [];
  return new Promise(async(resolve, reject) => {
    https.get(`https://api.opendota.com/api/players/${playerId}/recentMatches`, (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        //console.log(JSON.parse(data))
        recent_matches = JSON.parse(data).map(x => x.match_id);

        resolve(recent_matches);
      });


    }).on("error", (err) => {
      reject(err.message);
    });


  });

}



var getPlayers = async(matchID = 4178695088) => {
  var account_ids = {};
  return new Promise((resolve, reject) => {
    https.get(`https://api.opendota.com/api/matches/${matchID}`, (resp) => {
      let data = '';

      // A chunk of data has been received.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', async () => {

        kills = JSON.parse(data).players.map(x=> x.kills);
        deaths = JSON.parse(data).players.map(x=> x.deaths);
        assists = JSON.parse(data).players.map(x=> x.assists);
        //console.log(assists);
        players = JSON.parse(data).players;
        for(i=0;i<players.length;i++) {
          account_ids[players[i].account_id] = kills[i] +assists[i] - deaths[i];
        }
        //console.log(account_ids)
        resolve(account_ids);

      });

    }).on("error", (err) => {
      reject(err.message);
    });
  })
}
//getPlayers()
//getRecentMatches().then(console.log)
module.exports = {getPlayers: getPlayers, getRecentMatches: getRecentMatches}
