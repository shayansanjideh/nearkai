import tw from 'twin.macro';

export const components = {
  button: [
    tw`flex items-center gap-x-1 px-4 py-2 rounded-md`,
    tw`bg-white bg-opacity-10`,
    tw`text-sm font-bold text-white`,
    tw`border border-transparent`,
    tw`transition hover:border-sky-100`,
  ],
};
