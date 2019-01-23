<template>
    <div class="chat container">
        <!--using the passed property name 
        <h2>Chat {{ this.name }} </h2>-->
        <h2 class="center teal-text">Stealth Chat</h2>
        <div class="card">
            <div class="card-content align-right">
                <ul class="messages" v-chat-scroll>
                    <li v-for="message in messages" :key="message.id">
                        <span class="teal-text">{{ message.name }}</span>
                        <span class="grey-text text-darken-3">{{ message.content }}</span>
                        <span class="grey-text time">{{ message.timestamp }}</span>
                    </li>
                </ul>
            </div>
            <div class="card-action">
                <NewMessage :name="name"/>
            </div>


        </div>
    </div>
</template>

<script>
import NewMessage from '@/components/NewMessage';
import db from '@/firebase/firebase_init';
import moment from 'moment';

    export default{
        name: 'Chat',
        props: ['name'],//this view will accept name as property and this property will not be shown in the url
        //registering the NewMessage component so we can use it in this view
        components: {
            NewMessage
        },
        data(){
            return{
                messages: []
            }
        },

        created() {
            //immediately this view is created, 
            //get all our messages in firebase messages collection,
            //order them by timestamp and assign to variable ref
            let ref = db.collection('messages').orderBy('timestamp');
            //for each snapshot in the messages database,
            //get all the messages and store them in messages list
            //this list must have id, name, content and timestamp
            ref.onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    //only get messages that were added that is 
                    //with change type as added
                    if(change.type == 'added'){
                        //get all changed document with change type as added
                        //and assign to variable doc
                        let doc =  change.doc;
                        this.messages.push({
                            id: doc.id,
                            name: doc.data().name,
                            content: doc.data().content,
                            timestamp: moment(doc.data().timestamp).format('LLLL')
                        });
                    }
                });
            })
        },
    }
</script>

<style>
.chat h2{
    font-size: 2.6em;
    margin-bottom: 40px;
}

.chat span{
    font-size: 1.4em;
}

.chat .time{
    display: block;
    font-size: 0.8em;
}

.messages{
    max-height: 300px;
    overflow: auto;
}

.messages::-webkit-scrollbar{
    width: 30px;
}

.messages::-webkit-scrollbar-track{
    background: #ddd;
}

.messages::-webkit-scrollbar-thumb{
    background: #aaa;
}
</style>
