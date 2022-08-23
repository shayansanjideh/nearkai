import tw from 'twin.macro';
import toast, { Toast } from 'react-hot-toast';
import CloseButton from '~/components/CloseButton';
import { ClickHandler } from '~/types/event-handlers';

const ToastWrapper: React.FC<{ t: Toast }> = ({ t, children }) => {
  const handleClose: ClickHandler = (e) => {
    e.preventDefault();
    toast.dismiss(t.id);
  };

  return (
    <div
      css={[
        tw`relative rounded-md p-6 md:(min-w-[200px] max-w-[400px]) bg-white border border-sky-100 bg-opacity-10 backdrop-blur-sm text-sky-50`,
        tw`transition duration-300`,
        t.visible
          ? tw`opacity-100 scale-100 translate-x-0`
          : tw`opacity-0 scale-90 translate-x-4`,
      ]}
    >
      <CloseButton tw="absolute top-3 right-3" onClick={handleClose} />
      {children}
    </div>
  );
};

export const wrappedToast = (
  children: React.ReactNode
): ((t: Toast) => React.ReactElement) => {
  return (t) => {
    return <ToastWrapper t={t}>{children}</ToastWrapper>;
  };
};
