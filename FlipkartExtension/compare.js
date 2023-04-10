chrome.storage.local.get(["laptops"]).then((result) => {
    if (result.laptops != undefined) {
        let laptop_name_tr = document.getElementById("laptop-name");
        for (let i = 0; i < result.laptops.length; i++) {
            let table_header = document.createElement("th");
            let laptop_name = document.createTextNode((i + 1) + ". " + result.laptops[i].slice(0, 45) + "...");
            table_header.appendChild(laptop_name);
            laptop_name_tr.appendChild(table_header);
        }
    }
});

chrome.storage.local.get(["details"]).then((result) => {
    if (result.details != undefined) {
        let element_tr = document.getElementsByTagName("tr");
        laptop_details = [];
        for (let laptop of result.details) {
            laptop_details.push(JSON.parse(laptop));
        }
        for (let laptop of laptop_details) {
            for (let element of element_tr) {
                if (element.id != "laptop-name") {
                    let table_data = document.createElement("td");
                    let node = '';
                    let value = ((laptop[element.id] == undefined || laptop[element.id] == "Not Available") ? "Not Found" : laptop[element.id]);
                    if (element.id == "rating-factor") {
                        let rating = (laptop["rating"] == undefined ? 0 : laptop["rating"]);
                        let rater = (laptop["rater"] == undefined ? 0 : laptop["rater"]);
                        var rater_total = parseInt(rater.replace(/,/g, ''));
                        let rating_factor = ((rating / 5) * rater_total) / 1000;
                        rating_factor = Math.round(rating_factor * 1000) / 1000;
                        node = document.createTextNode(rating_factor);
                    } else {
                        node = document.createTextNode(value);
                    }
                    table_data.appendChild(node);
                    element.appendChild(table_data);
                }
            }
        }

        setMaxMinPrice();
        
        setMaxMinRating();

        setMaxMinRatingFactor();

        setMaxMinBatteryCell();

        setMaxMinBatteryBackUp();

        setMaxMinMSOfficeProvided();

        setMaxMinGraphicMemoryType();

        setMaxMinGraphicMemoryCapacity();

        setMaxMinProcessorName();

        setMaxMinProcessorGeneration();

        setMaxMinClockSpeed();

        setMaxMinSSD();

        setMaxMinSSDCapacity();

        setMaxMinRAM();

        setMaxMinRAMType();

        setMaxMinRAMFrequency();

        setMaxMinMemorySlots();

        setMaxMinCache();

        setMaxMinGraphicProcessor();

        setMaxMinNumberOfCores();

        setMaxMinOperatingSystem();

        setMaxMinMicIn();
    }
});

function setMaxMinPrice() {
    let element_price = document.getElementById("price").getElementsByTagName("td");
    let maxPrice = 0;
    let minPrice = Number.MAX_SAFE_INTEGER;
    for (let i = 1; i < element_price.length; i++) {
        var price = element_price[i].innerHTML.replace(/,/g, '').slice(1);
        if (price > maxPrice) {
            maxPrice = price;
        }
        if (price < minPrice) {
            minPrice = price;
        }
    }
    for (let i = 1; i < element_price.length; i++) {
        var price = element_price[i].innerHTML.replace(/,/g, '').slice(1);
        if (price == minPrice) {
            element_price[i].style.backgroundColor = "#8badd9";
        }
        if (price == maxPrice) {
            element_price[i].style.backgroundColor = "#217aed";
        }
    }
}

function setMaxMinRating() {
    let element_rating = document.getElementById("rating").getElementsByTagName("td");
    let maxRating = 0;
    let minRating = Number.MAX_SAFE_INTEGER;
    for (let i = 1; i < element_rating.length; i++) {
        var rating = element_rating[i].innerHTML;
        if (rating > maxRating) {
            maxRating = rating;
        }
        if (rating < minRating) {
            minRating = rating;
        }
    }
    for (let i = 1; i < element_rating.length; i++) {
        var rating = element_rating[i].innerHTML;
        if (rating == minRating) {
            element_rating[i].style.backgroundColor = "#8badd9";
        }
        if (rating == maxRating) {
            element_rating[i].style.backgroundColor = "#217aed";
        }
    }
}

