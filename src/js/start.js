import Result from './result.js';

export default class Start extends Result {

    constructor(){
      super();
    }
  
    prepareGame(data) {
      this.$level.prop('selectedIndex',0);
      this.images  = this.getRandom(data, this.boxes);
      this.duplicateImages = this.images.concat(this.images);
      this.finalImages = this.shuffle(this.duplicateImages);
      this.insertBox();
      this.wrapperWidth();
      setTimeout(()=> {
        this.flipOverAll();
      },10);
    }
  
    startGame(data) {
      // /level == null ? this.currentLevel = 1 : this.currentLevel = level ;
      this.levelChange(this.$level.val());
      this.$result.animate({"opacity":"0","z-index":"-1"},500);
      this.isDone = 0;
      this.images = [];
      this.images = this.getRandom(data, this.boxes);
      this.duplicateImages = [];
      this.duplicateImages = this.images.concat(this.images);
      this.finalImages = [];
      this.finalImages = this.shuffle(this.duplicateImages);
      this.$wrapper.empty().append(this.$result);
      this.insertBox();
      this.wrapperWidth();
      this.flipOverAll();
      $('.box').on('click', (event)=>this.checkChoosen(event));
    }
  
    getRandom(arr, count) {  // get random images from all images
      let rand = arr.slice(0), i = arr.length, min = i - count, temp, index;
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = rand[index];
        rand[index] = rand[i];
        rand[i] = temp;
      }
      return rand.slice(min);
    }
  
    shuffle(cards) {   //sfuffle images
      let currentIndex = cards.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
      }
      return cards;
    }
  }