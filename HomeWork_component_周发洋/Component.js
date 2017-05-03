Vue.component('vue-table',{
    template:"<table :class='className'><thead><tr>\
        <th style='width:20px'></th>\
        <th v-for='cell in cellconfig'>{{ cell.title}}</th>\
        <th style='width:60px'>操作</th>\
        </tr></thead>\
        <tbody><tr v-for='(user,index) in users' :class='{trSelected:user.completed}'>\
        <td style='text-align:center;width=20px'>\
        <input type='checkbox' :disabled='user.editable' :key='index' v-model='user.completed' @click='doCheckBoxClick(index)'/></td>\
        <td v-for='cell in cellconfig'  @click='doTdClick(index)'>\
            <input v-if='user.editable && cell.type==text ' type='text' v-model='user[cell.cellName]'/>\
            <select v-else-if='user.editable && cell.type==select ' v-model='user[cell.cellName]'>\
                <option v-for='option in cell.options' :value='option'>{{option}}</option>\
            </select>\
            <label v-else>{{user[cell.cellName]}}</label>\
        </td>\
        <td style='text-align:center;width:60px'><button @click='doEdit(index)'>{{user.editable | editShow}}</button></td>\
        </tr></tbody></table>",
    props: {
        users:Array,
        cellconfig:Array,
        className:String,
        value:Boolean
    },
    data:function(){
        return {text:"text",select:"select"}
    },
    methods:{
        doEdit:function(index){
            this.users[index].editable=!this.users[index].editable;
            this.users[index].completed=false;
        },
        doTdClick:function(index){
            if(!this.users[index].editable){
                this.users[index].completed=!this.users[index].completed;
            }
            this.$emit('get-selectedcount',index);
        },
        doCheckBoxClick:function(index){
            this.$emit('get-selectedcount',index);
        }
    },
    filters:{
        editShow:function(value){
            return value? "Save":"Edit";
        }
    }
})

new Vue({
    el:"#mycomponent",
    data:{
        user:{name:"",age:18,sex:"男",completed:false,editable:false},
        users:[],
        cellconfig:[
            {cellName:"name",title:"姓名",type:"text"},
            {cellName:"age",title:"年龄",type:"text"},
            {cellName:"sex",title:"性别",type:"select",options:['男','女']}
        ],
        selectedTotal:0
    },
    computed:{
        total:function(){
            return this.users.length;
        },
        maleTotal:function(){
            return _.filter(this.users,function(user){
                return user.sex=='男'
            }).length;
        },
        femaleTotal:function(){
            return _.filter(this.users,function(user){
                return user.sex=='女'
            }).length;
        }
    },
    methods: {
        AddUser:function(){
            this.users.push(this.deepCopy(this.user));
            this.user.name="";
            this.age=18;
            this.sex='男'
        },
        DelUser:function(){
            var arr=[];
            for(var i=0;i<this.users.length;i++){
                if(this.users[i].completed==false){
                    arr.push(this.users[i]);
                }
            }
            this.users=arr;
        },
        getSelectedCount:function(i){
            if(this.users[i].completed){
                this.selectedTotal+=1;
            }else{
                this.selectedTotal-=1;
            }
        },
        deepCopy:function(o){
            if (o instanceof Array) {
                var n = [];
                for (var i = 0; i < o.length; ++i) {
                    n[i] = this.deepCopy(o[i]);
                }
                return n;

            } else if (o instanceof Object) {
                var n = {}
                for (var i in o) {
                    n[i] = this.deepCopy(o[i]);
                }
                return n;
            } else {
                return o;
            }
        }
    }
})