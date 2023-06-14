import { BeforeStep } from "@wdio/cucumber-framework";

BeforeStep(function(){
    // @ts-ignore
    this.testid = browser.options.testid;
})