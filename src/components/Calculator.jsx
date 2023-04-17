import React, { useState, useEffect } from 'react';
import * as math from 'mathjs';

// при нажатии на Enter несколько раз при каком-то готовом значении выдает ошибку на 56 строке

const Calculator = () => {
    const [inputVal, setInputVal] = useState('');
    const operators = ['+', '-', 'x', '÷'];
    const [decimalAdded, setDecimalAdded] = useState(false);

    const handleKeyDown = (e) => {
        const key = e.key;
        if (/\d/.test(key)) {
            setInputVal(inputVal + key);
        } else if (key === '*' || key === '/' || key === '+' || key === '-') {
            // } else if (operators.indexOf(key) > -1) {
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

            if (operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
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
            // try {
            //     const newInputVal = inputVal.slice(0, -1);
            //     setInputVal(newInputVal);
            //     setDecimalAdded(newInputVal.includes('.'));
            // } catch (error) {
            //     console.error(error);
            //     setInputVal('Invalid value');
            //     // Обработка ошибки, например:
            //     // setInputVal('');
            //     setDecimalAdded(false);
            // }
        } else if (key === 'Enter') {
            let equation = inputVal;
            // const lastChar = equation[equation.length - 1];
            // if (typeof equation === 'string') {
            //     equation = equation.replace(/x/g, '*').replace(/÷/g, '/');
            // }
            // if (operators.indexOf(lastChar) > -1 || lastChar === '.') {
            //     equation = equation.replace(/.$/, '');
            // }
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

            // if (equation.indexOf('/0') !== -1) {
            //     setInputVal('Error: Division by zero');
            //     return;
            // }
            if (typeof equation === 'string' && equation.indexOf('/0') !== -1) {
                setInputVal('Error: Division by zero');
                return;
            }
            if (equation) {
                console.log(typeof equation, equation);
                setInputVal(math.evaluate(equation.toString()));
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

        if (btnVal === 'C') {
            setInputVal('');
            setDecimalAdded(false);
        } else if (btnVal === '=') {
            let equation = inputVal;
            const lastChar = equation[equation.length - 1];

            // equation = equation.replace(/x/g, '*').replace(/÷/g, '/');
            if (typeof equation === 'string') {
                equation = equation.replace(/x/g, '*').replace(/÷/g, '/');
            }

            if (operators.indexOf(lastChar) > -1 || lastChar === '.') {
                equation = equation.replace(/.$/, '');
            }

            // if (equation.indexOf('/0') !== -1 || typeof equation === 'string') {
            //     setInputVal('Invalid action');
            //     return;
            // }
            // if (equation) {
            //     setInputVal(math.evaluate(equation));
            // }
            try {
                if (equation) {
                    setInputVal(math.evaluate(equation));
                }
            } catch (error) {
                setInputVal('Error');
            }

            setDecimalAdded(false);
        } else if (operators.indexOf(btnVal) > -1) {
            const lastChar = inputVal[inputVal.length - 1];

            if (inputVal !== '' && operators.indexOf(lastChar) === -1) {
                setInputVal(inputVal + btnVal);
            } else if (inputVal === '' && btnVal === '-') {
                setInputVal(inputVal + btnVal);
            }

            if (operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
                setInputVal(inputVal.replace(/.$/, btnVal));
            }

            setDecimalAdded(false);
        } else if (btnVal === '.') {
            if (!decimalAdded) {
                setInputVal(inputVal + btnVal);
                setDecimalAdded(true);
            }
        } else if (btnVal === '√') {
            if (inputVal) {
                const result = Math.sqrt(parseFloat(inputVal));
                setInputVal(result.toString());
                setDecimalAdded(false);
            }
        } else {
            setInputVal(inputVal + btnVal);
        }
    };

    return (
        <div className='calculator' id='calc'>
            <div className='display' value={inputVal}>
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
