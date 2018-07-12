import { element, by, promise, ElementFinder } from 'protractor';

export class SleeperComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    title = element.all(by.css('jhi-sleeper div h2#page-heading span')).first();

    clickOnCreateButton(): promise.Promise<void> {
        return this.createButton.click();
    }

    getTitle(): any {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class SleeperUpdatePage {
    pageTitle = element(by.id('jhi-sleeper-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    siteSelect = element(by.id('field_site'));

    getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    setNameInput(name): promise.Promise<void> {
        return this.nameInput.sendKeys(name);
    }

    getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    siteSelectLastOption(): promise.Promise<void> {
        return this.siteSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    siteSelectOption(option): promise.Promise<void> {
        return this.siteSelect.sendKeys(option);
    }

    getSiteSelect(): ElementFinder {
        return this.siteSelect;
    }

    getSiteSelectedOption() {
        return this.siteSelect.element(by.css('option:checked')).getText();
    }

    save(): promise.Promise<void> {
        return this.saveButton.click();
    }

    cancel(): promise.Promise<void> {
        return this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}
