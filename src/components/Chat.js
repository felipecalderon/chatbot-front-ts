import { FlatList } from 'react-native';
import * as Linking from 'expo-linking';
import Message from './Message';
import { StyledView, StyledText } from '@/NativeWindConfig';

import { useEffect, useRef, useState } from 'react';

const Chat = ({ messages, showTyping }) => {
	if (!messages || messages.length === 0)
		return <StyledView className='flex-1' />;
	const flatListRef = useRef(null);
	const buscarLinks = (texto) => {
		const regex = /\[(.*?)\]\((.*?)\)/g;
		const matches = [];

		let match;
		let startIndex = 0;

		while ((match = regex.exec(texto)) !== null) {
			const linkText = match[1].toUpperCase();
			const linkURL = match[2];

			const textBeforeLink = texto.substring(startIndex, match.index);
			const textComponent = (
				<StyledText key={`text-${startIndex}`}>
					{textBeforeLink}
				</StyledText>
			);
			const linkComponent = (
				<StyledText
					key={`link-${startIndex}`}
					onPress={() => {
						Linking.openURL(linkURL);
					}}
				>
					{linkText}
				</StyledText>
			);

			matches.push(textComponent, linkComponent);

			startIndex = match.index + match[0].length;
		}

		if (texto && startIndex < texto.length) {
			const textAfterLinks = texto.substring(startIndex);
			const textComponent = (
				<StyledText key={`text-${startIndex}`}>
					{textAfterLinks}
				</StyledText>
			);
			matches.push(textComponent);
		}

		return matches;
	};
	const [cargandoTxt, setCargando] = useState('');

	useEffect(() => {
		let frase = '... escribiendo mensaje ...';
		let currentIndex = 0;
		let segundaFrase, terceraFrase;
	  
		const typingInterval = setInterval(() => {
		  setCargando((prevText) => {
			if (currentIndex === frase.length) {
			  currentIndex = 0;
			  return '';
			} else {
			  currentIndex++;
			  return frase.slice(0, currentIndex);
			}
		  });
		}, 100);
	  
		if (showTyping) {
		  segundaFrase = setTimeout(() => {
			frase = '... buscando productos ...';
			currentIndex = 0;
		  }, 3000);
	  
		  terceraFrase = setTimeout(() => {
			frase = '... generando listado de precios ...';
			currentIndex = 0;
		  }, 7000);
		} else {
		  frase = '... escribiendo mensaje ...';
		  currentIndex = 0;
		}
	  
		return () => {
		  clearInterval(typingInterval);
		  clearTimeout(segundaFrase);
		  clearTimeout(terceraFrase);
		};
	  }, [showTyping]);

	return (
		<>
			<StyledView className='flex-1'>
				<FlatList
					ref={flatListRef}
					data={messages}
					onContentSizeChange={() =>
						flatListRef.current?.scrollToEnd({ animated: true })
					}
					renderItem={({ item }) => {
						const { name, content, id, role } = item;
						const cleanMessage = buscarLinks(content);
						return (
							<Message
								showTyping={showTyping}
								key={id}
								name={name}
								content={cleanMessage}
								role={role}
							/>
						);
					}}
				/>
				{showTyping && (
					<StyledView className='p-4 dark:bg-gray-800'>
					<StyledView className='flex flex-row items-center mb-2'>
						<StyledView className='w-4 h-4 rounded-full bg-green-500 dark:bg-green-300' />
						<StyledText className='mx-2 font-bold text-lg text-gray-800 dark:text-white'>
							Javi de Geoconstructor
						</StyledText>
						</StyledView>
						<StyledText className='ml-6 text-gray-800 dark:text-gray-200'>
							{cargandoTxt}
						</StyledText>
					</StyledView>
				)}
			</StyledView>
		</>
	);
};

export default Chat;
