import { StatusBar, View } from 'react-native';
import { useEffect, useState } from 'react';
import { randomUUID } from 'expo-crypto';
import { styled } from 'nativewind';
import { CHAT } from './src/constants';
import Chat from './src/components/Chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SendChat from './src/components/Sendbox';
import axios from 'axios';

// Endpoint al backend
// axios.defaults.baseURL = 'https://chatbot-back-felipe.up.railway.app/api'
axios.defaults.baseURL = 'http://192.168.1.120:3001/api'

const StyledView = styled(View);

const fetchMessagesIA = async (query) => {
	try {
		const {data} = await axios.post('/', {
			content: query
		})
		return data
	} catch (error) {
		console.log(error);
	}
}

export default function App() {
	const [content, setInputValue] = useState(CHAT.PLACEHOLDER); // valor estatico, servirá para traducciones en constants.js
	const [uuid, setUuid] = useState(''); // genera id random, dps cambia con db
	const [messages, setMsje] = useState([]); // estructura base para mensajes IA
	const [showTyping, setShowTyping] = useState(false); // muestra algo antes de recibir respuesta del back

	const onPressInput = () => {
		if (content === CHAT.PLACEHOLDER) setInputValue('');
	};

	const handleInputChange = (text) => {
		setInputValue(text);
	};

	const presionBtn = async () => {
		if (content === '' || content === 'Ingrese un texto') {
		  return console.log('Falta texto en input');
		}else if(content.toLocaleLowerCase() === 'cache'){
			await AsyncStorage.clear()
			setMsje([])
			setInputValue('');
			return console.log('Caché limpiada exitosamente');
		}
	  
		const newMessage = {
		  id: uuid,
		  name: 'Felipe',
		  content,
		};
	  
		setMsje([...messages, newMessage]); // Mostrar el nuevo mensaje
		setInputValue('');
	  
		setShowTyping(true); // Mostrar el texto "escribiendo..."
	  
		try {
		  const IAmsje = await fetchMessagesIA(content);
	  
		  setMsje([...messages, newMessage, IAmsje]);
	  
		  // Guarda el nuevo mensaje en el AsyncStorage
		  const storedMessages = [...messages, newMessage];
		  await AsyncStorage.setItem('messages', JSON.stringify(storedMessages));
		} catch (error) {
		  console.log(error);
		}
	  
		setShowTyping(false); // Ocultar el texto "escribiendo..."
	  };

	useEffect(() => {
		const generateUUID = () => {
			const generatedUuid = randomUUID();
			setUuid(generatedUuid);
		};
		generateUUID();
	}, [messages]);

	useEffect(() => {
		const loadMessagesFromStorage = async () => {
			const storedMessages = await AsyncStorage.getItem('messages');
			if (storedMessages) {
				setMsje(JSON.parse(storedMessages));
			}
		};
		loadMessagesFromStorage();
	}, []);

	return (
		<>
			<StyledView className='flex-1 bg-gray-100 dark:bg-black'>
				<StatusBar />
				<Chat
					messages={messages}
					showTyping={showTyping}
				/>
				<SendChat
					action={presionBtn}
					onChange={handleInputChange}
					inputValue={content}
					onFocus={onPressInput}
				/>
			</StyledView>
		</>
	);
}
