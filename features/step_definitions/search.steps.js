const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After, setDefaultTimeout } = require("cucumber");
const { clickElement, getText } = require("../../lib/commands.js");

setDefaultTimeout(50000);
Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", { timeout: 40000 }, async function (string) {
  return await this.page.goto(`https://qamid.tmweb.ru${string}`);
});

When("the user selects the day", async function () {
  return await clickElement(this.page, "a:nth-child(2)"); 
});

When("the user select of the hall and time", async function () {
  return await clickElement(
    this.page,
    ".movie-seances__time[href='#'][data-seance-id='199']"
  ); 
});

When("the user selects one seat", async function () {
  await clickElement(this.page, "div[class='buying-scheme__wrapper'] div:nth-child(1) span:nth-child(3)");
  await clickElement(this.page, ".acceptin-button");
});

Then("user sees title for one seat {string}", async function (string) {
  const expected = await string;
  const actual = await getText(this.page, ".ticket__check-title");
  expect(actual).contain(expected);
});

When("the user selects three seats", async function () {
  await clickElement(this.page, "div:nth-child(10) span:nth-child(6)");
  await clickElement(this.page, "div:nth-child(10) span:nth-child(7)");
  await clickElement(this.page, "div:nth-child(10) span:nth-child(8)");
  await clickElement(this.page, ".acceptin-button");
});

Then("user sees title for three seats {string}", async function (string) {
  const expected = await string;
  const actual = await getText(this.page, ".ticket__check-title");
  expect(actual).contain(expected);
});

When("the user selects occupied seats", async function () {
  return await clickElement(this.page, "div:nth-child(9) span:nth-child(3)");
});

Then("the user clicks on the book button {string}", async function (string) {
  const expected = await string;
  const actual = await getText(this.page, ".acceptin-button");
  expect(actual).contain(expected);
});