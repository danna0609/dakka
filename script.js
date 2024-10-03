document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');

    // Cargar conversación previa del Local Storage
    loadConversation();

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevenir recarga de página

        const userMessage = userInput.value.trim(); // Eliminar espacios en blanco

        if (userMessage) {
            // Agregar el mensaje del usuario al chat
            addMessageToChat('user', userMessage);

            // Generar respuesta del bot después de un pequeño retraso
            setTimeout(() => {
                const botMessage = getBotResponse(userMessage);
                addMessageToChat('bot', botMessage);
            }, 500);

            // Limpiar el campo de entrada
            userInput.value = '';
        }
    });

    // Función para agregar un mensaje al chat (usuario o bot)
    function addMessageToChat(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.className = sender === 'user' ? 'user-message' : 'bot-message';
        messageElement.textContent = message;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight; // Desplazar el chat hacia abajo

        // Guardar la conversación en Local Storage
        saveConversation(sender, message);
    }

    // Función para guardar la conversación en Local Storage
    function saveConversation(sender, message) {
        const conversation = JSON.parse(localStorage.getItem('chatConversation')) || [];
        conversation.push({ sender, message });
        localStorage.setItem('chatConversation', JSON.stringify(conversation));
    }

    // Función para cargar la conversación previa desde Local Storage
    function loadConversation() {
        const savedConversation = JSON.parse(localStorage.getItem('chatConversation')) || [];
        savedConversation.forEach(({ sender, message }) => {
            addMessageToChat(sender, message);
        });
    }

    // Función para generar la respuesta del bot
    function getBotResponse(input) {
        const responses = {
            'hola': '¡Hola! ¿Cómo te sientes hoy? Estoy aquí para escucharte.',
            'adiós': 'Hasta luego, cuídate mucho. Recuerda que siempre puedes volver a hablar conmigo.',
            'okey': '¡Perfecto! Estoy aquí si necesitas algo más.',
            'bien': '¡Me alegra saber que estás bien! Si en algún momento quieres hablar o compartir algo, aquí estoy.',
            'ansiedad': 'La ansiedad puede ser difícil. Intenta respirar profundamente y enfocarte en el presente. ¿Te gustaría hablar sobre lo que te causa ansiedad?',
            'cansado': 'El cansancio puede ser agotador. Intenta descansar y recargar energías.',
            'mal': 'Tranquilo, solo es un día malo, no una vida mala. ¿Por qué te sientes así?',
            'depresión': 'Si sientes depresión, es importante hablar con alguien de confianza. Intenta hacer algo que te guste, como escuchar música o salir a caminar. ¿Te gustaría hablar más sobre ello?',
            'triste': 'Lamento que te sientas triste. A veces es útil hablar sobre lo que nos molesta. ¿Quieres compartir más sobre cómo te sientes?',
            'estrés': 'El estrés es algo que todos enfrentamos. Practicar ejercicios de respiración o meditación puede ayudar. ¿Quieres saber más sobre cómo manejarlo?',
            'feliz': '¡Me alegra escuchar que estás feliz! Comparte qué te hace sentir así, tal vez pueda ayudarte a mantener esa alegría.',
            'como te llamas': 'Soy Dakka, tu asistente virtual. ¿Cómo te puedo ayudar hoy?',
            'sí': 'Perfecto, ¿qué te gustaría discutir más en detalle?',
            'que son las emociones': 'Las emociones son respuestas psicológicas y fisiológicas a situaciones que vivimos. Nos permiten identificar lo que sentimos y guiar nuestro comportamiento.',
            'para que sirven las emociones': 'Las emociones sirven para comunicarnos, adaptarnos a situaciones y tomar decisiones.',
            'por que es necesario estar bien emocionalmente': 'Estar bien emocionalmente es necesario para la salud física, relaciones saludables, manejo del estrés y calidad de vida.',
            'no': 'Entiendo, si cambias de opinión, estaré aquí para escucharte.',
        };

        // Normalizar el input a minúsculas para la búsqueda
        const normalizedInput = input.toLowerCase();

        // Buscar la respuesta en el objeto de respuestas
        for (let key in responses) {
            if (normalizedInput.includes(key)) {
                return responses[key];
            }
        }

        return 'debido a que soy un chatbot y estoy programado, no puedo entender lo que me quieres decir'; // Respuesta por defecto
    }
});
