[postcss-salad]: https://github.com/ElemeFE/postcss-salad
[vue-fancybox]: https://xiecg.github.io/other/vue-fancybox/#/baseUsage
[vue-fancybox]: https://xiecg.github.io/other/vue-fancybox/#/baseUsage

# Overview

Image preview component based on vue.js
> More gestures are still in development.

# DEMO

[vue-fancybox]

# Install
```Bash
npm install vue-fancybox --save
```

```JavaScript
import fancyBox from 'vue-fancybox';
```

# Base Usage

```HTML
<div class="list" v-for="(n, index) in imageList" :data-index="index">
  <img @click="open($event)" :src="n.url">
</div>
```

```JavaScript
export default {
  data () {
    return {
      imageList: [
        { width: 900, height: 675, url: 'http://ocm0knkb1.bkt.clouddn.com/1-1.jpg' },
        { width: 601, height: 1024, url: 'http://ocm0knkb1.bkt.clouddn.com/1-2.jpg' },
        { width: 1024, height: 700, url: 'http://ocm0knkb1.bkt.clouddn.com/1-3.jpg' }
      ]
    }
  },
  methods: {
    open (e) {
      fancyBox(e.target, this.imageList);
    }
  }
}
```

# Options

fancyBox Parameter:

| Parameter | Description |
| ----- | ----- |
| e.target | The current clicked image. |
| this.imageList | A list of images. |

this.imageList Options:

| Option | Description | Type |
| ----- | ----- | ----- |
| width | The width of the image. | Number |
| height | The height of the image. | Number |
| url | The address of the image. | String |

# example

```Bash

$ cd example

$ npm install

$ npm run dev

```

# prompt

Need [postcss-salad] support


