import React, { useState, useRef, useContext, useEffect } from 'react';
import { Button, Modal, Form, Tabs, Tab } from 'react-bootstrap';
import { userContext } from './UserContext';
import { VictoryChart, VictoryAxis, VictoryBar } from 'victory';

function Expenses() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const user = useContext(userContext)

  const [expense, setExpense] = useState(user.categories.expenses);
  const expenseName = useRef();
  const expenseValue = useRef();

  user.categories.expenses = expense;

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  });

  let expenseCategoriesChart = [];

  Object.values(user.categories.expenses).forEach(categorie => {
    if(categorie.value > 0){
      expenseCategoriesChart.push(categorie)
    }
  })

  function handleSubmit(e){
    e.preventDefault();
  };

  return (
    <>
      <div className="d-flex justify-content-end mt-2 pe-3">
        <Button variant="light" className="rounded-0" onClick={handleShow} style={{width: 140, height: 40}}>
          Add expense
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add expense</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="expense_categorie">
                <Form.Label>Categorie</Form.Label>
                <Form.Select className="form-select" ref={expenseName}>
                  <option>Select categorie</option>
                    {Object.keys(user.categories.expenses).map((categorie) => (
                      <option key={categorie} value={user.categories.expenses[categorie].name}>{user.categories.expenses[categorie].name}</option>
                    ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="expense_amount">
                <Form.Label>Amount</Form.Label>
                <Form.Control type="number" step="0.01" min="0" ref={expenseValue}/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setExpense(
              expense.map(categorie =>
                categorie.name === expenseName.current.value ? 
                { ...categorie, value: categorie.value + parseFloat(expenseValue.current.value)}
                : 
                categorie)
              )}
            >Add</Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Tabs
        defaultActiveKey="expenses"
        id="categories-tabs"
        className=" mb-3 ms-2"
      >
        <Tab eventKey="expenses" title="Expenses">
          <VictoryChart
            domainPadding={30}
            padding={{ 
              top: 20, 
              bottom: 160, 
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
            data={expenseCategoriesChart}
            x="name"
            y="value"
            barWidth={10}
            style={{
              data: { 
                fill: "#0d6efd", 
                stroke: "#0b5ed7", 
                strokeWidth: 1 
            }}}
            animate={{ 
              duration: 1500 
            }}
          />
          </VictoryChart>
        </Tab>
      </Tabs>
    </>
  )
}

export default Expenses