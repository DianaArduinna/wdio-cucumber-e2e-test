import { Given, When, Then } from "@wdio/cucumber-framework";
import chai from "chai";

Given(/^Google page is opened$/, async function () {
  await browser.url("https://www.google.com");
  await browser.pause(1000);
});

When(/^Search with (.*)$/, async function (searchItem) {
  //console.log(`>> searchItem: ${searchItem}`);
  let ele = await $(`[name=q]`);
  await ele.setValue(searchItem);
  await browser.keys("Enter");
});

Then(/^Click on the first search result$/, async function () {
  let ele = await $(`<h3>`);
  ele.click(); //this by default will click the first value
});

Then(/^Url should match (.*)$/, async function (expectedURL) {
  //console.log(`>> expectedURL: ${expectedURL}`);
  await browser.waitUntil(async function () {
    return await browser.getTitle() === "WebdriverIO · Marco de prueba de automatización móvil y navegador de próxima generación para Node.js | WebdriverIO"
  }, 
  {timeout: 10000, interval: 500, 
    timeoutMsg: `Failed loading WDIO web page: ${await browser.getTitle()}`});

  let url = await browser.getUrl();
  chai.expect(url).to.equal(expectedURL);
});

//** Web Interactions */

Given(/^A web page is open$/, async function () {
  //this are commented for study purposes and example of this method
  // await browser.url("/inputs")
  // await browser.url("/dropdown");
  // await browser.url("/checkboxes");
  //await browser.url("/windows");
  // await browser.url("/javascript_alerts");
  // await browser.url("/basic_auth");
  // await browser.url("/upload");
  // await browser.url("/frames");
  await browser.url("/");
  //await browser.url("/tables");
  await browser.setTimeout({ implicit: 15000, pageLoad: 10000 });
  await browser.maximizeWindow();
});

