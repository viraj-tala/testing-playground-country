/* eslint-disable testing-library/render-result-naming-convention */
import React from 'react';
import { render, screen } from './test.utils';
import userEvent from '@testing-library/user-event';
import SearchInput from '../component/SearchComponent';

describe('SearchInput', () => {


    it('should match the snapshot', () => {
        const element = render(<SearchInput />)
        expect(element).toMatchSnapshot();
    })


    it('should call onChange when the input value changes', () => {
        const onChange = jest.fn();
        render(<SearchInput placeholder="Search" onChange={onChange} />);

        userEvent.type(screen.getByRole('textbox'), '1234');

        expect(onChange).toHaveBeenCalledTimes(4);
    });
});
