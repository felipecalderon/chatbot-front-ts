import { CHAT } from '../constants';
import { StyledView, StyledText } from '@/NativeWindConfig';

const Message = ({ role, name, content }) => {
	if (role === CHAT.ROLE)
		return (
			<StyledView className='p-4 dark:bg-gray-800'>
				<StyledView className='flex flex-row items-center mb-2'>
					<StyledView className='w-4 h-4 rounded-full bg-green-500 dark:bg-green-300' />
					<StyledText className='mx-2 font-bold text-lg text-gray-800 dark:text-white'>
						{name}
					</StyledText>
				</StyledView>
				<StyledText className='ml-6 text-gray-800 dark:text-gray-200'>
					{content}
				</StyledText>
			</StyledView>
		);
	return (
		<StyledView className='p-4 dark:bg-gray-800'>
			<StyledView className='flex flex-row-reverse items-center mb-2'>
				<StyledView className='w-4 h-4 rounded-full bg-blue-500 dark:bg-blue-300' />
				<StyledText className='mx-2 font-bold text-lg text-gray-800 dark:text-white'>
					{name}
				</StyledText>
			</StyledView>
			<StyledText className='ml-6 text-right text-gray-800 dark:text-gray-200'>
				{content}
			</StyledText>
		</StyledView>
	);
};

export default Message;
