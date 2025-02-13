document.addEventListener('DOMContentLoaded', function() {
    const editButtons = document.querySelectorAll('.edit-btn');

    editButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent any form submission
            const parentTd = this.closest('td'); // Use closest in case the DOM structure changes
            const form = parentTd.querySelector('.edit-form');
            const valueSpan = parentTd.querySelector('.distance-value');
            
            // Check if elements are found
            if(form && valueSpan) {
                form.style.display = 'block';
                valueSpan.style.display = 'none';
                this.style.display = 'none';
            } else {
                console.error('Required elements not found');
            }
        });
    });
});
