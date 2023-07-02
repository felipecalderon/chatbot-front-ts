import { StatusBar, View } from 'react-native';
import Chat from './src/components/Chat';
import { useEffect, useState } from 'react';
import { randomUUID } from 'expo-crypto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styled } from 'nativewind';
import SendChat from './src/components/Sendbox';

const StyledView = styled(View);
const tempMessages = [
	{
		id: 1,
		role: 'assistant',
		name: 'Ferretería Geoconstructor',
		content:
			'Buen día bienvenido a Geoconstructor, en que te puedo ayudar hoy?',
	},
	{
		id: 2,
		role: 'user',
		name: 'Felipe',
		content: 'Quiero saber el precio del osb ranurado colonial',
	},
	{
		id: 3,
		role: 'assistant',
		name: 'Ferretería Geoconstructor',
		content:
			'El precio del tablero OSB ranurado colonial de 9.0mm de dimensiones 1.22x2.44mts es de $12.490. Puedes encontrar más información en nuestro sitio web [aquí](https://www.geoconstructor.cl/tienda/aglomerados/27141/tablero-osb-ranurado-colonial-9-0mm-1-22x2-44mts/).\n\nRecuerda que tenemos un stock de 500 unidades disponibles. Si tienes alguna otra pregunta, ¡no dudes en hacerla!',
	},
	{ id: 4, role: 'user', name: 'Felipe', content: 'Muchas gracias!' },
	{
		id: 5,
		role: 'assistant',
		name: 'Ferretería Geoconstructor',
		content:
			'De nada, ¡siempre es un placer ayudar! Si tienes alguna otra pregunta, no dudes en hacerla. Estoy aquí para asistirte.',
	},
	{
		id: 'b93aff9b-8dd4-47f3-a21e-c21a1751f7b4',
		name: 'Felipe',
		content: 'Kkjj',
	},
	{
		id: '93326035-07c2-4c87-94df-72ff1a7c8f84',
		name: 'Felipe',
		content: 'Hhhh',
	},
	{
		id: 'c749b8bf-1602-4729-bc37-ed547d8a7960',
		name: 'Felipe',
		content: 'Hujjjj',
	},
	{
		id: 'd6ae4c79-0d5d-48a7-9c52-4b794e16e75c',
		name: 'Felipe',
		content: 'Oiio',
	},
];

export default function App() {
	const [content, setInputValue] = useState('Ingrese un texto');
	const [uuid, setUuid] = useState('');
	const [messages, setMsje] = useState([]);

	const onPressInput = () => {
		if (content === 'Ingrese un texto') setInputValue('');
	};

	const handleInputChange = (text) => {
		setInputValue(text);
	};

	const presionBtn = async () => {
		if (content === '' || content === 'Ingrese un texto') {
			return console.log('Falta texto en input');
		}

		const newMessage = {
			id: uuid,
			name: 'Felipe',
			content,
		};

		setMsje([...messages, newMessage]);
		setInputValue('');

		// Guarda el nuevo mensaje en el AsyncStorage
		const storedMessages = [...messages, newMessage];
		await AsyncStorage.setItem('messages', JSON.stringify(storedMessages));
	};

	useEffect(() => {
		const generateUUID = () => {
			const generatedUuid = randomUUID();
			setUuid(generatedUuid);
		};
		generateUUID();
	}, []);

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
					action={presionBtn}
					onChange={handleInputChange}
					inputValue={content}
					onFocus={onPressInput}
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
