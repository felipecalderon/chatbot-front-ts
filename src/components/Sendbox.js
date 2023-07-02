import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StyledView = styled(View);
const StyledInput = styled(TextInput);
const StyledText = styled(Text);
const StyledBTN = styled(TouchableOpacity)

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
			<StyledBTN 
			className='ml-2 bg-blue-500 rounded-full w-12 h-12'
			onPress={action}
			>
				<StyledText className='text-white mx-auto my-auto'>
					Enviar
				</StyledText>
			</StyledBTN>
			<StyledBTN 
			className='ml-2 bg-blue-500 rounded-full w-12 h-12'
			onPress={async () => await AsyncStorage.clear()}
			>
				<StyledText className='text-white mx-auto my-auto'>
					Vaciar caché
				</StyledText>
			</StyledBTN>
		</StyledView>
	);
};

export default SendChat;
