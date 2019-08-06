export default class Main {
    constructor(){
      this.$window = $(window);
      this.$wrapper = $('.wrapper');
      this.$level = $('.level');
      this.$start = $('.start');
      this.$result = $('.result');
      this.boxes = 4;
      this.images = [];
      this.finalImages = [];
      this.duplicateImages = [];
      this.wrapperSize;
      this.rows = 4;
      this.started = 0;
      this.count = 0;
      this.picked = [];
      this.isDone = 0;
    }
  
    insertBox(){
      for(let i = 0; i < this.finalImages.length; i++){
        this.$wrapper.append(
          `<div class = "box">
            <div class="back">
            </div>
            <div class="front"> 
              <img src = "img/${this.finalImages[i]}.png" alt = "image">
            </div>
          </div>`
          );
      } 
    }
  
    wrapperWidth() {
      this.wrapperSize = (parseInt($('.box').width()) * parseInt(this.rows))+(parseInt(this.boxes)*7) + 40;
      this.$wrapper.css("width", this.wrapperSize + "px");
    }
  
    flipOverAll() {
      $('.box').each((i, el)=>{
        $(el).addClass('flip');
      });
    }
  
    resetFlip() {
      setTimeout(()=> {
        $('.box').addClass('flip');
        setTimeout(()=> {
          this.started = 0; 
        },200);
      },700);
    } 
  
    levelChange(value) {
      switch(value){
        case  "1":
          this.boxes = 4;
          this.rows = 4;
          break;
        case  "2":
          this.boxes = 6;
          this.rows = 4;
          break;
        case  "3":
          this.boxes = 8;
          this.rows = 4;
          break;
        case  "4":
          this.boxes = 10;
          this.rows = 5;
          break;
        case  "5":
          this.boxes = 12;
          this.rows = 6;
          break;
        default:
          this.boxes = 4;
          this.rows = 4;
      }
    }
   
  }