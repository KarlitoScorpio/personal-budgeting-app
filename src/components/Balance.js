import React, { useContext } from 'react'
import { Card } from 'react-bootstrap'
import { userContext } from './UserContext'
import { VictoryPie } from 'victory';

function Balance() {

  const user = useContext(userContext)

  let incomeCategoriesChart = [];
  let expenseCategoriesChart = [];

  Object.values(user.categories.incomes).forEach(categorie => {
    if(categorie.value > 0){
      incomeCategoriesChart.push(categorie)
    }
  })

  Object.values(user.categories.expenses).forEach(categorie => {
    if(categorie.value > 0){
      expenseCategoriesChart.push(categorie)
    }
  })

  let incomeSum = 0;
  let expenseSum = 0;

  Object.values(user.categories.incomes).map(categorie => (
    incomeSum += categorie.value
  ))

  Object.values(user.categories.expenses).map(categorie => (
    expenseSum += categorie.value
  ))

  return (
    <>
      <div className="mt-1 ms-1">{user.name} {user.surname}, welcome!</div>
      <div className="d-flex justify-content-evenly mt-5">
        <Card className="text-center rounded-0">
          <Card.Header>Incomes</Card.Header>
          <Card.Body>
            <VictoryPie
              colorScale={["red", "orange", "gold", "cyan", "navy", "green", "purple", "brown", "blue", "silver"]}
              data={incomeCategoriesChart}
              x="name"
              y="value"
              width={600}
              labels={({ datum }) => `${datum.name}: ${datum.value}$`}
              labelPosition="centroid"
              style={{
                data: {
                  stroke: "gray", strokeWidth: 1
                }
              }}
            />
          </Card.Body>
          <Card.Footer>Amount: {incomeSum}$</Card.Footer>
        </Card>
        <Card className="text-center rounded-0">
        <Card.Header>Expenses</Card.Header>
          <Card.Body>
            <VictoryPie
              colorScale={["red", "orange", "gold", "cyan", "navy", "green", "purple", "brown", "blue", "silver"]}
              data={expenseCategoriesChart}
              x="name"
              y="value"
              width={600}
              labels={({ datum }) => `${datum.name}: ${datum.value}$`}
              labelPosition="centroid"
              style={{
                data: {
                  stroke: "white", strokeWidth: 1
                }
              }}
            />
          </Card.Body>
          <Card.Footer>Amount: {expenseSum}$</Card.Footer>
        </Card>
      </div>
      <div className="mt-4 d-flex justify-content-center">Your account balance: {incomeSum - expenseSum}$</div>
    </>
  )
}

export default Balance