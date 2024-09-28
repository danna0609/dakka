document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');

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
        messageElement.className = sender === 'user' ? 'user-message' : 'bot-message'; // Corrige el error de sintaxis
        messageElement.textContent = message;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight; // Desplazar el chat hacia abajo
    }

    // Función para generar la respuesta del bot
    function getBotResponse(input) {
        input = input.toLowerCase();

        // Respuestas básicas basadas en el input
        if (input.includes('hola')) {
            return '¡Hola! ¿Cómo te sientes hoy? Estoy aquí para escucharte.';
        } else if (input.includes('adiós') || input.includes('chao') || input.includes('bye')) {
            return 'Hasta luego, cuídate mucho. Recuerda que siempre puedes volver a hablar conmigo.';
        } else if (input.includes('okey') || input.includes('ok')) {
            return '¡Perfecto! Estoy aquí si necesitas algo más.';
        } else if (input.includes('bien')) {
            return '¡Me alegra saber que estás bien! Si en algún momento quieres hablar o compartir algo, aquí estoy.';
        } else if (input.includes('ansiedad')) {
            return 'La ansiedad puede ser difícil. Intenta respirar profundamente y enfocarte en el presente. ¿Te gustaría hablar sobre lo que te causa ansiedad?';
        } else if (input.includes('cansado')) {
            return 'El cansancio puede ser difícil. Intenta descansar y recargar energías.';
        } else if (input.includes('mal')) {
            return 'tranquilo, solo es un dia malo no una vida mala ¿por que te sientes asi?';
        } else if (input.includes('depresión')) {
            return 'Si sientes depresión, es importante hablar con alguien de confianza. Intenta hacer algo que te guste, como escuchar música o salir a caminar. ¿Te gustaría hablar más sobre ello?';
        } else if (input.includes('triste')) {
            return 'La tristeza puede ser difícil. Intenta respirar profundamente y enfocarte en el presente. ¿Te gustaría hablar sobre lo que te causa la tristeza?';
        } else if (input.includes('estrés')) {
            return 'El estrés es algo que todos enfrentamos. Practicar ejercicios de respiración o meditación puede ayudar. ¿Quieres saber más sobre cómo manejarlo?';
        } else if (input.includes('feliz')) {
            return '¡Me alegra escuchar que estás feliz! Comparte qué te hace sentir así, tal vez pueda ayudarte a mantener esa alegría.';
        } else if (input.includes('triste')) {
            return 'Lamento que te sientas triste. A veces es útil hablar sobre lo que nos molesta. ¿Quieres compartir más sobre cómo te sientes?';
        } else if (input.includes('sí') || input.includes('si')) {
            return 'Perfecto, ¿qué te gustaría discutir más en detalle?';
        } else if (input.includes('no')) {
            return 'Entiendo, si cambias de opinión, estaré aquí para escucharte.';
        } else {
            return 'No estoy seguro de entender. ¿Puedes contarme más sobre lo que sientes?'; // Respuesta por defecto
        }
    }
});