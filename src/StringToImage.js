import SeededRandom from "./SeededRandom"

export default class StringToImage {
    constructor(input, opts={}) {
        this.input = input+""
        this.opts = Object.assign({
            width: 9,
            height: 9,
            color: "limegreen",
            horizontalMirror: true,
            verticalMirror: false,
            population: 0.6,
            rounded: true
        }, opts)
        this.build()
        this.draw()
    }

    build(){
        this.c = document.createElement('canvas')
        this.c.width = this.opts.width
        this.c.height = this.opts.height
        this.ctx = this.c.getContext('2d')

        this.generator = new SeededRandom(this.input)
    }
    draw(){
        this.ctx.clearRect(0, 0, this.c.width, this.c.height)

        this.ctx.fillStyle = this.opts.color
        for(let x = 0; x < this.c.width; x++){
            for(let y = 0; y < this.c.height; y++){
                let rand = this.generator.random()
                if(this.opts.rounded && !this.inEllipse(x,y)) continue;
                if(rand > 1 - this.opts.population) {
                    this.ctx.fillRect(x,y,1,1)
                }
            }
        }
        if(this.opts.horizontalMirror){
            this.ctx.clearRect(Math.ceil(this.c.width/2), 0, Math.floor(this.c.width/2), this.c.height)
            this.ctx.save()
            this.ctx.translate(this.c.width, 0)
            this.ctx.scale(-1, 1)
            this.ctx.drawImage(
                this.c,
                0, 0, Math.floor(this.c.width/2), this.c.height,
                0, 0, Math.floor(this.c.width/2), this.c.height
            )
            this.ctx.restore()
        }
        if(this.opts.verticalMirror){
            this.ctx.clearRect(0, Math.ceil(this.c.height/2), this.c.width, Math.floor(this.c.height/2))
            this.ctx.save()
            this.ctx.translate(0, this.c.height)
            this.ctx.scale(1, -1)
            this.ctx.drawImage(
                this.c,
                0, 0, this.c.width, this.c.height,
                0, 0, this.c.width, this.c.height
            )
            this.ctx.restore()
        }
    }

    getUrl(){
        return this.c.toDataURL()
    }

    inEllipse(x,y){
        return Math.pow((x - this.c.width/2), 2) / Math.pow(this.c.width/2, 2)
        + Math.pow((y - this.c.height/2), 2) / Math.pow(this.c.height/2, 2) <= 1
    }

    static generateImageUrl(input, opts){
        return (new this(input, opts)).getUrl()
    }
}
