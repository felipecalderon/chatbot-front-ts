import { Text, View, TextInput } from 'react-native';

const Chat = () => {
	return (
		<View className='flex-1 bg-white'>
			<View className='flex-1'>
				{/* Mensajes del chat */}
				<View className='p-4'>
					<View className='flex flex-row items-center mb-2'>
						<View className='w-4 h-4 rounded-full bg-blue-500' />
						<Text className='ml-2 font-bold'>Usuario 1:</Text>
					</View>
					<Text className='ml-6 text-gray-800'>
						Hola, ¿cómo estás?
					</Text>
				</View>

				<View className='p-4'>
					<View className='flex flex-row items-center mb-2'>
						<View className='w-4 h-4 rounded-full bg-green-500' />
						<Text className='ml-2 font-bold'>Usuario 2:</Text>
					</View>
					<Text className='ml-6 text-gray-800'>
						¡Hola! Estoy bien, gracias.
					</Text>
				</View>
			</View>

			{/* Caja de entrada de mensajes */}
			<View className='flex-row p-4 bg-gray-200'>
				<View className='flex-1 bg-white rounded-full px-4 py-2'>
					<TextInput className='text-gray-800'>
						Escribe un mensaje...
					</TextInput>
				</View>
				<View className='ml-2 bg-blue-500 rounded-full w-12 h-12'>
					<Text className='text-white mx-auto my-auto'>Enviar</Text>
				</View>
			</View>
		</View>
	);
};

export default Chat;
