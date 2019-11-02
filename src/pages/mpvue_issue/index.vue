
<template>
  <div>
    <ul>
      <li v-for="item in 2" :key="item">
        <ul>
          <li v-for="(item2,index2) in 3" :key="item2">
            {{item2}}
          </li>
        </ul>
      </li>
    </ul>

    <!-- 解析html  -->
    <div v-html="alink"></div>
    <!-- 过滤器不能使用 -->
    <div>{{str|reverseStr}}</div>
    <!-- 计算属性 -->
    <div>{{computedStr}}</div>
    <!-- 不支持方法 -->
    <div>生成随机数:{{Math.random()}}</div>
    <!-- 不支持字符串模板语法 -->
    <!-- <div>{{`xjj有女友了`}}</div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      alink: '<a href="https://www.baidu.com">百度</a>',
      str: `是男人就一起玩贪玩蓝月`
    }
  },
  filters: {
    reverseStr (str) {
      return str
    }
  },
  computed: {
    computedStr () {
      return this.str.split('').reverse().join('')
    }
  }
}
</script>

<style>

</style>