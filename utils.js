import { nanoid } from "nanoid";
import puppeteer from "puppeteer";

/**
 * takeScreenshot and save it in fs
 * @param {string} dateofbirth
 * @param {string} rollno
 * @returns {Promise} screenshot path
 */
const takeScreenshot = async (rollno, dateofbirth) => {
  let browser = await puppeteer.launch({ headless: false });
  let page = await browser.newPage();
  await page.goto('https://examcell.rguktn.ac.in/results/202021_B1516_E23S2_Reg/', {waitUntil: 'networkidle2'});
  await page.type('#StudentId1', rollno);
  await page.type('#StudentDob1', dateofbirth);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000);
  await page.waitForSelector("#showResult");
  const element = await page.$('#showResult');
  const screenshot_path = `screenshots/result_${nanoid()}.png`;     
  await element.screenshot({'path': screenshot_path}); 
  await browser.close();
  return screenshot_path;
};

const parseRoll = (text) => {
  const idregex = /\bN[0-9]{6}/gim;
  const roll = text.match(idregex);
	//console.log(roll[0]);
  if (!roll) return null;
  return roll[0].toUpperCase();
};
const parseDate = (text) => {
  const dateregex = /\d{2}-\d{2}-\d{4}/;
  const dateofbirth = text.match(dateregex);
  if (!dateofbirth) return null;
  return dateofbirth[0];
}

export { takeScreenshot, parseRoll, parseDate };
