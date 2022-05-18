import LazyYoutube from './components/LazyYoutube.vue';
import LazyVimeo from './components/LazyVimeo.vue';

export {
    LazyYoutube,
    LazyVimeo,
}

// Declare install function executed by plugin
function registerComponents (Vue) {
    Vue.component(`LazyYoutube`, LazyYoutube)
    Vue.component(`LazyVimeo`, LazyVimeo)

}

// Create module definition for Vue.use()
const plugin = {
    install(Vue) {
        const finalOptions = Object.assign({}, {
            installComponents: true,
        })
        if (finalOptions.installComponents) {
            registerComponents(Vue)
        }
        // Vue.component(component.name, component);
    }
};
// To allow use as module (npm/webpack/etc.) export component
export default plugin

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null
if (typeof window !== 'undefined') {
    GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue
}
if (GlobalVue) {
    GlobalVue.use(plugin)
}
