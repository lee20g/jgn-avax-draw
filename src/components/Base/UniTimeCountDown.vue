<template>
  <span class="jj-count-down">
    <!-- 倒计时结束的默认文本 -->
    <span v-if="cfg_0_text && total_seconds===0">
      {{cfg_0_text}}
    </span>

    <!-- 总秒倒计时 -->
    <span v-else-if="cfg_format_mode === 'second'">
      {{total_seconds}}
    </span>

    <!-- 普通格式化倒计时 -->
    <span v-else class="format-time" >
      <span
        :class="['with-dot']"
        v-show="format.day"
        >
        <b>{{format.day}}</b>
      </span>
      <span
        :class="['with-dot']"
        v-show="format.h"
        >
        <b>{{format.h}}</b>
      </span>
      <span
        :class="['with-dot']"
        v-show="format.m"
        >
        <b>{{format.m}}</b>
      </span>
      <span>
        <b>{{format.s}}</b>
      </span>
    </span>

  </span>
</template>

<script>
export default {
  // 说明：
  // cfg_second 传入，则采用秒数倒计时，如传入 60，则倒计时60s
  // cfg_stamp 传入，则采用时间戳倒计时(这个时间戳是未来时间)
  // cfg_max_unit: day,h,m,s 倒计时最高单位，比如传入 h，可显示 : 100:59
  // cfg_mode 传入 ‘second’ 则采用总秒数倒计时
  // cfg_0_text 是指倒计时到 0 时的显示文本
  // cfg_show_0 传入true，则为0的时间也会显示，如 00:59:59, 因为默认为0的时间是不显示
  name: 'countDown',
  props: [
    'cfg_second',
    'cfg_stamp',
    'cfg_max_unit',
    'cfg_format_mode',
    'cfg_0_text',
    'cfg_show_0',
    'custom_style'
  ],
  data(){
    return{
      total_seconds: 0,
      mark_interval: null,
      // mark_count_num 倒计时计数，每120s，用来校准
      mark_count_num: 0,
      format: {
        day: null,
        h: null,
        m: null,
        s: null,
      },
    }
  },
  watch: {
    cfg_stamp(){
      this.init()
    },
    cfg_second(){
      this.init()
    },
  },
  methods:{
    calcTotalSeconds(){
      if(this.cfg_second){
        this.total_seconds = parseInt(this.cfg_second)
      }
      if(this.cfg_stamp){
        // this.total_seconds = parseInt((this.cfg_stamp - (new Date()).valueOf())/1000)
        this.total_seconds = parseInt((this.cfg_stamp - (new Date()).valueOf())/1000)
      }
      this.setFormat()
    },
    // 按秒的倒计时
    run(){
      let v = this
      v.mark_interval = setInterval(function(){
        // console.log((new Date()).valueOf() + ' ' + v.total_seconds)
        if(v.total_seconds === 0){
          v.emitDone()
          // console.log((new Date()).valueOf() + ' uniCountDownTo:0')
          clearInterval(v.mark_interval)
        }else{
          // 总数的计算，
          v.total_seconds -= 1
          v.mark_count_num += 1
          // 校准：如传入时间戳，做个校准
          // 因为长时间倒计时后，时间会不准
          if(v.cfg_stamp && v.mark_count_num === 60){
            v.init()
            return
          }
        }
        // 格式化展示的计算
        v.setFormat()
      },1000)
    },
    setFormat(){
      let v = this
      let seconds = v.total_seconds
      if(seconds < 0){
        seconds = 0
      }
      let max_unit = v.cfg_max_unit || 'day'
      let hide0 = !v.cfg_show_0
      let day = null
      if('h|m|s'.indexOf(max_unit) === -1){
        day = parseInt( seconds/(60*60*24) ) + ''
        seconds -= parseInt(day)*(60*60*24)
        if(parseInt(day||0) === 0 && hide0){
          day = null
        }
      }
      let h = null
      if('m|s'.indexOf(max_unit) === -1){
        h = v.numPadStart( parseInt( seconds/(60*60) ) )
        seconds -= parseInt(h)*(60*60)
        if(parseInt(day||0) === 0 && parseInt(h||0) === 0 && hide0){
          h = null
        }
      }
      let m = null
      if('s'.indexOf(max_unit) === -1){
        m = v.numPadStart( parseInt( seconds/(60) ) )
        seconds -= parseInt(m)*(60)
        if( parseInt(day||0) === 0 && parseInt(h||0) === 0 && parseInt(m||0) === 0 && hide0){
          m = null
        }
      }
      let s = v.numPadStart( seconds%60 )
      seconds -= parseInt(s)
      // 校验并返回
      v.format.day = day
      v.format.h = h
      v.format.m = m
      v.format.s = s
      // 添加和处理样式
      if(v.custom_style) {
        for (const key in v.format) {
          if(v.format[key]){
            var num_arr = v.format[key].toString().split("")
            v.format[key] = num_arr
          }
        }
      }
    },
    emitDone(){
      this.$emit('done')
    },
    // tools
    numPadStart(num){
      let temp = num
      if(num <= 9 && num >=0){
        temp = (''+num).padStart(2,'0')
      }
      return temp
    },
    // 
    init(){
      let v = this
      
      // 重置倒计时计数
      v.mark_count_num = 0
      if(this.mark_interval){
        clearInterval(this.mark_interval)
      }
      // 初始化数字
      this.calcTotalSeconds()
      if(this.total_seconds <= 0){
        setTimeout(function(){
          v.emitDone()
        },1000)
      }else{
        // 循环计数
        this.run()
      }
    },
  },
  created(){
    this.init()
  },
  beforeDestroy(){
    if(this.mark_interval){
      clearInterval(this.mark_interval)
    }
  },
}
</script>

<style lang="scss" scoped>
.format-time{
  b{
    font-weight: normal;
  }
  .with-dot{
    &::after{
      content: ':'
    }
  }
}
</style>