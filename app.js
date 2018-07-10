const axios = require('axios')

const calculateMostPopular = table => {
  const tableArr = Object.entries(table)
  const sortedArr = tableArr.sort((first, second) => second[1] - first[1])
  const topTenToppings = sortedArr.slice(0, 20)
  return topTenToppings.reduce((finalArray, curTopping, index) => {
    const toppingsString = curTopping[0]
    const newObj = {
      rank: index + 1,
      toppings: toppingsString.split(','),
      populaity: curTopping[1]
    }
    finalArray.push(newObj)
    return finalArray
  }, [])
}

const generateHashTable = orders => {
  const ordersTable = {}
  orders.forEach(order => {
    const sortedToppingsString = order.toppings.sort().join()
    if (!ordersTable[sortedToppingsString]) ordersTable[sortedToppingsString] = 1
    else ordersTable[sortedToppingsString] = ordersTable[sortedToppingsString] + 1
  })
  return calculateMostPopular(ordersTable)
}

const getFile = () => {
  return axios.get('http://files.olo.com/pizzas.json')
    .then(file => {
      return generateHashTable(file.data)
    })
}

getFile()
  .then(result => console.log(result))
