import Clock from "../sounds/clock.mp3";
import SmokeDetector from "../sounds/smoke_detector.mp3";
import Emergency from "../sounds/emergency.mp3";

const alarmSounds = [
	{
		id: "0",
		name: "Clock",
		url: Clock,
	},
	{
		id: "1",
		name: "Smoke Detector",
		url: SmokeDetector,
	},
	{
		id: "2",
		name: "Emergency",
		url: Emergency,
	},
]

export const createAudioAndPlay = (id, volume, loop) => {
	const sound = alarmSounds.find(item => item.id === id);

	const audio = new Audio(sound.url);
	audio.loop = true;
	audio.volume = volume;
	audio.play();

	return audio;
}

export const findSound = id => {
	return alarmSounds.find(item => item.id === id);
};

export default alarmSounds;