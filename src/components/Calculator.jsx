import React, { useState, useEffect } from 'react';
import * as math from 'mathjs';

const Calculator = () => {
    const [inputVal, setInputVal] = useState('');
    const operators = ['+', '-', 'x', '÷'];
    const [decimalAdded, setDecimalAdded] = useState(false);

    const handleResult = (result) => {
        const formattedResult = Number(result.toPrecision(16));
        setInputVal(formattedResult);
    };

    const handleKeyDown = (e) => {
        const key = e.key;

        if (key === 'F12' || key === 'F11' || key === 'F10') {
            return;
        }
        if (/\d/.test(key)) {
            setInputVal(inputVal + key);
        } else if (key === '*' || key === '/' || key === '+' || key === '-') {
            const lastChar = inputVal[inputVal.length - 1];
            if (inputVal !== '' && operators.indexOf(lastChar) === -1) {
                setInputVal(inputVal + key);
            } else if (inputVal === '' && key === '-') {
                setInputVal(key);
            } else if (key === 'Backspace') {
                const newInputVal = inputVal.slice(0, -1);
                setInputVal(newInputVal);
                setDecimalAdded(newInputVal.includes('.'));
            }
            if (
                (operators.indexOf(lastChar) > -1 &&
                    inputVal.length > 1 &&
                    key === '+') ||
                (lastChar === '*' && key === '/')
            ) {
                setInputVal(inputVal.replace(/.$/, key));
            }
            setDecimalAdded(false);
        } else if (key === '.') {
            if (!decimalAdded) {
                setInputVal(inputVal + key);
                setDecimalAdded(true);
            }
        } else if (key === 'Backspace') {
            const valueStr = String(inputVal);
            if (valueStr?.length) {
                setInputVal(valueStr.slice(0, -1));
            } else {
                setInputVal('');
            }
        } else if (key === 'Enter') {
            let equation = inputVal;
            try {
                if (typeof equation === 'string') {
                    equation = equation.replace(/x/g, '*').replace(/÷/g, '/');
                }
                const lastChar = equation[equation.length - 1];
                if (operators.indexOf(lastChar) > -1 || lastChar === '.') {
                    equation = equation.replace(/.$/, '');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
            if (typeof equation === 'string') {
                equation = equation.replace(/x/g, '*').replace(/÷/g, '/');

                if (equation.indexOf('/0') !== -1) {
                    const operands = equation.split('/');
                    const divisor = parseFloat(operands[1]);

                    if (divisor !== 0) {
                        const result = parseFloat(operands[0]) / divisor;
                        setInputVal(result.toString());
                    } else {
                        setInputVal('Error: Division by zero');
                    }
                    return;
                }
            }
            if (equation) {
                setInputVal(math.evaluate(equation.toString()));
                const result = math.evaluate(equation.toString());
                handleResult(result);
            }

            setDecimalAdded(false);
        } else if (key === 'Escape') {
            setInputVal('');
            setDecimalAdded(false);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    });

    const handleClick = (e) => {
        const btnVal = e.target.innerHTML;
        const lastChar = inputVal[inputVal.length - 1];

        if (/[0-9]/.test(btnVal)) {
            setInputVal(inputVal + btnVal);
        } else if (btnVal === '.' && !decimalAdded) {
            setInputVal(inputVal + btnVal);
            setDecimalAdded(true);
        } else if (operators.includes(btnVal)) {
            if (/[0-9]/.test(lastChar)) {
                setInputVal(inputVal + btnVal);
            } else if (btnVal === '-' && inputVal === '') {
                setInputVal(inputVal + btnVal);
            } else if (operators.includes(lastChar) && inputVal.length > 1) {
                setInputVal(inputVal.slice(0, -1) + btnVal);
            }
            setDecimalAdded(false);
        } else if (btnVal === 'C') {
            setInputVal('');
            setDecimalAdded(false);
        } else if (btnVal === '=') {
            let equation = inputVal.replace(/x/g, '*').replace(/÷/g, '/');
            if (operators.includes(lastChar) || lastChar === '.') {
                equation = equation.slice(0, -1);
            }
            try {
                const result = math.evaluate(equation);
                setInputVal(result.toString());
                handleResult(result);
            } catch (error) {
                setInputVal('Error: Invalid input');
            }
            setDecimalAdded(false);
        } else if (btnVal === '√') {
            if (/[0-9]/.test(lastChar)) {
                const result = Math.sqrt(parseFloat(inputVal));
                setInputVal(result.toString());
                setDecimalAdded(false);
            }
        } else if (btnVal === '%') {
            const percentage = 0.01;
            try {
                const result = math.evaluate(`(${inputVal}) * ${percentage}`);
                setInputVal(result.toString());
            } catch (error) {
                setInputVal('Error: Invalid input');
            }
        }
    };

    return (
        <div className='calculator' id='calc'>
            <div data-testid='display' className='display' value={inputVal}>
                {inputVal}
            </div>
            <span onClick={handleClick} className='c neumorphic'>
                C
            </span>
            <span onClick={handleClick} className='square-root neumorphic'>
                √
            </span>

            <span onClick={handleClick} className='percent neumorphic'>
                %
            </span>
            <span onClick={handleClick} className='divide neumorphic'>
                ÷
            </span>
            <span onClick={handleClick} className='seven neumorphic'>
                7
            </span>
            <span onClick={handleClick} className='eight neumorphic'>
                8
            </span>
            <span onClick={handleClick} className='nine neumorphic'>
                9
            </span>
            <span onClick={handleClick} className='times neumorphic'>
                x
            </span>
            <span onClick={handleClick} className='four neumorphic'>
                4
            </span>
            <span onClick={handleClick} className='five neumorphic'>
                5
            </span>
            <span onClick={handleClick} className='six neumorphic'>
                6
            </span>
            <span onClick={handleClick} className='minus neumorphic'>
                -
            </span>
            <span onClick={handleClick} className='one neumorphic'>
                1
            </span>
            <span onClick={handleClick} className='two neumorphic'>
                2
            </span>
            <span onClick={handleClick} className='three neumorphic'>
                3
            </span>
            <span onClick={handleClick} className='plus neumorphic'>
                +
            </span>
            <span onClick={handleClick} className='zero neumorphic'>
                0
            </span>
            <span onClick={handleClick} className='decimal neumorphic'>
                .
            </span>
            <span onClick={handleClick} className='equals neumorphic'>
                =
            </span>
        </div>
    );
};

export default Calculator;
