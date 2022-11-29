import VeeValidate from "vee-validate";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import moment from "vue-moment";
import setupInterceptors from "./services/setupInterceptors";

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import ProfileLayout from "@/layouts/ProfileLayout.vue";

Vue.config.productionTip = false;
Vue.use(VeeValidate);
Vue.use(moment);

Vue.component("default-layout", DefaultLayout);
Vue.component("auth-layout", AuthLayout);
Vue.component("profile-layout", ProfileLayout);

setupInterceptors(store);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
