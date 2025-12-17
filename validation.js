// ===== FORM VALIDATION & CLIENT-SIDE CREDENTIAL STORAGE =====
// This file handles form validation and stores submitted credentials locally

// Simulated credentials storage (in-memory, persists for current session)
// In real apps, use localStorage or sessionStorage, but this is cleaner for htdocs
let storedCredentials = [];

// Load credentials from localStorage on page load (optional enhancement)
function loadCredentialsFromStorage() {
    const stored = localStorage.getItem('veloceCredentials');
    if (stored) {
        storedCredentials = JSON.parse(stored);
        console.log('Credentials loaded from storage:', storedCredentials);
    }
}

// Save credentials to localStorage
function saveCredentialsToStorage() {
    localStorage.setItem('veloceCredentials', JSON.stringify(storedCredentials));
    console.log('Credentials saved to storage');
}

// ===== VALIDATION FUNCTIONS =====

// Validate name: not empty, at least 2 characters
function validateName(name) {
    const trimmed = name.trim();
    if (trimmed === '') {
        return { valid: false, message: 'Name is required' };
    }
    if (trimmed.length < 2) {
        return { valid: false, message: 'Name must be at least 2 characters' };
    }
    if (!/^[a-zA-Z\s]*$/.test(trimmed)) {
        return { valid: false, message: 'Name can only contain letters and spaces' };
    }
    return { valid: true, message: '' };
}

// Validate email format
function validateEmail(email) {
    const trimmed = email.trim();
    if (trimmed === '') {
        return { valid: false, message: 'Email is required' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
        return { valid: false, message: 'Please enter a valid email address' };
    }
    return { valid: true, message: '' };
}

// Validate subject: not empty, at least 3 characters
function validateSubject(subject) {
    const trimmed = subject.trim();
    if (trimmed === '') {
        return { valid: false, message: 'Subject is required' };
    }
    if (trimmed.length < 3) {
        return { valid: false, message: 'Subject must be at least 3 characters' };
    }
    return { valid: true, message: '' };
}

// Validate message: not empty, at least 10 characters
function validateMessage(message) {
    const trimmed = message.trim();
    if (trimmed === '') {
        return { valid: false, message: 'Message is required' };
    }
    if (trimmed.length < 10) {
        return { valid: false, message: 'Message must be at least 10 characters' };
    }
    return { valid: true, message: '' };
}

// ===== ERROR DISPLAY FUNCTIONS =====

// Display error for a field
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorId = fieldId + '-error';
    let errorSpan = document.getElementById(errorId);

    if (!errorSpan) {
        errorSpan = document.createElement('span');
        errorSpan.id = errorId;
        errorSpan.style.color = 'rgb(255, 84, 89)';
        errorSpan.style.fontSize = '12px';
        errorSpan.style.display = 'block';
        errorSpan.style.marginTop = '4px';
        field.parentElement.appendChild(errorSpan);
    }

    errorSpan.textContent = message;
    field.style.borderColor = 'rgb(255, 84, 89)';
    field.style.borderWidth = '2px';
}

// Clear error for a field
function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorId = fieldId + '-error';
    const errorSpan = document.getElementById(errorId);

    if (errorSpan) {
        errorSpan.textContent = '';
    }
    field.style.borderColor = '';
    field.style.borderWidth = '';
}

// ===== FORM SUBMISSION HANDLER =====

function handleFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form fields
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');

    // Validate all fields
    const nameValidation = validateName(nameField.value);
    const emailValidation = validateEmail(emailField.value);
    const subjectValidation = validateSubject(subjectField.value);
    const messageValidation = validateMessage(messageField.value);

    // Clear previous errors
    clearError('name');
    clearError('email');
    clearError('subject');
    clearError('message');

    let isValid = true;

    // Show errors if any validation fails
    if (!nameValidation.valid) {
        showError('name', nameValidation.message);
        isValid = false;
    }
    if (!emailValidation.valid) {
        showError('email', emailValidation.message);
        isValid = false;
    }
    if (!subjectValidation.valid) {
        showError('subject', subjectValidation.message);
        isValid = false;
    }
    if (!messageValidation.valid) {
        showError('message', messageValidation.message);
        isValid = false;
    }

    // If all validations pass, store credentials and show success
    if (isValid) {
        const credential = {
            name: nameField.value.trim(),
            email: emailField.value.trim(),
            subject: subjectField.value.trim(),
            message: messageField.value.trim(),
            timestamp: new Date().toLocaleString()
        };

        storedCredentials.push(credential);
        saveCredentialsToStorage();

        alert(`✅ Form submitted successfully!\n\nName: ${credential.name}\nEmail: ${credential.email}\n\nCredentials stored at client-side.`);

        // Clear form after successful submission
        document.getElementById('contactForm').reset();

        // Optional: Log all stored credentials
        console.log('All stored credentials:', storedCredentials);
    }
}

// ===== REAL-TIME VALIDATION (optional) =====
// Validate as user types for better UX

function setupRealtimeValidation() {
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const subjectField = document.getElementById('subject');
    const messageField = document.getElementById('message');

    nameField.addEventListener('input', function () {
        if (this.value.trim() !== '') {
            const validation = validateName(this.value);
            if (validation.valid) {
                clearError('name');
            }
        }
    });

    emailField.addEventListener('input', function () {
        if (this.value.trim() !== '') {
            const validation = validateEmail(this.value);
            if (validation.valid) {
                clearError('email');
            }
        }
    });

    subjectField.addEventListener('input', function () {
        if (this.value.trim() !== '') {
            const validation = validateSubject(this.value);
            if (validation.valid) {
                clearError('subject');
            }
        }
    });

    messageField.addEventListener('input', function () {
        if (this.value.trim() !== '') {
            const validation = validateMessage(this.value);
            if (validation.valid) {
                clearError('message');
            }
        }
    });
}

// ===== INITIALIZATION =====

document.addEventListener('DOMContentLoaded', function () {
    // Load credentials from localStorage
    loadCredentialsFromStorage();

    // Attach form submission handler
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    // Setup real-time validation
    setupRealtimeValidation();

    console.log('Form validation initialized');
});
