const synth = window.speechSynthesis;

const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

let voices = [];

const getVoices = () => {
  voices = synth.getVoices();

  voices.forEach(voice => {
    const option = document.createElement('option');
    option.textContent = voice.name + '(' + voice.lang + ')';
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
  });
};

getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

const speak = () => {
  if (synth.speaking) {
    console.error('Es spricht bereits...');
    return;
  }
  if (textInput.value !== '') {
    body.style.background = '#1400c6 url(../dist/img/wave.gif)';
    body.style.backgroundRepeat = 'repeat-x';
    body.style.backgroundSize = '100% 100%';

    const speakText = new SpeechSynthesisUtterance(textInput.value);
    speakText.onend = e => {
      console.log('Fertig mit Sprechen...');
      body.style.background = '#1400c6';
    };

    speakText.onerror = e => {
      console.error('Es ist eine Anomalie aufgetreten');
    };

    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      'data-name'
    );

    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
        if (voice.name === selectedVoice) {
          speakText.voice = voice;
        }
      }
    });

    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    synth.speak(speakText);
  }
};

textForm.addEventListener('submit', e => {
  e.preventDefault();
  speak();
  textInput.blur();
});

rate.addEventListener('change', e => (rateValue.textContext = rate.value));

pitch.addEventListener('change', e => (pitchValue.textContext = pitch.value));

voiceSelect.addEventListener('change', e => speak());
