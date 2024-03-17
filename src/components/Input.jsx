import { forwardRef } from "react"

const Input = forwardRef(function({textarea, label, ...inputProps}, ref) {
    return (
    <p className="flex flex-col gap-1 my-4">
        <label htmlFor="" className="text-sm font-bold uppercase text-stone-500">{label}</label>
        {
        textarea ? 
        <textarea ref={ref} {...inputProps} className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600" /> : 
        <input ref={ref} className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600" {...inputProps} />
        }
    </p>
    )
});

export default Input;