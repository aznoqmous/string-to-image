# StringToImage

## Install
```bash
npm install aznoqmous/string-to-image
```

## Quickstart

```js
import {StringToImage} from "string-to-image"

/**
 * Returns a data URL, can be used directly inside a HTMLImageElement src attribute
 */
StringToImage.generateImageUrl("my beautiful avatar") 
```

## Options 
````js
StringToImage.generateImageUrl("my beautiful avatar", {
    /**
     * number of computed pixels - width
     */
    width: 9, 

    /**
     * number of computed pixels - height
     */
    height: 9, 

    /** 
     * color of generated image, any CSS color value accepted
     * (hex, rgb, rgba, hsl, hsla, color name)
     */
    color: "black", 

    /**
     * mirror result horizontally
     */
    horizontalMirror: true, 

    /**
     * mirror result vertically
     */
    verticalMirror: false, 

    /**
     * 0 to 1 value, 0 = empty image, 1 = filled image
     */
    population: 0.6 
})
```