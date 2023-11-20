const goal = 25;
const tolerance = 0.5;
let entries = []
const entriesWrapper = document.querySelector('#entries');
document.querySelector('#target').innerText = goal;

function addNewEntry(newEntry){
    entriesWrapper.removeChild(entriesWrapper.firstElementChild);
    const listItem = document.createElement('li');
    const listValue = document.createTextNode(newEntry.toFixed(1));
    listItem.appendChild(listValue);

    entriesWrapper.appendChild(listItem);
}

function reducer(total, currentValue){
    return total + currentValue;
}

function updateProgressBar(totalMiles, goal) {

    const progressBar = document.getElementById('progressBar');
    const percentage = Math.min((totalMiles / goal) * 100, 100);

    progressBar.style.width = percentage.toFixed(1) + '%';
    
    const progressBarContainer = document.querySelector('.progressBarContainer');
    const setTargetElements = document.querySelector('.setTarget');
    const targetMetElements = document.querySelector('.targetMet');
    const targetNotMet = document.querySelector('.targetNotMet');
    const exceededTarget = document.querySelector('.targetExceeded');


    if (totalMiles >= goal - tolerance && totalMiles <= goal + tolerance && entries.length >= 7) {
        setTargetElements.style.display = 'none';
        progressBarContainer.style.display = 'none';
        targetMetElements.style.display = 'flex';
    } else if (totalMiles < goal && entries.length >= 7){
        setTargetElements.style.display = 'none';
        progressBarContainer.style.display = 'none';
        targetNotMet.style.display = 'flex';
    } else if (totalMiles > goal && entries.length >= 7){
        setTargetElements.style.display = 'none';
        progressBarContainer.style.display = 'none';
        exceededTarget.style.display = 'flex';
    }
}

function calcTotal(){
    const totalValue = entries.reduce(reducer, 0);
    document.getElementById('total').innerText = totalValue.toFixed(1);
    document.getElementById('progressTotal').innerText = totalValue.toFixed(1);
    updateProgressBar(totalValue, goal);
}

function calcAverage(){
    const average = entries.reduce(reducer, 0) / entries.length;
    document.getElementById('average').innerText = average.toFixed(1);
}

function weeklyHigh(){
    const high = Math.max(...entries);
    document.getElementById('high').innerText = high;
}

function handleSubmit(event) {
    event.preventDefault();
    const entry = Number(document.querySelector('#entry').value);
    if(!entry) return;
    document.querySelector('form').reset();
    entries.push(entry);
    addNewEntry(entry);
    calcTotal();
    calcAverage();
    weeklyHigh();
}

function newWeek(){
    location.reload();  
}

const form = document.querySelector("form").addEventListener('submit', handleSubmit);