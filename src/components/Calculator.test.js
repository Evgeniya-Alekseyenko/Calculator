import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from './Calculator';

test('2 + 2 = 4 when pressing keys', () => {
    render(<Calculator />);

    const display = screen.getByTestId('display');

    fireEvent.click(screen.getByText('C'));
    fireEvent.keyDown(display, { key: '2' });
    fireEvent.keyDown(display, { key: '+' });
    fireEvent.keyDown(display, { key: '2' });
    fireEvent.keyDown(display, { key: 'Enter' });

    expect(display.textContent).toBe('4');
});

test('3 * 5 = 15 when clicking buttons', () => {
    render(<Calculator />);

    const display = screen.getByTestId('display');

    fireEvent.click(screen.getByText('C'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('x'));
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('='));

    expect(display.textContent).toBe('15');
});

test('0 * 2 = 0 when clicking buttons', () => {
    render(<Calculator />);

    const display = screen.getByTestId('display');

    fireEvent.click(screen.getByText('C'));
    fireEvent.click(screen.getByText('0'));
    fireEvent.click(screen.getByText('x'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('='));

    expect(display.textContent).toBe('0');
});

test('5 / 0 = Error: Division by zero when pressing keys', () => {
    render(<Calculator />);

    const display = screen.getByTestId('display');

    fireEvent.click(screen.getByText('C'));
    fireEvent.keyDown(display, { key: '5' });
    fireEvent.keyDown(display, { key: '/' });
    fireEvent.keyDown(display, { key: '0' });
    fireEvent.keyDown(display, { key: 'Enter' });

    expect(display.textContent).toBe('Error: Division by zero');
});

test('Percentage calculation works correctly', () => {
    render(<Calculator />);

    const display = screen.getByTestId('display');

    fireEvent.click(screen.getByText('C'));
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('0'));
    fireEvent.click(screen.getByText('%'));
    fireEvent.click(screen.getByText('='));

    expect(display.textContent).toBe('0.1');
});

test('Error message is displayed for invalid input', () => {
    render(<Calculator />);

    const display = screen.getByTestId('display');

    fireEvent.click(screen.getByText('C'));
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('.'));
    fireEvent.click(screen.getByText('='));

    expect(display.textContent).toBe('Error: Invalid input');
});
