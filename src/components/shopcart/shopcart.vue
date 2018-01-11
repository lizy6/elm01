<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryprice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
    <div class="ball-container">
      <div v-for="ball in balls">
        <transition name="drop"
                    v-on:before-enter="beforeEnter"
                    v-on:enter="enterDrop"
                    v-on:after-enter="afterEnter">
          <div v-show="ball.show" class="ball">
            <div class="inner inner-hook"></div>
          </div>
        </transition>

      </div>


    </div>
    <div class="shopcart-list" v-show="listShow">
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty">清空</span>
      </div>
      <div class="list-content">
        <ul>
          <li class="food" v-for="food in selectFoods">
            <span class="name">{{food.name}}</span>
            <div class="price">
              <span>{{food.price*food.count}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <cartcontrol :food="food"></cartcontrol>
            </div>
          </li>
        </ul>
        <span>{{}}</span>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import cartcontrol from '../../components/cartcontrol/cartcontrol.vue'
  export default {
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [
            /*{
              price: 5,
              count: 4
            }*/
          ];
        }
      },
      deliveryprice: {
        type: Number,
        default: 0
      },
      minprice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold:true
      }
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minprice}元起送`;
        }
        else if (this.totalPrice < this.minprice) {
          let diff = this.minprice - this.totalPrice;
          return `还差￥${diff}元起送`;
        }
        else {
          return '去结算';
        }
      },
      payClass() {
        if (this.totalPrice < this.minprice) {
          return 'no-enough';
        }
        else {
          return 'enough'
        }
      }
    },
    methods: {
      drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeEnter(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.wibkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.wibkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
            console.log('------>1');
          }
        }
      },
      enterDrop(el) {
        /*eslint-disable no-unused-vars*/
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.wibkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.wibkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
        });
        console.log('------>2');
      },
      afterEnter: function (el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
        console.log('------>3');
      }
    },
    components:{
      cartcontrol
    }
    /*transitions: {
      drop: {
        beforeEnter(el) {
          let count = this.balls.length;
          while (count--) {
            let ball = this.balls[count];
            if (ball.show) {
              let rect = ball.el.getBoundingClientRect();
              let x = rect.left - 32;
              let y = -(window.innerHeight - rect.top - 22);
              el.style.display = '';
              el.style.wibkitTransform = `translate3d(0,${y},0)`;
              el.style.transform = `translate3d(0,${y},0)`;
              let inner = el.getElementsByClassName('inner-hook')[0];
              inner.style.wibkitTransform = `translate3d(${x},0,0)`;
              inner.style.transform = `translate3d(${x},0,0)`;
            }
          }
        },
        enterDrop(el,done) {
          /!*eslint-disable no-unused-vars*!/
          let rf = el.offsetHeight;
          this.$nextTick(() => {
            el.style.wibkitTransform = 'translate3d(0,0,0)';
            el.style.transform = 'translate3d(0,0,0)';
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.wibkitTransform = 'translate3d(0,0,0)';
            inner.style.transform = 'translate3d(0,0,0)';
          })
          done()
        },
        afterEnter(el) {
          let ball = this.dropBalls.shift();
          if (ball) {
            ball.show = false;
            el.style.display = 'none';
          }
        }
      }
    }*/

  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    height: 48px
    width: 100%
    .content
      display: flex
      background: #141d27
      font-size: 0
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            background: #2b343c
            text-align: center
            &.highlight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              font-size: 24px
              line-height: 44px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            background: rgb(240, 20, 20)
            font-size: 9px
            font-weight: 700
            color: #fff
            box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          color: rgba(255, 255, 255, 0.4)
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          line-height: 24px
          margin: 12px 0 0 12px
          font-size: 10px
          color: rgba(255, 255, 255, 0.4)
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          text-align: center
          line-height: 48px
          font-size: 12px
          font-weight: 700
          background: #2b333b
          color: rgba(255, 255, 255, 0.4)
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear
</style>
