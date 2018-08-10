// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import Vuelidate from 'vuelidate'
import VueI18n from 'vue-i18n'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(Vuelidate);
Vue.use(BootstrapVue);
Vue.use(VueI18n);
Vue.config.productionTip = false;

library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon);

const i18n = new VueI18n({
    silentTranslationWarn: true
});
const store = new Vuex.Store({
    state: {
        userIdentity: null,
        authenticated: false
    },
    mutations: {
        authenticate(state, identity) {
            state.userIdentity = identity;
            state.authenticated = true;
        },
        logout(state) {
            state.userIdentity = null;
            state.authenticated = false;
        }
    },
    getters: {
        account: state => state.userIdentity,
        authenticated: state => state.authenticated
    }
});
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    i18n,
    store
});

