/* <i class="fa-solid fa-unlock"></i> */
// <i class="fa-solid fa-lock"></i>

document.addEventListener('keydown', (e) => {
   e.preventDefault()
   if(e.code.toLocaleLowerCase() === 'keyr'){
      setRandomColours()
   }
})

// const btns = document.querySelectorAll('button')
// btns.forEach()

document.addEventListener('click', e => {
   const type = e.target.dataset.type

   if(type === 'lock') {
      const node = e.target.tagName.toLocaleLowerCase() === 'i' ?
      e.target : e.target.children[0]

      node.classList.toggle('fa-lock')
      node.classList.toggle('fa-unlock')
   }

   else if(type === 'copy'){
      copyColours(e.target.textContent)
   }
})

const copyColours = (text) => navigator.clipboard.writeText(text)

const cards = document.querySelectorAll('.card')

const setRandomColours = (isInitial) => {
   const colors = isInitial ? getColoursFromHash() : [] 

   cards.forEach((card, index) => {
      const isLocked = card.querySelector('i').classList.contains('fa-lock')
      const text = card.querySelector('h2')
      const icon = card.querySelector('button i')
      

      if(isLocked) {
         colors.push(text.textContent)
         return
      }

      const color = isInitial 
      ? colors[index] 
         ? colors[index] 
         : chroma.random() 
      : chroma.random()

      if(!isInitial){
         colors.push(color)
      }

      text.textContent = color
      card.style.background = color

      setTextColours(text, color)
      setTextColours(icon, color)
   })
   updColorsHash(colors)
}

const setTextColours = (text, color) => {
   const luminance = chroma(color).luminance()
   text.style.color = luminance > 0.5 ? "black" : "white"
}

// const generateRandomColours = () => {
//    const hexCodes = '0123456789ABCDF'
//    let hex = ''
//    for(let i = 0; i< 6; i++){
//       hex += hexCodes[Math.floor(Math.random() * hexCodes.length)]
//    }
//    return '#' + hex
// }

const updColorsHash = (colors = []) => {
   document.location.hash = colors.map(color => color.toString().substring(1)).join('-')
}

const getColoursFromHash = () => {
   if(document.location.hash.length > 1){
      return document.location.hash.substring(1).split('-').map(color => '#' + color)
   }

   return []
}

setRandomColours(true)