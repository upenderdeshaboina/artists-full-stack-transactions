import { Component } from "react"
import { FaRegSave } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import './transaction.css'

class Transaction extends Component{
    state={
        type: "credit",
        amnt:0,
        description:"",
        date:"",isError:false
        ,ErrorMsg:''
    }

    onSelectOption=event=>{
        this.setState({type:event.target.value})
    }

    onChangeAmount=event=>{
        this.setState({amnt:event.target.value})
    }

    onChangeDescription=event=>{
        this.setState({description:event.target.value})
    }

    submittingForm=async event=>{
        event.preventDefault()
        const {type,date,description,amnt}=this.state
        const changeAmount=parseFloat(amnt)
        const data={type,date,description,amount:changeAmount}
        console.log(data)
        const url='https://assignment-backend-1-zw9g.onrender.com/transactions'
        const options={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        }
        try {
            const response=await fetch(url,options)
            const {history}=this.props
            if (response.ok){
                const jsonData=await response.json()
                console.log(`transaction added: ${jsonData}`)
                history.replace('/')
                this.setState({date:'',amount:0,type:'credit',description:'',isError:false})
            }else{
                const jsonData=await response.json()
                console.log('error',jsonData)
            }
        } catch (error) {
            this.setState({ErrorMsg:`Error : ${error}`})
        }
        
    }

    onChangeDate=event=>{
        const date=event.target.value
        const [year,month,day]=date.split('-')
        const finalDate=`${month}-${day}-${year}`
        this.setState({date:finalDate})
    }

    onClickRedirect=()=>{
        const {history}=this.props
        history.replace('/')
    }
    render(){
        const {amnt,description,date,isError,ErrorMsg}=this.state
        return (
            <div className="transaction-container">
                <h1 className="fill-heading">Fill details of your Transaction</h1>
                <form onSubmit={this.submittingForm} className="form">
                    <h3>Complete the Details</h3>
                    <div className="select-div">
                        <label htmlFor="select">Transaction Type:</label>
                        <select className="selecting" id="select" onChange={this.onSelectOption}>
                            <option value='credit'>Credit</option>
                            <option value='debit'>Debit</option>
                        </select>
                    </div>
                    <div className="input-div">
                        <label htmlFor="amount">Amount:</label>
                        <input type="text" className="input-el" onChange={this.onChangeAmount} id='amount' value={amnt}/>
                    </div>
                    <div className="input-div">
                        <label htmlFor="description">Description:</label>
                        <textarea type="text" className="area-el" onChange={this.onChangeDescription} id='description' value={description}></textarea>
                    </div>
                    <div className="input-div">
                        <label htmlFor="date">Date:</label>
                        <input type='date' onChange={this.onChangeDate} id="date" className="date-el"/>
                    </div>
                    <div className="btns-container">
                        <button type="submit" className="save-btn"><FaRegSave className="icon"/> Save</button>
                        <button type="button" className="cancel-btn" onClick={this.onClickRedirect}><ImCross className="icon-cancel"/> Cancel</button>
                    </div>
                    {isError&&<p>Error: {ErrorMsg}</p>}
                </form>

            </div>
        )
    }
}

export default Transaction