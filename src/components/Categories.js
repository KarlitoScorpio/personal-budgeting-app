import React, { useState, useRef, useContext, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { userContext } from './UserContext';
import { VictoryChart, VictoryAxis, VictoryBar } from 'victory';

function Categories() {

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const user = useContext(userContext);

  const [incomeCategories, setIncomeCategories] = useState(user.categories.incomes);
  const [expenseCategories, setExpenseCategories] = useState(user.categories.expenses);

  const newIncomeCategorie = useRef();
  const newExpenseCategorie  = useRef();

  user.categories.incomes = incomeCategories;
  user.categories.expenses = expenseCategories;

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  });

  let incomesExpensesChart = [];

  Object.values(user.categories.incomes).forEach(categorie => {
    if(categorie.value > 0){
      incomesExpensesChart.push(categorie)
    }
  })

  Object.values(user.categories.expenses).forEach(categorie => {
    if(categorie.value > 0){
      incomesExpensesChart.push(categorie)
    }
  })

  function handleSubmit(e){
    e.preventDefault();
  };

  return (
    <>
      <div className="d-flex justify-content-end mt-2 pe-3">
        <Button variant="light" onClick={handleShow1} className="rounded-0" style={{width: 200, height: 40}}>
          Add income categorie
        </Button>

        <Modal
          show={show1}
          onHide={handleClose1}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add income categorie</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="categorie_name">
                <Form.Label>Categorie</Form.Label>
                <Form.Control type="text" ref={newIncomeCategorie} onChange={(e) => console.log(e.target.value)} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setIncomeCategories([...incomeCategories, {name: newIncomeCategorie.current.value, value: 0}])} className="rounded-0">Add</Button>
          </Modal.Footer>
        </Modal>

        <Button variant="light" onClick={handleShow2} className="rounded-0" style={{width: 200, height: 40, marginLeft: 5}}>
          Add expense categorie
        </Button>

        <Modal
          show={show2}
          onHide={handleClose2}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add expense categorie</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="categorie_name">
                <Form.Label>Categorie</Form.Label>
                <Form.Control type="text" ref={newExpenseCategorie} onChange={(e) => console.log(e.target.value)} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setExpenseCategories([...expenseCategories, {name: newExpenseCategorie.current.value, value: 0}])} className="rounded-0">Add</Button>
          </Modal.Footer>
        </Modal>
      </div>
      <VictoryChart
        domainPadding={{ x: 10 }}
        padding={{ 
          top: 20, 
          bottom: 143, 
          left: 50, 
          right: 50 
        }}
      >
        <VictoryAxis
            style={{ 
              tickLabels:{
                fontSize: 5, 
                padding: 3
            }}}
          />
          <VictoryAxis
            dependentAxis
            style={{ 
              ticks: {
                stroke: "black", 
                size: 2
              },
              tickLabels:{
                fontSize: 6, 
                padding: 3
              }}}
              tickFormat={(t) => `${Math.round(t)}$`}
          />
        <VictoryBar 
          horizontal
          data={incomesExpensesChart}
          x="name"
          y="value"
          sortKey="y"
          sortOrder="ascending"
          style={{
            data: { 
              fill: "#0d6efd", 
              stroke: "#0b5ed7", 
              strokeWidth: 1 
            }
          }}
          barWidth={10}
          animate={{ 
            duration: 1500 
          }}
        />
      </VictoryChart>
    </>
  )
}

export default Categories