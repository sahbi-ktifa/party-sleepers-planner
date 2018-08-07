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
                if (res.data && res.data.activeProfiles) {
                    vm.ribbonEnv = res.data.activeProfiles[0]
                }
            });
        }
    }
</script>
