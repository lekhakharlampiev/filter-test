'use strict';
const cars = [
    {
        model: 'Toyota',
        motor: 'hybrid',
        kilometrage: 50001,
        year: 2017  
    },
    {
        model: 'BMW',
        motor: 'petrol',
        kilometrage: 32000,
        year: 2018  
    },
    {
        model: 'Mitsubishi',
        motor: 'diesel',
        kilometrage: 120070,
        year: 2015  
    },
    {
        model: 'Lada',
        motor: 'petrol',
        kilometrage: 85032,
        year: 2016  
    },
    {
        model: 'Mitsubishi',
        motor: 'petrol',
        kilometrage: 153698,
        year: 2012  
    },
    {
        model: 'Toyota',
        motor: 'petrol',
        kilometrage: 69877,
        year: 2015  
    },
    {
        model: 'BMW',
        motor: 'diesel',
        kilometrage: 100,
        year: 2019  
    },
    {
        model: 'Lada',
        motor: 'petrol',
        kilometrage: 2000,
        year: 2018  
    },
    {
        model: 'Mitsubishi',
        motor: 'hybrid',
        kilometrage: 199999,
        year: 2019  
    },
    {
        model: 'Tesla',
        motor: 'electric',
        kilometrage: 99,
        year: 2019  
    },
    {
        model: 'Toyota',
        motor: 'diesel',
        kilometrage: 190875,
        year: 2013  
    },
    {
        model: 'BMW',
        motor: 'electric',
        kilometrage: 1000,
        year: 2019  
    },
];
(function () {
    const tamplate = document.querySelector('#card').content;
    const card = tamplate.querySelector('.car-card');
    const blockResult = document.querySelector('.result');

    const renderCard = (arr) => {
        blockResult.innerHTML = '';
        arr.map(({ model, motor, kilometrage, year }) => {
            const cloneCard = card.cloneNode(true);
            const modelText = cloneCard.querySelector('.model-text');
            modelText.textContent = model;
            const motorText = cloneCard.querySelector('.motor-text');
            switch(motor) {
                case 'petrol':
                motorText.textContent = 'Бензиновый';
                break;
                case 'diesel':
                motorText.textContent = 'Дизельный';
                break;
                case 'hybrid':
                motorText.textContent = 'Гибридный';
                break;
                case 'electric':
                motorText.textContent = 'Электрический';
                break;
                default:
                motorText.textContent = 'Не указан';
            }
            const kilometrageText = cloneCard.querySelector('.kilometrage-text');
            kilometrageText.textContent = kilometrage;
            const yearText = cloneCard.querySelector('.year-text');
            yearText.textContent = year;
            blockResult.prepend(cloneCard);
        });
    };
    renderCard(cars);

    let state = {};

    const form = document.querySelector('.filter__form');
    const buttonSubmit = form.querySelector('button[type="submit"]');
    const buttonReset = form.querySelector('.form__reset');

    buttonReset.addEventListener('click', () => {
        renderCard(cars);
        state = {};
    });

    form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const modelValue = form.querySelector('#model').value;
        const motorValue = form.querySelector('#motor').value;
        const kilometrageMin = form.querySelector('#kilometrage-from').value;
        const kilometrageMax = form.querySelector('#kilometrage-to').value;
        const yearMin = form.querySelector('#year-from').value;
        const yearMax = form.querySelector('#year-to').value;
        if (modelValue !== 'any') {
            state.model = modelValue;
        }
        if (motorValue !== 'any') {
            state.motor = motorValue;
        }
        if (kilometrageMin !== '') {
            state.kilometrageMin = kilometrageMin;
            state.kilometrageMax = state.kilometrageMax === undefined ? 9000000 : state.kilometrageMax;
        }
        if (kilometrageMax !== '') {
            state.kilometrageMax = kilometrageMax;
            state.kilometrageMin = state.kilometrageMin === undefined ? 0 : state.kilometrageMin;
        }
        if (yearMin !== '0') {
            state.yearMin = yearMin;
            state.yearMax = state.yearMax === undefined ? 2019 : state.yearMax; 
        }
        if (yearMax !== '0') {
            state.yearMax = yearMax;
            state.yearMin = state.yearMin === undefined ? 0 : state.yearMin;
        }
        const result = [];
        cars.forEach((item) => {
            let count = 0;
            let rang = 0;
            for (const key in state) {
                count++;
                if (key === 'kilometrageMin' || key === 'kilometrageMax') {
                    if (item.kilometrage > Number(state.kilometrageMin) && item.kilometrage <= Number(state.kilometrageMax)) {
                        rang++;
                    }
                }
                if (key === 'yearMin' || key === 'yearMax') {
                    console.log(state.yearMin);
                    if (item.year >= Number(state.yearMin) && item.year <= Number(state.yearMax)) {
                        rang++
                    }
                }
                if (item[key]) {
                    if (item[key].toLowerCase() === state[key].toLowerCase()) {
                        rang++;
                    }
                }    
            }
            if (count == rang) {
                result.push(item);
            }
        });
        renderCard(result);
        if (result.length === 0) {
            const div = document.createElement('div');
            div.className = 'no-matches';
            div.textContent = 'совпадений не найдено';
            blockResult.prepend(div);
        }
        state = {};
    });

})();
