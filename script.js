/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

function reset(event){
    const b=event.currentTarget;
    const risp = b.parentNode;
    risp.classList.add('hidden');
    risp.innerHTML='';

    for (f of freeboxes) {
        f.classList.remove('overlay');
        f.addEventListener('click', check);
    }
    for(const c of clicked) {
        c.classList.remove('selected');
        const uncheck = c.querySelector('.checkbox');
        uncheck.src = 'images/unchecked.png';
        freeboxes.push(c);
        c.addEventListener('click', check);

    } 

    clicked.splice(0,clicked.length);

}

function final(){
    let result = '';
    if(mappa.one===mappa.two) {
        result=mappa.one;
    } else {
        if (mappa.one===mappa.three){
            result=mappa.one;
        } else {
            if (mappa.two===mappa.three) {
                result=mappa.two;
            } else result=mappa.one;
        }
    
    }
    const sec = document.querySelector('#risposta');
    sec.classList.remove('hidden');

    const nh1 = document.createElement('h1');
    nh1.textContent=RESULTS_MAP[result].title;
    sec.appendChild(nh1);

    const np = document.createElement('p');
    np.textContent=RESULTS_MAP[result].contents;
    sec.appendChild(np);

    const nbutton = document.createElement('button');
    nbutton.textContent='Ricomincia il quiz';
    sec.appendChild(nbutton); 
    nbutton.addEventListener('click', reset);
}

function check(event){
    const box = event.currentTarget;
    if(box.className==='overlay') {
    box.classList.remove('overlay');
        for(const c of clicked){
            if(c.dataset.questionId===box.dataset.questionId) {
            c.classList.remove('selected');
            const uncheck = c.querySelector('.checkbox');
            uncheck.src = 'images/unchecked.png';
            const indice = clicked.indexOf(c);
            clicked.splice(indice, 1);
            freeboxes.push(c);
            c.addEventListener('click', check);
            }
        }
    }
    box.classList.add('selected');
    const img = box.querySelector('.checkbox');
    img.src = 'images/checked.png'
    
    const index = freeboxes.indexOf(box);
    freeboxes.splice(index, 1);
    clicked.push(box);
    for(const i of freeboxes){
        if(i.dataset.questionId===box.dataset.questionId) {
            i.classList.add('overlay');
        }
    }

    box.removeEventListener('click', check);

    mappa[box.dataset.questionId]=box.dataset.choiceId;

    if (clicked.length===3){
        final();
        for(const j of freeboxes) {
            j.removeEventListener('click',check);
        }
    }
}


const mappa = {};
const clicked = [];
const freeboxes = [];
const block = document.querySelectorAll('.choice-grid div');
for(const box of block) {
    box.addEventListener('click', check);
    freeboxes.push(box);
}



