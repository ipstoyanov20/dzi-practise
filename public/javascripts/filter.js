document.addEventListener('DOMContentLoaded', function() {
    let sortOrderTimestamp = 'desc';
    let sortOrderValue = 'asc';
    let originalOrder = [...document.querySelectorAll('.table tbody tr')];

    document.querySelector('.sort-btn[data-column="timestamp"]').addEventListener('click', function() {
        sortOrderTimestamp = sortOrderTimestamp === 'asc' ? 'desc' : 'asc';
        sortTable('timestamp', sortOrderTimestamp);
    });

    document.querySelector('.sort-btn[data-column="value"]').addEventListener('click', function() {
        if (sortOrderValue === 'asc') {
            sortOrderValue = 'desc';
        } else if (sortOrderValue === 'desc') {
            sortOrderValue = 'original';
            resetToOriginalOrder();
            return;
        } else {
            sortOrderValue = 'asc';
        }
        sortTable('value', sortOrderValue);
    });

    document.getElementById('filterDataBtn').addEventListener('click', function() {
        filterData();
    });

    function sortTable(column, order) {
        let rows = Array.from(document.querySelectorAll('.table tbody tr'));
        rows.sort(function(a, b) {
            let valA = column === 'timestamp' ? new Date(a.querySelector(`td:nth-child(2)`).textContent) : parseFloat(a.querySelector(`td:nth-child(3) .distance-value`).textContent);
            let valB = column === 'timestamp' ? new Date(b.querySelector(`td:nth-child(2)`).textContent) : parseFloat(b.querySelector(`td:nth-child(3) .distance-value`).textContent);

            if (order === 'asc') {
                return valA - valB;
            } else {
                return valB - valA;
            }
        });

        updateTable(rows);
    }

    function resetToOriginalOrder() {
        updateTable(originalOrder);
    }

    function filterData() {
        let timestampFrom = document.getElementById('timestampFrom').value;
        let timestampTo = document.getElementById('timestampTo').value;
        let valueFrom = document.getElementById('valueFrom').value;
        let valueTo = document.getElementById('valueTo').value;

        let rows = Array.from(document.querySelectorAll('.table tbody tr'));
        let filteredRows = rows.filter(row => {
            let timestamp = new Date(row.querySelector(`td:nth-child(2)`).textContent);
            let value = parseFloat(row.querySelector(`td:nth-child(3) .distance-value`).textContent);

            return (!timestampFrom || timestamp >= new Date(timestampFrom)) &&
                   (!timestampTo || timestamp <= new Date(timestampTo)) &&
                   (!valueFrom || value >= valueFrom) &&
                   (!valueTo || value <= valueTo);
        });

        updateTable(filteredRows);
    }

    function updateTable(filteredRows) {
        let tbody = document.querySelector('.table tbody');
        tbody.innerHTML = '';
        filteredRows.forEach(row => {
            tbody.appendChild(row);
        });
    }
});
