const aggregateData = document.getElementById('aggregateData');
const aggregateDataBtn = document.getElementById('aggregateDataBtn');

aggregateDataBtn.addEventListener('click', function() {
    if (aggregateData.style.display === 'none' || aggregateData.style.display === '') {
        // If the aggregate data is hidden, show it
        const distances = Array.from(document.querySelectorAll('.distance-value')).map(el => parseFloat(el.textContent));
        const average = distances.reduce((a, b) => a + b, 0) / distances.length;
        const min = Math.min(...distances);
        const max = Math.max(...distances);

        document.getElementById('averageValue').textContent = average.toFixed(2);
        document.getElementById('minValue').textContent = min.toFixed(2);
        document.getElementById('maxValue').textContent = max.toFixed(2);

        aggregateData.style.display = 'block';
    } else {
        // If the aggregate data is visible, hide it
        aggregateData.style.display = 'none';
    }
});
