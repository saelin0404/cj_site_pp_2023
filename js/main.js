// main.js

//고객센터 
const cs = document.querySelectorAll(".topMenu>dd");

cs[4].addEventListener("click",e=>{
  e.preventDefault();
  e.currentTarget.classList.toggle("on");
  if(e.currentTarget.classList.contains("on")){
    e.currentTarget.children[0].setAttribute("title","고객센터닫기")
  }else{
    e.currentTarget.children[0].setAttribute("title","고객센터닫기")
  }
})

// 주메뉴
const header = document.querySelector(".header_wrap")
const gnb = document.querySelectorAll("nav>ul>li")
const gnbList = document.querySelectorAll("nav>ul>li>ul")

for(let el of gnb){
  el.addEventListener("mouseover",e=>{
    if(cs[4].classList.contains("on")){
      cs[4].classList.remove("on")
    }
    if(search.classList.contains("on")){
      search.classList.remove("on")
    }
    header.classList.add("on");
    for(let el of gnbList){
      el.classList.add("on")
    }
  })
  el.addEventListener("mouseleave",e=>{
    header.classList.remove("on");
    for(let el of gnbList){
      el.classList.remove("on")
    }
  })
}

//검색버튼
const searchOpen = document.querySelector(".info>.srch_open")
const search = document.querySelector(".srch")

searchOpen.addEventListener("click",e=>{
  e.preventDefault();
  e.currentTarget.classList.toggle("on");
  search.classList.toggle("on");
  if(e.currentTarget.classList.contains("on")){
    e.currentTarget.children[0].setAttribute("title","검색서식 닫기")
  }
  else{
    e.currentTarget.children[0].setAttribute("title","검색서식 열기")
  }
})

//로그인아이콘

//이미지 삽입
const appear = document.querySelector(".info .appear");
const loop = document.querySelector(".info .loop");

let appearImg = "";
for(let i=0; i<57; i++){
  if(i<10){
    i="0"+i
    appearImg += `<img src="img/appear/appear_000${i}.png" alt="${i}"/>`;
  }
  else{
    appearImg += `<img src="img/appear/appear_000${i}.png" alt="${i}"/>`;
  }
}
appear.innerHTML = appearImg;

let loopImg = "";
for(let k=0; k<82; k++){
  if(k<10){
    loopImg += `<img src="img/loop/loop_0000${k}.png" alt="${k}"/>`;
  }
  else{
    loopImg += `<img src="img/loop/loop_000${k}.png" alt="${k}"/>`;
  }
}
loop.innerHTML = loopImg;

//애니메이션
const imgA = appear.querySelectorAll("img");
const imgL = loop.querySelectorAll("img");

let delay=0.05
for(let a=0; a<imgA.length; a++){
  imgA[a].style.animation = `ani 2.85s linear ${a*delay}s`;
}
for(let a=0; a<imgL.length; a++){
  imgL[a].style.animation = `ani 4.1s linear ${(a*0.05)+2.85}s infinite`;
}

//content1 menu
const quickMenu = document.querySelectorAll(".content1>ul>li span");

for(let b=0; b<quickMenu.length; b++){

  //이미지
  let quickimg = ""
  for(let i=0; i<20; i++){
    if(i<10){
      quickimg += `<img src="img/quick0${b+1}/quick0${b+1}_0000${i}.png" alt="${i}"/>`;
    }
    else{
      quickimg += `<img src="img/quick0${b+1}/quick0${b+1}_000${i}.png" alt="${i}"/>`;
    }
  }
  quickMenu[b].innerHTML=quickimg;

  //애니메이션
  quickMenu[b].closest("li").addEventListener("mouseover",e=>{
    let images = quickMenu[b].querySelectorAll("img");
    for(let q=0; q<images.length; q++){
      images[q].style.animation = `ani 2.85s linear ${q*0.05}s 1`;
    }
  })
  quickMenu[b].closest("li").addEventListener("mouseleave",e=>{
    let images = quickMenu[b].querySelectorAll("img");
    for(let q=0; q<images.length; q++){
      images[q].style.animation = "none"
    }
  })

}

// 배너
const body = document.querySelector("body");
const bannerFrame = document.querySelector(".banner_frame");
const section = document.querySelectorAll(".banner_frame>section");
const arrow = document.querySelectorAll("div.arrow a");
const prev = document.querySelector("div.arrow>.prev");
const next = document.querySelector("div.arrow>.next");
const rolling = document.querySelectorAll(".rolling a");
const play = document.querySelector(".rolling .play");
const rollbtn = document.querySelectorAll(".rolling ul>li>a")

let banneridx = 0
let lastidx = section.length-1;
let width = document.querySelector("body").offsetWidth;
window.addEventListener("resize",()=>{
  width = document.querySelector("body").offsetWidth;
})

let nextbanner = setInterval(function() {
  const style = window.getComputedStyle(bannerFrame);
  let left = style.getPropertyValue('left');
  const lastLe = `-${width*lastidx}px`

  if(left === lastLe){
    rollbtn[0].classList.add("on")
    bannerFrame.style.left ="0";
    bannerFrame.classList.add("no")
    banneridx = 0;
  }
  else{
    bannerFrame.classList.remove("no")
  }
}, 100);

let bannerWhite = (bannerNumber) =>{
  if(section[bannerNumber].classList.contains("white")){
    arrow.forEach(item=>{
      item.classList.add("white");
    })
    rolling.forEach(item=>{
      item.classList.add("white");
    })
  }
  else{
    arrow.forEach(item=>{
      item.classList.remove("white");
    })
    rolling.forEach(item=>{
      item.classList.remove("white");
    })
  }
  
  //롤링버튼
  rollbtn.forEach(item=>{
    item.classList.remove("on")
  })
  rollbtn[bannerNumber].classList.add("on")
}

