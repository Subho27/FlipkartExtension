chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        //console.log(sender.tab ?
        //    "from a content script:" + sender.tab.url :
        //    "from the extension");
        if (request.ask === "addItems") {
            if (fetchItems()) {
                return true;
            }
        }
        
    }
);


function fetchItems() {
    var success = false;
    var laptopExists = false;
    //check if the product is really a laptop
    let check_laptop = document.getElementsByClassName("_2whKao");
    for (let item of check_laptop) {
        if (item.innerHTML == "Laptops") {
            laptopExists = true;
            //get the laptop name
            const laptop = document.getElementsByClassName("B_NuCI");

            if (laptop != undefined && laptop.length > 0) {
                const laptop_name = laptop[0].innerText;
                //get all laptops that were added to compare
                let laptop_list = [];
                chrome.storage.local.get(["laptops"]).then((result) => {
                    if (result.laptops == undefined) {
                        laptop_list.push(laptop_name);
                        result.laptops = laptop_list;
                    }
                    else {
                        result.laptops.push(laptop_name);
                    }
                    result.laptops = removeDuplicates(result.laptops);

                    chrome.storage.local.set({ laptops: result.laptops }).then(() => {
                        chrome.storage.local.get(["details"]).then((result) => {
                            let details_list = [];
                            let details_laptop = JSON.stringify(createLaptopJSON(laptop_name));
                            if (result.details == undefined) {
                                details_list.push(details_laptop);
                                result.details = details_list;
                            }
                            else {
                                result.details.push(details_laptop);
                            }
                            result.details = removeDuplicates(result.details);

                            chrome.storage.local.set({ details: result.details }).then(() => {
                                console.log(result.details);
                                success = true;
                            });
                        });
                    });
                });
            }
            else {
                laptopExists = false;
            }
            
        }
    }
    if (laptopExists == false) {
        chrome.storage.local.set({ laptopScreen: false }).then(() => {
            success = true;
        });
    }
    else {
        chrome.storage.local.set({ laptopScreen: true }).then(() => {
            success = true;
        });
    }
    return success;
}

function removeDuplicates(arr) {
    return arr.filter((item,
        index) => arr.indexOf(item) === index);
}

function createLaptopJSON(laptop_name) {

    let jsonLaptop = {};
    jsonLaptop["name"] = laptop_name;

    //Get Price 
    var price_value = document.getElementsByClassName("_30jeq3 _16Jk6d")[0].innerText;
    jsonLaptop["price"] = price_value;

    //Get Rating
    var rating_value = document.getElementsByClassName("_3LWZlK")[0].innerText;
    jsonLaptop["rating"] = rating_value;

    //Get Rating Factor
    var rater = document.getElementsByClassName("_2_R_DZ")[0].innerText.split(" ")[0];
    jsonLaptop["rater"] = rater;

    //Get Series to Domestic Warranty
    var series_value = document.getElementsByClassName("_1s_Smc row");
    for (let element of series_value) {
        let nameValuePair = element.innerText.split("\n");
        nameValuePair[0] = nameValuePair[0].toLowerCase();
        nameValuePair[0] = nameValuePair[0].replace(/ /g, "-");
        jsonLaptop[nameValuePair[0]] = nameValuePair[1];
    }

    //Get Ratings
    var ratings_value = document.getElementsByClassName("_2Ix0io");
    var ratings_name = document.getElementsByClassName("_3npa3F");
    for (let i = 0; i < ratings_value.length; i++) {
        jsonLaptop[ratings_name[i].innerHTML.toLowerCase() + "-rating"] = ratings_value[i].innerHTML;
    }

    return jsonLaptop;
}

