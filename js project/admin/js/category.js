// category

let num = 0;

display();

document.getElementById("ctbtn").addEventListener("click", () => {

    let name = document.catform.catname.value;

    let id = 1;

    let up = document.catform.update.value;

    let getdata = localStorage.getItem("Categorydata");

    let a = JSON.parse(getdata);

    let data = {};

    let b = {
        catname: name,
        id: 1
    }

    if (a != null) {
        // push

        if (up != '') {

            for (let i = 0; i < a.category.length; i++) {

                if (up == a.category[i].id) {

                    a.category[i].catname = name;

                }

            }

            localStorage.setItem("Categorydata", JSON.stringify(a));

            document.getElementById("update").value = '';

        } else {

            let k = a.category.length;
            b = {
                catname: name,
                id: k + 1
            }

            a.category.push(b);
            data = a;

            localStorage.setItem("Categorydata", JSON.stringify(data));

        }


    } else {
        // add  
        data.category = [b];
        localStorage.setItem("Categorydata", JSON.stringify(data));
    }

    document.catform.reset();

    display();

});

// Display data

function display() {

    let pt = '';

    let d = JSON.parse(localStorage.getItem("Categorydata"));

    if ((d != null) && (d.category.length > 0)) {
        pt += "<tr>";
        pt += "<th><b><center>Id</center></b></th>";
        pt += "<th><b><center>Name</center></b></th>";
        pt += "<th colspan='2'><b><center>Action</center></b></th>";
        pt += "</tr>";

        for (let i = 0; i < d.category.length; i++) {
            pt += "<tr>";
            pt += "<td><center>" + d.category[i].id + "</center></td>";
            pt += "<td><center>" + d.category[i].catname + "</center></td>";
            pt += "<td><center> <input type='button' name='edit' id='edit' onclick='editdata(" + d.category[i].id + ")' value='Edit'></center></td>";
            pt += "<td><center> <input type='button' name='del' id='del' onclick='deldata(" + d.category[i].id + ")' value='Delete'></center></td>";
            pt += "</tr>";


        }
    }

    document.getElementById("userData").innerHTML = pt;

}

// Delete data

function deldata(id) {

    let inf = JSON.parse(localStorage.getItem("Categorydata"));

    if (inf != null && inf.category.length > 0) {

        let id2 = id - 1;
        inf.category.splice(id2, 1);
        let j = 1;
        for (let i = 0; i < inf.category.length; i++) {
            inf.category[i].id = j;
            j++;
        }

        localStorage.setItem("Categorydata", JSON.stringify(inf));
        display();
    }

    display();
}

// Edit data

function editdata(id) {

    let inf = localStorage.getItem("Categorydata");

    let data = JSON.parse(inf);
    for (let i = 0; i < data.category.length; i++) {

        if (id == data.category[i].id) {

            document.catform.catname.value = data.category[i].catname;

            document.catform.update.value = data.category[i].id;

        }

    }
}
