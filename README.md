
# vue-fancybox

# Overview
Image preview component based on vue.js

# DEMO

# Install
```Bash
npm install vue-fancybox --save
```

```JavaScript
import fancyBox from 'vue-fancybox';
```

```JavaScript
{
  data () {
    return {
      imageList: [
        {width: 900,height: 675,url: 'http://ocm0knkb1.bkt.clouddn.com/1-1.jpg'},
        {width: 601,height: 1024,url: 'http://ocm0knkb1.bkt.clouddn.com/1-2.jpg'},
        {width: 1024,height: 700,url: 'http://ocm0knkb1.bkt.clouddn.com/1-3.jpg'}
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