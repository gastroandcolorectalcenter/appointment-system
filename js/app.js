document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('appointmentForm');
    const hospitalSelect = document.getElementById('hospital');
    const dateInput = document.getElementById('appointmentDate');
    const timeSlotInput = document.getElementById('timeSlot');
    const modal = document.getElementById('confirmationModal');
    const closeBtn = document.querySelector('.close');
    const confirmationMessage = document.getElementById('confirmationMessage');

    // Hospital operating days
    const hospitalDays = {
        'Sumeru': [0, 1, 2, 3, 4, 5], // Sun-Fri
        'Vayodha': [0, 2, 4], // Sun, Tue, Thu
        'Norvic': [3, 5] // Wed, Fri
    };

    // Time slots for each hospital
    const hospitalTimeSlots = {
        'Sumeru': ['10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'],
        'Vayodha': ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'],
        'Norvic': ['2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']
    };

    // Set min date to today and max date to 30 days from now
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);
    
    dateInput.min = today.toISOString().split('T')[0];
    dateInput.max = maxDate.toISOString().split('T')[0];

    // Update available dates based on selected hospital
    hospitalSelect.addEventListener('change', function() {
        dateInput.value = '';
        timeSlotInput.value = '';
        if (this.value) {
            const availableDays = hospitalDays[this.value];
            highlightAvailableDays(availableDays);
        }
    });

    // Update time slots based on selected date
    dateInput.addEventListener('change', function() {
        const selectedHospital = hospitalSelect.value;
        if (selectedHospital && this.value) {
            const selectedDate = new Date(this.value);
            const dayOfWeek = selectedDate.getDay();
            
            if (hospitalDays[selectedHospital].includes(dayOfWeek)) {
                // Set random available time slot
                const availableSlots = hospitalTimeSlots[selectedHospital];
                timeSlotInput.value = availableSlots[Math.floor(Math.random() * availableSlots.length)];
            } else {
                alert('Selected hospital is not open on this day. Please choose another date.');
                this.value = '';
                timeSlotInput.value = '';
            }
        }
    });

    // Form submission with Google Sheets integration
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(form);
        const appointmentData = Object.fromEntries(formData);

        try {
            // Replace this URL with your Google Apps Script Web App URL after deployment
            const scriptUrl = 'https://script.google.com/macros/s/AKfycbyTGCGhbQ-rg9HeIhsBUbcs2GH24eJ3pfKnbYrnR3G6HG0O92FoskQcMmBNA-W_jB_S8Q/exec';
            
            const response = await fetch(scriptUrl, {
                method: 'POST',
                mode: 'no-cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointmentData)
            });

            // Show confirmation modal
            confirmationMessage.innerHTML = `
                Thank you ${appointmentData.name}!<br><br>
                Your appointment has been scheduled for ${appointmentData.appointmentDate} at ${appointmentData.timeSlot}<br>
                at ${appointmentData.hospital}.<br><br>
                We will contact you at ${appointmentData.mobile} or ${appointmentData.email} to confirm your appointment.
            `;
            modal.style.display = 'block';

            // Reset form
            form.reset();

            // Send notification to Telegram (you'll add your bot integration later)
            // sendTelegramNotification(appointmentData);

        } catch (error) {
            console.error('Error:', error);
            alert('There was an error submitting your appointment. Please try again.');
        }
    });

    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Utility function to highlight available days
    function highlightAvailableDays(availableDays) {
        const dates = document.querySelectorAll('input[type="date"]');
        dates.forEach(date => {
            const day = new Date(date.value).getDay();
            if (availableDays.includes(day)) {
                date.classList.add('available-date');
                date.classList.remove('unavailable-date');
            } else {
                date.classList.add('unavailable-date');
                date.classList.remove('available-date');
            }
        });
    }
});
