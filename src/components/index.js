
import LazyYoutube from "./LazyYoutube";
import LazyVimeo from "./LazyVimeo";
const PLUGINS = new Map()

const addLazytubePlugin = (pluginName, plugin) => {

    if (PLUGINS.has(pluginName)) {
        console.warn(`pluginName is exist 【${pluginName}】 该插件名已存在, 全局只引入一次就够了!`)
        return
    }
    PLUGINS.set(pluginName, plugin)
}

const installLazytube = (app) => {
    app.component('LazyYoutube', LazyYoutube)
    app.component('LazyVimeo', LazyVimeo)
}


export { LazyYoutube, LazyVimeo, addLazytubePlugin, installLazytube as install }
