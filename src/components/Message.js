import { Text, View } from 'react-native';
import { CHAT } from '../constants'
const Message = ({ role, name, content }) => {
	if (role === CHAT.ROLE)
		return (
		<View className='p-4'>
			<View className='flex flex-row items-center mb-2'>
				<View className='w-4 h-4 rounded-full bg-green-500' />
				<Text className='mx-2 font-bold text-lg'>{name}</Text>
			</View>
			<Text className='ml-6 text-gray-800'>{content}</Text>
		</View>
		);

	return (
		<View className='p-4'>
		<View className='flex flex-row-reverse items-center mb-2'>
			<View className='w-4 h-4 rounded-full bg-blue-500' />
			<Text className='mx-2 font-bold text-lg'>{name}</Text>
		</View>
		<Text className='ml-6 text-right text-gray-800'>{content}</Text>
	</View>
	);
};

export default Message;
