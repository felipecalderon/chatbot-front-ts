import { Text, TextInput, View } from "react-native"

const SendChat = () => {
    return (
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
    )
}

export default SendChat