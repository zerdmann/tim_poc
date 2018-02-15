"use strict";

import XhrRequest from "./XhrRequest";
import fs from "fs";
import _ from "lodash";
import Promise from "promise";

const baseUrl = "http://www.morningstar.com";
const endPoints = ["/", "/markets.html", "/stocks/xnas/aapl/quote.html"];

const collection = [];
const promises = [];

endPoints.forEach((endPoint, index) => {

    let url = baseUrl + endPoint;
    let xhr = new XhrRequest(url);

    let promise = Promise.resolve(xhr).then(xhr => {
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