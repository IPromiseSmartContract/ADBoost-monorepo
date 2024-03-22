interface ButtonTypeProp {
  type: "button" | "submit" | "reset";
  text: string;
  isdisable?: boolean;
  onClick?: () => void;
  customClass?: string;
}

const Button: React.FC<ButtonTypeProp> = ({ ...props }) => {
  const { type, text, isdisable, onClick, customClass } = props;

  return (
    <button
      className={`
      btn btn-secondary  btn-outline shadow-lg shadow-secondary drop-shadow-xl text-lg
      disabled:btn-disabled ${customClass}
`}
    >
      {text}
    </button>
  );
};

export default Button;
