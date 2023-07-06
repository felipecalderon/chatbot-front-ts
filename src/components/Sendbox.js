// import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import { StyledView, StyledInput, StyledBtn, StyledText } from '@/NativeWindConfig'


const SendChat = ({ action, onChange, inputValue, onFocus }) => {
	const handleKeyPress = ({ nativeEvent }) => nativeEvent.key === 'Enter' && console.log('Presionaste enter');

	return (
		<StyledView className='flex-row p-4 bg-gray-200'>
			<StyledView className='flex-1 bg-white rounded-full px-4 py-2'>
				<StyledInput
					value={inputValue}
					onChangeText={onChange}
					onFocus={onFocus}
					onSubmitEditing={handleKeyPress}
					className='text-gray-800'
				/>
			</StyledView>
			<StyledBtn 
				className='ml-2 bg-blue-500 rounded-full w-12 h-12'
				onPress={action}
			>
				<StyledText className='text-white mx-auto my-auto'>
					Enviar
				</StyledText>
			</StyledBtn>
		</StyledView>
	);
};

export default SendChat;
