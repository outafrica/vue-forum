import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/router'
import store from './store/store'

const app = createApp(App)
app.use(router)
app.use(store)

// Define widget componets to be globally registered without needing to register each individual component
const requireComponent = require.context('./components/widgets', true, /App[A-Z]\w+\.(vue|js)$/);
requireComponent.keys().forEach(function (fileName) {

    let baseComponentConfig = requireComponent(fileName);
    baseComponentConfig = baseComponentConfig.default || baseComponentConfig;
    const baseComponentName = baseComponentConfig.name || (
        fileName
            .replace(/^.+\//, '')
            .replace(/\.\w+$/, '')
    );
    app.component(baseComponentName, baseComponentConfig);

});
app.mount('#app')


