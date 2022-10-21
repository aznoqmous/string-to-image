export default class StringToImage {
    constructor(input, opts={}) {
        this.input = input
        this.opts = Object.assign({
            width: 9,
            height: 9,
            color: "limegreen",
            horizontalMirror: true,
            verticalMirror: false,
            population: 0.6
        }, opts)
        this.build()
        this.draw()
    }

    build(){
        this.c = document.createElement('canvas')
        this.c.width = this.opts.width
        this.c.height = this.opts.height
        this.ctx = this.c.getContext('2d')

        this.seed = this.input.split('').map(c => c.charCodeAt(0)).reduce((prev, current) => prev + current, 0)
        this.seed = parseInt(this.seed)  * 93456123 % 123456789
    }
    draw(){
        this.ctx.clearRect(0, 0, this.c.width, this.c.height)

        this.ctx.fillStyle = this.opts.color
        for(let x = 0; x < this.c.width; x++){
            for(let y = 0; y < this.c.height; y++){
                let rand = this.seededRandom(x + y*10)
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

    seededRandom(value){
        let x = Math.sin(this.seed * value) * 10000
        return x - Math.floor(x)
    }

    getUrl(){
        return this.c.toDataURL()
    }

    static generateImageUrl(input, opts){
        return (new this(input, opts)).getUrl()
    }
}
