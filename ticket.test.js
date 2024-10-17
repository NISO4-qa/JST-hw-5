const { clickElement, getText } = require("./lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://qamid.tmweb.ru/client/index.php");
  await page.setDefaultTimeout(8000);
});

afterEach(() => {
  page.close();
});

describe("Cinema tests", () => {
  beforeEach(async () => {
    await clickElement(page, "a:nth-child(2)");
    await clickElement(page, ".movie-seances__time[href='#'][data-seance-id='199']");
  }, 50000);
  test("Book one ticket", async () => {
    await clickElement(
      page,
      "body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(3) > span:nth-child(4)"
    );
    await clickElement(page, ".acceptin-button");
    const expected = "Вы выбрали билеты:";
    const actual = await getText(page, ".ticket__check-title");
    expect(actual).toContain(expected);
  }, 60000);

  test("Book three tickets", async () => {
    await clickElement(page, "div:nth-child(10) span:nth-child(6)");
    await clickElement(page, "div:nth-child(10) span:nth-child(7)");
    await clickElement(page, "div:nth-child(10) span:nth-child(8)");
    await clickElement(page, ".acceptin-button");
    const expected = "Вы выбрали билеты:";
    const actual = await getText(page, ".ticket__check-title");
    expect(actual).toContain(expected);
  }, 70000);

  test("Selection of occupied seats", async () => {
    await clickElement(page, "div:nth-child(9) span:nth-child(3)");
    const expected = "Забронировать";
    const actual = await getText(page, ".acceptin-button");
    expect(actual).toContain(expected);
  }, 80000);
});