function setMaxMinRatingFactor() {
    let element_rating_factor = document.getElementById("rating-factor").getElementsByTagName("td");
    let maxRating_Factor = 0;
    let minRating_Factor = Number.MAX_SAFE_INTEGER;
    for (let i = 1; i < element_rating_factor.length; i++) {
        var rating_factor = element_rating_factor[i].innerHTML;
        if (rating_factor > maxRating_Factor) {
            maxRating_Factor = rating_factor;
        }
        if (rating_factor < minRating_Factor) {
            minRating_Factor = rating_factor;
        }
    }
    for (let i = 1; i < element_rating_factor.length; i++) {
        var rating_factor = element_rating_factor[i].innerHTML;
        if (rating_factor == minRating_Factor) {
            element_rating_factor[i].style.backgroundColor = "#8badd9";
        }
        if (rating_factor == maxRating_Factor) {
            element_rating_factor[i].style.backgroundColor = "#217aed";
        }
    }
}

function setMaxMinBatteryCell() {
    let element_battery_cell = document.getElementById("battery-cell").getElementsByTagName("td");
    let maxBattery_Cell = 0;
    let minBattery_Cell = Number.MAX_SAFE_INTEGER;
    for (let i = 1; i < element_battery_cell.length; i++) {
        var battery_cell = element_battery_cell[i].innerHTML == "Not Found" ? 0 : element_battery_cell[i].innerHTML.split(" ")[0];
        if (battery_cell > maxBattery_Cell) {
            maxBattery_Cell = battery_cell;
        }
        if (battery_cell < minBattery_Cell) {
            minBattery_Cell = battery_cell;
        }
    }
    for (let i = 1; i < element_battery_cell.length; i++) {
        var battery_cell = element_battery_cell[i].innerHTML == "Not Found" ? 0 : element_battery_cell[i].innerHTML.split(" ")[0];
        if (battery_cell == minBattery_Cell) {
            element_battery_cell[i].style.backgroundColor = "#8badd9";
        }
        if (battery_cell == maxBattery_Cell) {
            element_battery_cell[i].style.backgroundColor = "#217aed";
        }
    }
}

function setMaxMinBatteryBackUp() {
    let element_battery_backup = document.getElementById("battery-backup").getElementsByTagName("td");
    let maxBattery_BackUp = 0;
    let minBattery_BackUp = Number.MAX_SAFE_INTEGER;
    for (let i = 1; i < element_battery_backup.length; i++) {
        var battery_backup = element_battery_backup[i].innerHTML == "Not Found" ? 0 : element_battery_backup[i].innerHTML.split(" ")[1];
        if (battery_backup > maxBattery_BackUp) {
            maxBattery_BackUp = battery_backup;
        }
        if (battery_backup < minBattery_BackUp) {
            minBattery_BackUp = battery_backup;
        }
    }
    for (let i = 1; i < element_battery_backup.length; i++) {
        var battery_backup = element_battery_backup[i].innerHTML == "Not Found" ? 0 : element_battery_backup[i].innerHTML.split(" ")[1];
        if (battery_backup == minBattery_BackUp) {
            element_battery_backup[i].style.backgroundColor = "#8badd9";
        }
        if (battery_backup == maxBattery_BackUp) {
            element_battery_backup[i].style.backgroundColor = "#217aed";
        }
    }
}

function setMaxMinMSOfficeProvided() {
    let element_ms_office = document.getElementById("ms-office-provided").getElementsByTagName("td");
    for (let i = 1; i < element_ms_office.length; i++) {
        var ms_office = element_ms_office[i].innerHTML.toLowerCase() == "not found" ? "no" : element_ms_office[i].innerHTML.toLowerCase();
        if (ms_office == "no") {
            element_ms_office[i].style.backgroundColor = "#8badd9";
        }
        if (ms_office == "yes") {
            element_ms_office[i].style.backgroundColor = "#217aed";
        }
    }
}

