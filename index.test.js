const puppeteer = require('puppeteer');

let browser, page;

beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.setViewport({
        width: 1366,
        height: 657,
    })
    await page.goto('https://www.jojonomic.com/', {
        waitUntil: 'domcontentloaded'
    });
});

describe('Jojonomic Homepage', () => {

    // Example fail test
    it('Title Homepage Jojonomic Example fail ', async () => {
        const title = await page.title();
        expect(title).toBe('E2E Testing');
    });

    it('Title Homepage Jojonomic ', async () => {
        const title = await page.title();
        expect(title).toBe('Beranda ID - Jojonomic Pro | The Number 1 Expense Management Solution on your Mobile');
    });

    it('Title header loads OOS Technology Platform untuk permudah kelola perusahaan', async () => {
        const title = await page.$eval('.title-header', e => e.innerHTML);
        expect(title).toBe('OOS Technology Platform untuk permudah kelola perusahaan');
    });

    it('Submit form free demo with valid data', async () => {
        await page.type('[name="input_21"]', 'Rifat Ardiyansyah');
        await page.type('[name="input_36"]', 'rifat.ardiyansyah99@gmail.com');
        await page.type('[name="input_35"]', '12345');
        await page.click('input[type="submit"]');
        // await page.waitForSelector('.success');
        await page.screenshot({
            path: 'form2.jpg',
            fullpage: true,
            type: 'jpeg'
        });
        expect(page).toBeTruthy();
    });

    it('Submit form free demo with blank data', async () => {
        await page.reload({
            waitUntil: ["networkidle0", "domcontentloaded"]
        });
        await page.type('[name="input_21"]', '');
        await page.type('[name="input_36"]', '');
        await page.type('[name="input_35"]', '1');
        await page.click('input[type="submit"]');
        await page.waitForSelector('.validation_error');
        await page.screenshot({
            path: 'form_error.jpg',
            fullpage: true,
            type: 'jpeg'
        });
        expect(page).toBeTruthy();
    });
});

afterAll(async () => {
    await browser.close()
});