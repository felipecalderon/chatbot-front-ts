import { StatusBar } from 'react-native';
import Chat from './src/components/Chat';
import { useEffect, useState } from 'react';
import { randomUUID } from 'expo-crypto';

export default function App() {
	const [content, setInputValue] = useState('Ingrese un texto');
	const [uuid, setUuid] = useState('');
	const [messages, setMsje] = useState([
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
	]);

	//Funcion temporal solo para crear id, luego borrar
	useEffect(() => {
		const generateUUID = async () => {
			const generatedUuid = randomUUID();
			setUuid(generatedUuid);
		};
		console.log(uuid);
		generateUUID();
	}, [messages]);

	const onPressInput = () => {
		if (content === 'Ingrese un texto') setInputValue('');
	};

	const handleInputChange = (text) => {
		setInputValue(text);
	};

	const presionBtn = () => {
		if (content === '' || content === 'Ingrese un texto')
			return console.log('Falta texto en input');
		setMsje([
			...messages,
			{
				id: uuid,
				name: 'Felipe',
				content,
			},
		]);
		setInputValue('');
	};

	return (
		<>
			<StatusBar />
			<Chat
				messages={messages}
				action={presionBtn}
				onChange={handleInputChange}
				inputValue={content}
				onFocus={onPressInput}
			/>
		</>
	);
}
