document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');

    // Typing delay configuration (in milliseconds)
    const MIN_TYPING_DELAY = 1000;
    const MAX_ADDITIONAL_DELAY = 1000;

    // AI responses for demo purposes
    const aiResponses = [
        "That's an interesting question! Let me think about that...",
        "I'd be happy to help you with that!",
        "Great point! Here's what I think...",
        "Thanks for sharing. Could you tell me more about that?",
        "I understand. Let me provide some insights on this topic.",
        "That's a great question! Based on my knowledge, I can suggest...",
        "I appreciate you asking. Here's my perspective on this matter.",
        "Interesting! Let me break this down for you.",
        "I see what you mean. Here's how I would approach this...",
        "Good question! There are several aspects to consider here."
    ];

    // Get current time formatted
    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // Create message element
    function createMessage(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        
        if (isUser) {
            avatarDiv.textContent = 'U';
        } else {
            avatarDiv.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
            `;
        }
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = `
            <p>${escapeHtml(text)}</p>
            <span class="message-time">${getCurrentTime()}</span>
        `;
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        return messageDiv;
    }

    // Create typing indicator
    function createTypingIndicator() {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.id = 'typingIndicator';
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
        `;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = `
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        return messageDiv;
    }

    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Get random AI response
    function getRandomResponse() {
        return aiResponses[Math.floor(Math.random() * aiResponses.length)];
    }

    // Scroll to bottom of chat
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Send message
    function sendMessage() {
        const text = messageInput.value.trim();
        
        if (!text) return;
        
        // Add user message
        chatMessages.appendChild(createMessage(text, true));
        messageInput.value = '';
        scrollToBottom();
        
        // Show typing indicator
        const typingIndicator = createTypingIndicator();
        chatMessages.appendChild(typingIndicator);
        scrollToBottom();
        
        // Simulate AI response after delay
        setTimeout(() => {
            // Remove typing indicator
            const indicator = document.getElementById('typingIndicator');
            if (indicator) {
                indicator.remove();
            }
            
            // Add AI response
            chatMessages.appendChild(createMessage(getRandomResponse(), false));
            scrollToBottom();
        }, MIN_TYPING_DELAY + Math.random() * MAX_ADDITIONAL_DELAY);
    }

    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Focus input on load
    messageInput.focus();
});
