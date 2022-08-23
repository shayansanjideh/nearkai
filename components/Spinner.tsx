import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Spinner: React.FC = (props) => {
  return (
    <AiOutlineLoading3Quarters tw="text-gray-50 animate-spin" {...props} />
  );
};

export default Spinner;
