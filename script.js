// Set min date to today for both date inputs
const today = new Date().toISOString().split('T')[0];
const dateInputs = [document.getElementById('date'), document.getElementById('office-date')];
dateInputs.forEach(input => {
  if (input) input.min = today;
});

// Cache elements once
const serviceButtons = document.querySelectorAll('.service-btn');
const bookingForm = document.getElementById('booking-form');
const selectedServiceText = document.getElementById('selected-service');
const confirmation = document.getElementById('confirmation');

const officeBookingForm = document.getElementById('office-booking-form');
const officeConfirmation = document.getElementById('office-confirmation');
const officeAddress = "123 Main St, Suite 400, YourCity, YourCountry";

let selectedService = null;

// Hide booking form initially
bookingForm.style.display = 'none';

// Utility function to show confirmation message
function showMessage(element, message, isSuccess = true) {
  element.style.color = isSuccess ? '#0e7611ff' : '#c1180cff';
  element.textContent = message;
}

// When a service button is clicked, show booking form with selected service
serviceButtons.forEach(button => {
  button.addEventListener('click', () => {
    selectedService = button.dataset.service;
    selectedServiceText.textContent = `Service: ${selectedService}`;
    bookingForm.style.display = 'block';
    confirmation.textContent = '';
    bookingForm.scrollIntoView({ behavior: 'smooth' });
  });
});

// Validate email format with simple regex
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Validate phone number (simple example)
function isValidPhone(phone) {
  return phone.length >= 7; // You can enhance this with regex based on your needs
}

// Handle service booking form submission
bookingForm.addEventListener('submit', e => {
  e.preventDefault();

  const name = document.getElementById('fullname').value.trim();
  const email = document.getElementById('email').value.trim();
  const date = document.getElementById('date').value;
  const country = document.getElementById('country').value.trim();
  const phone = document.getElementById('phone').value.trim();

  if (!selectedService) {
    showMessage(confirmation, 'Please select a service.', false);
    return;
  }
  if (!name || !email || !date || !country || !phone) {
    showMessage(confirmation, 'Please fill out all required fields.', false);
    return;
  }
  if (!isValidEmail(email)) {
    showMessage(confirmation, 'Please enter a valid email address.', false);
    return;
  }
  if (!isValidPhone(phone)) {
    showMessage(confirmation, 'Please enter a valid phone number.', false);
    return;
  }

  // Show success message and log data
  showMessage(confirmation, `Thank you for your booking for ${selectedService}! We'll be in touch shortly.`);
  console.log({
    service: selectedService,
    fullname: name,
    email: email,
    phone: phone,
    country: country,
    date: date
  });

  bookingForm.style.display = 'none';
  selectedServiceText.textContent = 'Service: None Selected';
  bookingForm.reset();
  selectedService = null;
});

// Handle office booking form submission
officeBookingForm.addEventListener('submit', e => {
  e.preventDefault();

  const fullname = officeBookingForm['office-fullname'].value.trim();
  const email = officeBookingForm['office-email'].value.trim();
  const phone = officeBookingForm['office-phone'].value.trim();
  const date = officeBookingForm['office-date'].value;
  const hours = officeBookingForm['office-hours'].value;

  if (!fullname || !email || !phone || !date || !hours) {
    showMessage(officeConfirmation, 'Please fill out all required fields.', false);
    return;
  }
  if (!isValidEmail(email)) {
    showMessage(officeConfirmation, 'Please enter a valid email address.', false);
    return;
  }
  if (!isValidPhone(phone)) {
    showMessage(officeConfirmation, 'Please enter a valid phone number.', false);
    return;
  }
  if (isNaN(hours) || hours < 1 || hours > 12) {
    showMessage(officeConfirmation, 'Please enter a valid number of hours (1-12).', false);
    return;
  }

  const formattedDate = new Date(date).toLocaleDateString(undefined, {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  officeConfirmation.style.color = '#0e7611ff';
  officeConfirmation.innerHTML = `
    <p>Thank you, <strong>${fullname}</strong>!</p>
    <p>Your office booking is confirmed for <strong>${formattedDate}</strong> for <strong>${hours} hour(s)</strong>.</p>
    <p>Please come to: <strong>${officeAddress}</strong></p>
    <p>We will contact you at <strong>${email}</strong> or <strong>${phone}</strong> if needed.</p>
  `;

  officeBookingForm.reset();
});
