export function setupAudioControls() {
    const audioElement = document.getElementById('bgAudio');
    const toggleIcon = document.getElementById('toggleIcon');
    const audioToggle = document.getElementById('audioToggle');

    audioElement.muted = true;

    audioToggle.addEventListener('click', () => {
        audioElement.muted = !audioElement.muted;

        if (audioElement.muted) {
            toggleIcon.classList.remove('fa-volume-up');
            toggleIcon.classList.add('fa-volume-mute');
        } else {
            toggleIcon.classList.remove('fa-volume-mute');
            toggleIcon.classList.add('fa-volume-up');
            audioElement.play().catch(error => {
                console.error('Error playing audio:', error);
            });
        }
    });
}