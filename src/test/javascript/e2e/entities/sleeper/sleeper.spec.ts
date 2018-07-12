import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { SleeperComponentsPage, SleeperUpdatePage } from './sleeper.page-object';

describe('Sleeper e2e test', () => {
    let navBarPage: NavBarPage;
    let sleeperUpdatePage: SleeperUpdatePage;
    let sleeperComponentsPage: SleeperComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Sleepers', () => {
        navBarPage.goToEntity('sleeper');
        sleeperComponentsPage = new SleeperComponentsPage();
        expect(sleeperComponentsPage.getTitle()).toMatch(/partySleeperPlannerApp.sleeper.home.title/);
    });

    it('should load create Sleeper page', () => {
        sleeperComponentsPage.clickOnCreateButton();
        sleeperUpdatePage = new SleeperUpdatePage();
        expect(sleeperUpdatePage.getPageTitle()).toMatch(/partySleeperPlannerApp.sleeper.home.createOrEditLabel/);
        sleeperUpdatePage.cancel();
    });

    it('should create and save Sleepers', () => {
        sleeperComponentsPage.clickOnCreateButton();
        sleeperUpdatePage.setNameInput('name');
        expect(sleeperUpdatePage.getNameInput()).toMatch('name');
        sleeperUpdatePage.siteSelectLastOption();
        sleeperUpdatePage.save();
        expect(sleeperUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
