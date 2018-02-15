"use strict";

import XhrRequest from "./XhrRequest";
import fs from "fs";
import Promise from "promise";

const baseUrl = "http://www-dev.morningstar.com";
const endPoints = ["/",
    "/markets.html",
    "/stocks/xnas/aapl/quote.html",
    "/articles/archive/30/articles-by-christine-benz.html",
    "/our-picks.html",
    "/our-picks/investment-type.html",
    "/our-picks/pick-list/christine-benz-funds-for-retirement-savers.html",
    "/videos/788115/weekly-wrap-whats-next-for-chipotle.html",
    "/etfs.html"
];

const collection = [];
const promises = [];

endPoints.forEach((endPoint, index) => {

    let url = baseUrl + endPoint;
    let xhr = new XhrRequest(url);

    let promise = Promise.resolve(xhr).then(xhr => {
        console.log(`${index + 1}. ${url}`);
        collection.push(xhr);
    });

    promises.push(promise);

    if (index === endPoints.length - 1) {

        Promise.all(promises).then(() => {

            fs.writeFile("xhrRequests.json", JSON.stringify(collection), err => {

                if (err) {
                    throw err;
                }
                console.log("file written successfully");
                process.exit();
            });
        });

    }

});