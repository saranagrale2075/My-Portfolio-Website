document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const firstName = document.getElementById('firstName');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const sendBtn = document.querySelector('.send-btn');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Show loading state
            sendBtn.textContent = 'Sending...';
            sendBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Message sent successfully!', 'success');
                resetForm();
                sendBtn.textContent = 'Send';
                sendBtn.disabled = false;
            }, 1500);
        }
    });

    function validateForm() {
        let isValid = true;
        
        // Clear previous errors
        document.querySelectorAll('.error').forEach(el => {
            el.classList.remove('error');
        });
        document.querySelectorAll('.error-message').forEach(el => {
            el.remove();
        });

        // Validate first name
        if (!firstName.value.trim()) {
            showError(firstName, 'Please enter your name');
            isValid = false;
        }

        // Validate email
        if (!email.value.trim()) {
            showError(email, 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email');
            isValid = false;
        }

        // Validate message
        if (!message.value.trim()) {
            showError(message, 'Please enter your message');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError(message, 'Message should be at least 10 characters');
            isValid = false;
        }

        return isValid;
    }

    function showError(input, message) {
        input.classList.add('error');
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.textContent = message;
        input.parentNode.appendChild(errorMsg);
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s forwards';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    }

    function resetForm() {
        form.reset();
    }
});