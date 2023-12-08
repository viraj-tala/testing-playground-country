import React from 'react';
import loader from "../loader/Robot assistant.gif";

const Loader = () => {
    return (
        <>
            <div className="flex justify-center items-center h-full w-full">
                <img className="max-w-xs w-25 h-30" src={loader} alt="Loading..." />
            </div>
        </>
    );
};
export default Loader;