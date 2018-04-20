import {store} from '../Store/store.js'

export default (to,from,next) => {
    if (store.getters.user) {
        next()
    }else{
        next('/signin')
    }
}
