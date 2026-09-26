"use strict";
function compoundInterest(p, r, t) {
	let res = `<tr>
    <th>Year</th>
    <th>Interest</th>
    <th>Account Amount</th> 
</tr>`;
	for (let i = 0; i < t; i++) {
		let rate = p * r;
		rate = parseFloat(rate);
		p += rate;
		res += `<tr><td>${i + 1}</td> <td>${rate.toLocaleString(undefined, { style: "currency", currency: "USD" })}</td> <td>${p.toLocaleString(undefined, { style: "currency", currency: "USD" })}</td></tr>`;
	}
	return res;
}
function simpleInterest(p, r, t) {
	let rate = p * r;
	let res = `<tr>
    <th>Year</th>
    <th>Interest</th>
    <th>Account Amount</th> 
</tr>`;
	for (let i = 0; i < t; i++) {
		p += rate;
		res += `<tr><td>${i + 1}</td> <td>${rate.toLocaleString(undefined, { style: "currency", currency: "USD" })}</td> <td>${p.toLocaleString(undefined, { style: "currency", currency: "USD" })}</td></tr>`;
	}
	return res;
}
function interestPaid(p, pa, t) {
	let res = ``;
	let annualInterest = (pa - p) / t;
	let interest = (annualInterest / p) * 100;
	res = `Interest paid is  ${interest.toLocaleString(undefined, { maximumFractionDigits: 6 })}% per year`;
	return res;
}

let savedRateA = 5;
let savedRateB = 800;
let lastType = "simple";
function saveLast(){
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
	if (time >= 1000) {
		alert("Yo");
	} else {
		document.getElementById("money").innerHTML = "";
		if (type == "simple") {
			let rte = document.getElementById("rte").valueAsNumber;
			rte = rte / 100;
			money = simpleInterest(princ, rte, time);
		} else if (type == "compound") {
			let rte = document.getElementById("rte").valueAsNumber;
			rte = rte / 100;
			money = compoundInterest(princ, rte, time);
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
document.getElementById("type").addEventListener("change", () => {
	saveNumbers();
	change();
	console.log(document.getElementById("type").value);
});
