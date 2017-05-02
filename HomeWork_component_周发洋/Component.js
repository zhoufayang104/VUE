Vue.component('vue-table',{
    template:"<table :class='className'><thead><tr>\
        <th style='width:20px'></th>\
        <th v-for='cell in cellconfig'>{{ cell.title}}</th>\
        </tr></thead><tbody><tr v-for='user in users'>\
        <td style='text-align:center;width=20px'><input type='checkbox'/></td>\
        <td v-for='cell in cellconfig'>{{user[cell.cellName]}}</td>\
    </tr></tbody></table>",
    props: {
        users:Array,
        cellconfig:Array,
        className:String
    },
    computed: {
        myusers:function(){
            return this.deepCopy(this.users); 
        }
    },
    methods:{
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

new Vue({
    el:"#mycomponent",
    data:{
        user:{name:"",age:18,sex:"男"},
        users:[],
        cellconfig:[
            {cellName:"name",title:"姓名",type:"text",editable:false},
            {cellName:"age",title:"年龄",type:"text",editable:false},
            {cellName:"sex",title:"性别",type:"text",editable:false}
        ]
    },
    methods: {
        AddUser:function(){
            this.users.push(this.deepCopy(this.user));
            this.user.name="";
            this.age=18;
            this.sex='男'
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