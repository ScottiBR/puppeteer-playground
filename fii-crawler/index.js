const puppeteer = require("puppeteer");

const url = "https://www.fundsexplorer.com.br/ranking";

void (async () => {
  try {
    const { browser, page } = await startNavigatino(url);
    const tableRows = await page.evaluate(getTableRows);
  } catch (error) {
    console.log(error);
  }
})();

async function startNavigatino(url) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);
  return { browser, page };
}

function getTableRows() {
  let tableRows = {};

  const rows = document.querySelectorAll("table > tbody > tr");
  rows.forEach(row => {
    let rowsText = [];
    row.querySelectorAll("td").forEach(cell => {
      rowsText.push(cell.textContent);
    });
    const [head] = rowsText;
    tableRows = { ...tableRows, [head]: rowsText };
  });

  return tableRows;
}
