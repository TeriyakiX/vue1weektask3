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
        eventBus.$on('addColumn_1', card => {
            this.note_list1.push(card)
        })
        eventBus.$on('addColumn_2', card => {
            this.note_list2.push(card)
        })
        eventBus.$on('addColumn_3', card => {
            this.note_list3.push(card)
        })
        eventBus.$on('addColumn_4', card => {
            this.note_list4.push(card)

            if (card.date > card.deadline) {
                card.period = false
            }
        })

    },
    props: {
        FieldsField: {
            type: Object,
        },

    },


})


Vue.component('add-notes', {
    template: `
    <section>
    <a href="#openModal" class="btn btnModal">Создать карточку</a>
    <div id="openModal" class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Название</h3>
            <a href="#close" title="Close" class="close">×</a>
          </div>
          <div class="modal-body">    
        <div class="addForm">
            <form @submit.prevent="onSubmit">
                <div class="form__control">
                    <div class="form__name field">
                        <input id="point" required v-model="name" type="text" placeholder="Название">
                    </div>
                <div class="field">
                    <textarea required id="point" v-model="description" placeholder="Описание"> </textarea>
                </div>
                <div class="field">
                    <input required type="date" id="point" v-model="deadline">
                </div>
                <button type="submit" class="btn" @click="persist" >Добавить</button>
                </div>
            </form>
        </div>
              </div>
        </div>
      </div>
    </div>
    </section>
 `,

    data() {
        return {
            name: null,
            description: null,
            date: null,
            deadline: null


        }
    },
    methods: {
        onSubmit() {
            let card = {
                name: this.name,
                description: this.description,
                date: new Date().toLocaleDateString().split(".").reverse().join("-"),
                deadline: this.deadline,
                reason: [],
                transfer: false,
                edit: false,
                editDate: null,
                period: true
            }
            eventBus.$emit('addColumn_1', card)
            this.name = null
            this.description = null
            this.date = null
            this.deadline = null
            },
        persist() {
            localStorage.name = this.name;
            localStorage.description = this.description;
            localStorage.deadline = this.deadline;
        }

        },

    computed: {

    },

    props: {
        note_list1:{
            type: Array,
            required: false,

        },
    },
    mounted() {
        if(localStorage.name) this.name = localStorage.name;
        if(localStorage.description) this.description = localStorage.description;
        if(localStorage.deadline) this.deadline = localStorage.deadline;
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



