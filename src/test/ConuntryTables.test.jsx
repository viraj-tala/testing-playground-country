/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/render-result-naming-convention */
import React from 'react';
import { render, screen } from './test.utils';
import CountriesTable from '../component/CountryTable';

// Sample data for testing
const sampleCountries = [
  { name: { common: 'Country2' }, flags: { svg: 'flag2.svg' }, population: 1500000, area: 300000, region: 'Region2' },
  { name: { common: 'Country1' }, flags: { svg: 'flag1.svg' }, population: 1000000, area: 500000, region: 'Region1' },
];

// Mocking the Loader component
jest.mock('../loader/Loader');

describe('CountriesTable', () => {
  // Before each test, render the CountriesTable component with sample data
  beforeEach(() => {
    render(
      <CountriesTable countries={sampleCountries} />
    );
  });

  // Test to ensure that the component snapshot matches the expected snapshot
  it('should match the snapshot', () => {
    const element = render(
      <CountriesTable countries={sampleCountries} />
    );
    expect(element).toMatchSnapshot();
  });

  it('renders countries data in the table', () => {
    // 'country' (case-insensitive)
    const countryRows = screen.getAllByRole('row', { name: /country/i });
    expect(countryRows).toHaveLength(2); // Including the header row
  });

  it('renders the table, column header, and row correctly', () => {
    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();

    const headerElements = screen.getAllByRole('columnheader');
    expect(headerElements).toHaveLength(7); // 6 columns in country table header

    const rowElements = screen.getAllByRole('row');
    expect(rowElements.length).toBeGreaterThan(0);

    // Check if each country in the sample data has a corresponding row in the table
    sampleCountries.forEach((country) => {
      const countryRow = screen.getByRole('row', { name: new RegExp(country.name.common, 'i') });
      expect(countryRow).toBeInTheDocument();
    });
  });
});
