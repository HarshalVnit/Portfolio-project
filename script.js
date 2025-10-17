// Wait for the HTML page to be fully loaded before running any script
document.addEventListener('DOMContentLoaded', function() {

  
    function initTypeWriter() {
        // We target the h1 with the class "typing-text"
        const h1Element = document.querySelector('h1.typing-text');
        
        if (h1Element) {
            const text = h1Element.textContent; // "Hello, I'm marvel"
            let i = 0;
            h1Element.innerHTML = ''; // Clear the text to start typing
            
            function type() {
                if (i < text.length) {
                    h1Element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, 150); // 150ms delay between letters
                }
            }
            type();
        }
    }

   
    function initDarkModeToggle() {
        const toggleBtn = document.getElementById('dark-mode-toggle');
        const body = document.body;

        if (toggleBtn) {
            // Check localStorage to see if dark mode was enabled on a previous visit
            if (localStorage.getItem('theme') === 'dark') {
                body.classList.add('dark-mode');
                toggleBtn.innerHTML = '☀️'; // Sun icon
            }

            // Add the click event to the button
            toggleBtn.addEventListener('click', function() {
                body.classList.toggle('dark-mode');

                // Save the user's choice for their next visit
                if (body.classList.contains('dark-mode')) {
                    toggleBtn.innerHTML = '☀️';
                    localStorage.setItem('theme', 'dark');
                } else {
                    toggleBtn.innerHTML = '🌙';
                    localStorage.setItem('theme', 'light');
                }
            });
        }
    }

    
    function initContactForm() {
        // We target the form with the ID "contact-form"
        const contactForm = document.getElementById('contact-form');

        if (contactForm) {
            contactForm.addEventListener('submit', function(event) {
                event.preventDefault(); // Stop the form from submitting the old way

                // Simple validation
                const firstName = document.getElementById('firstname').value.trim();
                const email = document.getElementById('email').value.trim();
                if (firstName === '' || email === '' || !email.includes('@')) {
                    alert('Please enter a valid first name and email!');
                    return; // Stop if validation fails
                }

                // Create a single object to hold all data for this submission
                const submissionData = {
                    firstName: firstName,
                    lastName: document.getElementById('lastname').value.trim(),
                    email: email,
                    college: document.getElementById('cname').value.trim(),
                    branch: document.getElementById('branch').value,
                    year: document.querySelector('input[name="year"]:checked').value,
                    submittedAt: new Date().toLocaleString()
                };
                
                // Save all submissions in a list in localStorage
                const allSubmissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
                allSubmissions.push(submissionData);
                localStorage.setItem('formSubmissions', JSON.stringify(allSubmissions));

                alert('Form submitted successfully!');
                window.location.href = 'thankyou.html'; // Go to thank you page
            });
        }
    }


    function displayThankYouData() {
        // We target the div with the ID "submission-display"
        const displayArea = document.getElementById('submission-display');

        if (displayArea) {
            const allSubmissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
            
            if (allSubmissions.length > 0) {
                const lastSubmission = allSubmissions[allSubmissions.length - 1]; // Get the most recent one

                // Create HTML to show the user their data
                displayArea.innerHTML = `
                    <h3>Here is the information you submitted:</h3>
                    <p><strong>Name:</strong> ${lastSubmission.firstName} ${lastSubmission.lastName}</p>
                    <p><strong>Email:</strong> ${lastSubmission.email}</p>
                    <p><strong>College:</strong> ${lastSubmission.college}</p>
                    <p><strong>Year:</strong> ${lastSubmission.year}</p>
                `;
            }
        }
    }

    // INITIALIZE ALL FUNCTIONS
    initTypeWriter();
    initDarkModeToggle();
    initContactForm();
    displayThankYouData();
});