import goldenWhite from "./images/white-chocolate.png";
import coconut from "./images/coconut.png";
import lemon from "./images/lemon.png";
import cremeBrulee from "./images/creme-brulee.png";
import pinkDream from "./images/pink.png";
import raspberry from "./images/raspberry.png";
import oreo from "./images/oreo.png";
import blueberry from "./images/blueberry.png";
import velvetSwirl from "./images/white-raspberry.png";
import walnutCaramel from "./images/caramel-walnut.png";
import strawberryShine from "./images/strawberry.png";
import chocoCrunch from "./images/chocolate-nuts.png";
import chocoMelt from "./images/chocolate-filled.png";
import vanillaDonut from "./images/donut-vanilla.png";

export function loadMenu() {
    const content = document.getElementById('content');

    const menu = document.createElement('div');
    menu.classList.add('menu');

    const btnLeft = document.createElement('button');
    btnLeft.id = 'move-left';
    btnLeft.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';

    const btnRight = document.createElement('button');
    btnRight.id = 'move-right';
    btnRight.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';

    const carouselContainer = document.createElement('div');
    carouselContainer.classList.add('carousel-container');

    const wrapper = document.createElement('div');
    wrapper.classList.add('carousel-wrapper');

    const donutOptions = [
        {
            imgSrc: vanillaDonut,
            imgAlt: 'Vanilla Sprinkle Donut',
            title: 'Vanilla Sprinkle',
            price: '$3.00',
            desc: 'A classic vanilla glaze donut topped with colorful sprinkles for a timeless, delightful treat.'
        },
        {
            imgSrc: blueberry,
            imgAlt: 'Midnight Blue Donut',
            title: 'Midnight Blue',
            price: '$3.50',
            desc: 'A vibrant blueberry glaze for balanced sweetness and berry flavor.'
        },
        {
            imgSrc: coconut,
            imgAlt: 'Snow Drift Donut',
            title: 'Snow Drift',
            price: '$3.50',
            desc: 'Shredded coconut and vanilla glaze evoke a wintery delight.'
        },
        {
            imgSrc: raspberry,
            imgAlt: 'Berry Crush Donut',
            title: 'Berry Crush',
            price: '$3.50',
            desc: 'Tangy raspberry glaze with fresh raspberries and crumble.'
        },
        {
            imgSrc: velvetSwirl,
            imgAlt: 'Velvet Swirl Donut',
            title: 'Velvet Swirl',
            price: '$3.25',
            desc: 'A white glaze drizzled with raspberry for sweet-tangy luxury.'
        },
        {
            imgSrc: lemon,
            imgAlt: 'Citrus Glow Donut',
            title: 'Citrus Glow',
            price: '$3.00',
            desc: 'Bright lemon glaze on a swirl-shaped donut, so refreshing.'
        },
        {
            imgSrc: walnutCaramel,
            imgAlt: 'Walnut Caramel Donut',
            title: 'Walnut Caramel',
            price: '$4.50',
            desc: 'Caramel glaze and crunchy walnuts for perfect harmony.'
        },
        {
            imgSrc: strawberryShine,
            imgAlt: 'Strawberry Shine Donut',
            title: 'Strawberry Shine',
            price: '$3.25',
            desc: 'A glossy strawberry glaze and pastel sprinkles for sweetness.'
        },
        {
            imgSrc: chocoCrunch,
            imgAlt: 'Choco Crunch Donut',
            title: 'Choco Crunch',
            price: '$4.00',
            desc: 'Chocolate glaze with hazelnuts and almonds for a nutty treat.'
        },
        {
            imgSrc: chocoMelt,
            imgAlt: 'Choco Melt Donut',
            title: 'Choco Melt',
            price: '$4.25',
            desc: 'Gooey chocolate-filled donut topped with smooth chocolate.'
        },
        {
            imgSrc: goldenWhite,
            imgAlt: 'Golden White Donut',
            title: 'Golden White',
            price: '$3.25',
            desc: 'White chocolate glaze with caramelized almonds, so refined.'
        },
        {
            imgSrc: pinkDream,
            imgAlt: 'Pink Dream Donut',
            title: 'Pink Dream',
            price: '$3.00',
            desc: 'Playful pink glaze and colorful sprinkles for a joyful bite.'
        },
        {
            imgSrc: oreo,
            imgAlt: 'Oreo Indulgence Donut',
            title: 'Oreo Indulgence',
            price: '$4.00',
            desc: 'Vanilla glaze, chocolate drizzle, and Oreo crumbles.'
        },
        {
            imgSrc: cremeBrulee,
            imgAlt: 'Caramel Delight Donut',
            title: 'Caramel Delight',
            price: '$4.25',
            desc: 'Caramelized sugar glaze on custard-filled donut, pure elegance.'
        }
    ];

    const cardCount = donutOptions.length;
    const cardW = 384;
    const cardGap = 48;
    const totalSetWidth = cardCount * (cardW + cardGap);

    const colorMap = {
        'Vanilla Sprinkle': 'rgba(255, 231, 150, 0.6)',
        'Midnight Blue': 'rgba(176, 205, 255, 0.6)',
        'Snow Drift': 'rgba(200, 230, 255, 0.6)',
        'Berry Crush': 'rgba(255, 205, 220, 0.6)',
        'Velvet Swirl': 'rgba(255, 205, 230, 0.6)',
        'Citrus Glow': 'rgba(255, 242, 150, 0.6)',
        'Walnut Caramel': 'rgba(225, 200, 170, 0.6)',
        'Strawberry Shine': 'rgba(255, 190, 200, 0.6)',
        'Choco Crunch': 'rgba(219, 187, 140, 0.6)',
        'Choco Melt': 'rgba(210, 165, 120, 0.6)',
        'Golden White': 'rgba(255, 223, 180, 0.6)',
        'Pink Dream': 'rgba(255, 200, 210, 0.6)',
        'Oreo Indulgence': 'rgba(190, 190, 190, 0.6)',
        'Caramel Delight': 'rgba(235, 210, 170, 0.6)'
    };

    function getGradientColor(title) {
        return colorMap[title] || 'rgba(255, 231, 150, 0.6)';
    }

    function createCard(cardData) {
        const card = document.createElement('div');
        card.classList.add('menu-item-card');
        card.style.setProperty('--gradient-color', getGradientColor(cardData.title));

        const pricePlus = document.createElement('div');
        pricePlus.classList.add('price-plus-container');

        const price = document.createElement('span');
        price.classList.add('price-donut');
        price.textContent = cardData.price;

        const plusIcon = document.createElement('i');
        plusIcon.classList.add('fa-solid', 'fa-square-plus', 'fa-lg');
        plusIcon.title = "Add to dream cart!";

        pricePlus.appendChild(plusIcon);
        pricePlus.appendChild(price);

        const img = document.createElement('img');
        img.src = cardData.imgSrc;
        img.alt = cardData.imgAlt;
        img.title = cardData.imgAlt;
        img.id = "donut-image";

        const line1 = document.createElement('div');
        line1.classList.add('card-line-1');

        const title = document.createElement('h1');
        title.textContent = cardData.title;
        line1.appendChild(title);

        const line2 = document.createElement('div');
        line2.classList.add('card-line-2');
        const desc = document.createElement('p');
        desc.classList.add('donut-desc');
        desc.textContent = cardData.desc;
        line2.appendChild(desc);

        card.appendChild(pricePlus);
        card.appendChild(img);
        card.appendChild(line1);
        card.appendChild(line2);

        return card;
    }

    let sets = [
        [...donutOptions],
        [...donutOptions],
        [...donutOptions]
    ];

    sets.flat().forEach(c => wrapper.appendChild(createCard(c)));

    carouselContainer.appendChild(wrapper);
    menu.appendChild(btnLeft);
    menu.appendChild(carouselContainer);
    menu.appendChild(btnRight);
    content.appendChild(menu);

    let offsetPx = totalSetWidth - 24;

    function setTransition(active) {
        wrapper.style.transition = active ? 'transform 0.4s ease' : 'none';
    }

    function updatePos() {
        wrapper.style.transform = `translateX(calc(50% - ${offsetPx}px))`;
    }

    function addRightSet() {
        const newSet = [...donutOptions];
        sets.push(newSet);
        const frag = document.createDocumentFragment();
        newSet.forEach(c => frag.appendChild(createCard(c)));
        wrapper.appendChild(frag);
    }

    function addLeftSet() {
        const newSet = [...donutOptions];
        sets.unshift(newSet);
        const frag = document.createDocumentFragment();
        newSet.forEach(c => frag.appendChild(createCard(c)));
        wrapper.prepend(frag);
    }

    function removeLeftSet() {
        for (let i = 0; i < cardCount; i++) {
            wrapper.removeChild(wrapper.firstChild);
        }
        sets.shift();
    }

    function removeRightSet() {
        for (let i = 0; i < cardCount; i++) {
            wrapper.removeChild(wrapper.lastChild);
        }
        sets.pop();
    }

    function addRemoveDuplicateSet() {
        setTransition(false);

        if (offsetPx > totalSetWidth * 2.5) {
            removeLeftSet();
            addRightSet();
            offsetPx -= totalSetWidth;
        }

        if (offsetPx < totalSetWidth * 0.5) {
            removeRightSet();
            addLeftSet();
            offsetPx += totalSetWidth;
        }

        updatePos();
    }

    function moveLeft() {
        setTransition(false);
        addRemoveDuplicateSet();
        requestAnimationFrame(() => {
            setTransition(true);
            offsetPx -= (cardW + cardGap);
            updatePos();
        });
    }

    function moveRight() {
        setTransition(false);
        addRemoveDuplicateSet();
        requestAnimationFrame(() => {
            setTransition(true);
            offsetPx += (cardW + cardGap);
            updatePos();
        });
    }

    btnLeft.addEventListener('click', moveLeft);
    btnRight.addEventListener('click', moveRight);

    setTransition(false);
    updatePos();
    requestAnimationFrame(() => setTransition(true));

    document.querySelectorAll('.menu-item-card').forEach((card) => {
        card.style.setProperty('--x', '10%');
        card.style.setProperty('--y', '90%');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--x', '10%');
            card.style.setProperty('--y', '90%');
        });
    });

    const stripContainer = document.createElement('div');
    stripContainer.classList.add('menu-strip-container');

    const staticStrip = document.createElement('div');
    staticStrip.classList.add('menu-strip');

    const stripContent = document.createElement('div');
    stripContent.classList.add('menu-strip-content');
    stripContent.innerHTML = `<span><strong class="best-seller">Best Sellers:</strong> Velvet Swirl, Dark Oreo, Citrus Glow, and Caramel Bliss – <u class="glowing">Buy 5, Get 1 Free!</u></span>`;

    staticStrip.appendChild(stripContent);
    stripContainer.appendChild(staticStrip);
    content.appendChild(stripContainer);
}
