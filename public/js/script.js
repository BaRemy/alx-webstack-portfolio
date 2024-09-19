let song = document.getElementById('song');
let ctrlIcon = document.getElementById('ctrlIcon');
let progress = document.getElementById('progress');
let volumeControl = document.getElementById('volumeControl');
let volumeIcon = document.getElementById('volumeIcon');

const playlist = [
    { title: "Slow Motion", artist: "Yuhi Mic", src: "media/slow-motion.mp3", img: "media/music-bg.jpg" },
    { title: "Pause", artist: "Nillan", src: "media/Nillan - Pause.mp3", img: "media/nillan.jpg" },
    { title: "Back To You", artist: "Theecember", src: "media/THEECEMBER - BACK TO YOU.mp3", img: "media/theecember.jpg" },
    { title: "ukumbura", artist: "Sema Solé", src: "media/Sema Solé - ukumbura.mp3", img: "media/sema-sole.jpg" },
    { title: "Tuza", artist: "Mike Kayihura", src: "media/Mike Kayihura - Tuza.mp3", img: "media/tuza.jpg" },
];

let currentIndex = 0;

// Load and play the selected song
function loadSong(index) {
    const currentSong = playlist[index];
    song.src = currentSong.src;
    document.querySelector("h1").textContent = currentSong.title;
    document.querySelector("p").textContent = currentSong.artist;
    document.querySelector(".song-img").src = currentSong.img;
    song.load();
}

function playPause() {
    if (ctrlIcon.classList.contains("fa-play")) {
        song.play();
        ctrlIcon.classList.remove("fa-play");
        ctrlIcon.classList.add("fa-pause");
    } else {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    }
}

// Skip forward in the playlist
function skipForward() {
    currentIndex = (currentIndex + 1) % playlist.length;  // Loop back to the start if at the end
    loadSong(currentIndex);
    song.play();
    ctrlIcon.classList.remove("fa-play");
    ctrlIcon.classList.add("fa-pause");
}

// Skip backward in the playlist
function skipBackward() {
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;  // Loop back to the end if at the start
    loadSong(currentIndex);
    song.play();
    ctrlIcon.classList.remove("fa-play");
    ctrlIcon.classList.add("fa-pause");
}

// Volume control
volumeControl.addEventListener('input', function() {
    song.volume = volumeControl.value;
    if (volumeControl.value == 0) {
        volumeIcon.classList.remove('fa-volume-high', 'fa-volume-low');
        volumeIcon.classList.add('fa-volume-xmark');
    } else if (volumeControl.value <= 0.5) {
        volumeIcon.classList.remove('fa-volume-high', 'fa-volume-xmark');
        volumeIcon.classList.add('fa-volume-low');
    } else {
        volumeIcon.classList.remove('fa-volume-low', 'fa-volume-xmark');
        volumeIcon.classList.add('fa-volume-high');
    }
});

// Progress bar update
song.addEventListener('timeupdate', function() {
    progress.value = (song.currentTime / song.duration) * 100;
});

progress.addEventListener('input', function() {
    song.currentTime = (progress.value / 100) * song.duration;
});

// Load the initial song
loadSong(currentIndex);