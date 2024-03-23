interface H1TypeProp {
  text: string;
}

const H1: React.FC<H1TypeProp> = ({ text }) => {
  return (
    <h1 className="text-4xl font-bold underline underline-offset-8">{text}</h1>
  );
};

export default H1;
