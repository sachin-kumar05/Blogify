import React, { useId } from 'react'

// forwardRef allows a parent component to directly access the underlying DOM node of a child component
// It's essential when creating components like input fields or buttons that need to forward their refs so users of the library (parent components) can interact with their underlying elements
const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {

    const id = useId();

    return (
        <div className='w-full'>
            {label && <label
                className='inline-block mb-1 pl-1'
                htmlFor={id}
            >{label}</label>}
$
            <input 
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            ref={ref}
            id={id}
            {...props}
            />
        </div>
    )
})

export default Input