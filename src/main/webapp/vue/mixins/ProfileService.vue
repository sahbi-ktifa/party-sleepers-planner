<script>
    import axios from 'axios'
    import {SERVER_API_URL} from "../constants";

    export default {
        name: 'ProfileService',
        data () {
            return {
                ribbonEnv: null
            }
        },
        created() {
            let vm = this;
            axios.get(SERVER_API_URL + 'management/info').then(function (res) {
                if (res.data && res.data.activeProfiles && res.data.activeProfiles.indexOf(res.data['display-ribbon-on-profiles']) > -1) {
                    vm.ribbonEnv = res.data['display-ribbon-on-profiles'];
                }
            });
        }
    }
</script>
