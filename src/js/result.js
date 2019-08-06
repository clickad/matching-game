import Main from './main.js';

export default class Result extends Main {

    constructor(){
      super();
    }
  
    checkChoosen(event) {
      if($(event.target).parent().hasClass("flip")){
        this.started ++;
      }
      if(this.started == 1 || this.started == 2){ 
        $(event.target).parent().removeClass('flip');
      }
      if(this.started == 2){
        if(!$(event.target).parent().hasClass("flip")){
          $('.box').each((i, el)=>{
            if(!$(el).hasClass("flip")){
              this.count ++;
              $(el).addClass('needToRemove');
              this.picked.push($(el).find('img').attr('src'));
            }
          });
          if(this.count == 2 && this.picked[0] == this.picked[1]){ 
            setTimeout(()=>{
              this.removeMatched();
            },700);
          }else{
            this.resetFlip();
          }
        } else{
          this.resetFlip();
        }
        setTimeout(()=>{
          this.picked = [];
          this.count = 0;
          $('.box').removeClass('needToRemove');
        },1000);
      } 
    }
  
    removeMatched() {
      $('.needToRemove').find('img').animate({"opacity":0},700);
      $('.needToRemove .back').css("background","transparent");
      $('.box').addClass('flip');
      this.isDone++;
      this.started = 0;
      if(this.isDone == this.boxes){
        this.$result.animate({"opacity":"1","z-index":"10"},500);
      }
    }
  }
  