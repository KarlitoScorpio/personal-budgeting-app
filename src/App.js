import { useState } from 'react';
import { Container, Row, Button, ButtonGroup } from 'react-bootstrap';
import { user, userContext } from './components/UserContext';
import Balance from './components/Balance';
import Incomes from './components/Incomes';
import Expenses from './components/Expenses';
import Categories from './components/Categories';

function App() {

  const [balanceBtn, setBalanceBtn] = useState(true)
  const [incomesBtn, setIncomesBtn] = useState(false)
  const [expensesBtn, setExpensesBtn] = useState(false)
  const [categoriesBtn, setCategoriesBtn] = useState(false)

  return (
    <div>
      <Container fluid className="m-0 p-0 vw-100 vh-100 overflow-hidden">
        <Row className="m-0 p-0" >
          <ButtonGroup className="m-0 p-0">
            <img src={user.image} alt="user" className="m-0 p-0 rounded-circle" style={{width: 60, height: 38}}></img>
            <Button variant="primary" className="rounded-0" onClick={() => {setBalanceBtn(true); setIncomesBtn(false); setExpensesBtn(false); setCategoriesBtn(false)}}>Balance</Button>
            <Button variant="primary" className="rounded-0" onClick={() => {setBalanceBtn(false); setIncomesBtn(true); setExpensesBtn(false); setCategoriesBtn(false)}}>Incomes</Button>
            <Button variant="primary" className="rounded-0" onClick={() => {setBalanceBtn(false); setIncomesBtn(false); setExpensesBtn(true); setCategoriesBtn(false)}}>Expenses</Button>
            <Button variant="primary" className="rounded-0" onClick={() => {setBalanceBtn(false); setIncomesBtn(false); setExpensesBtn(false); setCategoriesBtn(true)}}>Categories</Button>
            <div  className="d-flex justify-content-center align-items-center" style={{width: 60}}>Log out</div>
          </ButtonGroup>
        </Row>
        <Row>
          <userContext.Provider value={user}>
            {balanceBtn ? <Balance /> : ""}
            {incomesBtn ? <Incomes /> : ""}
            {expensesBtn ? <Expenses /> : ""}
            {categoriesBtn ? <Categories /> : ""}
          </userContext.Provider>
        </Row>
      </Container>
    </div>
  );
}

export default App;