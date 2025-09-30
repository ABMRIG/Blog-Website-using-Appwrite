import React, { forwardRef, useId } from 'react'

const Input = forwardRef(function Input ({
    label,
    type = "text",
    className = "",
    labelClassName = "",
    ...props
}, ref)
    {
    const id = useId()
    
    return (
        <div className='w-full'>
            {label 
            && 
            <label 
                className={`inline-block mb-1 pl-1 ${labelClassName}`}
                htmlFor={id}>        
                {label}
            </label>}
            <input type={type} 
            className={`px-3 py-2 rounded-lg bg-gray-500 text-black outline-none focus:bg-gray-200 duration-200 border border-gray-200 w-full ${className}`} 
            ref={ref} 
            {...props} 
            id={id}></input>
        </div>
    )
}) 


export default Input