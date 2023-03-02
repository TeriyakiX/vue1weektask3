let eventBus = new Vue()

Vue.component('notes', {
    template: `
   <div>
       <div class="_notes">
            <add-notes/>
         <p class="error" v-for="error in errors">{{ error }}</p>
       </div>
       
       <div class="column_notes">
       
        <div class="note_list_1_column">
        <h2>Запланированные задачи</h2>
             <note-list1  :note_list1="note_list1"></note-list1> 
        </div>
        
        <div class="note_list_2_column">
        <h2>Задачи в работе</h2>
             <note-list2  :note_list2="note_list2"></note-list2> 
        </div>
        <div class="note_list_3_column">
        <h2>Тестирование</h2>
             <note-list3  :note_list3="note_list3"></note-list3> 
        </div>
        <div class="note_list_4_column">
        <h2>Выполненные задачи</h2>
             <note-list4  :note_list4="note_list4"></note-list4> 
        </div>
        
        </div>
        
  </div>
 `,

    data() {
        return {
            note_list1: [],
            note_list2: [],
            note_list3: [],
            note_list4: [],
            errors: [],
        }
    },
    methods: {
    },

    computed: {},

    mounted() {


    },
    props: {
        FieldsField: {
            type: Object,
        },

    },


})


Vue.component('add-notes', {
    template: `

       <form  @submit.prevent="onSubmit">
                        <h1>Заметочки</h1>
            <div class="note_name">
            <input type="text" v-model="name" placeholder="Введите имя заметки">
                  
            </div>
            <div class="note_1">
                
                        <input type="text"  v-model="field1"   placeholder="Введите 1 строку" >
    
                        <input type="text"   v-model="field2"  placeholder="Введите 2 строку">
    
                        <input type="text"   v-model="field3"  placeholder="Введите 3 строку">
                        <br>
                        
                        <input type="text"  v-model="field4"   placeholder="Введите 4 строку" v-show ="note4">
                        <br>
                        
                        <input type="text"  v-model="field5"   placeholder="Введите 5 строку" v-show="note5">
    
                                            
            </div>
            <div class="plus_minus_p">
            <p>Добавить или убавить поле для заметки</p>
            </div>
                <div class="minus_plus">
                     
                       <p class="plus">
                            <button type='button' @click="addField"> + </button>
                       </p>
                       
                       <p class="minus">
                            <button type='button' @click="removeField"> - </button>
                       </p>
                </div>
                
                <div>                    
                    <p class="sub">
                            <input type="submit" value="Отправить"> 
                    </p> 
                </div>
          </form>
 `,

    data() {
        return {
            note4: false,
            note5: false,
            name: "",
            field1: "",
            field2: "",
            field3: "",
            field4: "",
            field5: "",


        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.field1 && this.field2 && this.field3 && (!this.note4 || this.field4) && (!this.note5 || this.field5)) {
                let FieldsField = {
                    name: this.name,
                    data: null,
                    status: 0,
                    errors: [],
                }
                eventBus.$emit('fields1-submitted', FieldsField)
                this.name = null
            }
        },
    },

    computed: {},

    props: {
        note_list1:{
            type: Array,
            required: false,

        },
    }
})

Vue.component('note-list1', {
    template: `
<div class="note_list1__">

</div>
 `,

    data() {
        return {}
    },
    methods: {

    },
    computed: {},

    props: {
        note_list1: {
            type: Array,
        },
        note_list2: {
            type: Array,
        },
        FieldsField: {
            type: Object,
        },
        errors: {
            type: Array,
        },
    },

})

Vue.component('note-list2', {
    template: `
<div  class="note_list2__">

 </div> 
 `,

    data() {
        return {}
    },
    methods: {

    },

    computed: {},

    props: {
        note_list2: {
            type: Array,
        },
        FieldsField: {
            type: Array,
        }
    }
})
Vue.component('note-list3', {
    template: `
<div>
            
</div>

 `,

    data() {
        return {}
    },
    methods: {},

    computed: {},

    props: {
        note_list3: {
            type: Array,
        },
    }
})
Vue.component('note-list4', {
    template: `
<div>
            
</div>

 `,

    data() {
        return {}
    },
    methods: {},

    computed: {},

    props: {
        note_list3: {
            type: Array,
        },
    }
})


new Vue({
    el: '#app',
    data: {},
})