function setMaxMinGraphicMemoryType() {
    let element_graphic_memory = document.getElementById("dedicated-graphic-memory-type").getElementsByTagName("td");
    let graphic_memory_type_list = ["Not Found", "DDR", "DDR2", "DDR3", "DDR4", "GDDR4", "GDDR5", "GDDR5X", "GDDR6", "HBM"];
    let maxGraphic_Memory = 0;
    let minGraphic_Memory = Number.MAX_SAFE_INTEGER;
    for (let i = 1; i < element_graphic_memory.length; i++) {
        var graphic_memory = graphic_memory_type_list.indexOf(element_graphic_memory[i].innerHTML);
        if (graphic_memory > maxGraphic_Memory) {
            maxGraphic_Memory = graphic_memory;
        }
        if (graphic_memory < minGraphic_Memory) {
            minGraphic_Memory = graphic_memory;
        }
    }
    for (let i = 1; i < element_graphic_memory.length; i++) {
        var graphic_memory = graphic_memory_type_list.indexOf(element_graphic_memory[i].innerHTML);
        if (graphic_memory == minGraphic_Memory) {
            element_graphic_memory[i].style.backgroundColor = "#8badd9";
        }
        if (graphic_memory == maxGraphic_Memory) {
            element_graphic_memory[i].style.backgroundColor = "#217aed";
        }
    }
}

function setMaxMinGraphicMemoryCapacity() {
    let element_graphic_capacity = document.getElementById("dedicated-graphic-memory-capacity").getElementsByTagName("td");
    let maxGraphic_Capacity = 0;
    let minGraphic_Capacity = Number.MAX_SAFE_INTEGER;
    for (let i = 1; i < element_graphic_capacity.length; i++) {
        var graphic_capacity = element_graphic_capacity[i].innerHTML == "Not Found" ? 0 : element_graphic_capacity[i].innerHTML.split(" ")[0];
        if (graphic_capacity > maxGraphic_Capacity) {
            maxGraphic_Capacity = graphic_capacity;
        }
        if (graphic_capacity < minGraphic_Capacity) {
            minGraphic_Capacity = graphic_capacity;
        }
    }
    for (let i = 1; i < element_graphic_capacity.length; i++) {
        var graphic_capacity = element_graphic_capacity[i].innerHTML == "Not Found" ? 0 : element_graphic_capacity[i].innerHTML.split(" ")[0];
        if (graphic_capacity == minGraphic_Capacity) {
            element_graphic_capacity[i].style.backgroundColor = "#8badd9";
        }
        if (graphic_capacity == maxGraphic_Capacity) {
            element_graphic_capacity[i].style.backgroundColor = "#217aed";
        }
    }
}

function setMaxMinProcessorName() {
    let processor_list = ["Not Found", "Core i5", "Core i3", "Core i7", "Ryzen 7 Quad Core", "Ryzen 5 Quad Core", "Core i9", "Ryzen 5 Hexa Core", "Ryzen 7 Octa Core", "M1", "Ryzen 3 Dual Core",
        "APU Dual Core A6", "APU Dual Core A9", "APU Dual Core E2", "Athlon Dual Core", "Atom Quad Core", "Celeron Dual Core", "Celeron Quad Core", "Dual Core", "Hexa Core i5", "M1 Max",
        "M1 Pro", "M2", "M2 Max", "M2 Pro", "MediaTek Kompanio 500", "MediaTek MT8788", "Pentium Gold", "Pentium Quad Core", "Pentium Silver", "Ryzen 3 Hexa Core", "Ryzen 3 Quad Core",
        "Ryzen 5 Dual Core", "Ryzen 5 Octa Core", "Ryzen 7 Dual Core", "Ryzen 7 Hexa Core", "Ryzen 9 16 Core", "Ryzen 9 Octa Core"];
    let element_processor_name = document.getElementById("processor-name").getElementsByTagName("td");
    let maxProcessor_Name = 0;
    let minProcessor_Name = Number.MAX_SAFE_INTEGER;
    for (let i = 1; i < element_processor_name.length; i++) {
        var processor_name = processor_list.indexOf(element_processor_name[i].innerHTML);
        if (processor_name > maxProcessor_Name) {
            maxProcessor_Name = processor_name;
        }
        if (processor_name < minProcessor_Name) {
            minProcessor_Name = processor_name;
        }
    }
    for (let i = 1; i < element_processor_name.length; i++) {
        var processor_name = processor_list.indexOf(element_processor_name[i].innerHTML);
        if (processor_name == minProcessor_Name) {
            element_processor_name[i].style.backgroundColor = "#8badd9";
        }
        if (processor_name == maxProcessor_Name) {
            element_processor_name[i].style.backgroundColor = "#217aed";
        }
    }
}

