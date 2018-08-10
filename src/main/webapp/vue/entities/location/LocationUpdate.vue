<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="jhi-location-heading" v-text="$t('partySleeperPlannerApp.location.home.createOrEditLabel')">Create or edit a Location</h2>
                <div>
                    <!--<jhi-alert-error></jhi-alert-error>-->
                    <div class="form-group" v-if="location.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="location.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('partySleeperPlannerApp.location.name')" for="field_name">Name</label>
                        <input type="text" class="form-control" name="name" id="field_name"
                               :class="{'valid': !$v.location.name.$invalid, 'invalid': $v.location.name.$invalid }"
                               v-model="$v.location.name.$model" required/>
                        <div v-if="$v.location.name.$anyDirty && $v.location.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.location.name.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('partySleeperPlannerApp.location.max')" for="field_max">Max</label>
                        <input type="number" class="form-control" name="max" id="field_max"
                               :class="{'valid': !$v.location.max.$invalid, 'invalid': $v.location.max.$invalid }"
                               v-model="$v.location.max.$model" required/>
                        <div v-if="$v.location.max.$anyDirty && $v.location.max.$invalid">
                            <small class="form-text text-danger"
                                   v-if="!$v.location.max.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger"
                                   v-if="!$v.location.name.integer" v-text="$t('entity.validation.number')">
                                This field should be a number.
                            </small>
                        </div>
                    </div>

                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.location.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
    import {integer, required} from 'vuelidate/lib/validators'
    import axios from 'axios'
    import {SERVER_API_URL} from "../../constants";

    export default {
        data() {
            return {
                location: {
                    name: null,
                    max: null
                },
                isSaving: false
            }
        },
        validations: {
            location: {
                name: {
                    required
                },
                max: {
                    required,
                    integer
                }
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
            save() {
                let vm = this;
                this.isSaving = true;
                if (this.location.id) {
                    axios.put(SERVER_API_URL + 'api/locations', this.location).then(() => {
                        vm.$router.go(-1);
                        vm.isSaving = false;
                    });
                } else {
                    axios.post(SERVER_API_URL + 'api/locations', this.location).then(() => {
                        vm.$router.go(-1);
                        vm.isSaving = false;
                    });
                }
            },
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
