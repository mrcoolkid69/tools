function split(money) {
    let want = document.getElementById("wants").value;
    let need = document.getElementById("needs").value;
    let save = document.getElementById("saves").value;
    want = parseInt(want);
    need = parseInt(need);
    save = parseInt(save);
    if (want + need + save === 100) {
        return [(need / 100)*money, (want / 100)*money, (save / 100)*money];
    }else if( want + need + save > 100){
        return ["Over 100%","Over 100%","Over 100%",];
    }else if( want + need + save < 100){
        return ["Under 100%","Under 100%","Under 100%",];
    }
    
}
function calcbudget() {
    const money = document.getElementById("budgting").value;
    let output = split(money);
    document.getElementById("need").innerHTML = output[0].toLocaleString(undefined, { style: "currency", currency: "USD" });
    document.getElementById("want").innerHTML = output[1].toLocaleString(undefined, { style: "currency", currency: "USD" });
    document.getElementById("save").innerHTML = output[2].toLocaleString(undefined, { style: "currency", currency: "USD" });
}