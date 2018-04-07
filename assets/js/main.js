let current = 0,
  container = document.getElementById('main_container'),
  left = document.getElementById('left'),
  center = document.getElementById('center'),
  kittens = [
    {name: 'Joy & Bee', image: 'kitten-1.jpg', click_qty: 0, style: 'dark'},
    {name: 'Kity', image: 'kitten-3.jpg', click_qty: 0, style: 'light'},
    {name: 'Mini', image: 'kitten-2.jpg', click_qty: 0, style: 'dark'},
    {name: 'Ginger', image: 'kitten-4.jpg', click_qty: 0, style: 'light'},
    {name: 'Eared', image: 'kitten-5.jpg', click_qty: 0, style: 'light'},
  ];


function buildLayout () {
  showList();
  showCurrent();
}


function showList () {
  left.innerHTML += '<ul id="list"></ul>';
  let list = document.getElementById('list');

  for(let [id, kitty] of Object.entries(kittens)) {
    console.log(id, kitty);
    list.innerHTML += `<li id="kitty-${id}">${kitty.name}</li>`;
  }

  for(let [id, kitty] of Object.entries(kittens)) {
    document.getElementById('kitty-'+id).addEventListener('click', () => {
      changeCurrent(id);
    }, false);
  }
}


function showCurrent () {
  center.innerHTML += `
    <div class="kitten">
      <span id="k-name"></span>
      <img id="k-img" class="" src="">
      <span id="k-counter"></span>
    </div>`;

  let k_img = document.querySelector('#k-img');
  k_img.addEventListener('click', clickCurrent);
}


function changeCurrent (id) {
  current = id;
  updateCurrent();
}


function updateCurrent () {
  let kitty = kittens[current],
    k_name = document.querySelector('#k-name'),
    k_img = document.querySelector('#k-img');

  k_name.innerHTML = kitty.name;
  k_img.src = './assets/img/'+kitty.image;
  k_img.className = kitty.style;
  updateCurrentClicks();
}


function updateCurrentClicks () {
  let k_counter = document.querySelector('#k-counter');
  k_counter.innerHTML = `Clicks: ${kittens[current].click_qty}`;
}


function clickCurrent () {
  kittens[current].click_qty ++ ;
  updateCurrentClicks();
}


buildLayout();
changeCurrent(0);