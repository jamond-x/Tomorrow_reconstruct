
Vue.directive("to_focus",{
    inserted:function(el){
        el.focus()
    }
})


let vm = new Vue(
    {
        el:'#app',
        data:{
            cards:[{name:'今日',id:'1',pieces:['学Axios','ES6模板']},{name:'明日',id:'2',pieces:['学Axios','ES6模板']},{name:'后日',id:'3',pieces:['学Axios','ES6模板']}],
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
                
                let map = this.cards_record_map;

                for(let i = 1;id_ == undefined; i++){
                    if(!map.has(`${i}`)){
                        id_ = i
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
           
            temp:function(event){
            },
            deleting:function(param){
                let index = this.cards_record_map.get(param);   // 需要删除的对象在cards数组中的索引
                this.cards.splice(index,1)
            }
        },
        computed:{
            cards_record_map:function(){
                let map =new Map();
                (this.cards).forEach((el,index) => {
                    map.set(el.id,index)
                });
                return map
            }
        },
        components:{
            'cards':{
                data:function(){
                    return {
                        show:true
                    }
                },
                template:
                        `
                        <div class='cards'>
                            <div class='cards_head' @click="doit($event)">
                                <div class="head_name"   v-if='this.show'>{{head_name.name}}</div>
                                <input class='head_change' v-model="head_name.name" v-else v-to_focus>
                                <div class="head_close" @click='delete_cards($event,head_name.id)'>&#10006</div>
                            </div>
                            <hr style="width:96%;margin:0 auto">
                            <div class="cards_body"></div>
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