// Synthesized Web Audio Utility (0 KB external download)
// Uses native browser AudioContext to produce a subtle, tactile 3ms mechanical "tick"

let audioCtx: AudioContext | null = null;
let isMuted = false;

if (typeof window !== "undefined") {
  try {
    isMuted = localStorage.getItem("sound-muted") === "true";
  } catch {
    isMuted = false;
  }
}

export const getSoundMuted = () => isMuted;

export const setSoundMuted = (muted: boolean) => {
  isMuted = muted;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("sound-muted", String(muted));
    } catch {}
  }
};

export const toggleSound = () => {
  setSoundMuted(!isMuted);
  return !isMuted;
};

export const playMicroTick = () => {
  if (typeof window === "undefined" || isMuted) return;
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(850, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(380, audioCtx.currentTime + 0.025);

    gain.gain.setValueAtTime(0.035, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.025);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.03);
  } catch {
    // Gracefully handle any browser audio policy restrictions
  }
};
