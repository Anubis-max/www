// function that creates a 'star' element and displays it
function createStarField(container, count) {
    for (let i = 0; i < count; i++) {
        let star = document.createElement('div');
        star.classList.add('star');
        let size = Math.random() * 5;
        star.style.fontSize = `${10 + size}px`;
        star.style.left = `${Math.random() * (document.body.scrollWidth - (40 + size))}px`;
        star.style.top = `${Math.random() * (document.body.scrollHeight - (40 + size))}px`;
        star.style.filter = `hue-rotate(${i * 5}deg)`;
        container.appendChild(star);
    }
}

// star animating function
function animateStars() {
    let AllStars = document.querySelectorAll('.star');
    let num = Math.floor(Math.random()*AllStars.length);
    AllStars[num].classList.toggle('animate');
}

// a function responsible for displaying the menu on mobile devices
function toggleMenu() {
    menuIcon.classList.toggle('bx-x');
    isNavigationVisible = !isNavigationVisible;
    navigationMenu.classList.toggle('hidden', !isNavigationVisible);
}

// a function responsible for typing text
function typeText() {
    if (charIndex < texts[textIndex].length) {
        textElement.textContent += texts[textIndex][charIndex];
        charIndex++;
        setTimeout(typeText, typingSpeed);
    } else {
        setTimeout(deleteText, delayBetweenTexts);
    }
}

// a function responsible for deleting text
function deleteText() {
    if (charIndex > 0) {
        textElement.textContent = texts[textIndex].slice(0, charIndex - 1);
        charIndex--;
        setTimeout(deleteText, typingSpeed);
    } else {
        textIndex = (textIndex + 1) % texts.length; 
        setTimeout(typeText, typingSpeed);
    }
}

// a function responsible for listening for clicking links
function listeningLink() {
    links.forEach(link => {
        link.addEventListener('click', function() {
          links.forEach(l => l.classList.remove('active'));
          this.classList.add('active');
        });
    });
}

// Function that checks div visibility and updates button classes
function checkVisibility() {
    const divIds = ['home', 'about', 'projects', 'contact'];

    const buttons = document.querySelectorAll('.nav-links');

    divIds.forEach((divId, index) => {
        const targetDiv = document.getElementById(divId);
        const button = buttons[index]; 

        if (!targetDiv || !button) return; 

        const rect = targetDiv.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;

        if (inView) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// function for updating lines number
function updateLineNumbers() {
    const numberLinesContainers = document.querySelectorAll('.number-lines, .number-lines2, .number-lines3, .number-lines4');
    const textElements = document.querySelectorAll('.lines-person, .projects-card-child, #message, .home-description');

    textElements.forEach((textElement, index) => {
        const container = numberLinesContainers[index];

        if (!container) {
            console.warn(`No corresponding numberLinesContainer for text element at index ${index}`);
            return;
        }

        container.innerHTML = '';

        const computedStyle = getComputedStyle(textElement);
        const lineHeight = parseFloat(computedStyle.lineHeight);

        if (isNaN(lineHeight) || lineHeight <= 0) {
            console.warn(`Invalid line height for text element at index ${index}`);
            return;
        }

        const height = textElement.scrollHeight;
        const lineCount = Math.ceil(height / lineHeight);

        for (let lineIndex = 1; lineIndex <= lineCount; lineIndex++) {
            const lineElement = document.createElement('div');
            lineElement.textContent = lineIndex;
            container.appendChild(lineElement);
        }
    });
}

// function for sending emails
function sendEmail() {
    const fields = [
        { id: document.querySelector("#name"), errorId: document.querySelector("#name-error") },
        { id: document.querySelector("#email"), errorId: document.querySelector("#email-error") },
        { id: document.querySelector("#phone"), errorId: document.querySelector("#phone-error") },
        { id: document.querySelector("#subject"), errorId: document.querySelector("#subject-error") },
        { id: document.querySelector("#message"), errorId: document.querySelector("#message-error") }
    ];

    let isValid = true; 

    fields.forEach(({ id, errorId }) => {
        const field = id; 
        const error = errorId;

        if (!field.value.trim()) {
            error.style.display = "block";
            isValid = false;
        } else {
            error.style.display = "none";
        }
    });

    if (isValid) {
        const subject = `mail from ${fields[0].id.value.trim()}`;
        const body = `
                    Good morning,

                    Full name: ${fields[0].id.value.trim()}
                    Phone number: ${fields[2].id.value.trim()}
                    Email address: ${fields[1].id.value.trim()}

                    Message content:
                    ${fields[4].id.value.trim()}

                    Best regards!
                    `;
        const mailtoLink = `mailto:lyszczarz.maksymilian@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    }
}

// Getting elements from the DOM
const section = document.querySelector('.sec');
let menuIcon = document.querySelector('#menu-icon');
let navigationMenu = document.querySelector('.navigation-phone');
let navigationMenuhidden = document.querySelector('.hidden');
let isNavigationVisible = false;
const texts = ["Server administrator", "Full stack developer", "Application developer", "Python programmer"];
let textIndex = 0; 
let charIndex = 0; 
const typingSpeed = 150; 
const delayBetweenTexts = 2000; 
const textElement = document.getElementById("animated-text");
const links = document.querySelectorAll('.nav-links');
const form = document.querySelector('form')
const sumbitEmail = document.querySelector('.submit-email')

// Initialization
createStarField(section, 150);
setInterval(animateStars, 50);
typeText();
listeningLink();
updateLineNumbers();
document.addEventListener('scroll', checkVisibility);

// Menu icon click support
if (menuIcon && navigationMenu) {
    menuIcon.addEventListener('click', toggleMenu);
} else {
    console.error('Menu icon or navigation menu not found');
}

document.querySelector("#message").addEventListener('input', (event) => {
    updateLineNumbers();

    const textarea = event.target;
    textarea.style.height = 'auto'; 
    textarea.style.height = `${textarea.scrollHeight}px`; 
});

document.getElementById("emailForm").addEventListener("submit", function (e) {
    sendEmail();
});