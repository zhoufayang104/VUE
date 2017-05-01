Vue.component("my-component",{
    template:"<div>I am a component!!!!</div>"
})

new Vue({
    el:"#example"
})

Vue.component("child",{
    props:["myMessage"],
    template:"<span>{{ myMessage }}</span>"
})

var Child ={
    props:["mymessage"],
    template:"<span>{{ mymessage }}</span>"
}
new Vue({
    el:"#example2",
    data:{
        parentMsg:"888"
    },
    components:{
        'my-child':Child
    }
});


Vue.component('button-counter',{
    props:['myCount'],
    template:"<button v-on:click='increment'>{{counter}}</button>",
    data:function(){
        return {
            oldCount:this.myCount,//需要使用props的数据
            counter:0
        };
    },
    methods: {
        increment:function(){
            this.counter+=this.oldCount;
            //子组件向父组件传参，通过$emit的第二个参数实现
            this.$emit("increment2",this.oldCount);
        }
    }
})


new Vue({
    el:"#counter-event-example",
    data:{
        total:0,
        num1:1,
        num2:2
    },
    methods:{
        //接受子组件传过来的参数
        incrementTotal:function(value){
            this.total+=value;
        }
    }
});

Vue.component('currencyInput',{
    template:'\
        <div>\
        <label>{{ label }}</label>\
        <input\
          ref="input"\
          v-bind:value="value"\
          v-on:input="updateValue($event.target.value)"\
          v-on:focus="selectedAll"\
          v-on:blur="formatValue"\
        />\
        </div>\
    ',
    props:{
        value:{
            type:Number,
            default:0
        },
        label:{
            type:String,
            default:""
        }
    },
    methods:{
        updateValue:function(value){

        },
        selectedAll:function(){

        },
        formatValue:function(){

        }
    }
});

new Vue({
    el:"exampleCurrencyinput",
    data:{
        price:0,
        shipping:0,
        handling:0,
        discount:0
    },
    computed: {
        total:function(){
            return ((this.price*100+
                this.shipping*100+
                this.handling*100-
                this.discount*100
            )/100).toFixed(2);
        }
    }
});

















