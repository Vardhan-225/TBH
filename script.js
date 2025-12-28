// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Order Form Functionality
const orderForm = document.getElementById('orderForm');
const progressFill = document.getElementById('progressFill');
const progressPercent = document.getElementById('progressPercent');
const summaryContent = document.getElementById('summaryContent');
const totalAmount = document.getElementById('totalAmount');

// Menu item prices
const prices = {
    drumsticks: 2,
    chops: 3,
    chickenBiryani: 0, // Price to be determined or per plate
    paneerBiryani: 0,
    muttonBiryani: 0
};

// Track form fields
const requiredFields = ['fullName', 'phone', 'email', 'address', 'spiceLevel'];
const allFields = [
    'fullName', 'phone', 'email', 'address',
    'drumsticks', 'chops', 'chickenBiryani', 'paneerBiryani', 'muttonBiryani',
    'spiceLevel', 'dietary', 'coupon', 'comments'
];

// Update progress bar
function updateProgress() {
    let filledFields = 0;
    
    allFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            if (field.type === 'number') {
                if (field.value && parseInt(field.value) > 0) {
                    filledFields++;
                }
            } else if (field.value.trim() !== '') {
                filledFields++;
            }
        }
    });
    
    const progress = Math.round((filledFields / allFields.length) * 100);
    progressFill.style.width = progress + '%';
    progressPercent.textContent = progress + '%';
}

// Update order summary
function updateOrderSummary() {
    const items = [];
    let total = 0;
    
    // Grilled Drumsticks
    const drumsticksQty = parseInt(document.getElementById('drumsticks').value) || 0;
    if (drumsticksQty > 0) {
        const itemTotal = drumsticksQty * prices.drumsticks;
        items.push({
            name: `Grilled Drumsticks (${drumsticksQty})`,
            price: itemTotal
        });
        total += itemTotal;
    }
    
    // Grilled Chops
    const chopsQty = parseInt(document.getElementById('chops').value) || 0;
    if (chopsQty > 0) {
        const itemTotal = chopsQty * prices.chops;
        items.push({
            name: `Grilled Goat/Lamb Chops (${chopsQty})`,
            price: itemTotal
        });
        total += itemTotal;
    }
    
    // Chicken Biryani
    const chickenQty = parseInt(document.getElementById('chickenBiryani').value) || 0;
    if (chickenQty > 0) {
        items.push({
            name: `Chicken Biryani (${chickenQty} plate${chickenQty > 1 ? 's' : ''})`,
            price: 0
        });
    }
    
    // Paneer Biryani
    const paneerQty = parseInt(document.getElementById('paneerBiryani').value) || 0;
    if (paneerQty > 0) {
        items.push({
            name: `Paneer Biryani (${paneerQty} plate${paneerQty > 1 ? 's' : ''})`,
            price: 0
        });
    }
    
    // Mutton Biryani
    const muttonQty = parseInt(document.getElementById('muttonBiryani').value) || 0;
    if (muttonQty > 0) {
        items.push({
            name: `Mutton Biryani (${muttonQty} plate${muttonQty > 1 ? 's' : ''})`,
            price: 0
        });
    }
    
    // Update summary display
    if (items.length === 0) {
        summaryContent.innerHTML = '<p class="empty-summary">Add items to see your order summary</p>';
    } else {
        let summaryHTML = '';
        items.forEach(item => {
            summaryHTML += `
                <div class="summary-item">
                    <span class="summary-item-name">${item.name}</span>
                    <span class="summary-item-price">${item.price > 0 ? '$' + item.price.toFixed(2) : 'TBD'}</span>
                </div>
            `;
        });
        summaryContent.innerHTML = summaryHTML;
    }
    
    totalAmount.textContent = total > 0 ? '$' + total.toFixed(2) : '$0.00';
}

// Add event listeners to all form fields
allFields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) {
        field.addEventListener('input', () => {
            updateProgress();
            updateOrderSummary();
        });
        field.addEventListener('change', () => {
            updateProgress();
            updateOrderSummary();
        });
    }
});

// Form submission
orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate at least one item is ordered
    const hasItems = 
        (parseInt(document.getElementById('drumsticks').value) || 0) > 0 ||
        (parseInt(document.getElementById('chops').value) || 0) > 0 ||
        (parseInt(document.getElementById('chickenBiryani').value) || 0) > 0 ||
        (parseInt(document.getElementById('paneerBiryani').value) || 0) > 0 ||
        (parseInt(document.getElementById('muttonBiryani').value) || 0) > 0;
    
    if (!hasItems) {
        alert('Please select at least one item to order.');
        return;
    }
    
    // Collect form data
    const formData = {
        customerInfo: {
            fullName: document.getElementById('fullName').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value
        },
        items: {
            drumsticks: parseInt(document.getElementById('drumsticks').value) || 0,
            chops: parseInt(document.getElementById('chops').value) || 0,
            chickenBiryani: parseInt(document.getElementById('chickenBiryani').value) || 0,
            paneerBiryani: parseInt(document.getElementById('paneerBiryani').value) || 0,
            muttonBiryani: parseInt(document.getElementById('muttonBiryani').value) || 0
        },
        preferences: {
            spiceLevel: document.getElementById('spiceLevel').value,
            dietary: document.getElementById('dietary').value,
            coupon: document.getElementById('coupon').value,
            comments: document.getElementById('comments').value
        }
    };
    
    // Log the order (in production, this would be sent to a server)
    console.log('Order submitted:', formData);
    
    // Show success message
    alert('Thank you for your order! We will contact you shortly to confirm your order and provide payment details.');
    
    // Reset form
    orderForm.reset();
    updateProgress();
    updateOrderSummary();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Account for fixed navbar
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize
updateProgress();
updateOrderSummary();
