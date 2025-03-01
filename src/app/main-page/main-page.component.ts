import { Component } from '@angular/core';
import { AfterViewInit, ElementRef, ViewChild, Renderer2  } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements AfterViewInit {
  years:number =0
  date: any;
  now: any;
  targetDate: any = new Date(2024, 2, 1);// Mar 1st 2024 (2024,2,1)
  targetTime: any = this.targetDate.getTime();
  difference!: number;
  months: Array<string> = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  currentTime: any = `${
    this.months[this.targetDate.getMonth()]
  } ${this.targetDate.getDate()}, ${this.targetDate.getFullYear()}`;
  @ViewChild('years', { static: true }) yearsElement!: ElementRef;
  @ViewChild('days', { static: true }) days!: ElementRef;
  @ViewChild('hours', { static: true }) hours!: ElementRef;
  @ViewChild('minutes', { static: true }) minutes!: ElementRef;
  @ViewChild('seconds', { static: true }) seconds!: ElementRef;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    setInterval(() => {
      this.tickTock();
      this.difference = Math.floor((this.now - this.targetTime) / (1000 * 60 * 60 * 24));
  
      // Calculate years and remaining days
      this.years = Math.floor(this.difference / 365);
      let remainingDays = this.difference % 365; // Get leftover days after full years
  
      // Update UI elements
      this.yearsElement.nativeElement.innerText = this.years > 0 ? `${this.years}` : '';
      this.days.nativeElement.innerText = remainingDays; // Ensure only remaining days are set
    }, 1000);

    const limit = 100; // Max number of stars
    const container = this.el.nativeElement.querySelector('.star-container');

    if (container) {
      this.startStars(container, limit);
    } else {
      console.error('Star container not found');
    }
  }

  tickTock() {
    this.date = new Date();
    this.now = this.date.getTime();
    this.days.nativeElement.innerText = Math.floor(this.difference);
    this.hours.nativeElement.innerText = this.date.getHours();
    this.minutes.nativeElement.innerText =  this.date.getMinutes();
    this.seconds.nativeElement.innerText =  this.date.getSeconds();
  }


 

  

  // Initialize stars
  startStars(container: HTMLElement, limit: number): void {
    for (let i = 0; i <= limit; i++) {
      const star = this.newStar();
      if (star) {
        this.renderer.setStyle(star, 'top', `${this.rand() * 100}%`);
        this.renderer.setStyle(star, 'left', `${this.rand() * 100}%`);
        this.renderer.setStyle(star, 'animationDelay', `${this.rand()}s`);
        this.renderer.setStyle(star, 'webkitAnimationDelay', `${this.rand()}s`);
        this.renderer.setStyle(star, 'mozAnimationDelay', `${this.rand()}s`);
        this.renderer.appendChild(container, star);
      } else {
        console.error('Failed to create a star element');
      }
    }
  }

  // Get random number
  rand(): number {
    return Math.random();
  }

  // Create HTML DOM for star
  newStar(): HTMLElement | null {
    const d = this.renderer.createElement('div');
    d.innerHTML = `
      <figure class="star">
        <figure class="star-top"></figure>
        <figure class="star-bottom"></figure>
      </figure>`;
    return d.firstElementChild as HTMLElement;
  }
}
