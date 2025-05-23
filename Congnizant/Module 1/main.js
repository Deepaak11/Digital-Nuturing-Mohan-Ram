/**
 * Local Community Event Portal - Main JavaScript File
 * This file contains all the interactive functionality for the community event portal
 * including event management, form validation, geolocation, and user interactions.
 */

// ===== GLOBAL VARIABLES =====
let currentLocation = null;
let eventsData = [];
let userPreferences = {};

// ===== MOCK EVENT DATA =====
const mockEventsData = [
    {
        id: 1,
        title: "Annual Music Festival 2024",
        category: "music",
        date: "2024-12-20",
        time: "6:00 PM",
        location: "Central Park Amphitheater",
        description: "Join us for an evening of live music featuring local artists, food vendors, and community performances. This annual event brings together musicians from across our community.",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&auto=format",
        fee: 25,
        capacity: 500,
        registered: 234,
        organizer: "Community Arts Council",
        tags: ["music", "outdoor", "family-friendly"],
        featured: true
    },
    {
        id: 2,
        title: "Community Sports Day",
        category: "sports",
        date: "2024-12-15",
        time: "9:00 AM",
        location: "Community Sports Complex",
        description: "Action-packed day of sports activities including basketball, soccer, tennis, and fun games for all ages. Prizes and refreshments provided.",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&auto=format",
        fee: 15,
        capacity: 300,
        registered: 156,
        organizer: "Recreation Department",
        tags: ["sports", "outdoor", "competition"],
        featured: false
    },
    {
        id: 3,
        title: "Local Food Fair",
        category: "food",
        date: "2024-12-22",
        time: "11:00 AM",
        location: "Downtown Square",
        description: "Discover delicious cuisines from local restaurants and food trucks. Cooking demonstrations, tastings, and family activities throughout the day.",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop&auto=format",
        fee: 30,
        capacity: 400,
        registered: 189,
        organizer: "Culinary Association",
        tags: ["food", "outdoor", "family-friendly"],
        featured: true
    },
    {
        id: 4,
        title: "Art & Craft Workshop",
        category: "workshop",
        date: "2024-12-18",
        time: "2:00 PM",
        location: "Community Center Room A",
        description: "Learn new artistic techniques in pottery, painting, and crafts. All skill levels welcome. Materials and expert instruction provided.",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&auto=format",
        fee: 20,
        capacity: 50,
        registered: 32,
        organizer: "Arts & Crafts Guild",
        tags: ["workshop", "indoor", "creative"],
        featured: false
    },
    {
        id: 5,
        title: "Local Art Exhibition",
        category: "art",
        date: "2024-12-25",
        time: "10:00 AM",
        location: "Gallery Downtown",
        description: "Showcase of works by talented local artists featuring paintings, sculptures, and mixed media pieces. Meet the artists and learn about their inspiration.",
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&auto=format",
        fee: 18,
        capacity: 200,
        registered: 87,
        organizer: "Local Artists Collective",
        tags: ["art", "indoor", "cultural"],
        featured: false
    },
    {
        id: 6,
        title: "Charity Fun Run",
        category: "sports",
        date: "2024-12-28",
        time: "7:00 AM",
        location: "Riverside Trail",
        description: "5K fun run to support local charities. Registration includes t-shirt, refreshments, and medal. All proceeds go to community welfare programs.",
        image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=300&fit=crop&auto=format",
        fee: 25,
        capacity: 150,
        registered: 98,
        organizer: "Community Wellness Group",
        tags: ["sports", "charity", "outdoor"],
        featured: true
    }
];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Community Event Portal - JavaScript Loaded');
    initializeApp();
});

function initializeApp() {
    // Load events data
    eventsData = getEventsData();
    
    // Load user preferences
    loadUserPreferences();
    
    // Initialize page-specific functionality
    const currentPage = getCurrentPage();
    switch(currentPage) {
        case 'events':
            loadEvents();
            break;
        case 'register':
            initializeRegistrationForm();
            break;
        case 'feedback':
            initializeFeedbackForm();
            break;
        case 'video':
            initializeVideoPage();
            break;
        default:
            initializeHomePage();
    }
}

function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('events.html')) return 'events';
    if (path.includes('register.html')) return 'register';
    if (path.includes('feedback.html')) return 'feedback';
    if (path.includes('video.html')) return 'video';
    return 'home';
}

// ===== EVENT DATA MANAGEMENT =====
function getEventsData() {
    // Try to get events from localStorage first, fallback to mock data
    const storedEvents = localStorage.getItem('communityEvents');
    if (storedEvents) {
        try {
            return JSON.parse(storedEvents);
        } catch (e) {
            console.warn('Error parsing stored events, using mock data');
        }
    }
    
    // Save mock data to localStorage and return it
    localStorage.setItem('communityEvents', JSON.stringify(mockEventsData));
    return mockEventsData;
}

