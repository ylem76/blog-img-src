// movement animation to happen
const card = document.querySelector('.card');
const container = document.querySelector('.container');

// items
const title = document.querySelector('.title');
const sneaker = document.querySelector('.sneaker img');
const purchase = document.querySelector('.purchase button');
const description = document.querySelector('.info h3');
const sizes = document.querySelector('.sizes');

// moving animation event
container.addEventListener('mousemove', (e) => {

    console.log('move');
    // console.log(e.pageX);
    

    let xAxis = ((window.innerWidth / 2 - e.pageX) / 25);
    let yAxis = ((window.innerHeight / 2 - e.pageY) / 25);

    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

// animate in
container.addEventListener('mouseenter', (e) => {
    console.log('enter');
    setTimeout(function() {
        card.style.transition = 'none';
    }, 300);
    
    //popout
    title.style.transform = 'translateZ(150px)';
    sneaker.style.transform = 'translateZ(200px)';
    description.style.transform = 'translateZ(125px)';
    sizes.style.transform = 'translateZ(100px)';
    purchase.style.transform = 'translateZ(200px)';
});

// animate out
container.addEventListener('mouseleave', (e) => {
    card.style.transform = 'rotateY(0) rotateX(0)';
    card.style.transition = 'all 0.3s ease';
    //popout
    title.style.transform = 'translateZ(0)';
    sneaker.style.transform = 'translateZ(0) rotateZ(-0)';
    description.style.transform = 'translateZ(0)';
    sizes.style.transform = 'translateZ(0)';
    purchase.style.transform = 'translateZ(0)';
})