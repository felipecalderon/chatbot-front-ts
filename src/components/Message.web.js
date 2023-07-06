import { CHAT } from '../constants';

const Message = ({ role, name, content }) => {
  if (role === CHAT.ROLE)
    return (
      <div className='p-4'>
        <div className='flex flex-row items-center mb-2'>
          <div className='w-4 h-4 rounded-full bg-green-500' />
          <p className='mx-2 font-bold text-lg'>{name}</p>
        </div>
        <p className='ml-6 text-gray-800'>{content}</p>
      </div>
    );

  return (
    <div className='p-4'>
      <div className='flex flex-row-reverse items-center mb-2'>
        <div className='w-4 h-4 rounded-full bg-blue-500' />
        <p className='mx-2 font-bold text-lg'>{name}</p>
      </div>
      <p className='ml-6 text-right text-gray-800'>{content}</p>
    </div>
  );
};

export default Message;
