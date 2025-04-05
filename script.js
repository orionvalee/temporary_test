document.addEventListener('DOMContentLoaded', () => {
    const pollOptions = ["Option 1", "Option 2", "Option 3", "Option 4"];
    const pollContainer = document.getElementById('poll-options');
    const resultsContainer = document.getElementById('results');
    const resultsList = document.getElementById('results-list');
    const submitButton = document.getElementById('submit-vote');

    // Render poll options
    pollOptions.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.innerHTML = `
            <label>
                <input type="radio" name="poll" value="${index}">
                ${option}
            </label>
        `;
        pollContainer.appendChild(optionDiv);
    });

    // Handle vote submission
    submitButton.addEventListener('click', () => {
        const selectedOption = document.querySelector('input[name="poll"]:checked');
        if (!selectedOption) {
            alert('Please select an option before submitting your vote.');
            return;
        }

        const selectedValue = parseInt(selectedOption.value);
        const results = pollOptions.map((option, index) => {
            return {
                option,
                votes: index === selectedValue ? 1 : 0
            };
        });

        // Display results
        resultsList.innerHTML = '';
        results.forEach(result => {
            const resultItem = document.createElement('li');
            resultItem.textContent = `${result.option}: ${result.votes} vote(s)`;
            resultsList.appendChild(resultItem);
        });

        resultsContainer.classList.remove('hidden');
    });

    const initializePollButton = document.getElementById('initialize-poll');
    const pollTitleInput = document.getElementById('poll-title');
    const pollDescriptionInput = document.getElementById('poll-description');
    const pollOptionsInput = document.getElementById('poll-options-input');

    initializePollButton.addEventListener('click', () => {
        const title = pollTitleInput.value.trim();
        const description = pollDescriptionInput.value.trim();
        const options = pollOptionsInput.value.split(',').map(option => option.trim()).filter(option => option);

        if (!title || !description || options.length < 2) {
            alert('Please provide a title, description, and at least two options.');
            return;
        }

        // Update the poll title and description
        document.querySelector('h1').textContent = title;
        document.querySelector('p').textContent = description;

        // Clear existing options and render new ones
        const pollContainer = document.getElementById('poll-options');
        pollContainer.innerHTML = '';
        options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.innerHTML = `
                <label>
                    <input type="radio" name="poll" value="${index}">
                    ${option}
                </label>
            `;
            pollContainer.appendChild(optionDiv);
        });

        // Clear inputs
        pollTitleInput.value = '';
        pollDescriptionInput.value = '';
        pollOptionsInput.value = '';

        alert('Poll initialized successfully!');
    });
});

function handleCredentialResponse(response) {
    console.log('Encoded JWT ID token: ' + response.credential);
    alert('Sign-In Successful!');
}

window.onload = function () {
    const script = document.createElement('script');
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
};