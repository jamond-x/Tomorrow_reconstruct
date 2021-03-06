//import Vue from 'vue'
//import demo from './template.vue'


Vue.directive("to_focus",{         // 自定义组件
    inserted:function(el){
        el.focus()
    }
})


Vue.component('pieces',{
    data:function(){
        return{
            p_input:false,
            isUnderline:false
        }
    },
    template:`<div class="pieces">
        <div class="p_left" v-bind:class="{'underline':isUnderline}"  @click='pieces_done(content.id_)'>{{content.val}}</div>
        <div class="p_right">
            <i class="icon-gengduo-tianchong"></i>
        </div>
    </div>`,
    props:['content'],
    methods:{
        pieces_done:function(id){
            //alert(id);   //  调整pieces的位置   操作数组！
            this.isUnderline = !this.isUnderline
        }
    }  
}
)

let temp_obj = {one:'from temp'}

const Feature = Vue.component('demo',{
    data:function(){
        return{
            obj:{one:'first',two:'second'},
            arr:[111,222,333],
            val:'11'
        }
    },
    template:`<div id="test">
    <slot></slot>
    <button @click='change'>{{obj.one}}</button>
  </div>`,
    methods:{
        change:function(){
            this.obj.one = '46545'
        },
        again:function(){
            this.obj.one = '哈哈哈哈'
        }
    },
    watch:{
        listen:{
            deep:true,
            handler:function(newval,oldval){
                console.log('新值:'+newval.one+'旧值:'+oldval.one)
            }
        }
    },
    computed:{
        listen:function(){
            return this.obj
        }
    }
});



let vm = new Vue(
    {
        el:'#app',
        data:{
            cards:[{name:'今日',id:'1',pieces:[{id_:1,val:'Vue 过渡&动画'},{id_:2,val:'Webpack'}]},{name:'明日',id:'2',pieces:[{id_:1,val:'复习线代'},{id_:2,val:'数学作业'}]},{name:'后日',id:'3',pieces:[{id_:1,val:'quasar'},{id_:2,val:'vuetify'}]}],
            addCardsObj:{
                addCards:true,
                hide:false
            },
            hideInput:false,
            inputValue:''
        },
        methods:{
            card_id:function(){
                let id_;
                
                let map = this.cards_record_map();

                for(let i = 1;id_ == undefined; i++){
                    if(!map.has(`${i}`)){
                        id_ = i
                        console.log("返回新的id为： "+i);
                    }
                }
               return id_
            },
            addCards:function(){
                if(this.hideInput){
                    this.hideInput = false
                }else{
                    this.hideInput = true
                }
            },
            adding:function(){
                let temp = this.inputValue;
                if(temp === ''){
                    alert('请输入列表名称！');
                    return
                }
                this.cards.push({name:temp,id:this.card_id(),pieces:[]});
                this.inputValue = '';
                this.hideInput = false
            },
           
            temp:function(){
                alert('add_task working')
            },
            deleting:function(param){
                let index = this.cards_record_map().get(param);   // 需要删除的对象在cards数组中的索引
                this.cards.splice(index,1);
                this.cards_record_map().delete(param)    // 删除 map中相应值
            },
            cards_record_map:function(){
                let map =new Map();
                (this.cards).forEach((el,index) => {
                    map.set(el.id,index)
                });
                return map
            }
        },
        computed:{
            
        },
        components:{
            'cards':{
                data:function(){
                    return {
                        show:true,
                        mycards:this.head_name,
                    }
                },
                template:
                        `
                        <div class='cards'>
                            <div class='cards_head' @click="doit($event)">
                                <div class="head_name"   v-if='this.show'>{{mycards.name}}</div>
                                <input class='head_change' v-model="mycards.name" v-else v-to_focus>
                                <div class="head_close" @click='delete_cards($event,mycards.id)'>&#10006</div>
                            </div>
                            <hr style="width:96%;margin:0 auto">
                            <div class="cards_body">
                                <slot name='pieces'></slot>   
                                <slot name='add'></slot>
                            </div>
                        </div>
                        `,
                props:{
                    head_name:{
                        type:Object,
                        default:'任务卡片（点击修改）'
                    }
                },
                methods:{
                    doit:function(event){
                        if(this.show){
                            this.show = false
                        }else if(!this.show && event.target.className != 'head_change'){
                            this.show = true
                        }
                    },
                    delete_cards:function(event,id_){
                        event.stopPropagation();            // 阻止冒泡 阻止打开卡片编辑框
                        this.$emit('deleting_cards',id_)
                    }
                },
                watch:{
                    show:function(newV,oldV){
                        console.log(newV);
                        console.log(oldV);
                    }
                },
                computed:{
                    forwatch:function(){
                        console.log(this.mycards);
                        return this.mycards
                    }
                }
            }
        }
    }
)

window.onkeypress = (event) => {
    if(event.keyCode === 13){
        if(vm.hideInput === true){
            vm.adding()
        }else{
            alert('working?')
            vm.hideInput = true
        }
    }
}

window.onclick = (event) => {
    if(vm.hideInput === true && event.target.className != 'input addCards'&& event.target.className != 'add'){
       vm.hideInput = false
    }
}


// TODO:  Duplicate keys detected: '3'. This may cause an update error.

// MAP 数据有问题！！

// TODO:删除、添加卡片，删除、添加任务条的数据处理

// TODO:子组件通信 子 父 子

// TODO:<transition></transition>   不能写在组件注册 template 中？？

// TODO: watch  对象！  通过计算属性监听引用值问题！！