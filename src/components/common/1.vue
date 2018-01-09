<template>

  <div>

    <ul>
      <li v-for="item in list" :class="{active: item.isActive}" @click="action(item, list)" @mouseover="animation(true, item, list)" @mouseout="animation(false, item, list)"></li>
    </ul>
    <span>当前状态：{{status}}</span>
  </div>

</template>


<script>
  export default {
    data () {
      return {
        status: '',
        list: [
          {isActive: false, index: 1, },
          {isActive: false, index: 2, },
          {isActive: false, index: 3, },
          {isActive: false, index: 4, },
          {isActive: false, index: 5, },
        ],
        statusArr: [],

      }
    },
    mounted () {
      console.log("enter")
    },
    methods: {
      action (item, list) {
        console.log(item.index)
      },
      animation ( is, item, list ) {
        if ( is ) {

          list.forEach( (value, index) => {

            if ( value.isActive ) {

              this.statusArr.push(value)

            }
          } )

          item.isActive = true

        } else {

          if ( this.statusArr.length > 1  ) {

            item.isActive = false

          } else {

          }
        }
      }
    },
  }
</script>

<style>

* {
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
}

ul > li {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  float: left;
  margin: 0 10px;
  background-color: #000;
}

.active {
  background-color: yellow;
}
</style>
