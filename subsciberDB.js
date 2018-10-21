const https = require('https');
tempMap = {};
var get_subscribers_function = () => {

  return new Promise((resolve, reject) => {
    https.get(`https://asarda1.wixsite.com/pay2play/_functions/myFunction/`, (resp) => {
      var subscribers = {}
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        //console.log(JSON.parse(data).explanation);
        var suba = JSON.parse(data).items;

        for(sub of suba) {
          subscribers[sub.steamAccountNo] = sub.balance
          tempMap[sub.steamAccountNo] = sub["_id"]
        }
        resolve(subscribers)
      });

    }).on("error", (err) => {
      reject(err.message);
    });
  })
}





var updateSubscribers = async(stakes) => {
  new_subs = {};

  return new Promise(async(resolve, reject)=>{
    var subscribers = await get_subscribers_function();
    for(var match in stakes) {

      for(var player in stakes[match]) {

        subscribers[player] = subscribers[player] + stakes[match][player];

      }


    }

    for (sub in subscribers) {
      new_subs[tempMap[sub]] = subscribers[sub]
    }

    console.log(new_subs)




    https.put(`https://asarda1.wixsite.com/pay2play/_functions/myUpdate/`, (resp) => {
      for(update in new_subs) => {
        //
      }

    }).on("error", (err) => {
      reject(err.message);
    });
    resolve(subscribers)
  });
}

//subscribers().then(console.log);

module.exports.get_subscribers_function = get_subscribers_function;
module.exports.updateSubscribers = updateSubscribers;
