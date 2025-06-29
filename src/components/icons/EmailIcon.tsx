import React from 'react';

interface EmailIconProps {
    width?: number;
    height?: number;
    className?: string;
}

const EmailIcon = ({ width = 16, height = 16, className }: EmailIconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width={width}
            height={height}
            className={className}
        >
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
    );
};

export default EmailIcon; 