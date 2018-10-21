var calculateStakes = require('./calculateStakes');
var {updateSubscribers} = require('./subsciberDB.js');
value_bid = 5;

const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000


app.get('/', (req, res) => res.send('Server is up and distributing payments!'))

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))

var distributePrize = async() => {

  return new Promise(async(resolve, reject) => {
    var stakes = await calculateStakes();
    for(var match in stakes) {
      total=await Object.values(stakes[match]).reduce((a,b)=>a+b,0);
      for(var player in stakes[match]) {
        //console.log(player, stakes[match])

        //console.log(stakes[match][player],total)
        //console.log(Object.values(stakes[match]).length)
        stakes[match][player] = await ((stakes[match][player])/total)*(value_bid*Object.values(stakes[match]).length);
      }
    }
    //console.log(stakes)
    updateSubscribers(stakes).then((updated_subs) => {
      resolve(updated_subs);
    });
  })
}

//add code to update updateSubscribers

//add code to update processed-matches
distributePrize().then(console.log)

module.exports = distributePrize;
