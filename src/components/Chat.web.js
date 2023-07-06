import Message from './Message';
import React, { useRef, useEffect, useState } from 'react';

const Chat = ({ messages, showTyping }) => {
	if (!messages || messages.length === 0) return <div className='flex-1' />;

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
			const textComponent = (
				<p key={`text-${startIndex}`}>{textBeforeLink}</p>
			);
			const linkComponent = (
				<a
					key={`link-${startIndex}`}
					href={linkURL}
					target='_blank'
					rel='noopener noreferrer'
				>
					{linkText}
				</a>
			);

			matches.push(textComponent, linkComponent);

			startIndex = match.index + match[0].length;
		}

		if (texto && startIndex < texto.length) {
			const textAfterLinks = texto.substring(startIndex);
			const textComponent = (
				<p key={`text-${startIndex}`}>{textAfterLinks}</p>
			);
			matches.push(textComponent);
		}

		return matches;
	};

	const [cargandoTxt, setCargando] = useState('');
	const frase = '... escribiendo mensaje ...';

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
	}, []);

	return (
		<>
			<div className='flex-1'>
				<ul ref={flatListRef}>
					{messages.map((item) => {
						const { name, content, id, role } = item;
						const cleanMessage = buscarLinks(content);

						return (
							<li key={id}>
								<Message
									showTyping={showTyping}
									name={name}
									content={cleanMessage}
									role={role}
								/>
							</li>
						);
					})}
				</ul>
				{showTyping && (
					<div className='p-4'>
						<div className='flex flex-row items-center mb-2'>
							<div className='w-4 h-4 rounded-full bg-green-500' />
							<p className='mx-2 font-bold text-lg'>
								Ferretería Geoconstructor
							</p>
						</div>
						<p className='ml-6 text-gray-800'>{cargandoTxt}</p>
					</div>
				)}
			</div>
		</>
	);
};

export default Chat;
