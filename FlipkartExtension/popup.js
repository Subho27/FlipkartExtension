
/* Add a product to compare */
function addProduct() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { ask: "addItems" }, function (response) {
            chrome.storage.local.get(["laptops"]).then((result) => {
                if (result.laptops != undefined) {
                    createLaptopList(result.laptops);
                    document.getElementById('message').innerHTML = "";
                }
                enableCompare(result.laptops);
                chrome.storage.local.get(["details"]).then((result) => {
                    if (result.details != undefined) {
                        console.log(result.details);
                    }
                });
                chrome.storage.local.get(["laptopScreen"]).then((result) => {
                    if ((result.laptopScreen != undefined) && (result.laptopScreen == false)) {
                        document.getElementById('message').innerHTML = "This page does not contain any laptop to add.";
                        chrome.storage.local.set({ laptopScreen: undefined }).then(() => {
                            success = true;
                        });
                    }
                });
            });
        });
    });
}
document.getElementById('add').onclick = addProduct;

/* Remove all product */

function removeAll() {
    chrome.storage.local.get(["laptops"]).then((result) => {
        if (result.laptops != undefined) {
            result.laptops = [];
            chrome.storage.local.set({ laptops: result.laptops }).then(() => {
                let div_laptop_list = document.getElementById('laptop-added');
                while (div_laptop_list.lastElementChild) {
                    div_laptop_list.removeChild(div_laptop_list.lastElementChild);
                }
                enableCompare(result.laptops);
                chrome.storage.local.get(["details"]).then((result) => {
                    if (result.details != undefined) {
                        result.details = [];
                        chrome.storage.local.set({ details: result.details }).then(() => {
                            console.log("All deleted");
                        });
                    }
                });
            });
        }
    });
}
document.getElementById('remove').onclick = removeAll;

/* Remove a particular product */

function removeOne(e) {
    let clickedButton = parseInt(e.srcElement.id.split("_")[1]) - 1;
    chrome.storage.local.get(["laptops"]).then((result) => {
        if (result.laptops != undefined) {
            const allLaptops = result.laptops;
            const before = allLaptops.slice(0, clickedButton);
            const after = allLaptops.slice(clickedButton+1);
            const updateLaptops = before.concat(after);
            chrome.storage.local.set({ laptops: updateLaptops }).then(() => {
                createLaptopList(updateLaptops);
            });
            enableCompare(updateLaptops);
            chrome.storage.local.get(["details"]).then((result) => {
                if (result.details != undefined) {
                    result.details = [];
                    const allDetails = result.details;
                    const beforeDet = allDetails.slice(0, clickedButton);
                    const afterDet = allDetails.slice(clickedButton + 1);
                    const updateDetails = beforeDet.concat(afterDet);
                    chrome.storage.local.set({ details: updateDetails }).then(() => {
                        console.log("Selected one deleted");
                    });
                }
            });
        }
    });
}

/* Creating Laptop List */

function createLaptopList(laptops) {
    let div_laptop_list = document.getElementById('laptop-added');
    while (div_laptop_list.lastElementChild) {
        div_laptop_list.removeChild(div_laptop_list.lastElementChild);
    }
    for (let i = 0; i < laptops.length; i++) {
        //Create Table row
        let table_row = document.createElement("tr");
        //Create Table data for p
        let table_data_1 = document.createElement("td");
        let para = document.createElement("p");
        let node = document.createTextNode((i + 1) + ". " + laptops[i].slice(0, 28) + "...");
        //let node = document.createTextNode((i + 1) + ". ...");
        para.appendChild(node);
        para.setAttribute("id", "plaptop_" + (i + 1));
        table_data_1.appendChild(para);
        //Create Table data for button
        let table_data_2 = document.createElement("td");
        let button = document.createElement("button");
        let button_txt = document.createTextNode("-");
        button.appendChild(button_txt);
        button.setAttribute("class", "remove-button");
        button.setAttribute("id", "blaptop_" + (i + 1));
        button.onclick = removeOne;
        table_data_2.appendChild(button);

        table_row.appendChild(table_data_1);
        table_row.appendChild(table_data_2);

        div_laptop_list.appendChild(table_row);
    }
}

/* Load all laptops from beggining */

chrome.storage.local.get(["laptops"]).then((result) => {
    if (result.laptops != undefined) {
        createLaptopList(result.laptops);
        document.getElementById('message').innerHTML = "";
        enableCompare(result.laptops);
    }
});

/* Compare button */
function enableCompare(laptops) {
    let compare_btn = document.getElementById("compare");
    let laptop_count = 0;
    let details_count = 0;
    chrome.storage.local.get(["details"]).then((result) => {
        if (result.details != undefined) {
            details_count = result.details.length;
        }
    });
    chrome.storage.local.get(["laptops"]).then((result) => {
        if (result.laptops != undefined) {
            laptop_count = result.laptops.length;
        }
    });
    if (laptops.length > 1) {
        if (laptop_count == details_count) {
            compare_btn.disabled = false;
            compare_btn.style.cursor = "pointer";
            compare_btn.innerHTML = '<a id="compare_link" href="compare.html" target="_blank">Compare</a>';
            document.getElementById('message').innerHTML = "";
        }
        else {
            document.getElementById('message').innerHTML = "Please reload this page...";
        }
    }
    else {
        compare_btn.disabled = true;
        compare_btn.style.cursor = "not-allowed";
        compare_btn.innerHTML = 'Compare';
        document.getElementById('message').innerHTML = "";
    }
}
