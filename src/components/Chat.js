import { Text, View, FlatList } from 'react-native';
import * as Linking from 'expo-linking';
import SendChat from './Sendbox';
import Message from './Message';
import { styled } from 'nativewind';
import { useRef } from 'react';

const StyledView = styled(View)
const StyledText = styled(Text)

const Chat = ({messages, action, onChange, inputValue, onFocus}) => {
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
							key={id}
							name={name}
							content={cleanMessage}
							role={role}
						/>
					}}
				/>
			</StyledView>
		</>
	);
};

export default Chat;
