$(function(){

  var model = {
    init: function(){
      this.kittens = [
        {name: 'Joy & Bee', image: 'kitten-1.jpg', click_qty: 0, style: 'dark'},
        {name: 'Kity', image: 'kitten-3.jpg', click_qty: 0, style: 'light'},
        {name: 'Mini', image: 'kitten-2.jpg', click_qty: 0, style: 'dark'},
        {name: 'Ginger', image: 'kitten-4.jpg', click_qty: 0, style: 'light'},
        {name: 'Eared', image: 'kitten-5.jpg', click_qty: 0, style: 'light'},
      ];
      this.changeCurrent(0);
    },
    
    changeCurrent(id){
      this.current = id;
    },
    
    clickCurrent(){
      this.getCurrent().click_qty ++ ;
    },

    getAll(){
      return this.kittens;
    },

    getCurrent(){
      return this.getAll()[this.current];
    }
  };


  var octopus = {
    init: function(){
      model.init();
      view.init();
    },

    changeCurrent(id){
      model.changeCurrent(id);
      view.render();
    },

    clickCurrent(){
      model.clickCurrent();
      view.render();
    },

    getAll(){
      return model.getAll();
    },

    getCurrent(){
      return model.getCurrent();
    }
  };


  var view = {
    init: function(){
      let $list = $('#list');
      this.$k_img = $('#k-img');
      this.$k_name = $('#k-name');
      this.$k_counter = $('#k-counter');

      for(let [id, kitty] of Object.entries(octopus.getAll())) {
        $list.append(`<li id="kitty-${id}">${kitty.name}</li>`);

        $(document).on('click', `#kitty-${id}`, () => {
          octopus.changeCurrent(id);
        });
      }

      this.$k_img.on('click', () => {
        octopus.clickCurrent();
      });

      this.render();
    },

    render: function(){
      let kitty = octopus.getCurrent();
      this.$k_name.text(kitty.name);
      this.$k_img
        .attr('src', `./assets/img/${kitty.image}`)
        .removeClass().addClass(kitty.style);
      this.$k_counter.text(`Clicks: ${kitty.click_qty}`);
    }
  };

  octopus.init();
})