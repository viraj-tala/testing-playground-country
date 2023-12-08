import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../loader/Loader";
import { MoreOutlined, HomeOutlined } from "@material-ui/icons";
import { Tooltip } from "./ToolTip";

const Country = () => {
    let { countryCode } = useParams();
    const [country, setCountry] = useState(null);
    const [borders, setBorders] = useState(null);
    useEffect(() => {
        const fetchCountryDetails = async () => {
            try {
                const res = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
                const countryData = await res.json();
                setCountry(countryData[0]);

                // Fetch neighboring countries
                const borderCodes = countryData[0].borders || [];
                const borderCountries = await Promise.all(
                    borderCodes.map(async (code) => {
                        const borderRes = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
                        return borderRes.json();
                    })
                );
                setBorders(borderCountries);
            } catch (error) {
                console.log("Error fetching country details:", error);
            }
        };

        fetchCountryDetails();
    }, [countryCode]);

    if (!country) {
        return <Loader />;
    }

    return (
        <div className="m-10">
            <div className="flex m-14 mb-0 justify-end hover:text-blue-500">
                <Tooltip text='Back To Home' position='bottom'>
                    <Link to={`/`}>
                        <HomeOutlined />
                    </Link>
                </Tooltip>
            </div>
            <h4 className="mb-10 flex justify-center text-5xl font-extrabold leading-none tracking-tight text-gray-900 ">{country?.name?.common}</h4>

            <div className="flex items-center justify-center">
                <div className="w-full flex flex-col items-center justify-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <img
                        className="w-28 h-20 flex rounded-xl"
                        src={country.flags.png}
                        alt={country.flags.alt}
                    />
                    <div className="m-3">
                        <h4 className="text-2xl font-bold tracking-tight text-gray-200">
                            {country?.name?.common}
                        </h4>
                        <p className="font-normal flex justify-center text-gray-700 dark:text-gray-300">
                            {country.region}
                        </p>
                    </div>
                    <div className="w-full flex justify-between">
                        <div className="">
                            <p className="font-normal text-gray-300">
                                {country.population}
                            </p>
                            <div className="overview_label text-14 text-gray-400 text-secondary">
                                Population
                            </div>
                        </div>
                        <div className="">
                            <p className="font-normal text-gray-300">
                                {country.area}
                            </p>
                            <div className="overview_label text-14 text-gray-400 text-secondary">
                                Area
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="details_panel bg-light box-shadow rounded-8 p-6 ">
                    <h4 className="text-xl p-2 font-semibold text-gray-200 mb-10 pb-2 border-b-2 rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        Details
                    </h4>
                    <ul className="space-y-4">
                        <li className="flex items-start pb-2 border-b-2 justify-between">
                            <span className="font-medium text-gray-900">
                                Capital
                            </span>
                            <span className="text-gray-700 font-semibold ">
                                {country.capital[0]}
                            </span>
                        </li>
                        {country.languages && <li className="flex items-start justify-between pb-2 border-b-2">
                            <span className="font-medium text-gray-900">
                                Languages
                            </span>
                            <div className="flex flex-wrap">
                                {Object.entries(country.languages).map(([code, name]) => (
                                    <div key={code} className="mr-2 mb-2 font-semibold text-gray-800">
                                        <span className="font-semibold text-gray-700">
                                            {code}:
                                        </span>
                                        {name}
                                    </div>
                                ))}
                            </div>
                        </li>}
                        {country.currencies && <li className="flex items-start justify-between pb-2 border-b-2">
                            <span className="font-medium text-gray-900">
                                Currencies
                            </span>
                            <div className="flex flex-wrap">
                                {Object.entries(country.currencies).map(([code, currency]) => (
                                    <div key={code} className="mr-2 mb-2">
                                        <span className="font-semibold text-gray-700">
                                            {currency.name} ({currency.symbol})
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </li>}
                        {country.name.nativeName && <li className="flex items-start justify-between pb-2 border-b-2">
                            <span className="font-medium text-gray-900">
                                Native name
                            </span>
                            <span className="text-gray-700 font-semibold ">
                                {Object.entries(country.name.nativeName).map(([key, value]) => (
                                    <div key={key} className="mr-2 mb-2">
                                        <span className="font-semibold text-gray-700">
                                            {key}: {value.common}
                                        </span>
                                    </div>
                                ))}
                            </span>
                        </li>}
                        {country.gini && <li className="flex items-start justify-between pb-2 border-b-2">
                            <span className="font-medium text-gray-900">
                                Gini
                            </span>
                            <span className="text-gray-700 font-semibold">
                                {Object.entries(country.gini).map(([key, value]) => (
                                    <div key={key} className="mr-2 mb-2">
                                        <span className="font-semibold text-gray-700">
                                            {key && key}: {value}%
                                        </span>
                                    </div>
                                ))}
                            </span>
                        </li>}
                        {borders?.length && <li className="flex items-start justify-between pb-2 border-b-2">
                            <span className="font-medium flex h-full text-gray-900">
                                Neighboring Countries
                            </span>
                            <div className="flex flex-wrap flex-col gap-2">
                                {borders.map((border) =>
                                    border[0] ? (
                                        <div
                                            key={border[0].name?.common}
                                            className="mr-2 mb-2 flex gap-2"

                                        >
                                            <img
                                                className="w-12 h-8 rounded-md"
                                                src={border[0].flags?.png}
                                                alt={border[0].flags?.alt}
                                            />
                                            <div className="flex justify-end  w-full gap-2  hover:text-blue-500 ">
                                                <span className="font-semibold text-gray-700  ">
                                                    {border[0].name?.common}
                                                </span>
                                                <Tooltip text='More Info' position='bottom'>
                                                    {border[0].cioc && <Link to={`/country/${border[0].cioc}`}>
                                                        <MoreOutlined />
                                                    </Link>}
                                                </Tooltip>
                                            </div>
                                        </div>
                                    ) : <></>
                                )}
                            </div>
                        </li>}
                    </ul>
                </div>
            </div>

        </div >
    );
};

export default Country;
