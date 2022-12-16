import * as React from 'react';

export const ArrowLeft = ({ className }) => {
    return (
        <svg
            width={24}
            className={className}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="#B5B3BC" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 19L5 12L12 5" stroke="#B5B3BC" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};
