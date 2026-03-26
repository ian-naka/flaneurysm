import React, { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <button 
            {...props}
            className="bg-[#512B3C] hover:bg-[#3D202D] text-white text-[13px] font-bold uppercase tracking-widest py-[14px] w-full mt-2 transition-colors duration-200 rounded-[10px]"
        >
            {children}
        </button>
    );
};

export default Button;
