import { Text, View } from 'react-native';
import { CHAT } from '../constants'
import { styled } from 'nativewind';

const StyledView = styled(View)
const StyledText = styled(Text)

const Message = ({ role, name, content }) => {
	if (role === CHAT.ROLE)
		return (
		<StyledView className='p-4'>
			<StyledView className='flex flex-row items-center mb-2'>
				<StyledView className='w-4 h-4 rounded-full bg-green-500' />
				<StyledText className='mx-2 font-bold text-lg'>{name}</StyledText>
			</StyledView>
			<StyledText className='ml-6 text-gray-800'>{content}</StyledText>
		</StyledView>
		);

	return (
		<StyledView className='p-4'>
		<StyledView className='flex flex-row-reverse items-center mb-2'>
			<StyledView className='w-4 h-4 rounded-full bg-blue-500' />
			<StyledText className='mx-2 font-bold text-lg'>{name}</StyledText>
		</StyledView>
		<StyledText className='ml-6 text-right text-gray-800'>{content}</StyledText>
	</StyledView>
	);
};

export default Message;
