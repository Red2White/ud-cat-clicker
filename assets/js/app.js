$(function(){

  let model = {
    kittens: [
      {name: 'Joy & Bee', image: 'kitten-1.jpg', clickQty: 0, frame: 'dark'},
      {name: 'Kity', image: 'kitten-3.jpg', clickQty: 0, frame: 'light'},
      {name: 'Mini', image: 'kitten-2.jpg', clickQty: 0, frame: 'dark'},
      {name: 'Ginger', image: 'kitten-4.jpg', clickQty: 0, frame: 'light'},
      {name: 'Eared', image: 'kitten-5.jpg', clickQty: 0, frame: 'light'},
    ],
    current: null,
  };


  let octopus = {
    init: function(){
      model.current = 0;
      listView.init();
      detailsView.init();
      formView.init();
    },

    getAll(){
      return model.kittens;
    },

    getCurrentId(){
      return model.current;
    },

    getCurrent(){
      return this.getAll()[this.getCurrentId()];
    },

    changeCurrent(id){
      model.current = id;

      formView.hide();
      listView.render();
      detailsView.render();
    },

    updateCurrentData(data){
      let kitty = this.getCurrent();
      kitty.name = data.name;
      kitty.clickQty = data.counter;
      kitty.frame = data.frame;

      listView.render();
      detailsView.render();
    },

    updateCounter(){
      this.getCurrent().clickQty ++ ;

      detailsView.render();
      formView.render();
    },

    formShow(){
      formView.show();
    },
  };


  let listView = {
    init: function(){
      this.$list = $('#list');

      $(document).on('click', `.k-item`, (event) => {
        octopus.changeCurrent($(event.target).data('id'));
      });

      this.render();
    },

    render: function(){
      this.$list.find('li').remove();
      for(let [id, kitty] of Object.entries(octopus.getAll())) {
        let class_nm = 'k-item' + (octopus.getCurrentId() == id ? ' active' : '');
        this.$list.append(`<li id="kitty-${id}" data-id="${id}" class="${class_nm}">${kitty.name}</li>`);
      }
    }
  };


  let detailsView = {
    init: function(){
      let $btn_edit = $('#btn-edit');
      this.$img = $('#k-img');
      this.$name = $('#k-name');
      this.$counter = $('#k-counter');

      this.$img.on('click', () => {
        octopus.updateCounter();
      });

      $btn_edit.on('click', () => {
        octopus.formShow();
      });
      this.render();
    },

    render: function(){
      let kitty = octopus.getCurrent();
      this.$name.text(kitty.name);
      this.$img
        .attr('src', `./assets/img/${kitty.image}`)
        .removeClass().addClass(kitty.frame);
      this.$counter.text(`Clicks: ${kitty.clickQty}`);
    }
  };


  var formView = {
    init: function(){
      let $btn_save = $('#btn-save');
      let $btn_reset = $('#btn-reset');
      this.$form = $('#form-edit');
      this.$name = $('#f-name');
      this.$counter = $('#f-counter');
      this.$frame = $('#f-frame');

      $btn_save.on('click', () => {
        octopus.updateCurrentData({
          name: this.$name.val(),
          counter: this.$counter.val(),
          frame: this.$frame.val(),
        });
        this.hide();
      });

      $btn_reset.on('click', () => {
        this.hide();
      });
    },

    render: function(){
      let kitty = octopus.getCurrent();
      this.$name.val(kitty.name);
      this.$counter.val(kitty.clickQty);
      this.$frame.val(kitty.frame);
    },

    show: function(){
      this.render();
      this.$form.show();
    },

    hide: function(){
      this.$form.hide();
    },
  };

  octopus.init();
})