function setMaxMinProcessorGeneration() {
    let processor_generation_list = ["Not Found", "3rd Gen", "4th Gen", "5th Gen", "6th Gen", "7th Gen", "8th Gen", "9th Gen", "10th Gen", "11th Gen", "12th Gen", "13th Gen"];
    let element_processor_generation = document.getElementById("processor-generation").getElementsByTagName("td");
    let maxProcessor_Generation = 0;
    let minProcessor_Generation = Number.MAX_SAFE_INTEGER;
    for (let i = 1; i < element_processor_generation.length; i++) {
        var processor_generation = processor_generation_list.indexOf(element_processor_generation[i].innerHTML);
        if (processor_generation > maxProcessor_Generation) {
            maxProcessor_Generation = processor_generation;
        }
        if (processor_generation < minProcessor_Generation) {
            minProcessor_Generation = processor_generation;
        }
    }
    for (let i = 1; i < element_processor_generation.length; i++) {
        var processor_generation = processor_generation_list.indexOf(element_processor_generation[i].innerHTML);
        if (processor_generation == minProcessor_Generation) {
            element_processor_generation[i].style.backgroundColor = "#8badd9";
        }
        if (processor_generation == maxProcessor_Generation) {
            element_processor_generation[i].style.backgroundColor = "#217aed";
        }
    }
}

function setMaxMinClockSpeed() {
    var regex = /[+-]?\d+(\.\d+)?/g;
    var element_clock_speed = document.getElementById("clock-speed").getElementsByTagName("td");
    let maxClock_Speed = 0;
    let minClock_Speed = Number.MAX_SAFE_INTEGER;
    for (let i = 1; i < element_clock_speed.length; i++) {
        var floats = element_clock_speed[i].innerHTML.match(regex).map(function (v) { return parseFloat(v); });
        var clock_speed = floats[0];
        if (clock_speed > maxClock_Speed) {
            maxClock_Speed = clock_speed;
        }
        if (clock_speed < minClock_Speed) {
            minClock_Speed = clock_speed;
        }
    }
    for (let i = 1; i < element_clock_speed.length; i++) {
        var floats = element_clock_speed[i].innerHTML.match(regex).map(function (v) { return parseFloat(v); });
        var clock_speed = floats[0];
        if (clock_speed == minClock_Speed) {
            element_clock_speed[i].style.backgroundColor = "#8badd9";
        }
        if (clock_speed == maxClock_Speed) {
            element_clock_speed[i].style.backgroundColor = "#217aed";
        }
    }
}

function setMaxMinSSD() {
    let element_ssd = document.getElementById("ssd").getElementsByTagName("td");
    for (let i = 1; i < element_ssd.length; i++) {
        var ssd = element_ssd[i].innerHTML.toLowerCase() == "not found" ? "no" : element_ssd[i].innerHTML.toLowerCase();
        if (ssd == "no") {
            element_ssd[i].style.backgroundColor = "#8badd9";
        }
        if (ssd == "yes") {
            element_ssd[i].style.backgroundColor = "#217aed";
        }
    }
}

