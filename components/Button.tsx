import tw from 'twin.macro';

const Wrapper = tw.button`w-7 h-7 rounded-full flex items-center justify-center text-base transition hover:(bg-white bg-opacity-10)`;

const Button: React.FC<React.HTMLProps<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return (
    <Wrapper {...props} type="button">
      {children}
    </Wrapper>
  );
};

export default Button;
