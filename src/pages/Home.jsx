import React, { useEffect, useState } from 'react';
import SearchInput from '../component/SearchComponent';
import CountriesTable from '../component/CountryTable';

let searchTimeout = null
const Home = () => {
    const [keyword, setKeyword] = useState('');
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const getCountries = async () => {
            try {
                const res = await fetch("https://restcountries.com/v3.1/all");
                const countryData = await res.json();
                if (countryData.length) setCountries(countryData);
            } catch (error) {
                console.log('Error fetching country data:', error);
            }
        };
        getCountries();
    }, []);

    useEffect(() => {
        return () => {
            if (searchTimeout) clearTimeout(searchTimeout)
        }
    }, [])

    const filteredCountries = countries.filter(
        ({ name, region, subregion }) => (
            name?.common?.toLowerCase().includes(keyword.toLowerCase()) ||
            region?.toLowerCase().includes(keyword.toLowerCase()) ||
            subregion?.toLowerCase().includes(keyword.toLowerCase())
        )
    )

    const onInputChange = (event) => {
        if (!event.target.value) {
            return
        }
        if (searchTimeout) clearTimeout(searchTimeout)
        searchTimeout = setTimeout(() => setKeyword(event.target.value), 500)
    };

    return (
        <>
            <div className="h-full w-full flex flex-col overflow-hidden">
                <div className="text-center flex flex-col mt-8 text-xs">
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">Found<span className="text-blue-600 dark:text-blue-500"> {countries.length}</span> countries</h1>
                    <div className='flex items-center flex-col justify-between m-2'>
                        <SearchInput placeholder="Filter by Name, Region, or SubRegion" onChange={onInputChange} />
                    </div>
                </div>

                <main className="overflow-auto">
                    <CountriesTable countries={filteredCountries} />
                </main>

                <footer className="text-center mt-8 text-xs"></footer>
            </div >
        </>
    );
};

export default Home;
