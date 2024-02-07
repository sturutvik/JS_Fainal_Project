// mens

// Get Category data into Dropdown

let list = JSON.parse(localStorage.getItem("Categorydata"));
row = '';

if (list != null && list.category.length > 0) {

    for (let i = 0; i < list.category.length; i++) {
        row += "<option value='" + list.category[i].id + "'>" + list.category[i].catname + "</option>";
    }
    document.getElementById("oselect").innerHTML = row;
}

// result store into localstorage

display();

document.getElementById("proimg").addEventListener("change", () => {

    let pimg = document.getElementById("proimg");

    if (pimg.files && pimg.files[0]) {

        let v = new FileReader();

        v.readAsDataURL(pimg.files[0]);

        v.addEventListener("load", () => {

            localStorage.setItem("proimg", JSON.stringify(v.result));
            document.proform.imgupdate.value = v.result;

        });

    }

});

// Insert / add product data to localstorage


document.getElementById("menbtn").addEventListener("click", () => {

    let pcatid = document.proform.oselect.value;
    let pname = document.proform.proname.value;
    let pprice = document.proform.proprice.value;
    let pid = document.proform.proupdate.value;
    let pimg = document.proform.imgupdate.value;

    let probj = {
        id: 1,
        pid: 1,
        name: pname,
        price: pprice,
        img: JSON.parse(localStorage.getItem("proimg")),
        catid: pcatid
    }

    let probj2 = {};
    probj2.product = [probj]

    let data = JSON.parse(localStorage.getItem("ProductDetails"));

    if (pname != '') {

        if (data != null) {

            if (pid != '') {

                for (let i = 0; i < data.product.length; i++) {

                    if (pid == data.product[i].id) {

                        data.product[i].name = pname;
                        data.product[i].price = pprice;
                        data.product[i].catid = pcatid;
                        if (pimg != '') {
                            data.product[i].img = pimg;
                        } else {
                            data.product[i].img = JSON.parse(localStorage.getItem('proimg'));
                        }

                    }

                }
                localStorage.setItem("ProductDetails", JSON.stringify(data));
                document.getElementById("proupdate").value = '';
                localStorage.removeItem('proimg');

            } else {

                let k = data.product.length;
                probj = {
                    id: k + 1,
                    pid: k + 1,
                    name: pname,
                    price: pprice,
                    img: JSON.parse(localStorage.getItem("proimg")),
                    catid: pcatid
                }


                data.product.push(probj);
                probj2 = data;
                localStorage.setItem("ProductDetails", JSON.stringify(probj2));
                localStorage.removeItem('proimg');
            }


        } else {
            // add  
            probj2.product = [probj];
            localStorage.setItem("ProductDetails", JSON.stringify(probj2));
            localStorage.removeItem('proimg');

        }

        document.proform.reset();


        display();

    }

});

// Display data

function display() {

    let pt = '';

    pt += "<tr>";
        pt += "<th><b><center>Id</center></b></th>";
        pt += "<th><b><center>Category Name</center></b></th>";
        pt += "<th><b><center>Name</center></b></th>";
        pt += "<th><b><center>Price</center></b></th>";
        pt += "<th><b><center>Image</center></b></th>";
        pt += "<th colspan='2'><b><center>Action</center></b></th>";
        pt += "</tr>";

    let d = JSON.parse(localStorage.getItem("ProductDetails"));

    if ((d != null) && (d.product.length > 0)) {

        let c = JSON.parse(localStorage.getItem("Categorydata"));


        for (let i = 0; i < d.product.length; i++) {
            pt += "<tr>";
            pt += "<td><center>" + d.product[i].id + "</center></td>";

            for(let j=0;j<c.category.length;j++){
                if(c.category[j].id == d.product[i].catid){
                    pt +=  `<td><center>${c.category[j].catname}</center></td>`;
                }
            }

            pt += "<td><center>" + d.product[i].name + "</center></td>";
            pt += "<td><center>" + d.product[i].price + "</center></td>";
            pt += "<td><center> <img src='" + d.product[i].img + "'  id='productimg' alt='please upload image in maxium size of 2MB'> </center></td>";

            pt += "<td><center> <input type='button' name='edit' id='edit' onclick='editdata(" + d.product[i].id + ")' value='Edit'></center></td>";

            pt += "<td><center> <input type='button' name='del' id='del' onclick='deldata(" + d.product[i].id + ")' value='Delete'></center></td>";
            pt += "</tr>";
        }

    }

    document.getElementById("userData").innerHTML = pt;

}

// Delete data

function deldata(id) {

    let inf = JSON.parse(localStorage.getItem("ProductDetails"));

    if (inf != null && inf.product.length > 0) {

        let id2 = id - 1;
        inf.product.splice(id2, 1);
        let j = 1;
        for (let i = 0; i < inf.product.length; i++) {
            inf.product[i].id = j;
            inf.product[i].pid = j;
            j++;
        }
        
        localStorage.setItem("ProductDetails", JSON.stringify(inf));
        display();
    }

    display();

}

// Edit data

function editdata(id) {

    let inf = localStorage.getItem("ProductDetails");

    let data2 = JSON.parse(inf);

    for (let i = 0; i < data2.product.length; i++) {

        if (id == data2.product[i].id) {

            document.proform.proname.value = data2.product[i].name;
            document.proform.proprice.value = data2.product[i].price;
            document.proform.proupdate.value = data2.product[i].id;
            document.proform.oselect.value = data2.product[i].catid;
            document.proform.imgupdate.value = data2.product[i].img;

        }

    }
}

