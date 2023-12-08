/* eslint-disable testing-library/render-result-naming-convention */
import React from 'react';
import { render, screen } from './test.utils';
import userEvent from '@testing-library/user-event';
import { Tooltip } from '../component/ToolTip';

describe('Tooltip', () => {

    it('should match the snapshot', () => {
        const element = render(<Tooltip position='top' text='Top Tooltip' >
            <span>Hover over me</span>
        </Tooltip>)
        expect(element).toMatchSnapshot();
    })

    it('should call onChange when the input value changes', async () => {
        render(<Tooltip position='top' text='Top Tooltip' >
            <span>Hover over me</span>
        </Tooltip>);

        const triggerElement = screen.getByText('Hover over me');
        const tooltipElement = screen.getByText('Top Tooltip');

        expect(triggerElement).toBeInTheDocument();
        expect(tooltipElement).toBeInTheDocument();

        userEvent.hover(triggerElement);

        expect(tooltipElement).toHaveClass('group-hover:visible');
    });
});
