
Vue.component('sign-in',{
    template:'#sign-in',
    data:function(){
        return{
            email_p:'',
            password_p:''
        }
    },
    methods:{
        submit:function(){
            this.$emit('submitting')
        }
    }
})

Vue.component('myinput',{
    template:'#myinput',
    data:function(){
        return {
            email:'',
            password:''
        }
    },
    watch:{
        email:function(newVal){
            this.$emit('reception_email',this.email)
        },
        password:function(newVal){
            this.$emit('reception_password',this.password)
        }
    }
})

let vm = new Vue(
    {
        el:'#app',
        data:{
            name:'Gainni Hueng',
            email:'',
            password:''
        },
        methods:{
            handle_email:function(val){
                this.email = val;
            },
            handle_password:function(val){
                this.password = val
            },
            submitting:function(){
                this.post()
            },
            post:function(){
                axios.get('/server/data_/myJson.json')
                .then(
                    res => {
                        this.handle_res(res)
                    }
                )
                .catch(
                    err => {
                        console.log(err);
                        this.handle_res(err)
                    }
                )
            },
            handle_res:function(data_){
                if(data_.status === 200){
                    if(data_.data.code === '0'){
                        alert('登陆成功');
                        // 路径跳转
                        window.location.href = '/front_end/todo_vue.html'
                    }else if(data_.data.code === '1'){   
                        console.log("密码错误");
                    }else if(data_.data.code === '2'){
                        // do something
                    }else{
                        alert('worng')
                    }
                }else{  //  具体加 else if ( status == 404)  等
                    console.log('服务器相应失败');
                }
                console.log(data_);
            }
        }
    }
)


// TODO: 拦截器！