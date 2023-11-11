let zborovi=new Array("kiko","martin","mario","andrej","filip");//treba da ima 20 zborovi
let obidi=5; //dozvoleni obidi
let vreme;
let counterInterval;
let maxVreme=5; //dozvoleno vreme za igranje
let counter;

function start()
{
    let dozvolenoVremeP=document.getElementById("dozvVrem");
    dozvolenoVremeP.innerHTML=maxVreme;
    
    let startButton=document.getElementById("startButton");
    startButton.addEventListener("click",pom)
    vreme = document.getElementById("seconds");
}
function pom()
{
    let novaIgra=document.getElementById("startButton");
    novaIgra.innerHTML="New Game";
    reset();
}
function reset()
{
    
    let container=document.getElementById("container");
    container.innerHTML="";
    obidi=5;
    clearTimer();
    counter = 0;
    init();
}
function init()
{
    
    let slika=document.getElementById("slika");
    slika.setAttribute("src","nisto.jpg");
    let k1=true;
    let k2=true;
    let k3=true;
    counterInterval = setInterval(function () 
    {
        
        
            counter++;
            if (counter>maxVreme) {
                if(k2===true)
                    {
                        window.alert("Zavrsi vremeto.\nZapocnete nova igra!");
                        slika.setAttribute("src","poraz.jpg");
                    }
                counter=0;
                k1=false;
                k3=false;
                clearTimer();
                return;
                
            }
            else
                vreme.innerHTML = counter;
        
    }, 1000);


    let kojZbor=Math.floor(Math.random()*zborovi.length);
    let zbor=zborovi[kojZbor];
    
    let bukvi=zborovi[kojZbor].split("");
    let b1 = -1,
    b2 = -1,
    b3 = -1;
    
    while (b1 === b2 || b1 === b3 || b2 === b3) {
        b1 = Math.ceil(Math.random() * bukvi.length - 1);
        b2 = Math.ceil(Math.random() * bukvi.length - 1);
        b3 = Math.ceil(Math.random() * bukvi.length - 1);
    } 
    


    let prazniBukvi=zbor.length-3;
    let container=document.getElementById("container");
    for(let i=0;i<zbor.length;i++)
    {
          
        let input = document.createElement("input");
        input.setAttribute("type", "text");
        let bukva=zbor[i];
        if (i===b1 || i===b2 || i===b3) {    
            input.value=bukva;
            input.disabled=true;  
        }
        else
        {
            input.addEventListener("input",function(e){
                e.preventDefault();
                let vnesenaBukva=e.target.value;
                if (vnesenaBukva===bukva && k3) {
                    input.value=bukva;
                    input.disabled=true;
                    prazniBukvi--;
                    if (prazniBukvi==0) {
                        k2=false;
                        window.alert("Uspeavte da go pogodite zborot vo dozvoleniot rok od "+maxVreme+" sekundi.\nZapocnete nova igra!");
                        slika.setAttribute("src","pobeda.png");
                    }
                }
                else
                {
                    input.value="";
                }
                obidi--;
                if (obidi==0 && k3) {
                    k2=false;
                    window.alert("Ne uspeavte da go pogodite zborot vo dozvoleniot rok od "+maxVreme+" sekundi.\nZapocnete nova igra!");
                    slika.setAttribute("src","poraz.jpg");

                }
            })
        }
        container.appendChild(input);
    }
}
function clearTimer() {
    clearInterval(counterInterval);
    counter = 0;
    vreme.innerHTML = 0;
  }

window.addEventListener("load",start);