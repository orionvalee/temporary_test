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
});