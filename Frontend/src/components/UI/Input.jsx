/* eslint-disable react/display-name */
import React from 'react';
import '../../styles/global.css';

export const Input = React.forwardRef((props, ref) => {
    return (
        <input
            className="w-full bg-gray-200 text-slate-800 px-4 py-2 rounded-md my-3 mt-1 mb-3"
            ref={ref}
            {...props}
        />
    );
});