// 이전/다음버튼 
next.addEventListener("click",e=>{
  e.preventDefault();

  banneridx++;
  if(banneridx>lastidx)banneridx = 1;
  clearTimeout(autoB)
  play.classList.add("pause")
  flag = false;
  bannerFrame.style.left =`${width*-banneridx}px`;
  bannerWhite(banneridx);
})

prev.addEventListener("click",e=>{
  e.preventDefault();
  if(banneridx<1)banneridx = lastidx;
  banneridx--;
  clearTimeout(autoB)
  play.classList.add("pause")
  flag = false;
  bannerFrame.style.left =`${width*-banneridx}px`;
  bannerWhite(banneridx);
})

//오토배너 작동
let autoBanner = ()=>{
  banneridx++;
  if(banneridx>lastidx)banneridx = 1;
  bannerFrame.style.left =`${width*-banneridx}px`;
  autoB = setTimeout(autoBanner,5000);
  bannerWhite(banneridx);
}

let autoB = setTimeout(autoBanner,5000);

//재생버튼
let flag = true;
play.addEventListener("click",e=>{
  e.preventDefault();
  if(flag){
    clearTimeout(autoB);
    e.currentTarget.classList.add("pause");
    flag = false;
  }
  else{
    autoB = setTimeout(autoBanner,5000);
    e.currentTarget.classList.remove("pause");
    flag = true;
  }
})

//롤링클릭
for(let r=0; r<rollbtn.length; r++){
  rollbtn[r].addEventListener("click",e=>{
    e.preventDefault();
    clearTimeout(autoB);
    bannerFrame.style.left = `${r*-width}px`;
    bannerWhite(r);
  })
}

// 스크롤이벤트
const htmlHei = document.querySelector("html").scrollHeight;
const btnTop = document.querySelector(".top");
window.addEventListener("scroll",e=>{
let scroll = document.querySelector("html").scrollTop;

const doughnut_Left_L = document.querySelector(".doughnut_Left_L");
const doughnut_Left_S = document.querySelector(".doughnut_Left_S");
const combine_Left= document.querySelector(".combine_Left");

const doughnut_right_M = document.querySelector(".doughnut_right_M");
const combine_right = document.querySelector(".combine_right");

const doughnut_Center_M = document.querySelector(".doughnut_Center_M");


combine_Left.style.top = `${scroll*0.7}px`
doughnut_Left_L.style.top = `${scroll*0.5}px`
doughnut_Left_S.style.top = `${1310- scroll*0.8}px`

doughnut_Center_M.style.top = `${500-scroll*0.6}px`

combine_right.style.top = `${scroll*0.7}px`
if(scroll>=1599){
  doughnut_right_M.style.top = `${scroll*0.7}px`
}

// top버튼
let topHei = htmlHei-240;

if(scroll>200&&scroll<2400){
  btnTop.style.display = "block";
  btnTop.classList.remove("on")
}
else if(scroll<topHei&&htmlHei>scroll){
  btnTop.classList.add("on")
}
else{
}
})//window scroll

const all = document.querySelectorAll(".content3_inner>div>ul>li");
for(let el of all){
  el.addEventListener("mouseover",e=>{
    el.classList.add("on");
  })
  el.addEventListener("mouseleave",e=>{
    el.classList.remove("on");
  })
}


const content3 = document.querySelectorAll(".content3_inner>ul>li");
console.log(content3);

for(let el of content3){
  el.addEventListener("click",e=>{
    e.preventDefault();
    var cla = e.currentTarget.className
    for(let el of content3){
      el.classList.remove("on")
    }
    e.currentTarget.classList.add("on")
    
    for(let ell of all){
      var classAll = ell.className;
      switch(cla){
        case "all":
          ell.style.display = "block"
        break;
        case classAll:
          ell.style.display = "block"
        break;
        default:
          ell.style.display = "none" 
        break;
      }
    }
  })
}

const footSite=document.querySelector(".foot_inner>dl>dd.family_site");

footSite.addEventListener("click",e=>{
  e.preventDefault();
  e.currentTarget.classList.toggle("on");
})


const mob = document.querySelector(".mob");
const mobBtn = document.querySelector(".mobBtn");
const mobBtnClose = document.querySelector(".mobBtn_close");
const bg = document.querySelector(".bg");
const mobTopMenu = document.querySelector("dl.mob_topMenu");
const mobGnb = document.querySelector("nav.mob_gnb");


mobBtn.addEventListener("click", e =>{
  e.preventDefault();
  bg.classList.add("on");
  mobBtnClose.classList.add("on");
  mob.classList.add("on");
  body.classList.add("on");
});
mobBtnClose.addEventListener("click", e =>{
  e.preventDefault();
  bg.classList.remove("on");
  mobBtnClose.classList.remove("on");
  mob.classList.remove("on");
  body.classList.remove("on");
});
// 모바일 메뉴 클릭시 하위메뉴 열리고 닫히게 하기
mobTopMenu.querySelectorAll("dl>dd").forEach(dd => {
  dd.addEventListener("click", e => {
    e.preventDefault();
    e.currentTarget.classList.toggle("on");
  })
})
mobGnb.querySelectorAll("ul>li").forEach(li => {
  li.addEventListener("click", e => {
    e.preventDefault();
    e.currentTarget.classList.toggle("on");
  })
})