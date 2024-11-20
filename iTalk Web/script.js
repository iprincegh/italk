const toggleBtn = document.querySelector('#toggle');
const voicesSelect = document.querySelector('#voices');
const closeBtn = document.querySelector('#close');
const main = document.querySelector('main');
const read = document.querySelector('#read');
const input = document.querySelector('textarea');



// const toggle = document.querySelector('.toggle')

const data = [
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty",
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry",
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired",
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt",
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy",
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry",
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad",
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared",
  },
  {
    image: './img/outside.jpg',
    text: 'I Want To Go Outside',
  },
  {
    image: './img/home.jpg',
    text: 'I Want To Go Home',
  },
  {
    image: './img/school.jpg',
    text: 'I Want To Go To School',
  },
  {
    image: './img/grandma.jpg',
    text: 'I Want To Go To Grandmas',
  },
];

data.forEach(createGrid);

function createGrid(item) {
  const { image, text } = item;

  const grid = document.createElement('div');
  grid.classList.add('grid');
  grid.innerHTML = `
    <img alt="${text}" class="gridImg" src="${image}"></img>
    <p class="gridText">${text}</p>
    `;

  grid.addEventListener('click', () => {
    setText(text);
    speakText();

    grid.classList.add('active');
    setTimeout(() => {
      grid.classList.remove('active');
    }, 800);
  });

  main.appendChild(grid);
}

let voices = [];

function getVoices() {
  // Clear existing options to avoid duplicates
  voicesSelect.innerHTML = '<option value="" disabled selected>Select a Voice</option>';

  // Get available voices
  const voices = speechSynthesis.getVoices();

  // Check if voices are available
  if (voices.length === 0) {
    console.error('No voices available. Please ensure your browser supports speech synthesis.');
    return;
  }

  // Populate the dropdown with voice options
  voices.forEach((voice) => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.textContent = `${voice.name} (${voice.lang})`;
    voicesSelect.appendChild(option);
  });
}

// Call getVoices when voices are loaded or changed
if ('speechSynthesis' in window) {
  speechSynthesis.addEventListener('voiceschanged', getVoices);

  // Call getVoices immediately in case voices are already loaded
  getVoices();
} else {
  console.error('Speech Synthesis API is not supported in this browser.');
}


toggleBtn.addEventListener('click', () => {
  document.querySelector('.textblock').classList.toggle('show');
  document.querySelector('main').classList.toggle('show');
  // document.querySelector('.container').style['min-height'] = '70vh';
});

closeBtn.addEventListener('click', () => {
  document.querySelector('.textblock').classList.remove('show');
  document.querySelector('main').classList.remove('show');
});

// Initialize the speech synthesis utterance
const message = new SpeechSynthesisUtterance();

// Function to update the selected voice
function setVoice(e) {
  const selectedVoice = voices.find((voice) => voice.name === e.target.value);
  if (selectedVoice) {
    message.voice = selectedVoice; // Apply the selected voice
  }
}

// Event listener to update the voice when a selection is made
voicesSelect.addEventListener('change', setVoice);

function setText(text) {
  message.text = text;
}

function speakText() {
  speechSynthesis.speak(message);
}

read.addEventListener('click', () => {
  setText(input.value);
  speakText();
});
