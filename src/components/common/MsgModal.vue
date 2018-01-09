<template>
  <div>
    {{arr}}
  </div>
</template>

<script>
  export default {
    data () {
      return {
        arr: [1, 2, 3, 4, 5, 6, 1, 3, 4,],
        newArr: [],
      }
    },
    mounted () {
      var json = {}

      for ( var i = 0; i < this.arr.length; i++ ) {


        json[this.arr[i]] = this.arr[i]


      }

      console.log("Array:", Array.from(json))

      for ( var key in json ) {
        this.newArr.push(json[key])
      }
      console.log("newArr:", this.newArr)
    },
  }
</script>
