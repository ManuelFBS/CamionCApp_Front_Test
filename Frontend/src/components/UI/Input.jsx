import React from 'react';

export const Input = React.forwardRef((props, ref) => {
    return (
        <input
            className="w-full bg-gray-200 text-blue-700 px-4 py-2 rounded-md my-3 mt-1 mb-3"
            ref={ref}
            {...props}
        />
    );
});
