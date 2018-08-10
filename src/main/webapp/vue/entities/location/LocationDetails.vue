<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="location">
                <h2><span v-text="$t('partySleeperPlannerApp.location.detail.title')">Location</span> {{location.id}}</h2>
                <hr>
                <!--<jhi-alert-error></jhi-alert-error>-->
                <dl class="row-md jh-entity-details">
                    <dt><span v-text="$t('partySleeperPlannerApp.location.name')">Name</span></dt>
                    <dd>
                        <span>{{location.name}}</span>
                    </dd>
                    <dt><span v-text="$t('partySleeperPlannerApp.location.occupant')">Occupant(s)</span></dt>
                    <dd>
                        <span>{{location.occupants ? location.occupants : 0}} / {{location.max}}</span>
                    </dd>
                </dl>

                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>

                <router-link :to="{name: 'LocationEdit', params: {locationId: location.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import {SERVER_API_URL} from "../../constants";

    export default {
        data() {
            return {
                location: {}
            }
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                if (to.params.locationId) {
                    vm.retrieveLocation(to.params.locationId);
                }
            })
        },
        methods: {
            retrieveLocation(locationId) {
                let vm = this;
                axios.get(SERVER_API_URL + 'api/locations/' + locationId).then(res => {
                    vm.location = res.data;
                });
            },
            previousState() {
                this.$router.go(-1);
            }
        }
    }
</script>
