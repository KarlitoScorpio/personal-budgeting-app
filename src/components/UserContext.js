import { createContext } from "react"
import userImg from '../assets/ja.png'

export const user = {
    id: 1234567890,
    name: "Karlo",
    surname: "Šimunec",
    image: userImg,
    categories: {
      incomes: [
  	    {name: "Job", value: 0},
  	    {name: "Fee", value: 0},
  	    {name: "Gifts", value: 0}
      ],
      expenses: [
        {name: "Clothes", value: 0},
  	    {name: "Shoes", value: 0},
  	    {name: "Bar", value: 0},
        {name: "Restaurant", value: 0},
  	    {name: "Anuity", value: 0},
  	    {name: "Traveling", value: 0},
        {name: "Food", value: 0},
  	    {name: "Gas", value: 0}
      ]
    }
  }

  localStorage.setItem("user", JSON.stringify(user));

  export const userContext = createContext(user)