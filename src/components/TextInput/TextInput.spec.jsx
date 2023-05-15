import { render, screen } from '@testing-library/react';
import { TextInput } from '.';
import userEvent from '@testing-library/user-event';

describe('<TextInput/>', () => {
  it('should have a value of searchValue', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue="Teste" />);

    const input = screen.getByPlaceholderText(/Pesquisa/i);
    expect(input).toHaveAttribute('value', 'Teste');
  });

  it('should call handleChange function on each key pressed', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue="Valor" />);

    const input = screen.getByPlaceholderText(/Pesquisa/i);

    const testValue = 'Testando fn()';
    userEvent.type(input, testValue);

    expect(input.value).toBe('Valor');
    expect(fn).toHaveBeenCalledTimes(testValue.length);
  });

  it('should match sanpshot', () => {
    const fn = jest.fn();
    const { container } = render(<TextInput handleChange={fn} searchValue="Teste" />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
