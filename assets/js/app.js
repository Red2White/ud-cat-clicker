$(function(){

  var model = {
    kittens: [
      {name: 'Joy & Bee', image: 'kitten-1.jpg', clickQty: 0, frame: 'dark'},
      {name: 'Kity', image: 'kitten-3.jpg', clickQty: 0, frame: 'light'},
      {name: 'Mini', image: 'kitten-2.jpg', clickQty: 0, frame: 'dark'},
      {name: 'Ginger', image: 'kitten-4.jpg', clickQty: 0, frame: 'light'},
      {name: 'Eared', image: 'kitten-5.jpg', clickQty: 0, frame: 'light'},
    ],
    current: null,
  };


  var octopus = {
    init: function(){
      model.current = 0;
      listView.init();
      detailsView.init();
    },

    getAll(){
      return model.kittens;
    },

    getCurrent(){
      return this.getAll()[model.current];
    },

    changeCurrent(id){
      model.current = id;
      detailsView.render();
    },

    updateCounter(){
      this.getCurrent().clickQty ++ ;
      detailsView.render();
    },
  };


  var listView = {
    init: function(){
      this.$list = $('#list');
      this.render();
    },

    render: function(){
      for(let [id, kitty] of Object.entries(octopus.getAll())) {
        this.$list.append(`<li id="kitty-${id}">${kitty.name}</li>`);

        $(document).on('click', `#kitty-${id}`, () => {
          octopus.changeCurrent(id);
        });
      }
    }
  };


  var detailsView = {
    init: function(){
      this.$k_img = $('#k-img');
      this.$k_name = $('#k-name');
      this.$k_counter = $('#k-counter');

      this.$k_img.on('click', () => {
        octopus.updateCounter();
      });
      this.render();
    },

    render: function(){
      let kitty = octopus.getCurrent();
      this.$k_name.text(kitty.name);
      this.$k_img
        .attr('src', `./assets/img/${kitty.image}`)
        .removeClass().addClass(kitty.frame);
      this.$k_counter.text(`Clicks: ${kitty.clickQty}`);
    }
  };

  octopus.init();
})