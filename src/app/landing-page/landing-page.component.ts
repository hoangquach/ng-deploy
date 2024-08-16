import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { AudioService } from '../audio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements AfterViewInit {

  constructor(private el: ElementRef, private renderer: Renderer2,private audioService: AudioService, private route:Router) {}


  //init variables
  header ='WOW LOOK AT US!\nWe made it here baby.\n Alright lets get started by answering this question below';
  textfield!: String;

  //defeult slider nnumber is 100 days
  sliderNum= 100;

  //notification
  greenNotificationStatus= false;
  greenMessage=""
  redNotificationStatus=false;
  redMessage=""

  //reward picture
  pic="mochis-looking-happy.gif"

  //birthday
  dob=""//format mmddyyyy
  dobStatus=false//to show the pop up
  dobPic="angry-mochi-cat.gif"

  //award
  awardMessage=""
  awardStatus=false
  awardButton1=false
  awardButton2=false//enable button

  ngOnInit() {
    //this.audioService.play(); turn off music for now
  }

  ngAfterViewInit(): void {
    const limit = 100; // Max number of stars
    const container = this.el.nativeElement.querySelector('.star-container');

    if (container) {
      this.startStars(container, limit);
    } else {
      console.error('Star container not found');
    }
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



  //function start here
  verifyDay(){
    if(this.sliderNum==169){
      //reset the other notification 
      this.redNotificationStatus=false
      this.greenNotificationStatus = true;//show notification
      this.greenMessage="OMG, GOOD JOB BABY! YOU ARE SO GOOD AT MATH. ILY<3"
      this.awardStatus=true;
      this.dobPic="mochi-clap.gif"

    } else{
      //reset the othe rnotification
      this.greenNotificationStatus=false
      this.redNotificationStatus=true
      this.redMessage="I KNEW IT. YOU DONT REMEMBER. BUT I AM GOING TO GIVE YOU A DIFFERENT HINT"
      
    }

  }

  //verify my dob
  verifymydob(){
    if(this.dob=="2002-04-09")
    {
      //yes it is my birthday
      //disable the red notification
      //remove the calendar picker
      this.redNotificationStatus=false;
      //turn on award
      this.awardStatus=true;

    } else{ 
      this.dobStatus = true//show the sad mochi cat image
      this.dobPic="mochi-sad.gif"
      this.redMessage="How dares you get it wrong :< !! We are not moving on until you got it right."
    }
  }

  rewardRevealBtn1(){
    //troll section
    //let have the first two clicks of the button not doing anything
    //by default the 2 award buttons are true
    //there will be no awardMessage as well
    if(this.awardMessage == ""){
      this.awardButton1 = true
      this.pic="mochi-shock.gif"
    }
    //both button is false -> turn one back one
    if(this.awardButton1 == true && this.awardButton2 == true && this.awardMessage == "")
    {
      this.awardButton1 = false;//enable
      this.awardMessage = "HEHE, Let's go to the award page now."
    }

    if(this.awardMessage == "HEHE, Let's go to the award page now.")
    {
      console.log("going to main")
      this.route.navigate(['main']);
    }

  }

  rewardRevealBtn2(){
    
    if(this.awardMessage === ""){
      this.pic="mochi-confused.gif"
      this.awardButton2 = true //disable button
    }
    //both button is false -> turn one back one
    if(this.awardButton1 == true && this.awardButton2 == true  && this.awardMessage == "")
      {
        this.awardButton1 = false;
        this.awardMessage = "HEHE, Let's go to the award page now."
      }
  }
}
