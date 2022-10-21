# StringToImage

## Install
```bash
npm install aznoqmous/string-to-image
```

## Quickstart

```js
import {StringToImage} from "string-to-image"
StringToImage.generateImageUrl("my beautiful avatar") // data url
```

## Options 
````js
StringToImage.generateImageUrl("my beautiful avatar", {
    width: 9, // number of computed pixels - width
    height: 9, // number of computed pixels - height
    color: "black", // color of generated image
    horizontalMirror: true, // mirror result horizontaly
    verticalMirror: false, // mirror result vertically
    population: 0.6 // 0 to 1 value, 0 = empty image, 1 = filled image
})
```