function toggleComments() {
    const commentWrapper = document.querySelector('.comment-wrapper');
    const toggleButton = document.getElementById('show-comments-toggle');

    if (commentWrapper && toggleButton) {
        const isHidden = commentWrapper.hasAttribute('hidden');

        if (isHidden) {
            commentWrapper.removeAttribute('hidden');
            toggleButton.setAttribute('aria-expanded', 'true');
            toggleButton.textContent = "Hide comments";
            commentWrapper.style.display = 'block';
            const nameInput = document.getElementById('name');
            if (nameInput) {
                nameInput.focus();
            }
        } else {
            commentWrapper.setAttribute('hidden', '');
            toggleButton.setAttribute('aria-expanded', 'false');
            toggleButton.textContent = "Show comments";
            commentWrapper.style.display = 'none';
        }
    }
}

window.onload = function() {
    const toggleButton = document.getElementById('show-comments-toggle');

    if (toggleButton) {
        toggleButton.addEventListener('click', toggleComments);

        toggleButton.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleComments();
            }
        });
    }
};