When(/^Perform web interactions$/, async function () {
  /**
   * 1. input box
   * Actions:
   * 1. type into input box
   * 2. clear the field and type or just addvalue
   * 3. click and type
   * 4. slow typing
   *
   */

  //let num = 12345;
  //let strNum = num.toString();

  //let ele = await $(`[type=number]`);
  //await ele.setValue(strNum);
  //await browser.pause(3000)
  //await ele.click();
  //slow typing
  //for(let i =0; i < strNum.length; i++){
  //  let charStr = strNum.charAt(i);
  //  await browser.pause(1000);
  //  await browser.keys(charStr);
  //}

  /**
   * 2. Dropdown
   * Actions:
   * 1. Assert default option is selected
   * 2. Select by attribute, text, index
   * 3. Get a list of options
   *
   */
  /** 1. Assert default option is selected */
  // let ele = await $('//select/option[@selected="selected"]');
  // let val = await ele.getText();
  //chai.expect(val).to.equal("Please select an option");
  //await browser.debug();

  /** 2. Select by attribute, text, index */
  //let ddEle = await $('#dropdown');
  //await ddEle.selectByVisibleText("Option 2");
  //await ddEle.selectByIndex(2);

  /** 3. Get a list of options */
  //let eleArray = await $$(`select > option`);
  //let arr = [];
  //for (let i=0; i< eleArray.length; i++){
  //  let ele = eleArray[i];
  //  let val = ele.getText();
  //  arr.push(val);
  //}
  //console.log(`>> Options array: ${arr}`);

  /**3. Checkbox
   * Actions:
   * 1. Select an option
   * 2. Unselect an option (if selected)
   * 3. Assert if option is selected
   * 4. Select all options
   */

  /** 1. Select an option */
  //let ele = await $('//form[@id="checkboxes"]/input[1]');
  //await ele.click();

  /** 2. Unselect an option (if selected) */
  //if(!await ele.isSelected()){
  //  await ele.click();
  //}

  /** 3. Assert if option is selected */
  //let ele = await $('//form[@id="checkboxes"]/input[2]');
  //let isChecked = await ele.isSelected();
  //chai.expect(isChecked).to.be.true;

  /** 4. Select all options */
  //let eleArray = await $$('//form[@id="checkboxes"]/input');
  //for(let i = 0; i < eleArray.length; i++){
  //  let ele = eleArray[i];
  //  if(!await ele.isSelected()){
  //    ele.click();
  //  }
  //}

  /** 4. Windows Handling
   * Steps:
   * 1. Launch the browser
   * 2. Open another windows
   * 3. Switch to the window based on title
   * 4. Switch back to the main window
   *
   * Method used:
   * 1. getTitle()
   * 2. getWindowHandle()
   * 3. getWindowHandles()
   * 4. switchToWindow()
   *
   */

  //Open new windows
  //await $(`=Click Here`).click();
  //await $(`=Elemental Selenium`).click();
  //let currentWinTitle = await browser.getTitle();
  //let parentWinHandle = await browser.getWindowHandle();
  //console.log(`>> currentWinTitle: ${currentWinTitle}`);

  //Switch to specific widnow
  //let winHandles = await browser.getWindowHandles();
  //for (let i = 0; winHandles.length; i++){
  //  console.log(`>> Win handle: ${winHandles[i]}`);
  //  await browser.switchToWindow(winHandles[i]);
  //  currentWinTitle = await browser.getTitle();
  //  if (currentWinTitle === "Elemental Selenium | Elemental Selenium"){
  //    await browser.switchToWindow(winHandles[i]);
  //    let homeHeaderTextEleSel = await $(`.home-header`).getText();
  //    console.log(`>> imgTextEleSel: ${homeHeaderTextEleSel}`);
  //    break;
  //  }
  //}

  //Switch back to parent window
  //await browser.switchToWindow(parentWinHandle);
  //let parentWinHeaderTxt = await $(`<h3>`).getText();
  //console.log(`>> parentWinHeaderTxt: ${parentWinHeaderTxt}`);

  /** 5. Handling Alerts
   *
   * Methods used:
   * 1. isAlertOpen()
   * 2. acceptAlert()
   * 3. dismissAlert()
   * 4. getAlertText()
   * 5. sendAlertText()
   */

  //await $(`button=Click for JS Alert`).click();
  //await $(`button=Click for JS Confirm`).click();
  //if (await browser.isAlertOpen()){
  //await browser.acceptAlert();
  //await browser.dismissAlert();
  //await browser.pause(2000);
  //}

  // await $(`button=Click for JS Prompt`).click();
  // if (await browser.isAlertOpen()){
  //   let alertText = await browser.getAlertText();
  //   console.log(`>>alertText: ${alertText}`);
  //   await browser.sendAlertText(`Hello JS Prompt...`)
  //   await browser.acceptAlert();
  //   await browser.pause(2000);
  // }

  /** 6. File Upload */

  // await $(`#file-upload`).addValue(`${process.cwd()}/data/fileupload/dummy.txt`);
  // await $('#file-submit').click();

  /** 7. Frames
   * Methods used:
   * 1. switchToFrame
   * 2. switchToParentFrame
   */
  // await $(`=iFrame`).click();
  // let ele = await $(`#mce_0_ifr`);
  // await browser.switchToFrame(ele);
  // //Interaction with frames...
  // await $(`#tinymce`).setValue(`Typing into a frame...`);
  // await browser.switchToParentFrame();

  /** 8. Key press */
  // await $(`=iFrame`).click();
  // let ele = await $(`#mce_0_ifr`);
  // await browser.switchToFrame(ele);
  // //Interaction with frames... and keys
  //  await $(`#tinymce`).click();
  //  await browser.keys(["Meta", "A"]);
  //  await browser.pause(1000);
  //  await browser.keys("Delete");

  //  await $(`#tinymce`).setValue(`Typing into a frame...`);
  //  await browser.switchToParentFrame();

  /** 9. Basic Scrolling
   * Methods: {Element methods}
   * 1. scrollIntoView
   */
  //await $(`.a-color-base.as-title-block-left`).scrollIntoView();

  /**
   * Web Table:
   * What we are going to cover:
   * 1. Check number of rows and columns
   * 2. Get whole table data
   * 3. Get single row [based condition]
   * 4. Get single column
   * 5. Get single cell value [based on another cell]
   */

  /** 1. Check number of rows and columns*/

  // let rowCount = await $$(`//table[@id="table1"]/tbody/tr`).length;
  // chai.expect(rowCount).to.equal(4);
  // console.log(`>> Number of rows: ${rowCount}`);
  // let colCount = await $$(`//table[@id="table1"]/thead/tr/th`).length;
  // chai.expect(colCount).to.equal(6);
  // console.log(`>> Number of columns: ${colCount}`);

  /** 2. Get whole table data */
  ////table[@id="table1"]/tbody/tr[1]/td[5]
  // let arr = [];
  // for (let i =0; i < rowCount; i++){
  //   let personObj = {
  //     lastname: "",
  //     firstname: "",
  //     email: "",
  //     due: "",
  //     web: "",
  //   }
  //   for (let j = 0; j< colCount; j++){
  //     let cellVal = await $(`//table[@id="table1"]/tbody/tr[${i + 1}]/td[${j + 1}]`).getText();
  //     if(j === 0) personObj.lastname = cellVal;
  //     if(j === 1) personObj.firstname = cellVal;
  //     if(j === 2) personObj.email = cellVal;
  //     if(j === 3) personObj.due = cellVal;
  //     if(j === 4) personObj.web = cellVal;
  //   }
  //   arr.push(personObj);

  // }
  // console.log(`Whole table: ${JSON.stringify(arr)}`);

  /** 3. Get single row [based condition] */

  // let arr = [];
  // for (let i =0; i < rowCount; i++){
  //   let personObj = {
  //     lastname: "",
  //     firstname: "",
  //     email: "",
  //     due: "",
  //     web: "",
  //   }
  //   for (let j = 0; j< colCount; j++){
  //     let cellVal = await $(`//table[@id="table1"]/tbody/tr[${i + 1}]/td[${j + 1}]`).getText();
  //     let firstname = await $(`//table[@id="table1"]/tbody/tr[${i + 1}]/td[2]`).getText();
  //     if(firstname === "Jason"){
  //       if(j === 0) personObj.lastname = cellVal;
  //       if(j === 1) personObj.firstname = cellVal;
  //       if(j === 2) personObj.email = cellVal;
  //       if(j === 3) personObj.due = cellVal;
  //       if(j === 4) personObj.web = cellVal;
  //     }

  //   }
  //   if(personObj.firstname){
  //     arr.push(personObj);
  //   }

  // }
  // console.log(`Whole table: ${JSON.stringify(arr)}`);

  /** 4. Get single column */
  // let arr = [];
  // for( let i = 0; i< rowCount; i++){
  //   let cellVal = await $(`//table[@id="table1"]/tbody/tr[${i + 1}]/td[4]`).getText();
  //   arr.push(cellVal);
  // }
  // console.log(`>> Single col values: ${arr}`);

  /** 5. Get single cell value [based on another cell] */
  // let arr = [];
  // for (let i = 0; i < rowCount; i++) {
  //  // for (let j = 0; j < colCount; j++) {
  //     //let cellVal = await $(`//table[@id="table1"]/tbody/tr[${i + 1}]/td[${j + 1}]`).getText();
  //     let price = await $(`//table[@id="table1"]/tbody/tr[${i + 1}]/td[4]`).getText();
  //     let firstname = await $(`//table[@id="table1"]/tbody/tr[${i + 1}]/td[2]`).getText();
  //     //convert price to num
  //     if(+(price.replace("$", "")) > 50){
  //         arr.push(firstname);
  //     }
  //  // }
  // }
  // console.log(`>> Single col values: ${arr}`);

  /** 
   * Scrolling
   * 
   * Visible PORTION
   * window object:
   * 1. scrollBy
   *  Y -> [-]window.innerHeight
  */
 // Scroll down
await browser.execute(() => {
  window.scrollBy(0, window.innerHeight);
})
await browser.pause(2000);

// Scroll top
await browser.execute(() => {
  window.scrollBy(0, -window.innerHeight);
})


 /**
  * Invisible PORTION
  * windows object:
  * 1. scrollTo
  *  Y-> document.body.scrollTop[scrollHeight]
  */
 await browser.pause(2000);
 await browser.execute(() => {
  window.scrollTo(0, document.body.scrollHeight);
 });

 await browser.pause(2000);
 await browser.execute(() => {
  window.scrollTo(0, document.body.scrollTop);
 });
  
  await browser.debug();
});
