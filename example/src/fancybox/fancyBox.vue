<style>
  .fancy-box-mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #333;
    z-index: 22;
  }
  .fancy-box-image-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 33;
  }
  .fancy-box-image-wrapper div {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transform-origin: left top 0px;
    transition: transform .3s cubic-bezier(0.4, 0, 0.22, 1);
  }
  .fancy-box-image-wrapper img {
    max-width: 100%;
    max-height: 100%;
  }
  .fancy-enter, .fancy-leave-active{
    opacity: 0;
  }
  .fancy-enter-active, .fancy-leave-active{
    transition: .2s;
  }
</style>

<template>
  <transition name="fancy">
    <div v-show="visible" class="fancy-box-mask">
      <div ref="fancyBoxWrapper" class="fancy-box-image-wrapper">
        <div v-for="(image, index) in prev" :style="{ webkitTransform: 'translate3d(-'+ (index+1)*image.scaleWidth +'px, 0, 0)' }">
          <div :style="{ webkitTransform: 'translate3d(0, '+ image.y +'px, 0)' }"><img :style="{ width: ''+ image.w +'px' }" :src="image.url"></div>
        </div>
        <div>
          <div :style="activeStyle"><img :style="activeImageStyle" :src="activeUrl"></div>
        </div>
        <div v-for="(image, index) in next" :style="{ webkitTransform: 'translate3d('+ (index+1)*image.scaleWidth +'px, 0, 0)' }">
          <div :style="{ webkitTransform: 'translate3d(0, '+ image.y +'px, 0)' }"><img :style="{ width: ''+ image.w +'px' }" :src="image.url"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

  import Vue from 'vue';

  import VueTouch from 'vue-touch';

  Vue.use(VueTouch);

  export default {
    name: 'fancy-box',
    data () {
      return {
        activeStyle: {},
        activeUrl: '',
        activeImageStyle: {},
        prev: [],
        next: [],
        thumbnails: [],
        tap: null,
        pan: null,
        isZoom: false
      }
    },
    props: {
      imageItems: {
        type: Array
      },
      visible: {
        type: Boolean
      }
    },
    methods : {
      onTapImage(...initialArgs) {
        
        let e = initialArgs[0], image = e.target, el = image.parentNode;

        let boundingClientRect = el.getBoundingClientRect();

        this.imageIndex = Number(el.dataset.index) || 0;

        this.createImage(image.src, boundingClientRect, image);
      },
      initDom () {

        let prev = this.imageItems.slice(0, this.imageIndex);
        let next = this.imageItems.slice(this.imageIndex + 1, this.imageItems.length);

        prev.forEach((n, i) => {
          n.y = this.getCenter(i).y;
          n.w = this.getCenter(i).w;
        });

        next.forEach((n, i) => {
          n.y = this.getCenter((this.imageIndex+1) + i).y;
          n.w = this.getCenter((this.imageIndex+1) + i).w;
        });

        this.prev = prev;
        this.next = next;

        this.listEl = this.$refs.fancyBoxWrapper.children;

        this.initEvent();
      },
      initEvent () {

        this.tap = new Hammer.Manager(this.$refs.fancyBoxWrapper);
        this.pan = new Hammer(this.$refs.fancyBoxWrapper);

        this.tap.add( new Hammer.Tap({ event: 'doubletap', taps: 2 }) );
        this.tap.add( new Hammer.Tap({ event: 'singletap' }) );

        this.tap.get('doubletap').recognizeWith('singletap');
        this.tap.get('singletap').requireFailure('doubletap');

        this.tap.on('singletap', (e) => {
          if (this.isZoom) return;
          this.onSingleTap(e);
        });
        this.tap.on('doubletap', (e) => {
          this.onDoubleTap(e);
        });

        this.pan.on('panstart', (e) => {
          if (this.isZoom) {
            // this.onImageStart(e);
          } else {
            this.onPanStart(e);
          }
        });
        this.pan.on('panmove', (e) => {
          if (this.isZoom) {
            // this.onImageMove(e);
          } else {
            this.onPanMove(e);
          }
        });
        this.pan.on('panend', (e) => {
          if (this.isZoom) {
            // this.onImageEnd(e);
          } else {
            this.onPanEnd(e);
          }
        });
      },
      onImageStart (...initialArgs) {
        let e = initialArgs[0];
        this.startX = e.pointers[0].pageX - (this.offsetX || 0);
        this.startY = e.pointers[0].pageY - (this.offsetY || this.getCenter().y);
      },
      onImageMove (...initialArgs) {
        let e = initialArgs[0];
        let scale = this.getCenter().scale;
        let y = this.getCenter().y;

        this.offsetX = e.pointers[0].pageX - this.startX;
        this.offsetY = e.pointers[0].pageY - this.startY;
        
        if (this.offsetX > this.maxTx) {
          this.offsetX = this.maxTx;
        } else if (this.offsetX < this.minTx) {
          this.offsetX = this.minTx;
        }

        if (this.offsetY > this.maxTy) {
          this.offsetY = this.maxTy;
        } else if (this.offsetY < this.minTy) {
          this.offsetY = this.minTy;
        }

        this.activeImageEl.style.webkitTransition = '0s';
        this.activeImageEl.style.webkitTransform = `translate3d(${this.offsetX}px, ${this.offsetY}px, 0px) scale3d(${scale}, ${scale}, 1)`;
      },
      onImageEnd (...initialArgs) {
        let e = initialArgs[0];
        this.activeImageEl.style.webkitTransition = '';
      },
      onDoubleTap (...initialArgs) {
        let e = initialArgs[0];

        if(this.imageItems[this.imageIndex].width < window.innerWidth) {
          return;
        }

        let center = e.center,
          x = center.x - this.getCenter().x,
          y = center.y - this.getCenter().y;

        this.activeImageEl = this.listEl[this.imageIndex].firstElementChild;

        this.maxTx = this.getCenter().maxTx(x, y);
        this.minTx = this.getCenter().minTx(x, y);
        this.maxTy = this.getCenter().maxTy(x, y);
        this.minTy = this.getCenter().minTy(x, y);

        if (this.isZoom) {
          this.activeImageEl.style.webkitTransform = `translate3d(${this.getCenter().x}px, ${this.getCenter().y}px, 0px)`;
          setTimeout(() => {  
            this.activeImageEl.style.webkitTransformOrigin = `left top 0px`;
          }, 500);
          this.isZoom = false;
        } else {
          this.activeImageEl.style.webkitTransform = `translate3d(${this.getCenter().x}px, ${this.getCenter().y}px, 0px) scale3d(${this.getCenter().scale}, ${this.getCenter().scale}, 1)`;
          this.activeImageEl.style.webkitTransformOrigin = `${x}px ${y}px 0px`;
          this.isZoom = true;
        }
      },
      onSingleTap (...initialArgs) {
        let e = initialArgs[0];
        this.destroy(this.imageIndex);
      },
      onPanStart (...initialArgs) {
        let e = initialArgs[0];
        this.startTime = e.timeStamp;
        this.startX = e.pointers[0].pageX;
        this.offsetX = 0;
      },
      onPanMove (...initialArgs) {

        let e = initialArgs[0];
        let i = this.imageIndex - 1;
        let end = i + 3;

        this.offsetX = e.pointers[0].pageX - this.startX;

        for(; i < end; i++) {

          let index = i - this.imageIndex;
          let el = this.listEl[i];

          el && (el.style.webkitTransition = '0s ease-out');
          el && (el.style.webkitTransform = `translate3d(${ index * this.scaleWidth + this.offsetX }px, 0px, 0)`);
          el && (el.firstElementChild.style.webkitTransform = `translate3d( ${this.getCenter(i).x}px, ${this.getCenter(i).y}px, 0)`);
        };
      },
      onPanEnd (...initialArgs) {
        let e = initialArgs[0];
        let boundary = this.scaleWidth / 6;
        let endTime = e.timeStamp;
        let offsetX = this.offsetX;

        if(endTime - this.startTime > 300) {
          if(offsetX >= boundary){
            this.goPage('-1');
          } else if(offsetX < 0 && offsetX < -boundary) {
            this.goPage('+1');
          } else {
            this.goPage('0');
          };
        } else {
          if(offsetX > 50){
            this.goPage('-1');
          } else if(offsetX < -50) {
            this.goPage('+1');
          } else {
            this.goPage('0');
          };
        }
      },
      goPage (n) {
        let length = this.imageItems.length;
        let cid = 0;
        let lis = this.listEl;

        if (typeof n == 'number') {
          cid = this.imageIndex;
        } else if (typeof n == 'string') {
          cid = this.imageIndex + n*1;
        };

        if (cid > length - 1) {
          cid = length - 1;
        } else if (cid < 0){
          cid = 0;
        };

        this.imageIndex = cid;

        lis[cid].style.webkitTransition = '0.2s ease-out';
        lis[cid - 1] && (lis[cid - 1].style.webkitTransition = '0.2s ease-out');
        lis[cid + 1] && (lis[cid + 1].style.webkitTransition = '0.2s ease-out');

        lis[cid].style.webkitTransform = `translate3d(0, 0, 0)`;
        lis[cid].firstElementChild.style.webkitTransform = `translate3d(${this.getCenter(cid).x}, ${this.getCenter(cid).y}px, 0)`;

        lis[cid - 1] && (lis[cid - 1].style.webkitTransform = `translate3d(-${this.scaleWidth}px, 0px, 0)`);
        lis[cid - 1] && (lis[cid - 1].firstElementChild.style.webkitTransform = `translate3d(${this.getCenter(cid - 1).x}px, ${this.getCenter(cid - 1).y}px, 0)`);

        lis[cid + 1] && (lis[cid + 1].style.webkitTransform = `translate3d(${this.scaleWidth}px, 0px, 0)`);
        lis[cid + 1] && (lis[cid + 1].firstElementChild.style.webkitTransform = `translate3d(${this.getCenter(cid + 1).x}px, ${this.getCenter(cid + 1).y}px, 0)`);
      },
      destroy (n) {

        if (! this.listEl) return;

        let image = this.listEl[n].firstElementChild;
        let original = this.thumbnails[n];
        let location = original.getBoundingClientRect();
        let zoom = this.getZoomTransform(original.firstElementChild);

        this.tap.off('singletap');
        this.tap.off('doubletap');

        this.pan.off('panstart');
        this.pan.off('panmove');
        this.pan.off('panend');

        image.style.webkitTransform = `translate3d(${location.left}px, ${location.top}px, 0px) scale(${zoom})`;
        
        setTimeout(() => {

          this.visible = false;

          setTimeout(() => {
            this.$refs.fancyBoxWrapper && (document.body.removeChild(this.$refs.fancyBoxWrapper.parentNode));
            this.$destroy();
          }, 200);
        }, 300);
      },
      getElWidth (el) {
        return el.getBoundingClientRect().width;
      },
      getZoomTransform (el) {
        return (this.getElWidth(el) / this.imageItems[this.imageIndex].width) / this.imageItems[this.imageIndex].fitRatio;
      },
      getCenter (index) {
        let imageObj = (typeof index == 'undefined') ? this.imageItems[this.imageIndex] : this.imageItems[index];
        return {
          x: Math.round((window.innerWidth - (imageObj.width * imageObj.fitRatio)) / 2),
          y: Math.round((window.innerHeight - (imageObj.height * imageObj.fitRatio)) / 2),
          w: Math.round(imageObj.width * imageObj.fitRatio),
          scale: imageObj.width / window.innerWidth,
          widthFix: imageObj.width - window.innerWidth,
          maxTx (x, y) {
            return this.widthFix * (x / window.innerWidth);
          },
          minTx (x, y) {
            return 0 - this.widthFix * ((window.innerWidth - x) / window.innerWidth);
          },
          maxTy (x, y) {
            let height = window.innerHeight - (this.y * 2);
            let heightFix = imageObj.height - height;
            return heightFix * (y / height);
          },
          minTy (x, y) {
            let height = window.innerHeight - (this.y * 2);
            let imgAreaY = (window.innerHeight - height) / 2;
            let heightFix = imageObj.height - height;
            y = (y + this.y) - imgAreaY;
            return 0 - (heightFix * ((height - y) / height ) - (height + this.y));
          }
        }
      }
    },
    created () {
      this.scaleWidth = window.innerWidth;
    },
    mounted () {}
  }
</script>