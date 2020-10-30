import React, { useState } from 'react';
import Formula from './Formula';
import Output from './Output';
import Buttons from './Buttons'
import { isOperator, endsWithNegativeSign, endsWithOperator } from '../constant';

const Calculator = () => {
    
    
    const defaultData = {
        currentVal: '0',
        prevVal: '0',
        formula: '',
        currentSign: 'pos',
        lastClicked: ''
      }
    const [data, setData] = useState(defaultData);

    function initialize() {
        setData({...defaultData, evaluated: false});
    }
    function maxDigitWarning () {
        setData((prevState) => ({...prevState, 
            currentVal: 'Digit Limit Met',
            prevVal: data.currentVal
          }));
          setTimeout(() => setData((prevState) => ({...prevState, currentVal: data.prevVal })), 1000);
    }
    function handleDecimal() {
        if (data.evaluated === true) {
            setData((prevState) => ({...prevState, currentVal: '0.', formula: '0.', evaluated: false }));
        } else if (!data.currentVal.includes('.') && !data.currentVal.includes('Limit')) {
            setData((prevState) => ({...prevState, evaluated: false }));
            if (data.currentVal.length > 21) {
                maxDigitWarning();
            } else if (endsWithOperator.test(data.formula) || (data.currentVal === '0' && data.formula === '')) {
                setData(prevState => ({...prevState, currentVal: '0.', formula: data.formula + '0.'}));
            } else {
                setData(prevState => ({...prevState, currentVal: data.formula.match(/(-?\d+\.?\d*)$/)[0] + '.', formula: data.formula + '.'}));
            }
        }
       
    }

    function handleEvaluate() {
        if (!data.currentVal.includes('Limit')) {
            let expression = data.formula;
            while (endsWithOperator.test(expression)) {
              expression = expression.slice(0, -1);
            }
            expression = expression.replace(/x/g, '*').replace(/‑/g, '-');
            let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
            setData((prevState) => ({...prevState, 
              currentVal: answer.toString(),
              formula:
                expression.replace(/\*/g, '⋅').replace(/-/g, '‑') + '=' + answer,
              prevVal: answer,
              evaluated: true
            }));
        }

    }
    function handleNumbers(e) {
        if (!data.currentVal.includes('Limit')) {
            const { currentVal, formula, evaluated } = data;
            const value = e.target.value;
            setData((prevState) => ({...prevState,  evaluated: false }));
            if (currentVal.length > 21) {
                maxDigitWarning();
            } else if (evaluated) {
                setData((prevState) => ({...prevState, currentVal: value, formula: value !== '0' ? value : '' }));
            } else {
                setData((prevState) => ({ ...prevState,
                currentVal:
                    currentVal === '0' || isOperator.test(currentVal)
                    ? value
                    : currentVal + value,
                formula:
                    currentVal === '0' && value === '0'
                    ? formula === '' ? value : formula
                    : (/([^.0-9]0|^0)$/).test(formula)
                        ? formula.slice(0, -1) + value
                        : formula + value
                }));
            }
        }

    }
    function handleOperators(e) {
        if (!data.currentVal.includes('Limit')) {
            const value = e.target.value;
            const { formula, prevVal, evaluated } = data;
            console.log(0, data, formula)
            setData({...data, currentVal: value, evaluated: false });
            if (evaluated) {
              setData(prevState => ({...prevState,  formula: prevVal + value }));
              console.log(1, data)
            } else if (!endsWithOperator.test(formula)) {
              setData((prevState) => ({
                    ...prevState,
                    prevVal: formula,
                    formula: formula + value
              }));
              console.log(2, data)
            } else if (!endsWithNegativeSign.test(formula)) {
              setData((prevState) => ({...prevState, 
                formula: (endsWithNegativeSign.test(formula + value)
                  ? formula : prevVal) + value,
              }));
              console.log(3, data)
            } else if (value !== '-') {
              setData((prevState) => ({...prevState, formula: prevVal + value}));
              console.log(4, data)
            }
        }
    }

    return <div>
        <div className="calculator">
            <Formula formula={data.formula.replace('x/g', '.')} />
            <Output currentValue={data.currentVal} /> 
            <Buttons decimal={handleDecimal} evaluate={handleEvaluate} initialize={initialize} numbers={handleNumbers} operators={handleOperators}/>
        </div>
    </div>

}

export default Calculator;