// Utility for handling audio playback
export async function playAudio(text: string, lang: string = 'ar-SA') {
  try {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  } catch (error) {
    console.error('Error playing audio:', error);
  }
}