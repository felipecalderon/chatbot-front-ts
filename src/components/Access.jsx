import React from 'react';
import { StyledView, StyledText, StyledInput, StyledBtn, StyledImg } from '../NativeWindConfig';
import logogeo from '../../assets/logogeo.png';
const Access = () => {
	return (
		<StyledView className='flex-1 items-center justify-center p-5 bg-gray-100 dark:bg-gray-800'>
			<StyledImg source={logogeo} className='w-48 h-24 mb-3'/>
            
			<StyledText className='text-2xl font-bold text-green-800 mb-5 dark:text-white'>
				¡Bienvenido a GeoChatbot!
			</StyledText>

			<StyledInput
				className='w-full px-3 py-2 mb-4 border border-gray-200 rounded text-gray-700 dark:bg-gray-900 dark:text-white dark:border-gray-700'
				placeholder='Correo electrónico'
				autoCompleteType='username'
			/>

			<StyledInput
				className='w-full px-3 py-2 mb-4 border border-gray-200 rounded text-gray-700 dark:bg-gray-900 dark:text-white dark:border-gray-700'
				placeholder='Contraseña'
				autoCompleteType='password'
				secureTextEntry
			/>

			<StyledBtn className='w-full py-2 bg-blue-500 rounded'>
				<StyledText className='text-center text-white'>Acceder</StyledText>
			</StyledBtn>

			<StyledBtn className='w-full py-2 mt-4 border border-blue-500 rounded'>
				<StyledText className='text-center text-blue-500'>Registrarse</StyledText>
			</StyledBtn>

			<StyledBtn className='w-full py-2 mt-4 bg-red-500 rounded text-white'>
				<StyledText className='text-center text-white'>
					Acceder con Google
				</StyledText>
			</StyledBtn>
		</StyledView>
	);
};

export default Access;
