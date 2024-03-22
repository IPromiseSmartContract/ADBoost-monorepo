"use client"

interface InputTypeProp {
    id: string;
    label: string;
    type: 'text' | 'password' | 'email' | 'number';
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    disabled?: boolean;
    className?: string;
}

const Input:React.FC<InputTypeProp> = ({...props}) => {   
    return (
        <div className="w-72">
            <label htmlFor={props.id} className="font-semibold text-xl mb-4 block">
                <span>{props.label}</span>
            </label>
            <input 
                    className="w-full pl-6 pr-6 py-3.5 rounded-lg 
                               text-sm text-gray-500 border-[1px]
                               outline-none focus:ring-2 focus:ring-teal-500
                              "
                    {...props}
            />   
        </div> 
    )
}
export default Input;

