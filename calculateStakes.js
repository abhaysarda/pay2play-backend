var {getPlayers, getRecentMatches} = require('./getMatchHistory.js');
var {get_subscribers_function} = require('./subsciberDB.js');

stakeCalculator = async() => {
  return new Promise(async (resolve, reject) => {
    var subscribers = await get_subscribers_function();
    pool = {};
    for (var sub in subscribers) {

    await getRecentMatches(sub).then(async(matches) => {
      matches = matches.slice(0,2)
      for(match of matches) {
        players = await getPlayers(matchID=match)
        if(pool[match]===undefined) {
          pool[match] = {[sub]: players[sub]};
        }else{
          pool[match][sub] = players[sub];
        }
      }
    })

  }
  resolve(pool)
  })
}


module.exports = stakeCalculator;
