"use strict";

import puppeteer from "puppeteer";

class XhrRequest {

    constructor(url) {
        this.url = url;
        return this.getXhrRequests();
    }

    getXhrRequests() {

        return puppeteer.launch().then(async browser => {

            const page = await browser.newPage();
            const collection = [];

            await page.setRequestInterception(true);

            page.on("request", request => {
                if (request.resourceType() === "xhr") {
                    let item = { url: request.url(), type: request.method() };

                    if (item.type === "POST") {
                        item.postData = request.postData()
                    }
                    collection.push(item);
                }
                request.continue();
            });

            await page.goto(this.url);
            await browser.close();

            return { page: this.url, timeStamp: new Date(), xhrRequest: collection };
        });
    }
}

export default XhrRequest;