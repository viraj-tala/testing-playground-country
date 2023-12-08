import React, { useState } from "react";
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded, MoreOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import { Tooltip } from "./ToolTip";


const orderBy = (countries, value, direction) => {
    if (direction === "ascending") {
        return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
    } else if (direction === "descending") {
        return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
    }

    return countries;
};

const SortArrow = ({ direction }) => {
    if (!direction) {
        return <></>;
    }

    if (direction === "descending") {
        return (
            <div className="heading_arrow">
                <KeyboardArrowDownRounded color="inherit" />
            </div>
        );
    } else if (direction === "ascending") {
        return (
            <div className="heading_arrow">
                <KeyboardArrowUpRounded color="inherit" />
            </div>
        );
    }
};

const CountriesTable = ({ countries }) => {
    const [direction, setDirection] = useState("ascending");
    const [value, setValue] = useState("");

    const orderedCountries = orderBy(countries, value, direction);

    const switchDirection = () => {
        if (!direction) {
            setDirection("descending");
        } else if (direction === "descending") {
            setDirection("ascending");
        } else {
            setDirection(null);
        }
    };

    const setValueAndDirection = (value) => {
        switchDirection();
        setValue(value);
    };

    const countriesList = (
        <tbody className="overflow-auto">
            {orderedCountries.map(({ name, flags, population, area, region, subregion, cioc }) => (
                <tr key={name.common} role="row" className="row pb-10">

                    <td className="pl-3 ">
                        <img src={flags.svg} alt={name.common} className="h-20 w-30 rounded" />
                    </td>
                    <td className="pl-3">
                        {name.common}
                    </td>
                    <td className="pl-7">{population}</td>
                    <td className="pl-6">{area || 0}</td>
                    <td className="pl-7">{region || 0}</td>
                    <td className="pl-3">{subregion || 0}</td>
                    <td className="pl-8 hover:text-blue-500">
                        <Tooltip text='More Info' position='bottom'>
                            {cioc && <Link to={`/country/${cioc}`}>
                                <MoreOutlined />
                            </Link>}
                        </Tooltip>
                    </td>

                </tr>
            ))}
        </tbody>
    );

    return (
        <div>
            {!orderedCountries.length ? <Loader />
                :
                <div className="relative m-10 overflow-x-auto shadow-md sm:rounded-lg">
                    <table role="table" className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Flag
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <button className="flex items-center" onClick={() => setValueAndDirection("name")}>
                                        <div>Name</div>
                                        {value === "name" && <SortArrow direction={direction} />}
                                    </button>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <button className="flex items-center"
                                        onClick={() => setValueAndDirection("population")}
                                    >
                                        <div>Population</div>
                                        {value === "population" && <SortArrow direction={direction} />}
                                    </button>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <button className="flex items-center"
                                        onClick={() => setValueAndDirection("area")}
                                    >
                                        <div>
                                            Area (km<sup style={{ fontSize: "0.75rem" }}>2</sup>)
                                        </div>
                                        {value === "area" && <SortArrow direction={direction} />}
                                    </button>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <button className="flex items-center"
                                        onClick={() => setValueAndDirection("region")}
                                    >
                                        <div>Region</div>
                                        {value === "region" && <SortArrow direction={direction} />}
                                    </button>
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    <button className="flex items-center"
                                        onClick={() => setValueAndDirection("subregion")}
                                    >
                                        <div>Subregion</div>
                                        {value === "subregion" && <SortArrow direction={direction} />}
                                    </button>
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    <div>Details</div>
                                </th>
                            </tr>
                        </thead>
                        {countriesList}
                    </table>
                </div>
            }
        </div>
    );
};

export default CountriesTable