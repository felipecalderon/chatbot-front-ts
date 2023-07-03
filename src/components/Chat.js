import { Text, View, FlatList } from 'react-native';
import * as Linking from 'expo-linking';
import Message from './Message';
import { styled } from 'nativewind';
import { useEffect, useRef, useState } from 'react';

const StyledView = styled(View)
const StyledText = styled(Text)

const Chat = ({messages, showTyping}) => {
	if(!messages || messages.length === 0) return <StyledView className='flex-1' />
	const flatListRef = useRef(null);
    const buscarLinks = (texto) => {
		const regex = /\[(.*?)\]\((.*?)\)/g;
		const matches = [];
	
		let match;
		let startIndex = 0;
	
		while ((match = regex.exec(texto)) !== null) {
		  const linkText = 'VER AQUÍ';
		  const linkURL = match[2];
	
		  const textBeforeLink = texto.substring(startIndex, match.index);
		  const textComponent = <StyledText key={`text-${startIndex}`}>{textBeforeLink}</StyledText>;
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
		  const textComponent = <StyledText key={`text-${startIndex}`}>{textAfterLinks}</StyledText>;
		  matches.push(textComponent);
		}
	
		return matches;
	}
	const [cargandoTxt, setCargando] = useState('')
	let frase = '... escribiendo mensaje ...'

	useEffect(() => {
		let currentIndex = 0;
		const interval = setInterval(() => {
			// Cada 300ms, agrega el siguiente carácter a la cadena de texto
			setCargando((prevText) => {
			  if (currentIndex === frase.length) {
				// Si se llega al final de la frase, reinicia el texto
				currentIndex = 0;
				return '';
			  } else {
				currentIndex++;
				return frase.slice(0, currentIndex);
			  }
			});
		  }, 100);
		  return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
	}, [])

	return (
		<>
			<StyledView className='flex-1'>
				<FlatList 
					ref={flatListRef}
					data={messages}
					onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
					renderItem={({ item }) => {
						const { name, content, id, role } = item;
						const cleanMessage = buscarLinks(content)
						return <Message
							showTyping={showTyping}
							key={id}
							name={name}
							content={cleanMessage}
							role={role}
						/>
					}}
				/>
				{
					showTyping && <StyledView className='p-4'>
						<StyledView className='flex flex-row items-center mb-2'>
							<StyledView className='w-4 h-4 rounded-full bg-green-500' />
							<StyledText className='mx-2 font-bold text-lg'>Ferretería Geoconstructor</StyledText>
						</StyledView>
						<StyledText className='ml-6 text-gray-800'>{cargandoTxt}</StyledText>
					</StyledView>
				}
			</StyledView>
		</>
	);
};

export default Chat;
