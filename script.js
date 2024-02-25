// Array of faction names
var factionNames = ["Harkonnen", "Bene Gesserit", "Emperor", "Spacing Guild", "Fremen", "Tleilaxu", "Ixians", "CHOAM", "Richese", "Moritani", "Ecaz"];

// Array of card names
var cardNames = ["Total Cards", "Unknown Cards", "Weapon - Projectile (5)", "Defense - Projectile (5)", "Weapon - Poison (5)",
"Defense - Poison (5)", "Worthless Card (6)", "Artillery Strike", "Chemistry", "Lasgun", "Poison Blade", "Poison Tooth",
"Shield Snooper", "Weirding Way", "Cheap Hero (3)", "Amal", "Family Atomics", "Hajr", "Harvester", "Karama (2)", "Thumper",
"Tleilaxu Ghola", "Truthtrance (2)", "Weather Control"];

// Function to populate the table with dropdowns for factions and numbers for additional info and checkboxes for cards
function populateTable() {
    var table = document.getElementById("cardFactionTable");
    var tableHeadersRow = table.getElementsByTagName("tr")[0];
    var tableBody = table.getElementsByTagName("tbody")[0];

    // Populate table headers with faction dropdowns
    for (var i = 0; i < 5; i++) {
        var dropdown = document.createElement("select");
        dropdown.name = "dropdown_" + (i + 1);
        for (var j = 0; j < factionNames.length; j++) {
            var option = document.createElement("option");
            option.value = factionNames[j];
            option.textContent = factionNames[j];
            dropdown.appendChild(option);
        }
        var th = document.createElement("th");
        th.appendChild(dropdown);
        tableHeadersRow.appendChild(th);
    }

    // Populate table body with additional info rows
    for (var i = 0; i < 2; i++) { // Only two additional info rows
        var newRow = tableBody.insertRow(i); // Insert row at index i
        newRow.id = "rowFaction" + (i + 1); // Set row id
        var cell1 = newRow.insertCell();
        cell1.textContent = cardNames[i];
        if (i === 1) { // Check if it's the "Unknown Cards" row
            for (var j = 0; j < 5; j++) { // Add select to all cells in the row
                var cell = newRow.insertCell();
                var select = document.createElement("select");
                select.name = "unknownCardsSelect"; // Assign a name to the select element
                select.dataset.factionIndex = j; // Store the faction index as a data attribute
                for (var k = 1; k <= 5; k++) { // Populate select with options 1 to 5
                    var option = document.createElement("option");
                    option.value = k;
                    option.textContent = k;
                    select.appendChild(option);
                }
                select.addEventListener("change", function() {
                    var selectedIndex = this.selectedIndex;
                    var factionIndex = this.dataset.factionIndex; // Get the faction index from data attribute
                    var totalCardsRow = document.getElementById("rowFaction1");
                    var cells = totalCardsRow.cells;
                    cells[parseInt(factionIndex) + 1].textContent = this.options[selectedIndex].value;
                });
                cell.appendChild(select); // Append select to cell
            }
        } else { // For other rows, populate all cells with the number 1
            for (var j = 0; j < 5; j++) {
                var cell = newRow.insertCell();
                cell.textContent = "1";
            }
        }
    }

    // Populate table body with card rows
    for (var i = 2; i < cardNames.length; i++) {
        var newRow = tableBody.insertRow();
        newRow.id = "rowCardsStart"; // Set row id
        newRow.insertCell().textContent = cardNames[i];
        for (var j = 0; j < 5; j++) {
            var checkboxCell = newRow.insertCell();
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.addEventListener("change", function() {
                var totalCardsRow = document.getElementById("rowFaction1");
                var cells = totalCardsRow.cells;
                var factionIndex = this.parentElement.cellIndex - 1; // Get the faction index from the checkbox's parent cell
                cells[factionIndex + 1].textContent = parseInt(cells[factionIndex + 1].textContent) + (this.checked ? 1 : -1); // Increment or decrement total cards count based on checkbox state
            });
            checkboxCell.appendChild(checkbox);
        }
    }
}

// Call the function to populate the table
populateTable();
