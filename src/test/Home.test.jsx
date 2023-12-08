/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/render-result-naming-convention */
import React from 'react';
import { render, screen } from './test.utils';
import Home from '../pages/Home';
import { CloudCircle } from '@material-ui/icons';

// Mocking the fetch function
jest.mock('../loader/Loader');

// Test suite for the Home component
describe('Home Component', () => {

    beforeEach(() => {
        render(
            <Home />
        );
    });

    it('should match the snapshot', () => {

        const element = render(<Home />)

        expect(element).toMatchSnapshot();
    })

    it('renders correctly', async () => {

        // Wait for the text 'Found' to be present in the document
        await screen.findByText(/Found/i);

        // Check if certain elements are present in the document
        expect(screen.getByText(/Found/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Filter by Name, Region, or SubRegion')).toBeInTheDocument();
    });
});
