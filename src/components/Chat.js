import { Text, View, ScrollView } from 'react-native';
import * as Linking from 'expo-linking';
import SendChat from './Sendbox';
import Message from './Message';
const messages = [
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
];

const Chat = () => {
    const buscarLinks = (texto) => {
		const regex = /\[(.*?)\]\((.*?)\)/g;
		const matches = [];
	
		let match;
		let startIndex = 0;
	
		while ((match = regex.exec(texto)) !== null) {
		  const linkText = 'VER AQUÍ';
		  const linkURL = match[2];
	
		  const textBeforeLink = texto.substring(startIndex, match.index);
		  const textComponent = <Text key={`text-${startIndex}`}>{textBeforeLink}</Text>;
		  const linkComponent = (
			<Text
			  key={`link-${startIndex}`}
			  onPress={() => {
				Linking.openURL(linkURL);
			  }}
			>
			  {linkText}
			</Text>
		  );
	
		  matches.push(textComponent, linkComponent);
	
		  startIndex = match.index + match[0].length;
		}
	
		if (startIndex < texto.length) {
		  const textAfterLinks = texto.substring(startIndex);
		  const textComponent = <Text key={`text-${startIndex}`}>{textAfterLinks}</Text>;
		  matches.push(textComponent);
		}
	
		return matches;
	}

	return (
		<View className='flex-1 bg-gray-100 dark:bg-black'>
			<View className='flex-1'>
				{
				messages?.map(({ name, content, id, role }) => {
                    const cleanMessage = buscarLinks(content)
					return <Message
						key={id}
						name={name}
						content={cleanMessage}
						role={role}
					/>
				})}
			</View>
			<SendChat />
		</View>
	);
};

export default Chat;
