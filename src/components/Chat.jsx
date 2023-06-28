import { Text, View, TextInput } from 'react-native';
import SendChat from './Sendbox';
import Message from './Message';
const messages = [
    {id: 1, user: 'Felipe', message: 'Hola como estas'},
    {id: 2, user: 'Juanito', message: 'Wenaaa, bien ahí'},
    {id: 3, user: 'Felipe', message: 'Que pasa gil'},
    {id: 4, user: 'Juanito', message: 'No quiero problemas, toma mi dinero'},
]
const Chat = () => {
	return (
		<View className='flex-1 bg-white'>
			<View className='flex-1'>
                {
                    messages?.map(({user, message, id}) => <Message key={id} user={user} message={message}/>)
                }
			</View>
            <SendChat />
		</View>
	);
};

export default Chat;