function saveEventsData(events) {
    localStorage.setItem('communityEvents', JSON.stringify(events));
    eventsData = events;
}

// ===== USER PREFERENCES MANAGEMENT =====
function loadUserPreferences() {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
        try {
            userPreferences = JSON.parse(stored);
            applyUserPreferences();
        } catch (e) {
            console.warn('Error loading user preferences');
            userPreferences = {};
        }
    }
}

function saveUserPreferences() {
    localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
}

function applyUserPreferences() {
    // Apply saved event type preference if exists
    const eventTypeSelect = document.getElementById('eventType');
    if (eventTypeSelect && userPreferences.preferredEventType) {
        eventTypeSelect.value = userPreferences.preferredEventType;
        updateEventFee(eventTypeSelect);
    }
}

// ===== GEOLOCATION FUNCTIONALITY =====
function getLocation() {
    console.log('Attempting to get user location...');
    
    if (!navigator.geolocation) {
        showLocationError('Geolocation is not supported by this browser.');
        return;
    }

    // Show loading message
    updateLocationOutput('Getting your location...', 'info');

    const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
    };

    navigator.geolocation.getCurrentPosition(
        onLocationSuccess,
        onLocationError,
        options
    );
}

function onLocationSuccess(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const accuracy = position.coords.accuracy;
    
    currentLocation = { lat, lng, accuracy };
    
    console.log(`Location found: ${lat}, ${lng} (accuracy: ${accuracy}m)`);
    
    const locationText = `Location: ${lat.toFixed(6)}, ${lng.toFixed(6)} (±${Math.round(accuracy)}m)`;
    updateLocationOutput(locationText, 'success');
    
    // Save location to preferences
    userPreferences.lastKnownLocation = currentLocation;
    saveUserPreferences();
    
    // Try to get readable address
    reverseGeocode(lat, lng);
}

function onLocationError(error) {
    let message = 'Unable to get location: ';
    
    switch(error.code) {
        case error.PERMISSION_DENIED:
            message += 'Location access denied by user.';
            break;
        case error.POSITION_UNAVAILABLE:
            message += 'Location information unavailable.';
            break;
        case error.TIMEOUT:
            message += 'Location request timed out.';
            break;
        default:
            message += 'An unknown error occurred.';
            break;
    }
    
    console.error('Geolocation error:', error);
    showLocationError(message);
}

function updateLocationOutput(message, type = 'info') {
    const output = document.getElementById('locationOutput');
    if (output) {
        const alertClass = `alert alert-${type} fade-in`;
        output.innerHTML = `
            <div class="${alertClass}" role="alert">
                <i class="bi bi-geo-alt me-2"></i>${message}
            </div>
        `;
    }
}

function showLocationError(message) {
    updateLocationOutput(message, 'danger');
}

function reverseGeocode(lat, lng) {
    // Note: In a real application, you would use a proper geocoding service
    // For demo purposes, we'll show a formatted coordinate display
    const formattedLocation = `Coordinates: ${lat.toFixed(4)}°, ${lng.toFixed(4)}°`;
    
    setTimeout(() => {
        updateLocationOutput(formattedLocation + ' - Location saved!', 'success');
    }, 1000);
}

// ===== IMAGE HANDLING =====
function enlargeImage(img) {
    console.log('Enlarging image:', img.src);
    
    // Get or create modal
    let modal = document.getElementById('imageModal');
    if (!modal) {
        createImageModal();
        modal = document.getElementById('imageModal');
    }
    
    // Update modal content
    const modalImage = document.getElementById('modalImage');
    const modalTitle = modal.querySelector('.modal-title');
    
    if (modalImage) {
        modalImage.src = img.src;
        modalImage.alt = img.alt || 'Enlarged image';
    }
    
    if (modalTitle) {
        modalTitle.textContent = img.alt || 'Image Preview';
    }
    
    // Show modal
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
}

