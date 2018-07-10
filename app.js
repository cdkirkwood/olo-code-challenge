const axios = require('axios')

const calculateMostPopular = table => {
  const tableArr = Object.entries(table)
  const sortedArr = tableArr.sort((first, second) => second[1] - first[1])
  return sortedArr.slice(0, 10)
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
