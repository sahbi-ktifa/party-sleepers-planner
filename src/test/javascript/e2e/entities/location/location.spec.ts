import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { LocationComponentsPage, LocationUpdatePage } from './location.page-object';

describe('Location e2e test', () => {
    let navBarPage: NavBarPage;
    let locationUpdatePage: LocationUpdatePage;
    let locationComponentsPage: LocationComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Locations', () => {
        navBarPage.goToEntity('location');
        locationComponentsPage = new LocationComponentsPage();
        expect(locationComponentsPage.getTitle()).toMatch(/partySleeperPlannerApp.location.home.title/);
    });

    it('should load create Location page', () => {
        locationComponentsPage.clickOnCreateButton();
        locationUpdatePage = new LocationUpdatePage();
        expect(locationUpdatePage.getPageTitle()).toMatch(/partySleeperPlannerApp.location.home.createOrEditLabel/);
        locationUpdatePage.cancel();
    });

    it('should create and save Locations', () => {
        locationComponentsPage.clickOnCreateButton();
        locationUpdatePage.setNameInput('name');
        expect(locationUpdatePage.getNameInput()).toMatch('name');
        locationUpdatePage.setMaxInput('5');
        expect(locationUpdatePage.getMaxInput()).toMatch('5');
        locationUpdatePage.save();
        expect(locationUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
