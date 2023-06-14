import { Given } from "@wdio/cucumber-framework";
import chai from "chai";
import reporter from "../../helper/reporter.js";
import sauseHomePage from "../../page-objects/sause.home.page.js";

Given(
  /^As (a|an) (.*) user I login to inventory web app$/,
  async function (prefixTxt, userType, dataTable) {
    /** Login to inventory */
    try {
      reporter.addStep(this.testid, "info", "Login to sauce demo");
      let dt = dataTable.hashes();
      // @ts-ignore
      await sauseHomePage.navigateTo(browser.options.sauseDemoURL);
      await sauseHomePage.loginToSauseApp(
        this.testid,
        process.env.TEST_STD_USERNAME,
        process.env.TEST_STD_PASSWORD
      );
    } catch (error) {
      error.message = `Failed at login step. ${error.message}`;
      throw error;
    }

    /** First editions on how to add steps ... */
    // //pconsole.log(`>> The usertype: ${userType}`);
    // //console.log(`Test username: ${process.env.TEST_USERNAME}`);
    // reporter.addStep(this.testid, "info", "Login to sauce demo");
    // //Get the testid
    // console.log(`>> Given step Test ID: ${this.testid}`);

    // //Getting values from data table
    // let dt = dataTable.hashes(); //it should come as an array
    // // console.log(`>> The type of dt: ${typeof dt}`); //object
    // // console.log(`>> The type of dt: ${dt.constructor}`);
    // // console.log(`>> The value of dt: ${JSON.stringify(dt)}`);

    // /** 1. Launch the broswer */
    // // @ts-ignore
    // await browser.url("https://www.saucedemo.com");
    // // await browser.maximizeWindow();

    // /** 2. Login to inventory app */
    // try {
    //   await $(`#user-name`).setValue(dt[0].Username);
    //   // await $(`#user-name`).setValue(process.env.TEST_STD_USERNAME);
    //   await $(`#password`).setValue(process.env.TEST_STD_PASSWORD);
    //   await $(`#login-button`).click();
    // } catch (error) {
    //   console.log(`Error in first login. Retrying...`);
    //   await browser.pause(1000);
    //   await browser.refresh();
    //   await $(`#user-name`).setValue("standard_user");
    //   await $(`#password`).setValue("secret_sauce");
    //   await $(`#login-button`).click();
    // }
  }
);
