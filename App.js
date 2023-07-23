import { StatusBar } from 'react-native';
import { useEffect, useState } from 'react';
import { randomUUID } from 'expo-crypto';
import { CHAT } from '@/constants';
import { StyledView } from '@/NativeWindConfig';
import Chat from '@/components/Chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SendChat from '@/components/Sendbox';
import axios from 'axios';
import Access from './src/components/Access';
// import app from './src/configs/Firebase';
// Endpoint al backend
axios.defaults.baseURL = 'https://chatbot-back-felipe.up.railway.app/api'
// axios.defaults.baseURL = 'http://192.168.1.120:3001/api';

const fetchMessagesIA = async (query) => {
	try {
		const { data } = await axios.post('/', {
			content: query,
		});
		return data;
	} catch (error) {
		console.log({ error });
		return null;
	}
};

export default function App() {
	const [content, setInputValue] = useState(CHAT.PLACEHOLDER); // valor estatico, servirá para traducciones en constants.js
	const [uuid, setUuid] = useState(''); // genera id random, dps cambia con db
	const [messages, setMsje] = useState([]); // estructura base para mensajes IA
	const [showTyping, setShowTyping] = useState(false); // muestra algo antes de recibir respuesta del back
	let eliminarChat = ['cache', 'eliminar', 'borrar'];
	const onPressInput = () => {
		if (content === CHAT.PLACEHOLDER) setInputValue('');
	};

	const handleInputChange = (text) => {
		setInputValue(text);
	};

	const presionBtn = async () => {
		if (content === '' || content === 'Ingrese un texto') {
			return console.log('Falta texto en input');
		} else if (eliminarChat.includes(content.toLocaleLowerCase())) {
			await AsyncStorage.clear();
			setMsje([]);
			setInputValue('');
			return console.log('Caché limpiado exitosamente');
		}

		const newMessage = {
			id: uuid,
			name: 'Cliente',
			content,
		};

		setMsje([...messages, newMessage]); // Mostrar el nuevo mensaje
		setInputValue('');

		setShowTyping(true); // Mostrar el texto "escribiendo..."

		try {
			const IAmsje = await fetchMessagesIA(content);
			if(IAmsje){
				setMsje([...messages, newMessage, IAmsje]);
			}
			// Guarda el nuevo mensaje en el AsyncStorage
			await AsyncStorage.setItem('messages', JSON.stringify(messages));
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
	return <Access />
	return (
		<>
			<StyledView className='flex-1 bg-gray-100 dark:bg-gray-800'>
				<StatusBar showHideTransition={'slide'}/>
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
