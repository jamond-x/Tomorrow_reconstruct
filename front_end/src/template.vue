<template>
    <div id="test">
        <slot></slot>
        <ul>
            <li v-for='(one,two) in items' :key='two'></li>
        </ul>
    </div>
</template>

<script>
export default {
    name:'demo',
    data:function(){
        return{
            items:['one','two','three']
        }
    }
}
</script>

<style>
.test{
    width: 500px;
    height: 500px;
    background-color: yellow;
    color:white
}
</style>