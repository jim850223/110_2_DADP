async function getCollectionStats(collection) {
  let test = await
    fetch(`https://api.opensea.io/api/v1/collection/${collection}/stats`, { method: "GET" })
      .then(response => {

        //If the status of the response is 404, then error is not necessary to happend, but the 
        //response.ok will be false, so I use it to determine wheather the collection is exist or not.
        if (!response.ok) {
          window.alert("The colletion doesn't exist!")
        }
        return response.json();
      }).then(result => {
        return result.stats;
      }).then(stats => {
        console.log(stats);
        return stats;
      })
  return test
}

async function printResult(result, collection) {
  table_final =
  `<tr>    
    <th>${count}</th>  
    <th>${collection}</th>`
  
  count++
  //To determine if there is no floor price
  try {
    floor_price = result.floor_price.toFixed(2);
  } catch {
    floor_price = "-"
  }

  table_final +=
    `<th><img src="img/eth.svg" width="20" height="20">${floor_price}</th>
    <th> <img src="img/eth.svg" width="20" height="20">${result.average_price.toFixed(3)}</th>`
  
  table_final +=
    `<th><img src="img/eth.svg" width="20" height="20">${result.one_day_average_price.toFixed(3)}</th>
    <th>${result.one_day_sales}</th>
    <th><img src="img/eth.svg" width="20" height="20">${result.seven_day_average_price.toFixed(3)}</th>
    <th>${result.seven_day_sales}</th>
    <th><img src="img/eth.svg" width="20" height="20">${result.thirty_day_average_price.toFixed(3)}</th>
    <th>${result.thirty_day_sales}</th>
  </tr>`

  table.innerHTML += table_final
}

async function addNewCollection(collection) {
  let result = await getCollectionStats(collection);
  printResult(result, collection)
}

count = 1


addNewCollection("azuki")
addNewCollection("zombieclub-token")