function setMaxMinSSDCapacity() {
    var regex = /(\d+)/g;
    var element_ssd_capacity = document.getElementById("ssd-capacity").getElementsByTagName("td");
    let maxSSD_Capacity = 0;
    let minSSD_Capacity = Number.MAX_SAFE_INTEGER;
    for (let i = 1; i < element_ssd_capacity.length; i++) {
        var numbers = element_ssd_capacity[i].innerHTML.match(regex);
        var ssd_capacity = numbers[0];
        if (ssd_capacity > maxSSD_Capacity) {
            maxSSD_Capacity = ssd_capacity;
        }
        if (ssd_capacity < minSSD_Capacity) {
            minSSD_Capacity = ssd_capacity;
        }
    }
    for (let i = 1; i < element_ssd_capacity.length; i++) {
        var numbers = element_ssd_capacity[i].innerHTML.match(regex);
        var ssd_capacity = numbers[0];
        if (ssd_capacity == minSSD_Capacity) {
            element_ssd_capacity[i].style.backgroundColor = "#8badd9";
        }
        if (ssd_capacity == maxSSD_Capacity) {
            element_ssd_capacity[i].style.backgroundColor = "#217aed";
        }
    }
}

function setMaxMinRAM() {
    var regex = /(\d+)/g;
    var element_ram = document.getElementById("ram").getElementsByTagName("td");
    let maxRAM = 0;
    let minRAM = Number.MAX_SAFE_INTEGER;
    for (let i = 1; i < element_ram.length; i++) {
        var numbers = element_ram[i].innerHTML.match(regex);
        var ram = numbers[0];
        if (ram > maxRAM) {
            maxRAM = ram;
        }
        if (ram < minRAM) {
            minRAM = ram;
        }
    }
    for (let i = 1; i < element_ram.length; i++) {
        var numbers = element_ram[i].innerHTML.match(regex);
        var ram = numbers[0];
        if (ram == minRAM) {
            element_ram[i].style.backgroundColor = "#8badd9";
        }
        if (ram == maxRAM) {
            element_ram[i].style.backgroundColor = "#217aed";
        }
    }
}

function setMaxMinRAMType() {
    let element_ram_type = document.getElementById("ram-type").getElementsByTagName("td");
    let ram_type_list = ["Not Found", "Unified Memory", "DDR3", "DDR4", "DDR5", "LPDDR3", "LPDDR4", "LPDDR4X", "LPDDR5"];
    let maxRAM_Type = 0;
    let minRAM_Type = Number.MAX_SAFE_INTEGER;
    for (let i = 1; i < element_ram_type.length; i++) {
        var ram_type = ram_type_list.indexOf(element_ram_type[i].innerHTML);
        if (ram_type > maxRAM_Type) {
            maxRAM_Type = ram_type;
        }
        if (ram_type < minRAM_Type) {
            minRAM_Type = ram_type;
        }
    }
    for (let i = 1; i < element_ram_type.length; i++) {
        var ram_type = ram_type_list.indexOf(element_ram_type[i].innerHTML);
        if (ram_type == minRAM_Type) {
            element_ram_type[i].style.backgroundColor = "#8badd9";
        }
        if (ram_type == maxRAM_Type) {
            element_ram_type[i].style.backgroundColor = "#217aed";
        }
    }
}

function setMaxMinRAMFrequency() {
    var regex = /(\d+)/g;
    var element_ram_frequency = document.getElementById("ram-frequency").getElementsByTagName("td");
    let maxRAM_Frequency = 0;
    let minRAM_Frequency = Number.MAX_SAFE_INTEGER;
    for (let i = 1; i < element_ram_frequency.length; i++) {
        var numbers = element_ram_frequency[i].innerHTML == "Not Found" ? [0] : element_ram_frequency[i].innerHTML.match(regex);
        var ram_frequency = numbers[0];
        if (ram_frequency > maxRAM_Frequency) {
            maxRAM_Frequency = ram_frequency;
        }
        if (ram_frequency < minRAM_Frequency) {
            minRAM_Frequency = ram_frequency;
        }
    }
    for (let i = 1; i < element_ram_frequency.length; i++) {
        var numbers = element_ram_frequency[i].innerHTML == "Not Found" ? [0] : element_ram_frequency[i].innerHTML.match(regex);
        var ram_frequency = numbers[0];
        if (ram_frequency == minRAM_Frequency) {
            element_ram_frequency[i].style.backgroundColor = "#8badd9";
        }
        if (ram_frequency == maxRAM_Frequency) {
            element_ram_frequency[i].style.backgroundColor = "#217aed";
        }
    }
}

