
// Smooth scrolling & Header scroll effect (simplified)
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Intersection Observer for fade-in effect
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Form submission logic
document.getElementById('quoteForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    let isValid = true;
    const requiredFields = ['pickupAddress', 'destinationAddress', 'movingDate', 'contactNumber', 'email', 'serviceType'];
    
    // Clear previous validation styles
    requiredFields.forEach(field => {
        const input = document.getElementById(field);
        input.style.borderColor = '';
        input.style.boxShadow = '';
    });
    
    // Validate required fields and highlight if missing
    requiredFields.forEach(field => {
        if (!data[field] || data[field].trim() === '') {
            isValid = false;
            const input = document.getElementById(field);
            input.style.borderColor = '#e74c3c';
            input.style.boxShadow = '0 0 5px rgba(231, 76, 60, 0.4)';
        }
    });
    
    if (isValid) {
        // Add a more user-friendly success message
        alert('Thank you for your quote request! We will contact you within 24 hours with a detailed quote. Please check your email for a confirmation.');
        this.reset();
    } else {
        alert('Please fill in all required fields to submit your quote request.');
    }
});

// Set minimum date for moving date input to tomorrow
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const dateInput = document.getElementById('movingDate');
    dateInput.min = tomorrow.toISOString().split('T')[0];

    // Set active class on nav link based on URL hash
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Set active link on scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(current)) {
                link.classList.add('active');
            }
        });
    });
});


document.getElementById('paymentForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
    
    // Get form data
    const cardName = document.getElementById('cardName').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;

    // Simulate payment processing
    if (cardName && cardNumber && expiryDate && cvv) {
        // Simulate a delay (e.g., 2 seconds) to mock payment processing
        setTimeout(() => {
            alert("Payment Successful!\nTransaction ID: " + generateTransactionId());
            // Reset the form
            document.getElementById('paymentForm').reset();
        }, 2000);
    } else {
        alert("Please fill in all the fields correctly.");
    }
});

// Function to generate a dummy transaction ID
function generateTransactionId() {
    return 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}
