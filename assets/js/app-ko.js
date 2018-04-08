let initCatList = [
  {name: 'Joy & Bee', image: './assets/img/kitten-1.jpg', clickQty: 0, frame: 'dark', nicks: ['Twins']},
  {name: 'Kity', image: './assets/img/kitten-3.jpg', clickQty: 0, frame: 'light', nicks: ['K', 'Kee', 'Big K']},
  {name: 'Mini', image: './assets/img/kitten-2.jpg', clickQty: 0, frame: 'dark', nicks: ['Micro']},
  {name: 'Ginger', image: './assets/img/kitten-4.jpg', clickQty: 0, frame: 'light', nicks: ['Gi']},
  {name: 'Eared', image: './assets/img/kitten-5.jpg', clickQty: 0, frame: 'light', nicks: ['EA']},
];


let Cat = function (data) {
  this.name = ko.observable(data.name);
  this.image = ko.observable(data.image);
  this.frame = ko.observable(data.frame);
  this.clickQty = ko.observable(data.clickQty);
  this.nicks = ko.observableArray(data.nicks);
}


function AppViewModel () {
  let self = this;

  this.catList = ko.observableArray([]);
  initCatList.forEach(function (catItem) {
    self.catList().push( new Cat(catItem) );
  });

  this.currentCat = ko.observable( this.catList()[0] );

  this.incrementCounter = function () {
    self.currentCat().clickQty(self.currentCat().clickQty() + 1);
  };

  this.changeCurrent = function (cat) {
    self.currentCat(cat);
  };

}

ko.applyBindings(new AppViewModel());