function setMaxMinMemorySlots() {
    var regex = /(\d+)/g;
    var element_memory_slots = document.getElementById("memory-slots").getElementsByTagName("td");
    let maxMemory_Slots = 0;
    let minMemory_Slots = Number.MAX_SAFE_INTEGER;
    for (let i = 1; i < element_memory_slots.length; i++) {
        var numbers = element_memory_slots[i].innerHTML == "Not Found" ? [0] : element_memory_slots[i].innerHTML.match(regex);
        var memory_slots = numbers[0];
        if (memory_slots > maxMemory_Slots) {
            maxMemory_Slots = memory_slots;
        }
        if (memory_slots < minMemory_Slots) {
            minMemory_Slots = memory_slots;
        }
    }
    for (let i = 1; i < element_memory_slots.length; i++) {
        var numbers = element_memory_slots[i].innerHTML == "Not Found" ? [0] : element_memory_slots[i].innerHTML.match(regex);
        var memory_slots = numbers[0];
        if (memory_slots == minMemory_Slots) {
            element_memory_slots[i].style.backgroundColor = "#8badd9";
        }
        if (memory_slots == maxMemory_Slots) {
            element_memory_slots[i].style.backgroundColor = "#217aed";
        }
    }
}

function setMaxMinCache() {
    var regex = /(\d+)/g;
    var element_cache = document.getElementById("cache").getElementsByTagName("td");
    let maxCache = 0;
    let minCache = Number.MAX_SAFE_INTEGER;
    for (let i = 1; i < element_cache.length; i++) {
        var numbers = element_cache[i].innerHTML == "Not Found" ? [0] : element_cache[i].innerHTML.match(regex);
        var cache = numbers[0];
        if (cache > maxCache) {
            maxCache = cache;
        }
        if (cache < minCache) {
            minCache = cache;
        }
    }
    for (let i = 1; i < element_cache.length; i++) {
        var numbers = element_cache[i].innerHTML == "Not Found" ? [0] : element_cache[i].innerHTML.match(regex);
        var cache = numbers[0];
        if (cache == minCache) {
            element_cache[i].style.backgroundColor = "#8badd9";
        }
        if (cache == maxCache) {
            element_cache[i].style.backgroundColor = "#217aed";
        }
    }
}

function setMaxMinGraphicProcessor() {
    let element_graphic_processor = document.getElementById("graphic-processor").getElementsByTagName("td");
    let graphic_processor_list = ["NOT FOUND", "ARC A370M", "MEDIATEK INTEGRATED", "INTEL INTEGRATED", "NVIDIA QUADRO", "AMD RADEON",
        "NVIDIA GEFORCE", "NVIDIA GEFORCE GTX", "NVIDIA GEFORCE RTX"];
    let maxGraphic_Processor = 0;
    let minGraphic_Processor = Number.MAX_SAFE_INTEGER;
    for (let i = 1; i < element_graphic_processor.length; i++) {
        var graphic_processor = 0;
        for (let j = 0; j < graphic_processor_list.length; j++) {
            if (element_graphic_processor[i].innerHTML.toUpperCase().includes(graphic_processor_list[j])) {
                graphic_processor = j;
            }
        }
        if (graphic_processor > maxGraphic_Processor) {
            maxGraphic_Processor = graphic_processor;
        }
        if (graphic_processor < minGraphic_Processor) {
            minGraphic_Processor = graphic_processor;
        }
    }
    for (let i = 1; i < element_graphic_processor.length; i++) {
        var graphic_processor = 0;
        for (let j = 0; j < graphic_processor_list.length; j++) {
            if (element_graphic_processor[i].innerHTML.toUpperCase().includes(graphic_processor_list[j])) {
                graphic_processor = j;
            }
        }
        if (graphic_processor == minGraphic_Processor) {
            element_graphic_processor[i].style.backgroundColor = "#8badd9";
        }
        if (graphic_processor == maxGraphic_Processor) {
            element_graphic_processor[i].style.backgroundColor = "#217aed";
        }
    }
}

