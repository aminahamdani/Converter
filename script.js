document.addEventListener('DOMContentLoaded', () => {
    // Tab Navigation
    const tabButtons = document.querySelectorAll('.tab-btn');
    const converterContents = document.querySelectorAll('.converter-content');

    // Converter states
    const converterStates = {
        'km-mi': { isForward: true },
        'f-c': { isForward: true },
        'lbs-kg': { isForward: true }
    };

    // Conversion Constants
    const KM_TO_MI = 0.621371;
    const MI_TO_KM = 1.60934;
    const F_TO_C = (f) => (f - 32) * 5/9;
    const C_TO_F = (c) => (c * 9/5) + 32;
    const LBS_TO_KG = 0.453592;
    const KG_TO_LBS = 2.20462;

    // Converter configuration
    const converters = {
        'km-mi': {
            input: 'inputValue',
            swap: 'swapBtn',
            labelLeft: 'label-left',
            labelRight: 'label-right',
            result: 'resultValue',
            resultUnit: 'resultUnit',
            forward: { from: 'KM', to: 'MI', unitText: 'miles', convert: (val) => val * KM_TO_MI },
            backward: { from: 'MI', to: 'KM', unitText: 'kilometers', convert: (val) => val * MI_TO_KM }
        },
        'f-c': {
            input: 'inputValue2',
            swap: 'swapBtn2',
            labelLeft: 'label-left-2',
            labelRight: 'label-right-2',
            result: 'resultValue2',
            resultUnit: 'resultUnit2',
            forward: { from: '°F', to: '°C', unitText: 'celsius', convert: F_TO_C },
            backward: { from: '°C', to: '°F', unitText: 'fahrenheit', convert: C_TO_F }
        },
        'lbs-kg': {
            input: 'inputValue3',
            swap: 'swapBtn3',
            labelLeft: 'label-left-3',
            labelRight: 'label-right-3',
            result: 'resultValue3',
            resultUnit: 'resultUnit3',
            forward: { from: 'LBS', to: 'KG', unitText: 'kilograms', convert: (val) => val * LBS_TO_KG },
            backward: { from: 'KG', to: 'LBS', unitText: 'pounds', convert: (val) => val * KG_TO_LBS }
        }
    };

    // Function to create converter handler
    function createConverterHandler(converterId) {
        const config = converters[converterId];
        const input = document.getElementById(config.input);
        const swapBtn = document.getElementById(config.swap);
        const labelLeft = document.getElementById(config.labelLeft);
        const labelRight = document.getElementById(config.labelRight);
        const resultValue = document.getElementById(config.result);
        const resultUnit = document.getElementById(config.resultUnit);

        function convert() {
            const val = parseFloat(input.value);

            if (isNaN(val)) {
                resultValue.textContent = '0';
                return;
            }

            const direction = converterStates[converterId].isForward ? 'forward' : 'backward';
            const conversionFn = config[direction].convert;
            const result = conversionFn(val);

            resultValue.textContent = parseFloat(result.toFixed(4));
        }

        function toggleDirection() {
            const state = converterStates[converterId];
            state.isForward = !state.isForward;

            const direction = state.isForward ? 'forward' : 'backward';
            const dirConfig = config[direction];

            if (state.isForward) {
                labelLeft.classList.add('active');
                labelRight.classList.remove('active');
            } else {
                labelRight.classList.add('active');
                labelLeft.classList.remove('active');
            }

            labelLeft.textContent = dirConfig.from;
            labelRight.textContent = config[state.isForward ? 'forward' : 'backward'].to;
            resultUnit.textContent = dirConfig.unitText;

            convert();
        }

        // Event Listeners
        input.addEventListener('input', convert);
        swapBtn.addEventListener('click', toggleDirection);

        // Filter invalid chars
        input.addEventListener('keydown', (e) => {
            if (e.key === 'e' || e.key === 'E' || e.key === '-') {
                e.preventDefault();
            }
        });
    }

    // Initialize all converters
    Object.keys(converters).forEach(converterId => {
        createConverterHandler(converterId);
    });

    // Tab switching
    tabButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const converterId = btn.getAttribute('data-converter');

            // Update active tab
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update active content
            converterContents.forEach(content => content.classList.remove('active'));
            document.getElementById(`${converterId}-converter`).classList.add('active');
        });
    });
});
