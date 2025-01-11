const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const axios = require('axios');
const fs = require('fs').promises;

const stealth = StealthPlugin();
stealth.enabledEvasions.delete('user-agent-override');
puppeteer.use(stealth);

(async () => {
    const cookiesFilePath = 'cookies.json';
    let cookiesExist = false;

    // Kiểm tra tệp cookies trước khi chạy
    try {
        await fs.access(cookiesFilePath);
        cookiesExist = true;
        console.log('Cookies file found.');
    } catch (err) {
        console.log('Cookies file not found. Logging in...');
    }

    const urlLogin = 'https://id.chotot.com/?continue=https%3A%2F%2Fwww.nhatot.com%2Fthue-phong-tro';
    const url = 'https://www.nhatot.com/thue-phong-tro';
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-web-security',
            '--disable-features=IsolateOrigins,site-per-process',
            '--disable-site-isolation-trials',
            '--disable-blink-features=AutomationControlled',
            '--disable-automation',
            '--disable-dev-shm-usage'
        ],
        defaultViewport: null,
        userDataDir: './tmp'
    });

    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36');

    // Chặn các tài nguyên không cần thiết
    await page.setRequestInterception(true);
    page.on('request', (req) => {
        if (['image', 'stylesheet', 'font', 'media'].includes(req.resourceType())) {
            req.abort();
        } else {
            req.continue();
        }
    });

    if (!cookiesExist) {
        await page.goto(urlLogin, { waitUntil: 'networkidle2' });
        console.log('Logging in...');
        // Thực hiện các bước login tại đây...
    }

    const scrollToBottom = async (page) => {
        await page.evaluate(async () => {
            const distance = 500;
            const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
            let scrollHeight = document.body.scrollHeight;

            while (true) {
                window.scrollBy(0, distance);
                await delay(200);
                if (document.body.scrollHeight === scrollHeight) break;
                scrollHeight = document.body.scrollHeight;
            }
        });
    };

    const crawlPageLinks = async (page, url) => {
        console.log(`Crawling page: ${url}`);
        await page.goto(url, { waitUntil: 'networkidle2' });
        await scrollToBottom(page);
        const links = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('a.crd7gu7')).map(a => a.href);
        });
        console.log(`Found ${links.length} links`);
        return links;
    };

    const processLink = async (browser, link) => {
        const page = await browser.newPage();
        try {
            await page.goto(link, { waitUntil: 'networkidle2' });
            const data = await page.evaluate(() => {
                const title = document.querySelector('h1')?.textContent || null;
                const price = document.querySelector('b.pyhk1dv')?.textContent || null;
                return { title, price };
            });
            await page.close();
            return { link, data };
        } catch (error) {
            console.error(`Error processing link ${link}:`, error);
            await page.close();
            return null;
        }
    };

    const processLinksConcurrently = async (browser, links, concurrency = 5) => {
        const results = [];
        for (let i = 0; i < links.length; i += concurrency) {
            const batch = links.slice(i, i + concurrency);
            const batchResults = await Promise.all(batch.map(link => processLink(browser, link)));
            results.push(...batchResults.filter(Boolean));
        }
        return results;
    };

    const links = await crawlPageLinks(page, url);
    const results = await processLinksConcurrently(browser, links, 10);

    // Gửi dữ liệu theo batch
    try {
        const batchSize = 10;
        for (let i = 0; i < results.length; i += batchSize) {
            const batch = results.slice(i, i + batchSize);
            await axios.post('http://127.0.0.1:8000/api/crawler-data', batch);
            console.log(`Uploaded batch ${i / batchSize + 1}`);
        }
    } catch (error) {
        console.error('Error uploading data:', error);
    }

    await browser.close();
})();
