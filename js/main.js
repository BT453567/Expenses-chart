const chart = document.getElementById("chart-container");

let chartData = [];

function fetchChartData() {

    fetch('./data/data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        chartData = data;
        // Once the data is fetched, populate the shop
        generateChart();
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

}

function generateChart() {
    console.log("chart data: ", chartData);

    chart.innerHTML = ''; // Clear previous chart content

     // Get the container height
     const containerHeight = chart.clientHeight * 0.7;
 
     // Find the maximum value in the chartData
     const maxValue = Math.max(...chartData.map(dataPoint => dataPoint.amount));

     console.log("max value:", maxValue);
     console.log("container height:", containerHeight);

    chartData.forEach(dataPoint => {
        // Create bar element
        const barContainer = document.createElement('div');
        const bar = document.createElement('div');
        const label = document.createElement('div');
        const value = document.createElement('div');

        // Calculate height of chart bar
        const barHeight = (dataPoint.amount / maxValue) * containerHeight;

        console.log("bar height:", barHeight)

        // Set the height of the bar based on the amount
        bar.classList.add('chart-bar');
        bar.style.height = `0px`;
        
        // Set the label
        label.textContent = dataPoint.day;
        label.classList.add('chart-label');

        // Add class to barContainer
        barContainer.classList.add("chart-bar-container");

        // add class to value and set value
        value.classList.add("chart-value");
        value.textContent = "£" + dataPoint.amount;

        // Append the bar and label to the container
        barContainer.appendChild(bar);
        bar.appendChild(value);
        barContainer.appendChild(label);
        chart.appendChild(barContainer);

        // Check if high value
        if (dataPoint.amount === maxValue) {
            bar.classList.add("highest-value");
        } else {
            bar.classList.add("normal-value");
        }

        bar.addEventListener('click', function() {
            
            document.querySelectorAll('.chart-bar.active').forEach(activeBar => {
                if (bar !== activeBar) {
                    activeBar.classList.remove('active');
                }
            });
            bar.classList.toggle('active');
        });

        void bar.offsetHeight;
        bar.style.height = `${barHeight}px`;
    });
}


document.addEventListener('DOMContentLoaded', fetchChartData);