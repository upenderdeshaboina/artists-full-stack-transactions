import { Component } from 'react'
import './home.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
const initData=[
    {
        "id": 'sample1',
        "type": "credit",
        "amount": 5000,
        "description": "credited to office Account",
        "date": "02-17-2020",
        "running_balance": 5000
    },
    {
        "id": 'sample2',
        "type": "debit",
        "amount": 500,
        "description": "Snacks Party",
        "date": "02-18-2020",
        "running_balance": 4500
    },
    {
        "id": 'sample3',
        "type": "debit",
        "amount": 285,
        "description": "Printing sheets for office documents",
        "date": "02-18-2020",
        "running_balance": 4215
    },
    {
        "id": 'sample4',
        "type": "debit",
        "amount": 3000,
        "description": "Misc Expenses",
        "date": "02-20-2020",
        "running_balance": 1215
    }
]
class Home extends Component{
    state={transactions:[]}

    componentDidMount(){
        this.gettingData()
    }

    gettingData=async()=>{
        const url='https://assignment-backend-1-zw9g.onrender.com/transactions'
        const response=await fetch(url)
        if (response.ok){
            const jsonData=await response.json()
            this.setState({transactions:[...initData,...jsonData]})
        }
    }

    render(){
        const {transactions}=this.state
        console.log(transactions)
        return(
            <div className='home-container'>
                <h1 className='heading'>Transactions Management</h1>
                <div className='table-top-content'>
                    <p colSpan='3'>Office Transactions</p>
                    <Link to='/addtransaction'>
                        <button className='add-btn'>+ Add</button>
                    </Link>
                </div>
                <table className='transactions-table'>
                    <thread className='thread'>
                        <tr width='100'>
                            <th >date</th>
                            <th >Description</th>
                            <th >Credit</th>
                            <th >Debit</th>
                            <th >Running Balance</th>
                        </tr>
                    </thread>
                    <tbody className='body'>
                        {transactions.map((transaction)=>(
                            <tr key={transaction.id} className='table-content'>
                                <td>{transaction.date}</td>
                                <td>{transaction.description}</td>
                                <td>{transaction.type==='credit'?transaction.amount:''}</td>
                                <td>{transaction.type==='debit'?transaction.amount:''}</td>
                                <td>{transaction.running_balance}</td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Home