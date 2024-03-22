interface ButtonTypeProp {
    type: 'button' | 'submit' | 'reset';
    text: string;
    isdisable?: boolean;
    onClick?: () => void;
    customClass?: string;
}

const Button:React.FC<ButtonTypeProp> = ({...props}) => {
    const {type, text, isdisable, onClick, customClass} = props;
    
    return ( 
        <button className={`px-4 py-3 max-h-12
                            inline-flex items-center rounded-xl
                            text-xs md:text-sm font-semibold text-slate-100
                            bg-teal-500
                            hover:bg-teal-400 hover:text-teal-900
                            disabled:bg-slate-300 ${customClass}
                         `}>
                {text}
        </button>    
    )
}

export default Button;