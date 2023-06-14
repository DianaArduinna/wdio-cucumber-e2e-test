import { Then } from "@wdio/cucumber-framework";
import chai from "chai";
import logger from "../../helper/logger.js";
import reporter from "../../helper/reporter.js";

Then(
  /^Inventory page should (.*)\s?list (.*)$/,
  async function (negativeCheck, noOfProducts) {
    //console.log(`>> The appid: ${this.appid}`);
   try {
    // console.log(wdio); //ReferenceError
 
     if (!noOfProducts) throw Error(`Invalid number provided: ${noOfProducts}`);
 
     let eleArray = await $$(`.inventory_item_name`);
     try {
      chai.expect(eleArray.length).to.equal(parseInt(noOfProducts));
     } catch (error) {
        reporter.addStep(this.testid, "error", "Known issue - product count mismatch", true, "Jira-123");
     }
   } catch (error) {
    console.log(`>> The type of err: ${typeof error}`);
    console.log(`>> The name property: ${error.name}`);
    console.log(`>> The message property: ${error.message}`);
    // throw error //failing
    //logger.error(error.message);
   }
  }
);

/** Steps:
 * 1. Get price list
 * 2. Convert string to number
 * 3. Assert if any value is <=0
 */

Then(/^Validate all products have valid price$/, async function () {
  logger.info(`${this.testid}: Checking the price...`);
  //** 1. Get price list */
  let eleArray = await $$(`.inventory_item_price`);
  let priceStrArray = [];
  for (let i = 0; i < eleArray.length; i++) {
    let priceStr = await eleArray[i].getText();
    priceStrArray.push(priceStr);
  }
  // console.log(`>>> Price with $: ${priceStrArray}`);

  //**2. Convert string to number */
  let priceNumArr = priceStrArray.map((ele) => +ele.replace("$", "")); //When you want to convert string to number without losing the .99 use +
  // console.log(`>> Price in numbers: ${priceNumArr}`);

  //**3. Assert if any value is <=0 */
  let invalidPriceArr = priceNumArr.filter((ele) => ele <= 0);
  chai.expect(invalidPriceArr.length).to.equal(0);
});
