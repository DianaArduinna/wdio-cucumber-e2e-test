import { Then } from "@wdio/cucumber-framework";
import chai from "chai";

Then(/^Inventory page should list (.*)$/, async function (noOfProducts) {
  if (!noOfProducts) throw Error(`Invalid number provided: ${noOfProducts}`);

  let eleArray = await $$(`.inventory_item_name`);
  chai.expect(eleArray.length).to.equal(parseInt(noOfProducts));
});

Then(/^Validate all products have valid price$/, async function () {
  //** 1. Get price list */
  let eleArray = await $$(`.inventory_item_price`);
  let priceStrArray = [];
  for (let i = 0; i < eleArray.length; i++) {
    let priceStr = await eleArray[i].getText();
    priceStrArray.push(priceStr);
  }
  console.log(`>>> Price with $: ${priceStrArray}`);

  //**2. Convert string to number */
  let priceNumArr = priceStrArray.map((ele) => +ele.replace("$", "")); //When you want to convert string to number without losing the .99 use +
  console.log(`>> Price in numbers: ${priceNumArr}`);

  //**3. Assert if any value is <=0 */
  let invalidPriceArr = priceNumArr.filter((ele) => ele <= 0);
  chai.expect(invalidPriceArr.length).to.equal(0);
});
