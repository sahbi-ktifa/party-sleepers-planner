<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('partySleeperPlannerApp.location.home.title')">Locations</span>
            <router-link to="/location/new" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-location">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('partySleeperPlannerApp.location.home.createLabel')">
                    Create new Location
                </span>
            </router-link>
        </h2>
        <!--<jhi-alert></jhi-alert>-->
        <br/>
        <div class="table-responsive" v-if="locations">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('partySleeperPlannerApp.location.name')">Name</span></th>
                    <th><span v-text="$t('partySleeperPlannerApp.location.occupant')">Occupant(s)</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="location in locations">
                    <td><router-link :to="{name: 'LocationView', params: {locationId: location.id}}">{{location.id}}</router-link></td>
                    <td>{{location.name}}</td>
                    <td>{{location.occupants ? location.occupants : 0}} / {{location.max}} <font-awesome-icon style="color: #28a745;" icon="['fas', 'thumbs-up']" v-if="location.occupants > 0 && location.max === location.occupants"></font-awesome-icon></td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'LocationView', params: {locationId: location.id}}" tag="button" class="btn btn-info btn-sm">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'LocationEdit', params: {locationId: location.id}}"  tag="button" class="btn btn-primary btn-sm">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <!--<button type="submit"
                                    [routerLink]="['/', { outlets: { popup: 'location/'+ location.id + '/delete'} }]"
                                    replaceUrl="true"
                                    queryParamsHandling="merge"
                                    class="btn btn-danger btn-sm">
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </button>-->
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import {SERVER_API_URL} from "../../constants";
    import Principal from '../../components/account/Principal';

    export default {
        mixins: [Principal],
        data() {
          return {
              locations: []
          }
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.retrieveLocations();
            })
        },
        methods: {
            retrieveLocations() {
                let vm = this;
                axios.get(SERVER_API_URL + 'api/locations').then(res => {
                    vm.locations = res.data;
                });
            }
        }
    }
</script>
