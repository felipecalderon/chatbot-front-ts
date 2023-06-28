import { Text, View } from "react-native";

const Message = ({user, message}) => {
	return (
		<View className='p-4'>
			<View className='flex flex-row items-center mb-2'>
				<View className='w-4 h-4 rounded-full bg-blue-500' />
				<Text className='ml-2 font-bold'>{user}</Text>
			</View>
			<Text className='ml-6 text-gray-800'>{message}</Text>
		</View>
	);
};

export default Message