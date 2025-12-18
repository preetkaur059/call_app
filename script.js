const body = document.querySelector('body');
let clrs = document.querySelectorAll('.clrs');

let addBtn = document.querySelector('#addbtn');

let formContainer = document.querySelector('.form-container');
let closeForm = document.querySelector('.close-form');
let mainCard = document.querySelector('.main');
let maincard1 = document.querySelector('.maincard1');


const upbtn = document.querySelector('#upbtn');
const downbtn = document.querySelector('#downbtn');
const form = document.querySelector("form");

const imageUrlInput = document.querySelector(`input[placeholder="https://example.com/photo.jpg"]`);
const fullNameInput = document.querySelector('input[placeholder="Enter full name"]');
const homeTownInput = document.querySelector(`input[placeholder="Enter home town"]`);
const purposeInput = document.querySelector(`input[placeholder="e.g., Quick appointment note"]`);
const categoryRadios = document.querySelectorAll('input[name="Category"]');


clrs.forEach(clr => {
  clr.addEventListener('click', () => {
    const color = window.getComputedStyle(clr).backgroundColor;
    body.style.backgroundColor = color;
  });
});


addBtn.addEventListener("click", function() {
    formContainer.style.display = "flex";
    mainCard.style.display="none";
    // body.style.backgroundColor = "#9B5DE0";
});


closeForm.addEventListener("click", function() {
    formContainer.style.display = "none";
    // mainCard.style.display="flex";
});

function saveToLocalStorage(obj){
    if(localStorage.getItem("tasks")===null){
        let oldTasks=[];
        oldTasks.push(obj);
        localStorage.setItem("tasks", JSON.stringify(oldTasks));
    }
    else{
        let oldTasks=localStorage.getItem("tasks");
        oldTasks=JSON.parse(oldTasks);
        oldTasks.push(obj);
        localStorage.setItem("tasks", JSON.stringify(oldTasks));
    }
};


form.addEventListener("submit", function (evt) {
    evt.preventDefault();

    const imageUrl = imageUrlInput.value.trim();
    const fullName = fullNameInput.value.trim();
    const homeTown = homeTownInput.value.trim();
    const purpose = purposeInput.value.trim();
    const selectedCategory = document.querySelector('input[name="Category"]:checked');


    if (imageUrl === "") {
        alert("Please enter an image url");
        return;
    }
    if (fullName === "") {
        alert("Please enter your full name");
        return;
    }
    if (homeTown === "") {
        alert("Please enter your home town");
        return;
    }
    if (purpose === "") {
        alert("Please enter the purpose");
        return;
    }
      if (!selectedCategory) {
        alert("Please select a category");
        return;
    }
saveToLocalStorage({
  imageUrl,
  fullName,
  homeTown,
  purpose,
  category: selectedCategory.value
});

   form.reset();
maincard1.innerHTML = "";
showCards();     
formContainer.style.display = "none";
mainCard.style.display = "flex";
});

function showCards() {
  let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const maincard1 = document.querySelector(".maincard1");

  // clear old cards (important)
  maincard1.innerHTML = "";

  allTasks.forEach(function (task, index) {

    // ===== card =====
    const card = document.createElement("div");

    // SAME classes jive HTML ch ne
    if (index === 0) card.className = "card cd";
    else if (index === 1) card.className = "card card2";
    else card.className = "card card3";

    // ===== info =====
    const info = document.createElement("div");
    info.className = "info";

    const img = document.createElement("img");
    img.src = task.imageUrl;
    img.alt = "call image";

    const h2 = document.createElement("h2");
    h2.className = "name";
    h2.innerText = task.fullName;

    info.append(img, h2);

    // ===== info2 (Home Town) =====
    const info2_1 = document.createElement("div");
    info2_1.className = "info2";

    const p1 = document.createElement("p");
    p1.innerText = "Home Town";

    const p2 = document.createElement("p");
    p2.innerText = task.homeTown;

    info2_1.append(p1, p2);

    // ===== info2 (Purpose / Category) =====
    const info2_2 = document.createElement("div");
    info2_2.className = "info2";

    const p3 = document.createElement("p");
    p3.innerText = "bookings";

    const p4 = document.createElement("p");
    p4.innerText = task.purpose; // or task.category

    info2_2.append(p3, p4);

    // ===== info3 =====
    const info3 = document.createElement("div");
    info3.className = "info3";

    const btn1 = document.createElement("button");
    btn1.innerText = "Call";

    const btn2 = document.createElement("button");
    btn2.innerText = "message";

    info3.append(btn1, btn2);

    // ===== append all =====
    card.append(info, info2_1, info2_2, info3);
    maincard1.appendChild(card);
  });
}

showCards();

 
// function updatemaincard1() {
//   const cards = document.querySelectorAll(".maincard1 .cd");

//   cards.forEach((card, i) => {
//     card.style.zIndex = cards.length - i;
//     card.style.transform = `translateY(${i * 15}px) scale(${1 - i * 0.05})`;
//     card.style.opacity = `${1 - i * 0.1}`;
//   });
// }


// function updatemaincard1() {
//   const cards = document.querySelectorAll(".maincard1 .card");
//   for (let i=0; i<3; i++) {
//   // cards.forEach((card, i) => {
//     card.style.zIndex = cards.length - i;
//     card.style.transform = `scale(${1 - i * 0.05}) translateY(-${i * 20}px)`;
//     card.style.opacity = `${1 - i * 0.1}`;
//   });
// }

function updatemaincard1() {
  const cards = document.querySelectorAll(".maincard1 .card");

  for (let i = 0; i < cards.length; i++) {

    if (i < 3) {
      cards[i].style.display = "block";

      // FIRST card sab ton upar
      cards[i].style.zIndex = 100 - i;

      cards[i].style.transform =
        `translateY(${i * 17}px) translateX(${i * 17}px) scale(${1 - i * 0.05})`;

      cards[i].style.opacity = i === 0 ? "1" : `${1 - i * 0.15}`;
    } else {
      cards[i].style.display = "none";
    }

  }
}


upbtn.addEventListener("click", function () {
  const lastChild = maincard1.lastElementChild;


  if (lastChild) {
    maincard1.insertBefore(lastChild, maincard1.firstElementChild);
    updatemaincard1();
  }
});

downbtn.addEventListener("click", function () {
    const firstChild = maincard1.firstElementChild;

  if (firstChild) {
   maincard1.appendChild(firstChild);
    updatemaincard1();
  }
});

// showCards();
updatemaincard1();
