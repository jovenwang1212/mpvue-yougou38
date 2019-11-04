<template>
  <div>
    <h2>请选择你掌握的技能：</h2>
    <div>
      <input type="checkbox"
             name=""
             id="reactcb"
             v-model="isReact">
      <label for="reactcb">React</label>
      <input type="checkbox"
             name=""
             id="vuecb"
             v-model="isVue">
      <label for="vuecb">Vue</label>
      <input type="checkbox"
             name=""
             id="jquerycb"
             v-model="isJquery">
      <label for="jquerycb">jQuery</label>
    </div>
    <hr>
    <input type="checkbox"
           name=""
           id="allcb"
           v-model="isAll">
    <label for="allcb">全选</label>
    <input type="text" v-model="message">
  </div>
</template>

<script>
export default {
  data () {
    return {
      isReact: false,
      isVue: false,
      isJquery: false,
      message: 'helloworld'
    }
  },
  computed: {
    // isAll(){
    //   return this.isReact&&this.isVue&&this.isJquery
    // }
    isAll: {
      get () {
        return this.isReact && this.isVue && this.isJquery
      },
      set (newValue) {
        // console.log(newValue)
        this.isReact = newValue
        this.isVue = newValue
        this.isJquery = newValue
      }
    }
  }
}
</script>

<style>
</style>