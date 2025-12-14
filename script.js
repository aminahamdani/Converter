document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('inputValue');
    const swapBtn = document.getElementById('swapBtn');
    const labelLeft = document.getElementById('label-left');
    const labelRight = document.getElementById('label-right');
    const resultValue = document.getElementById('resultValue');
    const resultUnit = document.getElementById('resultUnit');
    const headerTitle = document.querySelector('header p');

    let isKmToMi = true; // State to track direction

    // Conversion Constants
    const KM_TO_MI = 0.621371;
    const MI_TO_KM = 1.60934;

    function convert() {
        const val = parseFloat(input.value);

        if (isNaN(val)) {
            resultValue.textContent = '0';
            return;
        }

        let result;
        if (isKmToMi) {
            // KM to Miles
            result = val * KM_TO_MI;
        } else {
            // Miles to KM
            result = val * MI_TO_KM;
        }

        // Format: Max 4 decimal places, remove trailing zeros if possible
        resultValue.textContent = parseFloat(result.toFixed(4));
    }

    function toggleDirection() {
        isKmToMi = !isKmToMi;

        // Update UI Text
        if (isKmToMi) {
            labelLeft.classList.add('active');
            labelRight.classList.remove('active');
            labelLeft.textContent = 'KM';
            labelRight.textContent = 'MI';
            headerTitle.innerHTML = 'Kilometers &harr; Miles';
            resultUnit.textContent = 'miles';
        } else {
            labelRight.classList.add('active');
            labelLeft.classList.remove('active');
            labelLeft.textContent = 'MI';
            labelRight.textContent = 'KM';
            headerTitle.innerHTML = 'Miles &harr; Kilometers';
            resultUnit.textContent = 'kilometers';
        }

        // Trigger conversion again with new direction
        convert();
    }

    // Event Listeners
    input.addEventListener('input', convert);
    swapBtn.addEventListener('click', toggleDirection);

    // Filter invalid chars (e.g. 'e') for number input just in case, though converting to float handles most
    input.addEventListener('keydown', (e) => {
        if (e.key === 'e' || e.key === 'E' || e.key === '-') {
            e.preventDefault();
        }
    });
});
