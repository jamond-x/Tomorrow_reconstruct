//  [{name:'今日',pieces:['学JavaScript','Axios应用','ES6模板']},{name:'明日',pieces:['学JavaScript','Axios应用','ES6模板']}]

Vue.directive("to_focus",{
    inserted:function(el){
        el.focus()
    }
})

let vm = new Vue(
    {
        el:'#app',
        data:{
            cards:[{name:'今日',id:1,pieces:['学Axios','ES6模板']},{name:'明日',id:2,pieces:['学Axios','ES6模板']},{name:'后日',id:3,pieces:['学Axios','ES6模板']}],
            addCardsObj:{
                addCards:true,
                hide:false
            },
            hideInput:false,
            inputValue:''
        },
        methods:{
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
                this.cards.push({name:temp,pieces:[]});
                this.inputValue = '';
                this.hideInput = false
            },
            // changeHeadName:function(val){
            //     alert(val+'来自父组件！')
            // },
            temp:function(){
                console.log(this.cards);
            }
        },
        computed:{

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
                            <div class='cards_head'>
                                <div class="head_name" @click="doit()" v-if='this.show'>{{head_name.name}}</div>
                                <input class='head_change' v-model="head_name.name" v-else to_focus>
                                <div class="head_close">&#10006</div>
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
                methods:{// doit(head_name.name)
                    doit:function(){
                        if(this.show){
                            this.show = false
                        }else{
                            this.show = true
                        }
                        //this.$emit('head-click',val);
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
    alert(event.keyCode)
}


window.onclick = (event) => {
    if(vm.hideInput === true && event.target.className != ('submit'||'add'||'input')){
        alert('working!')
    }
    alert(event.target.className)
}