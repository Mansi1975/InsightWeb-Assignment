// Department button toggle - only one selected at a time
const deptButtons = document.querySelectorAll('.dept-btn:not(.reset-btn)');

deptButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove 'selected' from all buttons first
    deptButtons.forEach(btn => btn.classList.remove('selected'));

    // Add 'selected' only to the clicked button
    button.classList.add('selected');
  });
});

function resetSelection() {
  deptButtons.forEach(button => button.classList.remove('selected'));
}


// Degree Pie Chart
const degreeLabels = [
  'BTech', 'M.Tech', 'Dual Degree', 'M.Sc', 'B.S.',
  'IDDDP', 'PhD', 'MBA', 'M.Des', 'M.S.', 'B.Des'
];

const degreeData = [120, 50, 30, 20, 10, 5, 15, 10, 8, 6, 7];

const degreeColors = [
  '#001f3f', '#003366', '#004080', '#0059b3', '#0073e6',
  '#3399ff', '#66b2ff', '#99ccff', '#cce6ff', '#e6f2ff', '#f2f9ff'
];

const ctx = document.getElementById('degreeChart').getContext('2d');
const degreeChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: degreeLabels,
    datasets: [{
      data: degreeData,
      backgroundColor: degreeColors,
      borderColor: '#fff',
      borderWidth: 2
    }]
  },
  options: {
    plugins: {
      legend: {
        display: false
      }
    }
  }
});

// Custom Legend Generator
const legendBox = document.getElementById('custom-legend');
degreeLabels.forEach((label, index) => {
  const item = document.createElement('div');
  item.classList.add('legend-item');

  const colorBox = document.createElement('div');
  colorBox.classList.add('legend-color');
  colorBox.style.backgroundColor = degreeColors[index];

  const text = document.createElement('span');
  text.textContent = label;

  item.appendChild(colorBox);
  item.appendChild(text);
  legendBox.appendChild(item);
});

// CPI Chart (Dummy data + filter logic)
const cpiData = {
  labels: ['<6', '6-7', '7-8', '8-9', '9+'],
  datasets: [{
    label: 'Number of Students',
    data: [5, 15, 30, 50, 20], // Default
    backgroundColor: '#0077b6'
  }]
};

const cpiCtx = document.getElementById('cpiChart').getContext('2d');
const cpiChart = new Chart(cpiCtx, {
  type: 'bar',
  data: cpiData,
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0
        }
      }
    }
  }
});

// Mock filtered CPI data
const departmentCPI = {
  Aerospace: [3, 7, 15, 20, 5],
  Chemical: [2, 6, 18, 25, 10],
  Civil: [4, 8, 16, 22, 7],
  CSE: [1, 2, 10, 35, 25],
  Electrical: [2, 5, 12, 30, 20],
  Mechanical: [3, 10, 20, 30, 8],
  Metallurgical: [1, 4, 10, 15, 3],
  Other: [2, 3, 8, 10, 4]
};

function filterByDepartment(dept) {
  cpiChart.data.datasets[0].data = departmentCPI[dept];
  cpiChart.update();
}

function resetChart() {
  cpiChart.data.datasets[0].data = [5, 15, 30, 50, 20];
  cpiChart.update();
}
