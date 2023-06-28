import { Text, TextInput, View } from "react-native"
import { styled } from 'nativewind';

const StyledView = styled(View)
const StyledText = styled(TextInput)

const SendChat = () => {
    return (
			<StyledView className='flex-row p-4 bg-gray-200'>
            <StyledView className='flex-1 bg-white rounded-full px-4 py-2'>
                <StyledText className='text-gray-800'>
                    Escribe un mensaje...
                </StyledText>
            </StyledView>
            <StyledView className='ml-2 bg-blue-500 rounded-full w-12 h-12'>
                <StyledText className='text-white mx-auto my-auto'>Enviar</StyledText>
            </StyledView>
        </StyledView>
    )
}

export default SendChat