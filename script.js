// --- MOBILE MENU LOGIC ---

// --- 1. ELEMENT SELECTIONS ---
const openBtn = document.getElementById('openBtn');
const closeBtn = document.getElementById('closeMenu');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const alertOverlay = document.getElementById('customAlert');
const alertBox = document.getElementById('alertBox');

// --- 2. MOBILE MENU ANIMATION ---
function toggleMobileMenu(isOpen) {
    if (isOpen) {
        mobileMenu.classList.remove('hidden');
        setTimeout(() => {
            mobileMenu.classList.remove('opacity-0');
            mobileMenu.classList.add('opacity-100');
        }, 10);
    } else {
        mobileMenu.classList.add('opacity-0');
        mobileMenu.classList.remove('opacity-100');
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 500);
    }
}

// --- 3. EVENT LISTENERS ---
if (openBtn) openBtn.onclick = () => toggleMobileMenu(true);
if (closeBtn) closeBtn.onclick = () => toggleMobileMenu(false);
mobileLinks.forEach(link => {
    link.onclick = () => toggleMobileMenu(false);
});



// --- DASHBOARD ACCESS GUARD ---
function checkAccess(targetUrl) {
    const isMember = localStorage.getItem('isFitCoreMember');

    if (isMember === 'true') {
        window.location.href = targetUrl;
    } else {
        // Trigger your existing Custom Alert
        const alertOverlay = document.getElementById('customAlert');
        const alertBox = document.getElementById('alertBox');

        alertOverlay.classList.remove('hidden');
        setTimeout(() => {
            alertBox.classList.remove('scale-95', 'opacity-0');
            alertBox.classList.add('scale-100', 'opacity-100');
        }, 10);
    }
}

// // Function to close the alert (referenced in your HTML)
// function closeEliteAlert() {
//     window.location.href = 'joinNow.html';
// }



// Reveal animation on scroll
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, { threshold: 0.1 });

reveals.forEach(reveal => observer.observe(reveal));

// Background scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('py-2', 'bg-dark/90');
        nav.classList.remove('py-4', 'bg-white/5');
    } else {
        nav.classList.remove('py-2', 'bg-dark/90');
        nav.classList.add('py-4', 'bg-white/5');
    }
});


// handlePurchase

function handlePurchase(planName) {
    // Check if the user has already joined (we will set this flag in joinNow.html)
    const isJoined = localStorage.getItem('isFitCoreMember');

    if (!isJoined) {
        // Redirect to Join Now page if they haven't registered
        showEliteAlert("To unlock the " + planName + " plan, you must first register your profile.");

    } else {
        // Redirect to the "Other Info" or Payment page if already joined
        window.location.href = `plan-details.html?plan=${planName}`;
    }
}


// calculateBMI

function calculateBMI() {
    // 1. Get Input Values
    const weight = parseFloat(document.getElementById('weight').value);
    const heightCm = parseFloat(document.getElementById('height').value);

    // 2. DOM Elements for Output
    const resultDisplay = document.getElementById('bmi-result');
    const statusDisplay = document.getElementById('bmi-status');
    const adviceDisplay = document.getElementById('bmi-advice');

    // 3. Validation: Ensure numbers are entered and positive
    if (!weight || !heightCm || weight <= 0 || heightCm <= 0) {
        alert("Please enter valid weight and height numbers.");
        return;
    }

    // 4. BMI Formula: weight (kg) / [height (m)]^2
    const heightM = heightCm / 100;
    const bmi = (weight / (heightM * heightM)).toFixed(1);

    // 5. Determine Status and Advice
    let status = "";
    let advice = "";
    let color = "#00FF88"; // Default FitCore Green

    if (bmi < 18.5) {
        status = "Underweight";
        advice = "Focus on a surplus of nutrient-dense calories to build strength.";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        status = "Healthy Weight";
        advice = "Perfect starting point. Focus on maintenance and muscle definition.";
    } else if (bmi >= 25 && bmi <= 29.9) {
        status = "Overweight";
        advice = "Incorporate more HIIT and steady-state cardio into your routine.";
    } else {
        status = "Obese";
        advice = "Start with low-impact strength training and strict macro tracking.";
        color = "#FF4B4B"; // Change to Red for warning if desired
    }

    // 6. Update UI with Animation
    resultDisplay.innerText = bmi;
    resultDisplay.style.color = color;
    statusDisplay.innerText = status;
    statusDisplay.style.color = color;
    adviceDisplay.innerText = `"${advice}"`;

    // 7. SYNC: Save to LocalStorage for the Dashboard/Diet Plan
    localStorage.setItem('lastBMI', bmi);

    // Add a small "glow" pulse to the result card on success
    const resultCard = resultDisplay.parentElement;
    resultCard.classList.add('border-[#00FF88]/50');
    setTimeout(() => resultCard.classList.remove('border-[#00FF88]/50'), 1000);
}

// showEliteAlert

function showEliteAlert(message) {
    const modal = document.getElementById('customAlert');
    const box = document.getElementById('alertBox');
    const msg = document.getElementById('alertMessage');

    msg.innerText = message;
    modal.classList.remove('hidden');

    // Smooth animation trigger
    setTimeout(() => {
        box.classList.remove('scale-95', 'opacity-0');
        box.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function closeEliteAlert() {
    const modal = document.getElementById('customAlert');
    const box = document.getElementById('alertBox');

    // Start the closing animation
    box.classList.add('scale-95', 'opacity-0');
    box.classList.remove('scale-100', 'opacity-100');

    // Wait for animation to finish before hiding the div entirely
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 200); 
}


function toggleFAQ(id) {
    const answer = document.getElementById(`ans-${id}`);
    const icon = document.getElementById(`icon-${id}`);
    
    // Toggle the height for smooth animation
    if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
        icon.style.transform = 'rotate(0deg)';
        icon.classList.replace('fa-minus', 'fa-plus');
    } else {
        // Close other FAQs (Optional: remove this loop if you want multiple open)
        document.querySelectorAll('[id^="ans-"]').forEach(el => el.style.maxHeight = null);
        document.querySelectorAll('[id^="icon-"]').forEach(el => {
            el.style.transform = 'rotate(0deg)';
            el.classList.replace('fa-minus', 'fa-plus');
        });

        answer.style.maxHeight = answer.scrollHeight + "px";
        icon.style.transform = 'rotate(45deg)';
        icon.classList.replace('fa-plus', 'fa-minus');
    }
}




