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
    chickenBiryani: {
        'single-9': 9,
        'family-39': 39,
        'medium-75': 75,
        'large-99': 99
    },
    paneerBiryani: {
        'single-9': 9,
        'family-39': 39,
        'medium-75': 75,
        'large-99': 99
    },
    muttonBiryani: {
        'single-12': 12,
        'family-55': 55,
        'medium-99': 99,
        'large-139': 139
    }
};

// Track form fields
const requiredFields = ['fullName', 'phone', 'email', 'address', 'spiceLevel'];
const allFields = [
    'fullName', 'phone', 'email', 'address',
    'drumsticks', 'chops', 
    'chickenBiryaniSize', 'chickenBiryaniQty',
    'paneerBiryaniSize', 'paneerBiryaniQty',
    'muttonBiryaniSize', 'muttonBiryaniQty',
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
            } else if (field.tagName === 'SELECT') {
                if (field.value !== '') {
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
    const chickenSize = document.getElementById('chickenBiryaniSize').value;
    const chickenQty = parseInt(document.getElementById('chickenBiryaniQty').value) || 0;
    if (chickenSize && chickenQty > 0) {
        const pricePerItem = prices.chickenBiryani[chickenSize];
        const itemTotal = chickenQty * pricePerItem;
        const sizeName = document.getElementById('chickenBiryaniSize').selectedOptions[0].text;
        items.push({
            name: `Chicken Biryani - ${sizeName} (${chickenQty})`,
            price: itemTotal
        });
        total += itemTotal;
    }
    
    // Paneer Biryani
    const paneerSize = document.getElementById('paneerBiryaniSize').value;
    const paneerQty = parseInt(document.getElementById('paneerBiryaniQty').value) || 0;
    if (paneerSize && paneerQty > 0) {
        const pricePerItem = prices.paneerBiryani[paneerSize];
        const itemTotal = paneerQty * pricePerItem;
        const sizeName = document.getElementById('paneerBiryaniSize').selectedOptions[0].text;
        items.push({
            name: `Paneer Biryani - ${sizeName} (${paneerQty})`,
            price: itemTotal
        });
        total += itemTotal;
    }
    
    // Mutton Biryani
    const muttonSize = document.getElementById('muttonBiryaniSize').value;
    const muttonQty = parseInt(document.getElementById('muttonBiryaniQty').value) || 0;
    if (muttonSize && muttonQty > 0) {
        const pricePerItem = prices.muttonBiryani[muttonSize];
        const itemTotal = muttonQty * pricePerItem;
        const sizeName = document.getElementById('muttonBiryaniSize').selectedOptions[0].text;
        items.push({
            name: `Mutton Biryani - ${sizeName} (${muttonQty})`,
            price: itemTotal
        });
        total += itemTotal;
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
                    <span class="summary-item-price">$${item.price.toFixed(2)}</span>
                </div>
            `;
        });
        summaryContent.innerHTML = summaryHTML;
    }
    
    totalAmount.textContent = '$' + total.toFixed(2);
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
    // Validate at least one item is ordered
    const hasItems = 
        (parseInt(document.getElementById('drumsticks').value) || 0) > 0 ||
        (parseInt(document.getElementById('chops').value) || 0) > 0 ||
        (document.getElementById('chickenBiryaniSize').value && (parseInt(document.getElementById('chickenBiryaniQty').value) || 0) > 0) ||
        (document.getElementById('paneerBiryaniSize').value && (parseInt(document.getElementById('paneerBiryaniQty').value) || 0) > 0) ||
        (document.getElementById('muttonBiryaniSize').value && (parseInt(document.getElementById('muttonBiryaniQty').value) || 0) > 0);
    
    if (!hasItems) {
        e.preventDefault();
        alert('Please select at least one item to order.');
        return;
    }
    
    // Create formatted order summary for email
    let orderSummary = '=== ORDER DETAILS ===\n\n';
    let total = 0;
    
    // Add grilled items
    const drumsticksQty = parseInt(document.getElementById('drumsticks').value) || 0;
    if (drumsticksQty > 0) {
        const itemTotal = drumsticksQty * prices.drumsticks;
        orderSummary += `Grilled Drumsticks: ${drumsticksQty} x $${prices.drumsticks} = $${itemTotal}\n`;
        total += itemTotal;
    }
    
    const chopsQty = parseInt(document.getElementById('chops').value) || 0;
    if (chopsQty > 0) {
        const itemTotal = chopsQty * prices.chops;
        orderSummary += `Grilled Goat/Lamb Chops: ${chopsQty} x $${prices.chops} = $${itemTotal}\n`;
        total += itemTotal;
    }
    
    // Add biryani items
    const chickenSize = document.getElementById('chickenBiryaniSize').value;
    const chickenQty = parseInt(document.getElementById('chickenBiryaniQty').value) || 0;
    if (chickenSize && chickenQty > 0) {
        const pricePerItem = prices.chickenBiryani[chickenSize];
        const itemTotal = chickenQty * pricePerItem;
        const sizeName = document.getElementById('chickenBiryaniSize').selectedOptions[0].text;
        orderSummary += `Chicken Biryani - ${sizeName}: ${chickenQty} x $${pricePerItem} = $${itemTotal}\n`;
        total += itemTotal;
    }
    
    const paneerSize = document.getElementById('paneerBiryaniSize').value;
    const paneerQty = parseInt(document.getElementById('paneerBiryaniQty').value) || 0;
    if (paneerSize && paneerQty > 0) {
        const pricePerItem = prices.paneerBiryani[paneerSize];
        const itemTotal = paneerQty * pricePerItem;
        const sizeName = document.getElementById('paneerBiryaniSize').selectedOptions[0].text;
        orderSummary += `Paneer Biryani - ${sizeName}: ${paneerQty} x $${pricePerItem} = $${itemTotal}\n`;
        total += itemTotal;
    }
    
    const muttonSize = document.getElementById('muttonBiryaniSize').value;
    const muttonQty = parseInt(document.getElementById('muttonBiryaniQty').value) || 0;
    if (muttonSize && muttonQty > 0) {
        const pricePerItem = prices.muttonBiryani[muttonSize];
        const itemTotal = muttonQty * pricePerItem;
        const sizeName = document.getElementById('muttonBiryaniSize').selectedOptions[0].text;
        orderSummary += `Mutton Biryani - ${sizeName}: ${muttonQty} x $${pricePerItem} = $${itemTotal}\n`;
        total += itemTotal;
    }
    
    orderSummary += `\n--- TOTAL: $${total.toFixed(2)} ---\n\n`;
    orderSummary += `Spice Level: ${document.getElementById('spiceLevel').value}\n`;
    
    if (document.getElementById('dietary').value) {
        orderSummary += `Dietary Restrictions: ${document.getElementById('dietary').value}\n`;
    }
    
    if (document.getElementById('coupon').value) {
        orderSummary += `Coupon Code: ${document.getElementById('coupon').value}\n`;
    }
    
    if (document.getElementById('comments').value) {
        orderSummary += `Additional Comments: ${document.getElementById('comments').value}\n`;
    }
    
    // Add hidden field with order summary
    let summaryField = document.getElementById('orderSummaryField');
    if (!summaryField) {
        summaryField = document.createElement('input');
        summaryField.type = 'hidden';
        summaryField.id = 'orderSummaryField';
        summaryField.name = 'Order Summary';
        orderForm.appendChild(summaryField);
    }
    summaryField.value = orderSummary;
    
    // Add hidden field with total
    let totalField = document.getElementById('orderTotalField');
    if (!totalField) {
        totalField = document.createElement('input');
        totalField.type = 'hidden';
        totalField.id = 'orderTotalField';
        totalField.name = 'Order Total';
        orderForm.appendChild(totalField);
    }
    totalField.value = '$' + total.toFixed(2);
    
    // Form will submit naturally to FormSubmit
    // Show submission message
    console.log('Order being submitted:', orderSummary);
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
