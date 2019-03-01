(()=>{
  let getData = ()=> {
    return $.getJSON('data.json');
  }
  $.when(getData()).then((data)=> {
    let app = {
      init: function(){
        this.$window = $(window);
        this.$wrapper = $('.wrapper');
        this.$level = $('.level');
        this.$start = $('.start');
        this.$box = $('.box');
        this.$result = $('.result');
        this.allImages = data;
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
        this.prepareGame();
        this.$level.on('change', this.levelChange.bind(this));
        this.$start.on('click', this.startGame.bind(this));
        this.$window.on('resize', this.wrapperWidth.bind(this));
        $('.box').on('click', this.checkChoosen.bind(this));
      },
      prepareGame: function() {
        let self = this;
        this.$level.prop('selectedIndex',0);
        this.images  = this.getRandom(this.allImages, this.boxes);
        this.duplicateImages = this.images.concat(this.images);
        this.finalImages = this.shuffle(this.duplicateImages);
        this.insertBox();
        this.wrapperWidth();
        setTimeout(()=> {
          self.flipOverAll();
        },10);
      },
      levelChange: function(event){
        switch($(event.target).val()){
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
        }
      },
      startGame: function (){ 
        this.$result.animate({"opacity":"0","z-index":"-1"},500);
        this.isDone = 0;
        this.images = [];
        this.images = this.getRandom(this.allImages, this.boxes);
        this.duplicateImages = [];
        this.duplicateImages = this.images.concat(this.images);
        this.finalImages = [];
        this.finalImages = this.shuffle(this.duplicateImages);
        this.$wrapper.empty().append(this.$result);
        this.insertBox();
        this.wrapperWidth();
        this.flipOverAll();
        $('.box').on('click', this.checkChoosen.bind(this));
      },
      getRandom: function (arr, count) {  // get random images from all images
        let rand = arr.slice(0), i = arr.length, min = i - count, temp, index;
        while (i-- > min) {
          index = Math.floor((i + 1) * Math.random());
          temp = rand[index];
          rand[index] = rand[i];
          rand[i] = temp;
        }
        return rand.slice(min);
      },
      shuffle: function (array) {   //sfuffle images
        let currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
      },
      insertBox: function (){
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
      },
      wrapperWidth: function() {
        this.wrapperSize = (parseInt($('.box').width()) * parseInt(this.rows))+(parseInt(this.boxes)*7) + 40;
        this.$wrapper.css("width", this.wrapperSize + "px");
      },
      flipOverAll: function() {
        $('.box').each(function() {
          $(this).addClass('flip');
        });
      },
      checkChoosen: function(event){
        let self = this;
        if($(event.target).parent().hasClass("flip")){
          this.started ++;
        }
        if(this.started == 1 || this.started == 2){ 
          $(event.target).parent().removeClass('flip');
        }
        if(this.started == 2){
          if(!$(event.target).parent().hasClass("flip")){
            $('.box').each(function(){
              if(!$(this).hasClass("flip")){
                self.count ++;
                $(this).addClass('needToRemove');
                self.picked.push($(this).find('img').attr('src'));
              }
            });
            if(this.count == 2 && this.picked[0] == this.picked[1]){ 
              setTimeout(()=>{
                self.removeMatched();
              },700);
            }else{
              this.resetFlip();
            }
          } else{
            this.resetFlip();
          }
          setTimeout(()=>{
            self.picked = [];
            self.count = 0;
            $('.box').removeClass('needToRemove');
          },1000);
        } 
      },
      removeMatched: function(){
        $('.needToRemove').find('img').animate({"opacity":0},700);
        $('.needToRemove .back').css("background","transparent");
        $('.box').addClass('flip');
        this.isDone++;
        this.started = 0;
        if(this.isDone == this.boxes){
          this.$result.animate({"opacity":"1","z-index":"10"},500);
        }
      },
      resetFlip: function (){
        let self = this;
        setTimeout(()=> {
          $('.box').addClass('flip');
          setTimeout(()=> {
            self.started = 0; 
          },200);
        },700);
      } 
    }
    $(document).ready(()=> {
      app.init();
    });
  });
})();