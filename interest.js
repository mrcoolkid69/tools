"use strict";

let timeAmount = "Year";

function addPerMonth(perMonth) {
    if (perMonth != 0) {
        return `<span style ="color:green">+ ${perMonth.toLocaleString(undefined, { style: "currency", currency: "USD" })}</span>`;
    }else{
        return "";
    }

}

function compoundInterest(p, r, t, mnth) {
    let res = `<tr>
    <th id = "tableTime">${timeAmount+ "s"}</th>
    <th>Interest</th>
    <th>Account Amount</th> 
</tr>`;
    for (let i = 0; i < t; i++) {
        let rate = p * r;
        rate = parseFloat(rate);
        p += rate + mnth;
        res += `<tr><td>${i + 1}</td> <td>${rate.toLocaleString(undefined, { style: "currency", currency: "USD" })} ${addPerMonth(mnth)}</td> <td>${p.toLocaleString(undefined, { style: "currency", currency: "USD" })}</td></tr>`;
    }
    return res;
}
function simpleInterest(p, r, t, mnth) {
    let rate = p * r;
    let res = `<tr>
    <th id = "tableTime">${timeAmount+ "s"}</th>
    <th>Interest</th>
    <th>Account Amount</th> 
</tr>`;
    for (let i = 0; i < t; i++) {
        p += rate + mnth;
        res += `<tr><td>${i + 1}</td> <td>${rate.toLocaleString(undefined, { style: "currency", currency: "USD" })} ${addPerMonth(mnth)}</td> <td>${p.toLocaleString(undefined, { style: "currency", currency: "USD" })}</td></tr>`;
    }
    return res;
}
function interestPaid(p, pa, t) {
    let res = ``;
    let annualInterest = (pa - p) / t;
    let interest = (annualInterest / p) * 100;
    res = `Interest paid is  ${interest.toLocaleString(undefined, { maximumFractionDigits: 6 })}% per ${timeAmount}`;
    return res;
}

let savedRateA = 5;
let savedRateB = 800;
let lastType = "simple";
function saveLast() {
    lastType = document.getElementById("type").value;
}
function saveNumbers() {
    if (document.getElementById("type").value != "rate" && lastType == "rate") {
        savedRateB = document.getElementById("paid").valueAsNumber;
        console.log("rate b saved");
    } else if (document.getElementById("type").value == "rate" && lastType == "simple" || document.getElementById("type").value == "rate" && lastType == "compound") {
        savedRateA = document.getElementById("rte").valueAsNumber;
        console.log("rate a saved");
    }
}
function calculate() {
    let money = "";
    const princ = document.getElementById("princ").valueAsNumber;
    const time = document.getElementById("time").valueAsNumber;
    const type = document.getElementById("type").value;
    let perMonth = 0;
    if (advanceActive === false) {
        perMonth = 0;
    } else {
        perMonth = document.getElementById("addedPerMonth").valueAsNumber;
    }
    if (time > 1000) {
        alert("Max years is 1000");
    } else {
        document.getElementById("money").innerHTML = "";
        if (type == "simple") {
            let rte = document.getElementById("rte").valueAsNumber;
            rte = rte / 100;
            money = simpleInterest(princ, rte, time, perMonth);
        } else if (type == "compound") {
            let rte = document.getElementById("rte").valueAsNumber;
            rte = rte / 100;
            money = compoundInterest(princ, rte, time, perMonth);
        } else if (type == "rate") {
            let paid = document.getElementById("paid").valueAsNumber;
            money = interestPaid(princ, paid, time);
        }
        document.getElementById("money").innerHTML = money;
    }
}
function change() {
    if (document.getElementById("type").value == "simple" && lastType != "compound" || document.getElementById("type").value == "compound" && lastType != "simple") {
        document.getElementById("rates").innerHTML = `<h2>Rate (%)</h2>
    <input class="numbers" type="number" id="rte" name="number" step="0.01" value="${savedRateA}">`;
    } else if (document.getElementById("type").value == "rate") {
        document.getElementById("rates").innerHTML = `<h2>Total Paid</h2>
    <input class="numbers" type="number" id="paid" name="number" step="50" value="${savedRateB}">`;
    }
    saveLast();
}


let advanceActive = false;
function advance() {
    let advClassLength = document.getElementsByClassName("adv").length;
    if (advanceActive === false) {
        for (let i = 0; i < advClassLength; i++) {
            document.getElementsByClassName("adv")[i].style.display = "block";
            advanceActive = true;
        }
    } else {
        for (let i = 0; i < advClassLength; i++) {
            document.getElementsByClassName("adv")[i].style.display = "none";
            advanceActive = false;
        }
    }
}

function timeChanged() {
    timeAmount = document.getElementById("advtime").value;
    document.getElementById("tableTime").innerHTML = timeAmount+ "s";

    document.getElementById("addedPer").innerHTML = timeAmount;
}


document.getElementById("type").addEventListener("change", () => {
    saveNumbers();
    change();
    console.log(document.getElementById("type").value);
});
