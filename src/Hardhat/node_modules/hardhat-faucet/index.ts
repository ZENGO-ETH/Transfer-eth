import { task } from "hardhat/config";
import puppeteer from "puppeteer";

task("faucet", "Get native coin to your testnet account")
  .addParam("account", "Account address")
  .setAction(async ({ account }) => {
    console.log("Account", account);
    // Setup
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://testnet.binance.org/faucet-smart");
    await page.focus("#url");
    await page.keyboard.type(account);
    const elPeers = await page.$("#peers");
    while (await page.evaluate((el) => el.textContent === "", elPeers)) {
      await page.waitForTimeout(100);
    }

    // Request coin
    await page.evaluate(() => {
      (window as any).tier = 0;
      (window as any).symbol = "BNB";
      (window as any).grecaptcha.ready(function () {
        (window as any).grecaptcha.execute();
      });
    });

    // Read response status
    let elStatus = await page.waitForSelector(".noty_bar");
    let isError = await page.evaluate(
      (el) => el.classList.contains("noty_type_error"),
      elStatus
    );
    let isSuccess = await page.evaluate(
      (el) => el.classList.contains("noty_type_success"),
      elStatus
    );
    if (isError) {
      console.log("Error");
    }
    if (isSuccess) {
      console.log("Success");
    }

    // Read response message
    let elText = await page.$(".noty_text");
    let message = await page.evaluate((el) => el.textContent, elText);
    console.log(message);

    // Clean up
    await page.close();
    await browser.close();
  });
