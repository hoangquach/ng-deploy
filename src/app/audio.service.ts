import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private audio = new Audio();

  constructor() {
    this.audio.src = '../assets/music/lover.mp3'; // Path to your audio file
    this.audio.load();
    this.audio.loop = true; // Loop the audio
  }

  play() {
    this.audio.play();
  }
}
