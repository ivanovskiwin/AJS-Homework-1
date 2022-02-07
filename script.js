let button = document.getElementById("button");
let table = document.getElementById("table");
async function makeApiCall(url){
    try{
    let response = await fetch(url);
    let lastPromise = await response.json();
    let result = lastPromise.results;
    printResult(result);
    } catch(error){
        alert(error);
        return 0;
    }
}

function printResult(resultObjects){
    clearTable();
    let tbody = document.createElement("tbody");
    let namesArray = ["name", "population", "climate", "gravity"];
    for(let planet of resultObjects){
        let tr = document.createElement("tr");
        for(let name of namesArray){
            let td = document.createElement("td");
            td.innerText = planet[name];
            tr.append(td);
        }
        tbody.append(tr);
    }
    table.append(tbody);
}

function clearTable() {
    if(document.querySelector("tbody") == null){
        return 0;
    } else{
        let tbody = document.querySelector("tbody");
        tbody.remove();
    }
}

button.addEventListener("click", () => {
    makeApiCall("https://swapi.dev/api/planets/?page=1");
    button.style.display = "none";
    let nextItems = document.createElement("button");
    nextItems.innerText = "Next 10 -->";
    table.after(nextItems);
    nextItems.addEventListener("click", () => {  
        makeApiCall("https://swapi.dev/api/planets/?page=2");
        nextItems.style.display = "none";
        let previousItems = document.createElement("button");
        previousItems.innerText = "<-- Previous 10";
        table.after(previousItems);
        previousItems.addEventListener("click", () => {
            makeApiCall("https://swapi.dev/api/planets/?page=1");
            previousItems.remove();
            nextItems.style.display = "inline-block";
        });
    });
});
