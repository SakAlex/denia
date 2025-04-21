alert("Ο συγκεκριμένος ιστότοπος πραγματοποιήθηκε από τη φοιτήτρια Δένια Αλεξανδροπούλου (ct22003) στα πλαίσια εξέτασης του μαθήματος Προγραμματισμός στον Παγκόσμιο Ιστό του Tμήματος Πολιτισμικής Τεχνολογίας & Επικοινωνίας");

// Φόρτωση XML
function loadDoc(choice) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            switch (choice) {
                case "1":
                    myFunction(this);
                    document.getElementById("button-container").style.textAlign = "left";
                    document.getElementById("koumpi2").style.display = "inline-block";
                    document.getElementById("koumpi3").style.display = "inline-block";
                    document.getElementById("koumpi4").style.display = "inline-block";
                    break;
                case "2":
                    myFunction2(this);
                    break;
                case "3":
                    myFunction3(this);
                    break;
                case "4":
                    myFunction4(this);
                    break;
            }
        }
    };
    xhttp.open("GET", "../ypologistes_mouseio_plhroforikhs.xml", true); 
    xhttp.send(); 
}

// Εμφάνιση όλων των δεδομένων
function myFunction(xml) {
    var xmlDoc = xml.responseXML;
    var table = "<tr><th>A/A (Code)</th><th>Title</th><th>Brand</th><th>Year</th><th>Indicative Price (€)</th></tr>";
    var x = xmlDoc.getElementsByTagName("computer");
    for (var i = 0; i < x.length; i++) {
        var id = x[i].getAttribute("id") || "N/A";
        var title = x[i].getElementsByTagName("title")[0]?.textContent || "";
        var brand = x[i].getElementsByTagName("brand")[0]?.textContent || "";
        var year = x[i].getElementsByTagName("year")[0]?.textContent || "";
        var price = x[i].getElementsByTagName("price")[0]?.textContent || "";

        table += "<tr><td>" + id +
                 "</td><td>" + title +
                 "</td><td>" + brand +
                 "</td><td>" + year +
                 "</td><td>" + price +
                 "</td></tr>";
    }
    document.getElementById("computers").innerHTML = table;
}

// Ταξινόμηση κατά brand
function myFunction2(xml) {
    var A = fillArrayFromXML(xml);
    var sorted = A.sort(function(a, b) {
        return a[2].localeCompare(b[2]);
    });
    var table = "<tr><th>A/A (Code)</th><th>Title</th><th>Brand</th><th>Year</th><th>Indicative Price (€)</th></tr>";
    for (var i = 0; i < sorted.length; i++) {
        table += "<tr><td>" + sorted[i][0] +
                 "</td><td>" + sorted[i][1] +
                 "</td><td>" + sorted[i][2] +
                 "</td><td>" + sorted[i][3] +
                 "</td><td>" + sorted[i][4] +
                 "</td></tr>";
    }
    document.getElementById("computers").innerHTML = table;
}

// Εμφάνιση του νεότερου υπολογιστή
function myFunction3(xml) {
    var A = fillArrayFromXML(xml);
    var sorted = [...A].sort(function(a, b) {
        return b[3] - a[3];
    });
    var table = "<tr><th>A/A (Code)</th><th>Title</th><th>Brand</th><th>Year</th><th>Indicative Price (€)</th></tr>";
    table += "<tr><td>" + sorted[0][0] +
             "</td><td>" + sorted[0][1] +
             "</td><td>" + sorted[0][2] +
             "</td><td>" + sorted[0][3] +
             "</td><td>" + sorted[0][4] +
             "</td></tr>";
    document.getElementById("computers").innerHTML = table;
}

// Εμφάνιση του φθηνότερου υπολογιστή
function myFunction4(xml) {
    var A = fillArrayFromXML(xml);
    var sorted = [...A].sort(function(a, b) {
        return a[4] - b[4];
    });
    var table = "<tr><th>A/A (Code)</th><th>Title</th><th>Brand</th><th>Year</th><th>Indicative Price (€)</th></tr>";
    table += "<tr><td>" + sorted[0][0] +
             "</td><td>" + sorted[0][1] +
             "</td><td>" + sorted[0][2] +
             "</td><td>" + sorted[0][3] +
             "</td><td>" + sorted[0][4] +
             "</td></tr>";
    document.getElementById("computers").innerHTML = table;
}

// Δημιουργία πίνακα από το XML
function fillArrayFromXML(xml) {
    var xmlDoc = xml.responseXML;
    var items = xmlDoc.getElementsByTagName("computer");
    var A = [];
    for (var i = 0; i < items.length; i++) {
        var id = items[i].getAttribute("id") || "N/A";
        var title = items[i].getElementsByTagName("title")[0]?.textContent || "";
        var brand = items[i].getElementsByTagName("brand")[0]?.textContent || "";
        var year = parseInt(items[i].getElementsByTagName("year")[0]?.textContent) || 0;
        var price = parseFloat(items[i].getElementsByTagName("price")[0]?.textContent) || 0;
        A[i] = [id, title, brand, year, price];
    }
    return A;
}
