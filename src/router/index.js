import Vue from 'vue';
import Router from 'vue-router';
import Welcome from '@/components/Welcome';
import Chat from '@/components/Chat';

Vue.use(Router)

export default new Router({
    mode: 'history', //this removes the # in the url
    routes: [{
            path: '/',
            name: 'Welcome',
            component: Welcome
        },
        {
            path: '/chat',
            name: 'Chat',
            component: Chat,
            props: true, //this tell this route to expect properties
            //route guard checks to ensure certain conditions are met
            //before routing to this page/view which is Chat
            //to is info on the route or component we are going to
            //from is where we are coming from and
            //next is a function to call where we want to go to next

            beforeEnter: (to, from, next) => {
                //checking to see that the page we are going to has
                //the parameter *name* which is required by it
                //before it opens
                //so if it exist proceed
                if (to.params.name) {
                    next();
                } else {
                    //else go back to the welcome
                    next({ name: 'Welcome' });
                }
            }
        }
    ]
});