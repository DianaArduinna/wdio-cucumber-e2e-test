import { Given } from "@wdio/cucumber-framework";
import chai from "chai";
import reporter from "../../helper/reporter.js";
import sauseHomePage from "../../page-objects/sause.home.page.js";
import constants from "../../../data/constants.json" assert{type:"json"};
import apiHelper from "../../helper/apiHelper.js";
import fs from "fs";
import { Response } from "superagent";

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

/**
 * Get a list of users from reqres api
 * Sub-steps:
 * 1. Get payload data
 * 2. Make get call by using API helper
 * 3. Store results
 */

Given(/^Get list of (.*) from reqres.in$/, async function (endpointRef) {
  if (!endpointRef)
    throw Error(`Given endpoint ref: ${endpointRef} is not valid.`);
    try {
      /** 1. Get payload data*/
      reporter.addStep(this.testid, "info", `Getting the payload data for endpoint: ${endpointRef}`)
      let endpoint = ""
      if (endpointRef.trim().toUpperCase() === "USERS") {
          endpoint = constants.REQRES.GET_USERS
      }
      if (!endpoint) throw Error(`Error getting endpoint:${endpoint} from the constants.json`)

      /**2. Make get call by using API helper */
      let testid = this.testid
      let res;
      await browser.call(async function () {
          // @ts-ignore
          res = await apiHelper.GET(testid, browser.options.reqresBaseURL, endpoint, "", constants.REQRES.QUERY_PARAM);
        })
      // @ts-ignore
      if (res.status !== 200) chai.expect.fail(`Failed getting users from :${browser.options.reqresBaseURL}${endpoint}`)
      reporter.addStep(this.testid, "debug", `API response received, data: ${JSON.stringify(res.body)}`)

      /** 3.Store results*/
      let data = JSON.stringify(res.body, undefined, 4)
      let filename = `${process.cwd()}/data/api-res/reqresAPIUsers.json`;
      fs.writeFileSync(filename, data)
      reporter.addStep(this.testid, "info", `API response from ${endpoint} stored in json file`)
  } catch (err) {
      err.message = `${this.testid}: Failed at getting API users from reqres, ${err.message}`
      throw err
  }
});