function setMaxMinNumberOfCores() {
    var regex = /(\d+)/g;
    var element_number_of_cores = document.getElementById("number-of-cores").getElementsByTagName("td");
    let maxNumber_Of_Cores = 0;
    let minNumber_Of_Cores = Number.MAX_SAFE_INTEGER;
    for (let i = 1; i < element_number_of_cores.length; i++) {
        var numbers = element_number_of_cores[i].innerHTML == "Not Found" ? [0] : element_number_of_cores[i].innerHTML.match(regex);
        var number_of_cores = numbers[0];
        if (number_of_cores > maxNumber_Of_Cores) {
            maxNumber_Of_Cores = number_of_cores;
        }
        if (number_of_cores < minNumber_Of_Cores) {
            minNumber_Of_Cores = number_of_cores;
        }
    }
    for (let i = 1; i < element_number_of_cores.length; i++) {
        var numbers = element_number_of_cores[i].innerHTML == "Not Found" ? [0] : element_number_of_cores[i].innerHTML.match(regex);
        var number_of_cores = numbers[0];
        if (number_of_cores == minNumber_Of_Cores) {
            element_number_of_cores[i].style.backgroundColor = "#8badd9";
        }
        if (number_of_cores == maxNumber_Of_Cores) {
            element_number_of_cores[i].style.backgroundColor = "#217aed";
        }
    }
}

function setMaxMinOperatingSystem() {
    let element_operating_system = document.getElementById("operating-system").getElementsByTagName("td");
    let operating_system_list = ["NOT FOUND", "LINUX/UBUNTU", "DOS", "ENDLESS", "PRIME OS", "CHROME", "WINDOWS 8",
        "WINDOWS 10", "WINDOWS 11", "MAC OS"];
    let maxOperating_System = 0;
    let minOperating_System = Number.MAX_SAFE_INTEGER;
    for (let i = 1; i < element_operating_system.length; i++) {
        var operating_system = 0;
        for (let j = 0; j < operating_system_list.length; j++) {
            if (element_operating_system[i].innerHTML.toUpperCase().includes(operating_system_list[j])) {
                operating_system = j;
            }
        }
        if (operating_system > maxOperating_System) {
            maxOperating_System = operating_system;
        }
        if (operating_system < minOperating_System) {
            minOperating_System = operating_system;
        }
    }
    for (let i = 1; i < element_operating_system.length; i++) {
        var operating_system = 0;
        for (let j = 0; j < operating_system_list.length; j++) {
            if (element_operating_system[i].innerHTML.toUpperCase().includes(operating_system_list[j])) {
                operating_system = j;
            }
        }
        if (operating_system == minOperating_System) {
            element_operating_system[i].style.backgroundColor = "#8badd9";
        }
        if (operating_system == maxOperating_System) {
            element_operating_system[i].style.backgroundColor = "#217aed";
        }
    }
}

function setMaxMinMicIn() {
    let element_mic_in = document.getElementById("mic-in").getElementsByTagName("td");
    for (let i = 1; i < element_mic_in.length; i++) {
        var mic_in = element_mic_in[i].innerHTML.toLowerCase() == "not found" ? "no" : element_mic_in[i].innerHTML.toLowerCase();
        if (mic_in == "no") {
            element_mic_in[i].style.backgroundColor = "#8badd9";
        }
        if (mic_in == "yes") {
            element_mic_in[i].style.backgroundColor = "#217aed";
        }
    }
}