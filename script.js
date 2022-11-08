/*----------------------------------------------------------------
##################################################################
Author: Chris Carlin
Description: This is a simple calculator built using React as 
the frontend framework. 

##################################################################
---------------------------------------------------------------*/


// import CalculatorBody from "./calculator-body"
// import React from "react"



/*----------------------------------------------------------------
This is the display component for the Calculator. It shows the 
input form the keypad thats held in the CalculatorBody class.
The display component also holds a display for the formula that
will act as a lof of the calculations entered before pressing equals.
*/
class Display extends React.Component {
    static defaultProps = {
        input: '0',
        formula: '0'
    }
    constructor(props) {
        super(props);
        this.state = {
            input: props.input,
            formula: props.formula
        }
    }

    render() {
        return (
            <div id="disp">
                    <label className="display" id='formula-display'>{this.state.formula}</label>
                    <label className='display' id='display'>{this.props.input}</label>
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
        input: '0',
        formula: '0'

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
                
                <button id="clear"      className='red'     type="button" onClick={this.props.handleClick}>C</button>
                <button id="square"     className='func'    type="button" onClick={this.props.handleClick}>x^</button>
                <button id="root"       className='func'    type="button" onClick={this.props.handleClick}>sq(x)</button>
                <button id="divide"     className='func'    type="button" onClick={this.props.handleClick}>/</button>
                
                <button id="seven"      className='number'  type="button" onClick={this.props.handleClick} value='7'>7</button>
                <button id="eight"      className='number'  type="button" onClick={this.props.handleClick} value='8'>8</button>
                <button id="nine"       className='number'  type="button" onClick={this.props.handleClick} value='9'>9</button>
                <button id="multiply"   className='func'    type="button" onClick={this.props.handleClick}>X</button>
                
                
                <button id="four"       className='number'  type="button" onClick={this.props.handleClick} value='4'>4</button>
                <button id="five"       className='number'  type="button" onClick={this.props.handleClick} value='5'>5</button>
                <button id="six"        className='number'  type="button" onClick={this.props.handleClick} value='6'>6</button>
                <button id="subtract"   className='func'    type="button" onClick={this.props.handleClick}>-</button>
                
                <button id="one"        className='number'  type="button" onClick={this.props.handleClick} value='1'>1</button>
                <button id="two"        className='number'  type="button" onClick={this.props.handleClick} value='2'>2</button>
                <button id="three"      className='number'  type="button" onClick={this.props.handleClick} value='3'>3</button>
                <button id="add"        className='func'    type="button" onClick={this.props.handleClick}>+</button>
                
                
                <button id="sign"       className='func'    type="button" onClick={this.props.handleClick}>+/-</button>
                <button id="zero"       className='number'  type="button" onClick={this.props.handleClick} value='0'>0</button>
                <button id="decimal"    className='func'    type="button" onClick={this.props.handleClick}>.</button>
                <button id="equals"     className='equals' type="button">=</button>
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
            input: 0,
            formula: 0
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick = (e)=>{
        this.setState(state=>({input: state.input + e.target.value}))
        console.log(this.state.input)
    }

    render(){
        return (
            <div id="calculator">
                <Display input={this.state.input}/>
                <CalculatorBody handleClick={this.handleClick}/>
            </div>
        )
    }
    }


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
        <div >
            <Calculator/>
        </div>
    

)