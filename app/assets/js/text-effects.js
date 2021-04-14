$(document).ready(function(){
  $(".tlt").textillate({
    loop: false,
    callback: function(){
      // alert('fin')
    }
  })
})

const animateCSS = (element, animation, prefix = 'animate__') =>
  new Promise((resolve, reject) => {
    const animationName = prefix+animation
    const node = document.querySelector(element)
    node.classList.add(prefix+'animated', animationName)
    function handleAnimationEnd(event) {
      event.stopPropagation()
      node.classList.remove(prefix+'animated', animationName)
      resolve('Animation ended')
    }
    node.addEventListener('animationend', handleAnimationEnd, {once: true})
})

function startTlt(){
  $(".tlt").textillate('start')
}