function createImageModal() {
    const modalHTML = `
        <div class="modal fade" id="imageModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Image Preview</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center">
                        <img id="modalImage" src="" alt="" class="img-fluid">
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// ===== FORM VALIDATION AND HANDLING =====

// Phone validation (onblur event)
function validatePhone(input) {
    const phoneRegex = /^\d{10}$/;
    const cleanPhone = input.value.replace(/\D/g, '');
    
    if (cleanPhone.length === 10 && phoneRegex.test(cleanPhone)) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        return true;
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        return false;
    }
}

// Update event fee (onchange event)
function updateEventFee(select) {
    const selectedOption = select.options[select.selectedIndex];
    const fee = selectedOption.getAttribute('data-fee') || 0;
    const feeInput = document.getElementById('eventFee');
    
    if (feeInput) {
        feeInput.value = fee;
    }
    
    // Save preference
    userPreferences.preferredEventType = select.value;
    saveUserPreferences();
    
    console.log('Event fee updated:', fee);
}

// Confirm registration (onclick event)
function confirmRegistration(event) {
    event.preventDefault();
    
    const form = document.getElementById('registrationForm');
    if (!form) return;
    
    // Validate form
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return false;
    }
    
    // Get form data
    const formData = new FormData(form);
    const registration = Object.fromEntries(formData.entries());
    
    // Add timestamp
    registration.timestamp = new Date().toISOString();
    registration.id = Date.now();
    
    // Save registration
    const registrations = JSON.parse(localStorage.getItem('eventRegistrations') || '[]');
    registrations.push(registration);
    localStorage.setItem('eventRegistrations', JSON.stringify(registrations));
    
    // Show confirmation
    const output = document.getElementById('registrationOutput');
    if (output) {
        output.innerHTML = `
            <div class="alert alert-success fade-in" role="alert">
                <i class="bi bi-check-circle me-2"></i>
                <strong>Registration Successful!</strong><br>
                Thank you ${registration.firstName} ${registration.lastName}! 
                We've received your registration for ${getEventTypeName(registration.eventType)}.
                <br><small>Registration ID: ${registration.id}</small>
            </div>
        `;
    }
    
    console.log('Registration submitted:', registration);
    return true;
}

function getEventTypeName(eventType) {
    const eventTypes = {
        'music': 'Music Festival',
        'sports': 'Sports Day',
        'food': 'Food Fair',
        'workshop': 'Workshop',
        'art': 'Art Exhibition'
    };
    return eventTypes[eventType] || eventType;
}

// ===== EVENTS PAGE FUNCTIONALITY =====
function loadEvents() {
    console.log('Loading events...');
    displayEvents(eventsData);
}

function displayEvents(events) {
    const container = document.getElementById('eventsContainer');
    if (!container) return;
    
    if (events.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info text-center">
                    <i class="bi bi-calendar-x me-2"></i>
                    <h5>No Events Found</h5>
                    <p>There are currently no events matching your criteria. Check back later for updates!</p>
                </div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = events.map(event => createEventCard(event)).join('');
}

function createEventCard(event) {
    const registrationPercentage = Math.round((event.registered / event.capacity) * 100);
    const isAlmostFull = registrationPercentage > 80;
    
    return `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100 shadow-sm hover-scale">
                ${event.featured ? '<div class="position-absolute top-0 end-0 m-2"><span class="badge bg-warning">Featured</span></div>' : ''}
                <img src="${event.image}" class="card-img-top" alt="${event.title}" style="height: 200px; object-fit: cover;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${event.title}</h5>
                    <p class="card-text text-muted flex-grow-1">${event.description.substring(0, 100)}...</p>
                    
                    <div class="event-details mb-3">
                        <small class="text-muted d-block">
                            <i class="bi bi-calendar me-1"></i>${formatDate(event.date)} at ${event.time}
                        </small>
                        <small class="text-muted d-block">
                            <i class="bi bi-geo-alt me-1"></i>${event.location}
                        </small>
                        <small class="text-muted d-block">
                            <i class="bi bi-currency-dollar me-1"></i>${event.fee}
                        </small>
                    </div>
                    
                    <div class="progress mb-2" style="height: 6px;">
                        <div class="progress-bar ${isAlmostFull ? 'bg-warning' : 'bg-success'}" 
                             style="width: ${registrationPercentage}%"></div>
                    </div>
                    <small class="text-muted mb-3">${event.registered}/${event.capacity} registered</small>
                    
                    <div class="mt-auto">
                        <button class="btn btn-outline-primary btn-sm me-2" onclick="showEventDetails(${event.id})">
                            <i class="bi bi-info-circle me-1"></i>Details
                        </button>
                        <a href="register.html" class="btn btn-primary btn-sm">
                            <i class="bi bi-calendar-plus me-1"></i>Register
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function showEventDetails(eventId) {
    const event = eventsData.find(e => e.id === eventId);
    if (!event) return;
    
    const modalTitle = document.getElementById('eventModalTitle');
    const modalBody = document.getElementById('eventModalBody');
    
    if (modalTitle) modalTitle.textContent = event.title;
    
    if (modalBody) {
        modalBody.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <img src="${event.image}" class="img-fluid rounded mb-3" alt="${event.title}">
                </div>
                <div class="col-md-6">
                    <h6>Event Details</h6>
                    <p><strong>Date:</strong> ${formatDate(event.date)}</p>
                    <p><strong>Time:</strong> ${event.time}</p>
                    <p><strong>Location:</strong> ${event.location}</p>
                    <p><strong>Fee:</strong> $${event.fee}</p>
                    <p><strong>Organizer:</strong> ${event.organizer}</p>
                    <p><strong>Capacity:</strong> ${event.capacity} people</p>
                    <p><strong>Registered:</strong> ${event.registered} people</p>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-12">
                    <h6>Description</h6>
                    <p>${event.description}</p>
                    <div class="tags">
                        ${event.tags.map(tag => `<span class="badge bg-secondary me-1">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    const modal = new bootstrap.Modal(document.getElementById('eventModal'));
    modal.show();
}

// ===== KEYBOARD EVENT TRACKING =====
function trackTextareaInput(textarea) {
    const charCount = textarea.value.length;
    const maxLength = parseInt(textarea.getAttribute('maxlength')) || 500;
    
    // Update character count display
    const countElement = document.getElementById('charCount') || document.getElementById('feedbackCharCount');
    if (countElement) {
        countElement.textContent = charCount;
        
        // Change color as approaching limit
        if (charCount > maxLength * 0.9) {
            countElement.classList.add('text-warning');
        } else if (charCount > maxLength * 0.95) {
            countElement.classList.remove('text-warning');
            countElement.classList.add('text-danger');
        } else {
            countElement.classList.remove('text-warning', 'text-danger');
        }
    }
    
    // Enforce character limit
    if (charCount > maxLength) {
        textarea.value = textarea.value.substring(0, maxLength);
        if (countElement) {
            countElement.textContent = maxLength;
        }
    }
    
    console.log(`Textarea input tracked: ${charCount}/${maxLength} characters`);
}

// ===== PAGE-SPECIFIC INITIALIZATIONS =====
function initializeHomePage() {
    console.log('Initializing home page...');
    
    // Load any saved location
    if (userPreferences.lastKnownLocation) {
        const loc = userPreferences.lastKnownLocation;
        updateLocationOutput(`Last known location: ${loc.lat.toFixed(4)}, ${loc.lng.toFixed(4)}`, 'info');
    }
}

function initializeRegistrationForm() {
    console.log('Initializing registration form...');
    
    const form = document.getElementById('registrationForm');
    if (!form) return;
    
    // Set minimum date to today
    const dateInput = document.getElementById('eventDate');
    if (dateInput) {
        dateInput.min = new Date().toISOString().split('T')[0];
    }
    
    // Apply saved preferences
    applyUserPreferences();
    
    // Add form validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (this.checkValidity()) {
            confirmRegistration(e);
        }
        
        this.classList.add('was-validated');
    });
}

function initializeFeedbackForm() {
    console.log('Initializing feedback form...');
    // Feedback form initialization is handled in feedback.html
}

function initializeVideoPage() {
    console.log('Initializing video page...');
    // Video page initialization is handled in video.html
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
document.addEventListener('keydown', function(e) {
    // ESC key to close modals
    if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal.show');
        openModals.forEach(modal => {
            const bsModal = bootstrap.Modal.getInstance(modal);
            if (bsModal) bsModal.hide();
        });
    }
    
    // Enter key on card elements
    if (e.key === 'Enter' && e.target.classList.contains('card')) {
        e.target.click();
    }
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    showNotification('An error occurred. Please refresh the page if problems persist.', 'danger');
});

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', function() {
    // Simple performance logging
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    
    // Log navigation timing if available
    if ('navigation' in performance) {
        const navTiming = performance.getEntriesByType('navigation')[0];
        console.log('Navigation timing:', {
            domContentLoaded: navTiming.domContentLoadedEventEnd - navTiming.domContentLoadedEventStart,
            loadComplete: navTiming.loadEventEnd - navTiming.loadEventStart
        });
    }
});

// ===== EXPORT FOR TESTING (if needed) =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getEventsData,
        validatePhone,
        updateEventFee,
        confirmRegistration,
        getLocation,
        enlargeImage
    };
}

// ===== CONSOLE WELCOME MESSAGE =====
console.log(`
🎉 Welcome to Local Community Event Portal!
📱 Open DevTools to see detailed logging
🔧 All interactive features are ready
📍 Click "Find Near Me" to test geolocation
🎪 Visit /events.html to browse community events
`);
