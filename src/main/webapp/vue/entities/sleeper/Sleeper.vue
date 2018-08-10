<template>

</template>
<script>
    import axios from 'axios'
    import {SERVER_API_URL} from "../../constants";
    import Principal from '../../components/account/Principal';

    export default {
        mixins: [Principal],
        data() {
          return {}
        },
        methods: {

        },
        computed: {
            currentAccount() {
                return this.$store.getters.account;
            }
        }
    }
</script>
