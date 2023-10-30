<template>


</template>

<script lang="ts">
//imports
 import {defineComponent , ref} from "vue"

export default defineComponent({
props:{
    name:String,
    msg:{
        type:String,
        required:true
    },
    initialCount:Number,
},
data(){
    
},
mounted(){

}
});


</script>