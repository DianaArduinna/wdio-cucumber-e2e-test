import { Given } from "@wdio/cucumber-framework";
import chai from "chai";

Given(/^Login to inventory web app$/, async function(){
    /** 1. Login to inventory app */
    await browser.url("https://www.saucedemo.com");
    // await browser.maximizeWindow();

    /** 2. login */
    try {
        await $(`#user-name`).setValue("standard_user");
        await $(`#password`).setValue("secret_sauce");
        await $(`#login-button`).click();
    } catch (error) {
        console.log(`Error in first login. Retrying...`)
        await browser.pause(1000);
        await browser.refresh();
        await $(`#user-name`).setValue("standard_user");
        await $(`#password`).setValue("secret_sauce");
        await $(`#login-button`).click();
    }

    /** Login with another user / reload */
    // await browser.pause(2000);
    // await browser.reloadSession();
    // await browser.url("https://www.saucedemo.com");
    // await $(`#user-name`).setValue("problem_user");
    // await $(`#password`).setValue("secret_sauce");
    // await $(`#login-button`).click();

    // await browser.back();
    // await browser.pause(2000);
    // await browser.forward();
    // await browser.debug();
})