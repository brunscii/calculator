/*----------------------------------------------------------------
##################################################################
Author: Chris Carlin
Description: This is a simple calculator built using React as 
the frontend framework. This also uses math.js to calculate,
why rewrite a math parser for the millionth time

##################################################################
---------------------------------------------------------------*/

// Handled by babel
// import CalculatorBody from "./calculator-body"
// import React from "react"
// import math from "./math.js"
/*----------------------------------------------------------------
This is the display component for the Calculator. It shows the 
input form the keypad thats held in the CalculatorBody class.
The display component also holds a display for the formula that
will act as a lof of the calculations entered before pressing equals.
*/
class Display extends React.Component {
    static defaultProps = {
        input: '',
        formula: ''
    }
    constructor(props) {
        super(props);
        this.state = {
            formula: props.formula,
            showZero: true
        }
    }

    render() {
        return (
            <div id="disp">
                    <label className="display" id='formula-display' >{this.props.formula || 0}</label>
                    <label className='display' id='display' >{this.props.input || 0}</label>
            </div>
        )
    }
}

/*----------------------------------------------------------------
This is the component for the body of the calculator.
It contains the keys a that the user will use to interact with the 
calculator. This sends the button values back to the Calculator 
class but using the handleClick function that exists in the 
Calculator class. 
*/
class CalculatorBody extends React.Component {
    static defaultProps ={
        handleClick: null,
        input: '',
        formula: ''

    }
    constructor(props) {
        super(props);
        this.state = {
            input: props.input,
            formula: props.formula
        }
    }
    render(){
        return (

            <div id="calculator-body">
                
                <button id="clear"      className='red'     type="button" onClick={this.props.handleClick} value='C'>C</button>
                <button id="square"     className='func'    type="button" onClick={this.props.handleClick} value='^'>x^</button>
                <button id="sqroot"     className='func'    type="button" onClick={this.props.handleClick} value='sqrt()'>sq(x)</button>
                <button id="divide"     className='func'    type="button" onClick={this.props.handleClick} value='/'>/</button>
                
                <button id="seven"      className='number'  type="button" onClick={this.props.handleClick} value='7'>7</button>
                <button id="eight"      className='number'  type="button" onClick={this.props.handleClick} value='8'>8</button>
                <button id="nine"       className='number'  type="button" onClick={this.props.handleClick} value='9'>9</button>
                <button id="multiply"   className='func'    type="button" onClick={this.props.handleClick} value='*'>X</button>
                
                
                <button id="four"       className='number'  type="button" onClick={this.props.handleClick} value='4'>4</button>
                <button id="five"       className='number'  type="button" onClick={this.props.handleClick} value='5'>5</button>
                <button id="six"        className='number'  type="button" onClick={this.props.handleClick} value='6'>6</button>
                <button id="subtract"   className='func'    type="button" onClick={this.props.handleClick} value='-'>-</button>
                
                <button id="one"        className='number'  type="button" onClick={this.props.handleClick} value='1'>1</button>
                <button id="two"        className='number'  type="button" onClick={this.props.handleClick} value='2'>2</button>
                <button id="three"      className='number'  type="button" onClick={this.props.handleClick} value='3'>3</button>
                <button id="add"        className='func'    type="button" onClick={this.props.handleClick} value='+'>+</button>
                
                
                <button id="sign"       className='func'    type="button" onClick={this.props.handleClick} value='neg'>+/-</button>
                <button id="zero"       className='number'  type="button" onClick={this.props.handleClick} value='0'>0</button>
                <button id="decimal"    className='func'    type="button" onClick={this.props.handleClick} value='.'>.</button>
                <button id="equals"     className='equals'  type="button" onClick={this.props.handleClick} value='equals'>=</button>
            </div>
        )
    }

}


/*----------------------------------------------------------------
The is the Calculator component that acts as a container for the 
calculator body and display. This is where the state and the 
calculations are held.
*/
class Calculator extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            input: '',
            formula: ''
        }
        this.handleClick = this.handleClick.bind(this)
        this.setFormula = this.setFormula.bind(this)
        this.evaluate = this.evaluate.bind(this)
    }


    setFormula(op){
        this.setState(state=>({
            formula: state.formula + (state.input + op),
            input: ''
        }))
    }

    evaluate(expression){
        return expression
    }

    /*------------------------------------------------------------
    Handles the button presses by sending the event value here.
    This allows us to set the state for input and formula and for 
    thus causing the display to update.
    */
    handleClick = (e)=>{
        const operators = ['+', '-', '*', '/',]
        //if the event value is a number and either not zero or the input is not empty
        if(e.target.className == 'number' && (e.target.value != '0' || this.state.input !='')){
            this.setState(state=>({input: state.input + e.target.value}))
        }else{
            switch(e.target.value){
                case 'neg':
                    this.setState(state=>({
                        input: state.input ? (parseInt(state.input || 0) * -1).toString() : '-' 
                    }))
                    break;
               
                case '+':
                case '*':
                case '/':
                case '^':
                    if(this.state.input && this.state.input != '-' ){
                        this.setFormula(e.target.value)
                    }else if(this.state.input =='-'){
                        this.setState({input:''})
                        this.setState(state=>({
                            formula: state.formula.slice(0,state.formula.length-1)+e.target.value
                        }))
                    }else{
                        //remove the last operator added to formula and add the new one
                        this.setState(state=>({
                            formula: state.formula.slice(0,state.formula.length-1)+e.target.value
                        }))
                    } 
                    break;
                case '.':
                    this.setState(state=>({
                        input: !state.input.includes('.') ? state.input + '.' : state.input
                    }))
                    break;
                case '-':
                        if (!this.state.input) {
                            this.setState(state=>({
                                input: state.input ? (parseInt(state.input || 0) * -1).toString() : '-' 
                            }))
                        }else{
                            this.setFormula(e.target.value)
                        }
                        break
                case 'C':
                    this.setState({
                        input: '',
                        formula: ''
                    })
                    break;
                case 'equals':
                    this.setState(state=>({
                        input: (math.evaluate(this.state.formula + this.state.input)),
                        formula: ''
                    }))
                    break;
                case 'sqrt()':
                    this.setState(state=>({
                        input: (math.sqrt(this.state.input)),
                        formula: this.state.formula
                    }))
                    break;
                
            }
        }

    }

    render(){
        return (
            <div id="calculator">
                <Display input={this.state.input} formula={this.state.formula}/>
                <CalculatorBody handleClick={this.handleClick}/>
                {/* <p>{this.state.input}</p> */}
            </div>
        )
    }
    }

//This is typically in App.js
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
        <div >
            <Calculator/>
        </div>
    

)