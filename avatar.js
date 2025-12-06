// Avatar module with TTS and AI integration
const MOUTH = {
    left: "50%",
    top: "71%",
    width: "118px",
    height: "30px"
};

const API_KEY = "sk-e0cec48a37bc4588961174b33ce3d385";

function initMouth(avatarElement) {
    const mouth = document.createElement('div');
    mouth.id = 'mouth';
    mouth.style.position = 'absolute';
    mouth.style.left = MOUTH.left;
    mouth.style.top = MOUTH.top;
    mouth.style.width = MOUTH.width;
    mouth.style.height = MOUTH.height;
    mouth.style.background = 'rgba(0, 0, 0, 0.2)';
    mouth.style.borderRadius = '50%';
    mouth.style.transform = 'translateX(-50%)';
    
    avatarElement.style.position = 'relative';
    avatarElement.appendChild(mouth);
    
    return mouth;
}

function mouthMove(mouthEl) {
    if (mouthEl) {
        mouthEl.style.scaleY = 1.2;
    }
}

function mouthClose(mouthEl) {
    if (mouthEl) {
        mouthEl.style.scaleY = 1;
    }
}

function speak(text, mouthEl) {
    return new Promise((resolve) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ru-RU';
        utterance.rate = 0.9;
        
        utterance.onstart = () => {
            if (mouthEl) mouthMove(mouthEl);
        };
        
        utterance.onend = () => {
            if (mouthEl) mouthClose(mouthEl);
            resolve();
        };
        
        speechSynthesis.speak(utterance);
    });
}

function initSTT(callback) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        console.log('Speech Recognition not supported');
        return null;
    }
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'ru-RU';
    
    recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        callback(transcript);
    };
    
    return recognition;
}

async function askAI(question) {
    try {
        const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    { role: 'user', content: question }
                ],
                max_tokens: 200,
                temperature: 0.7
            })
        });
        
        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('AI Error:', error);
        return 'Извините, произошла ошибка при обработке вашего вопроса.';
    }
}

// Export functions
window.avatar = {
    initMouth,
    mouthMove,
    mouthClose,
    speak,
    initSTT,
    askAI
};
