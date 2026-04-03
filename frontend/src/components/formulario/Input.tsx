//este componente é uma abstração estilizada do input nativo HTML, com suporte a referências pelo React Hook Form.
import React, { type InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ id, ...props }, ref) => {
    return (
        <input 
            id={id}
            ref={ref}
            {...props}
            className="w-full px-[15px] py-[12px] text-[14px] text-[#333333] bg-white border border-[#e2e2e2] focus:border-[#a5002c] focus:outline-none transition-colors duration-200 placeholder:text-[#888888] rounded-[10px]"
        />
    );
});

Input.displayName = 'Input';

export default Input;
