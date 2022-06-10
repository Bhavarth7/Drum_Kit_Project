/*
document.querySelector("button").addEventListener("click",handleClick);
function handleClick()
{
  alert("I got a Click");
}
*/
// OR
/*
document.querySelector("button").addEventListener("click",function()
{
  alert("I got a clicked");
}
);
*/
var n = document.querySelectorAll(".drum").length;
//detecting click button
for(var i=0;i<n;i++)
{
  document.getElementsByClassName("drum")[i].addEventListener("click",
  function()
  {
    var buttonInnerHTML = this.innerHTML;
    makeSound(buttonInnerHTML);
    buttonAnimation(buttonInnerHTML);
  }
  );
};

// detecting keyboard press
document.addEventListener("keypress",function(event)
{
  makeSound(event.key)
  buttonAnimation(event.key);
});
function makeSound(key)
{
  if(key=='w')
  {
    var audio1 = new Audio("sounds/crash.mp3");
    audio1.play();
  }
  if(key=='a')
  {
    var audio1 = new Audio("sounds/kick-bass.mp3");
    audio1.play();
  }
  if(key=='s')
  {
    var audio1 = new Audio("sounds/snare.mp3");
    audio1.play();
  }
  if(key=='d')
  {
    var audio1 = new Audio("sounds/tom-1.mp3");
    audio1.play();
  }
  if(key=='j')
  {
    var audio1 = new Audio("sounds/tom-2.mp3");
    audio1.play();
  }
  if(key=='k')
  {
    var audio1 = new Audio("sounds/tom-3.mp3");
    audio1.play();
  }
  if(key=='l')
  {
    var audio1 = new Audio("sounds/tom-4.mp3");
    audio1.play();
  }
};

function buttonAnimation(currentKey)
{
  var activeButton = document.querySelector("."+currentKey);
  activeButton.classList.add("pressed");
  setTimeout(function (){
    activeButton.classList.remove("pressed");
  },100);
}
