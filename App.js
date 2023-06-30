import { StatusBar } from 'react-native';
import Chat from './src/components/Chat';
import { useState } from 'react';

export default function App() {
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
			name: 'Juanito',
			content: 'Quiero saber el precio del osb ranurado colonial',
		},
		{
			id: 3,
			role: 'assistant',
			name: 'Ferretería Geoconstructor',
			content:
				'El precio del tablero OSB ranurado colonial de 9.0mm de dimensiones 1.22x2.44mts es de $12.490. Puedes encontrar más información en nuestro sitio web [aquí](https://www.geoconstructor.cl/tienda/aglomerados/27141/tablero-osb-ranurado-colonial-9-0mm-1-22x2-44mts/).\n\nRecuerda que tenemos un stock de 500 unidades disponibles. Si tienes alguna otra pregunta, ¡no dudes en hacerla!',
		},
		{ id: 4, role: 'user', name: 'Juanito', content: 'Muchas gracias!' },
		{
			id: 5,
			role: 'assistant',
			name: 'Ferretería Geoconstructor',
			content:
				'De nada, ¡siempre es un placer ayudar! Si tienes alguna otra pregunta, no dudes en hacerla. Estoy aquí para asistirte.',
		},
	]);

	const presionBtn = (data) => {
    console.log('se hizo clic');
    if(data) setMsje([...messages, data]);
	};

	return (
		<>
			<StatusBar />
			<Chat messages={messages} action={presionBtn} />
		</>
	);
}
