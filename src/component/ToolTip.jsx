import React from 'react';

export const Tooltip = ({ text, position, children }) => {
    const getPositionStyles = () => {
        switch (position) {
            case 'top':
                return 'bottom-full left-1/2 transform -translate-x-1/2';
            case 'right':
                return 'top-1/2 left-full transform -translate-y-1/2';
            case 'bottom':
                return 'top-full left-1/2 transform -translate-x-1/2';
            case 'left':
                return 'top-1/2 right-full transform -translate-y-1/2';
            default:
                return 'bottom-full left-1/2 transform -translate-x-1/2';
        }
    };

    return (
        <div className="relative inline-block">
            <div className="group relative">
                {children}
                <div
                    className={`opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute z-10 bg-slate-800 text-white py-2 px-4 rounded-md text-center whitespace-nowrap ${getPositionStyles()}`}
                >
                    {text}
                </div>
            </div>
        </div>
    );
};