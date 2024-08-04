function onEntry(entry) {
    entry.forEach(change => {
        if (change.isIntersecting) {
            change.target.classList.add('element-show');
            observer.unobserve(change.target);
        } else {
            change.target.classList.remove('element-show');
        }
    });
}

let options = {
    threshold: [0.2]
};

let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.element-animation');
let elementsAnimationLeft = document.querySelectorAll('.element-animation-left');
let elementsAnimationBottom = document.querySelectorAll('.element-animation-bottom');

function animationElement(elements) {
    for (let elm of elements) {
        observer.observe(elm);
    }
};

if (elements) {
    animationElement(elements);
}

if(elementsAnimationLeft){
    animationElement(elementsAnimationLeft);
}

if(elementsAnimationBottom){
    animationElement(elementsAnimationBottom);
}

