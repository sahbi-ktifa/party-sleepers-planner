import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Register from '../components/account/Register'
import ResetPassword from '../components/account/ResetPassword'
import ChangePassword from '../components/account/ChangePassword'
import Sessions from '../components/account/Sessions'
import Settings from '../components/account/Settings'
import Location from '../entities/location/Location'
import LocationUpdate from '../entities/location/LocationUpdate'
import LocationDetails from '../entities/location/LocationDetails'
import Sleeper from '../entities/sleeper/Sleeper'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/resetPassword',
            name: 'ResetPassword',
            component: ResetPassword
        },
        {
            path: '/changePassword',
            name: 'ChangePassword',
            component: ChangePassword
        },
        {
            path: '/sessions',
            name: 'Sessions',
            component: Sessions
        },
        {
            path: '/settings',
            name: 'Settings',
            component: Settings
        },
        //dynamic entities routes
        {
            path: '/location',
            name: 'Location',
            component: Location
        },
        {
            path: '/location/new',
            name: 'LocationCreate',
            component: LocationUpdate
        },
        {
            path: '/location/:locationId/edit',
            name: 'LocationEdit',
            component: LocationUpdate
        },
        {
            path: '/location/:locationId/view',
            name: 'LocationView',
            component: LocationDetails
        },
        {
            path: '/sleeper',
            name: 'Sleeper',
            component: Sleeper
        }
    ]
})
