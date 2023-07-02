import { Text, TextInput, View } from 'react-native';
import { styled } from 'nativewind';
import { useState } from 'react';

const StyledView = styled(View);
const StyledInput = styled(TextInput);
const StyledText = styled(Text);

const SendChat = ({ action, onChange, inputValue, onFocus }) => {

	return (
		<StyledView className='flex-row p-4 bg-gray-200'>
			<StyledView className='flex-1 bg-white rounded-full px-4 py-2'>
				<StyledInput
					value={inputValue}
					onChangeText={onChange}
					onFocus={onFocus}
					className='text-gray-800'
				/>
			</StyledView>
			<StyledView className='ml-2 bg-blue-500 rounded-full w-12 h-12'>
				<StyledText
					className='text-white mx-auto my-auto'
					onPress={action}
				>
					Enviar
				</StyledText>
			</StyledView>
		</StyledView>
	);
};

export default SendChat;
