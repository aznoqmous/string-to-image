import StringToImage from "./StringToImage"

let index = 0
let height = 0
const createImage = ()=>{
    
    let img = document.createElement('img')
    let size = 9
    img.src = StringToImage.generateImageUrl(Math.random(), {
        width: size,
        height: size,
        rounded: true,
        color: `hsl(${Math.random()*360}deg, 70%, 70%)`
    })
    document.body.appendChild(img)
    index++
    let currentHeight = document.body.getBoundingClientRect().height
    if(height != currentHeight){
        height = currentHeight
        window.scrollTo({
            top: height,
            behavior: "smooth"
        })
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    const loop = ()=>{
        createImage()
        setTimeout(loop)
    }
    loop()

})