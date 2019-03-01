"use strict";

(function () {
  var getData = function getData() {
    return $.getJSON('data.json');
  };

  $.when(getData()).then(function (data) {
    var app = {
      init: function init() {
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
      prepareGame: function prepareGame() {
        var self = this;
        this.$level.prop('selectedIndex', 0);
        this.images = this.getRandom(this.allImages, this.boxes);
        this.duplicateImages = this.images.concat(this.images);
        this.finalImages = this.shuffle(this.duplicateImages);
        this.insertBox();
        this.wrapperWidth();
        setTimeout(function () {
          self.flipOverAll();
        }, 10);
      },
      levelChange: function levelChange(event) {
        switch ($(event.target).val()) {
          case "1":
            this.boxes = 4;
            this.rows = 4;
            break;

          case "2":
            this.boxes = 6;
            this.rows = 4;
            break;

          case "3":
            this.boxes = 8;
            this.rows = 4;
            break;

          case "4":
            this.boxes = 10;
            this.rows = 5;
            break;

          case "5":
            this.boxes = 12;
            this.rows = 6;
            break;

          default:
            this.boxes = 4;
        }
      },
      startGame: function startGame() {
        this.$result.animate({
          "opacity": "0",
          "z-index": "-1"
        }, 500);
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
      getRandom: function getRandom(arr, count) {
        // get random images from all images
        var rand = arr.slice(0),
            i = arr.length,
            min = i - count,
            temp,
            index;

        while (i-- > min) {
          index = Math.floor((i + 1) * Math.random());
          temp = rand[index];
          rand[index] = rand[i];
          rand[i] = temp;
        }

        return rand.slice(min);
      },
      shuffle: function shuffle(array) {
        //sfuffle images
        var currentIndex = array.length,
            temporaryValue,
            randomIndex; // While there remain elements to shuffle...

        while (0 !== currentIndex) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1; // And swap it with the current element.

          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
      },
      insertBox: function insertBox() {
        for (var i = 0; i < this.finalImages.length; i++) {
          this.$wrapper.append("<div class = \"box\">\n              <div class=\"back\">\n              </div>\n              <div class=\"front\"> \n                <img src = \"img/".concat(this.finalImages[i], ".png\" alt = \"image\">\n              </div>\n            </div>"));
        }
      },
      wrapperWidth: function wrapperWidth() {
        this.wrapperSize = parseInt($('.box').width()) * parseInt(this.rows) + parseInt(this.boxes) * 7 + 40;
        this.$wrapper.css("width", this.wrapperSize + "px");
      },
      flipOverAll: function flipOverAll() {
        $('.box').each(function () {
          $(this).addClass('flip');
        });
      },
      checkChoosen: function checkChoosen(event) {
        var self = this;

        if ($(event.target).parent().hasClass("flip")) {
          this.started++;
        }

        if (this.started == 1 || this.started == 2) {
          $(event.target).parent().removeClass('flip');
        }

        if (this.started == 2) {
          if (!$(event.target).parent().hasClass("flip")) {
            $('.box').each(function () {
              if (!$(this).hasClass("flip")) {
                self.count++;
                $(this).addClass('needToRemove');
                self.picked.push($(this).find('img').attr('src'));
              }
            });

            if (this.count == 2 && this.picked[0] == this.picked[1]) {
              setTimeout(function () {
                self.removeMatched();
              }, 700);
            } else {
              this.resetFlip();
            }
          } else {
            this.resetFlip();
          }

          setTimeout(function () {
            self.picked = [];
            self.count = 0;
            $('.box').removeClass('needToRemove');
          }, 1000);
        }
      },
      removeMatched: function removeMatched() {
        $('.needToRemove').find('img').animate({
          "opacity": 0
        }, 700);
        $('.needToRemove .back').css("background", "transparent");
        $('.box').addClass('flip');
        this.isDone++;
        this.started = 0;

        if (this.isDone == this.boxes) {
          this.$result.animate({
            "opacity": "1",
            "z-index": "10"
          }, 500);
        }
      },
      resetFlip: function resetFlip() {
        var self = this;
        setTimeout(function () {
          $('.box').addClass('flip');
          setTimeout(function () {
            self.started = 0;
          }, 200);
        }, 700);
      }
    };
    $(document).ready(function () {
      app.init();
    });
  });
})();