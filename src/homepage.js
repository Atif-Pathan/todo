// homepage.js
export function loadHomePage() {
  const content = document.getElementById('content');

  const home = document.createElement('div');
  home.classList.add('home');

  const homeLeft = document.createElement('div');
  homeLeft.classList.add('home-left');

  const title = document.createElement('h1');
  title.classList.add('home-left-title');
  title.textContent = 'DREAMY DONUTS';

  const para = document.createElement('p');
  para.classList.add('home-left-para');
  para.innerHTML = 'Welcome to Dreamy Donuts, where every bite takes you on a journey of flavor and joy. Handcrafted fresh daily, our donuts boast rich glazes, vibrant flavors, and sprinkles of happiness. <strong>Discover your dream donut today!</strong>';

  const menuBtnDiv = document.createElement('div');
  menuBtnDiv.classList.add('menu-btn');

  const menuBtn = document.createElement('button');
  menuBtn.type = 'button';
  menuBtn.id = 'home-left-menu-btn';
  menuBtn.textContent = 'MENU';

  // Add event listener to switch to the menu tab
  menuBtn.addEventListener('click', () => {
      // Find the menu nav button and click it programmatically
      const menuNavBtn = document.querySelector('.menu-tab'); 
      if (menuNavBtn) {
          menuNavBtn.click();
      }
  });

  menuBtnDiv.appendChild(menuBtn);
  homeLeft.appendChild(title);
  homeLeft.appendChild(para);
  homeLeft.appendChild(menuBtnDiv);

  const homeRight = document.createElement('div');
  homeRight.classList.add('home-right');

  home.appendChild(homeLeft);
  home.appendChild(homeRight);
  content.appendChild(home);

  const stripContainer = document.createElement('div');
  stripContainer.classList.add('home-strip-container');

  const homeStrip = document.createElement('div');
  homeStrip.classList.add('home-strip');

  function createStripContent() {
    const stripContent = document.createElement('div');
    stripContent.classList.add('strip-content');
    const items = [
      {text: 'OREO', color: '#f5da28'},
      {text: 'STRAWBERRY', color: '#fc6b4a'},
      {text: 'CARAMEL', color: '#f5da28'},
      {text: 'VANILLA', color: '#fc6b4a'},
      {text: 'BLUEBERRY', color: '#f5da28'},
      {text: 'CHOCOLATE', color: '#fc6b4a'},
      {text: 'COCONUT', color: '#f5da28'},
      {text: 'LEMON', color: '#fc6b4a'},
    ];
    items.forEach(item=>{
      const span = document.createElement('span');
      span.textContent = item.text;
      stripContent.appendChild(span);
      const icon = document.createElement('i');
      icon.classList.add('fa-solid','fa-burst');
      icon.style.color = item.color;
      stripContent.appendChild(icon);
    });
    return stripContent;
  }

  homeStrip.appendChild(createStripContent());
  homeStrip.appendChild(createStripContent());
  stripContainer.appendChild(homeStrip);
  content.appendChild(stripContainer);
}
