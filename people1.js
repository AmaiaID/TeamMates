createHead();
fetch("http://api.jsonbin.io/b/5b98d3576dce855617e8e6ab", {
    method: "GET",
}).then(function (response) {
    if (response.ok) {
        return response.json();
    }
    throw new Error(response.statusText);
}).then(function (json) {

    createBody(json.people);


}).catch(function (error) {

    console.log("Request failed:" + error.message);
});

function createHead() {
    var thead = document.getElementById("thead");
    var tr = document.createElement("tr");
    createElement("Name", tr, "th");
    createElement("Age", tr, "th");
    createElement("Role", tr, "th");
    createElement("Team", tr, "th");
    createElement("Seniority", tr, "th");
    createElement("+ info", tr, "th");
    thead.appendChild(tr);
}

function createBody(people) {
    var tbody = document.getElementById("tbody");

    tbody.innerHTML = "";

    for (var i = 0; i < people.length; i++)

    {
        var tr = document.createElement("tr");

        /* var name = people.name;
        var personName = document.createElement("td");
        personName.textContent = name;
        tr.appendChild(personName);
*/
        var tdInfo = document.createElement("td");

        var button = document.createElement("button");

        button.setAttribute("id", people[i].contact_info.email);
        button.setAttribute("class", "btn btn-secondary");
        button.textContent = "More info";


        button.addEventListener("click", function () {

            //#modal is the id of the main div in html
            $('#modal').modal('show');
            $('#modal').modal('hide');

            fillModal(event, people);
        });
        tdInfo.appendChild(button);

        /*  info.innerHTML = "<a href='" + data.people[0].email "+'> +"  + data.people[0].email + "</a>"*/

        createElement(people[i].name, tr, "td");
        createElement(people[i].age, tr, "td");
        createElement(people[i].role, tr, "td");
        createElement(people[i].team, tr, "td");
        createElement(people[i].seniority, tr, "td");
        tr.appendChild(tdInfo);
        tbody.appendChild(tr);
    }
}

function createElement(info, wantedRow, elementtype) {
    var element = document.createElement(elementtype);
    element.textContent = info;
    wantedRow.appendChild(element);
}

function fillModal(event, people) {
    for (var i = 0; i < people.length; i++) {     

        if (event.target.id == people[i].contact_info.email) {

            document.getElementsByClassName("modal-title")[0].textContent = people[i].name;
            document.getElementById("picture").innerHTML = "";

            var photo = document.createElement("img");
            photo.classList.add("photo");
            photo.setAttribute("src", people[i].contact_info.photo);
            document.getElementById("picture").appendChild(photo);

            document.getElementById("nickName").textContent = people[i].nickName;
            document.getElementById("phone").textContent = people[i].contact_info.phone;
            document.getElementById("site").textContent = people[i].contact_info.site;

            if (people[i].contact_info.email.length > 0) {
                document.getElementById("noContact").style.display = "none";
                document.getElementById("contact").innerHTML = '<a href= "' + "mailto:" + people[i].contact_info.email + '">' + people[i].contact_info.email + '</a>';

            } else {
                document.getElementById("noContact").style.display = "flex";

            }
        }
    }
}
