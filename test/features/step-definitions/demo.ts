import { Given, When, Then } from "@wdio/cucumber-framework";
import chai from "chai";

Given(/^Google page is opened$/, async function () {
  await browser.url("https://www.google.com");
  await browser.pause(1000);
});

When(/^Search with (.*)$/, async function (searchItem) {
  console.log(`>> searchItem: ${searchItem}`);
  let ele = await $(`[name=q]`);
  await ele.setValue(searchItem);
  await browser.keys("Enter");
});

Then(/^Click on the first search result$/, async function () {
  let ele = await $(`<h3>`);
  ele.click(); //this by default will click the first value
});

Then(/^Url should match (.*)$/, async function (expectedURL) {
  console.log(`>> expectedURL: ${expectedURL}`);
  let url = await browser.getUrl();
  chai.expect(url).to.equal(expectedURL);
});


//** Web Interactions */

Given(/^A web page is open$/, async function() {
  await browser.url("/inputs")
  await browser.setTimeout({implicit: 15000, pageLoad: 10000})
  await browser.maximizeWindow()
})

When(/^Perform web interactions$/, async function(){
 /**
  * 1. input box
  * Actions:
  * 1. type into input box
  * 2. clear the field and type or just addvalue
  * 3. click and type
  * 4. slow typing 
  * 
  */

let num = 12345;
let strNum = num.toString();

let ele = await $(`[type=number]`);
//await ele.setValue(strNum);
//await browser.pause(3000)
await ele.click();
//slow typing
for(let i =0; i < strNum.length; i++){
  let charStr = strNum.charAt(i);
  await browser.pause(1000);
  await browser.keys(charStr);
}

await browser.debug();
  
})