// custom js

let data = JSON.parse(localStorage.getItem("Categorydata"));

let row = '';

for (let i = 0; i < data.category.length; i++) {
    row += `<li><a class="dropdown-item" onclick='dcatdata(${data.category[i].id})' href="#">${data.category[i].catname}</a></li>`;
}
document.getElementById("menu").innerHTML = row;


// Display product in website

let disproduct = JSON.parse(localStorage.getItem("ProductDetails"));

let row2 = '';

if (disproduct != null && disproduct.product.length > 0) {
    for (let i = 0; i < disproduct.product.length; i++) {

        row2 += `<a href="">
        <div class="product_box">
          <div class="product_img-box">
            <img src="${disproduct.product[i].img}" class="rounded-3" style="height:230px;" alt="" />
            <span href="" id='addtocartnum' onclick='addtocart( ${disproduct.product[i].pid} )'>
              Sale
            </span>
          </div>
          <div class="product_detail-box">
            <span class="">
              $${disproduct.product[i].price}
            </span>
            <p>
              ${disproduct.product[i].name}
            </p>
          </div>
        </div>
      </a>`;


    }

    document.getElementById("productmaindiv").innerHTML = row2;
}

// Add to cart

addtocartdisplay();

function addtocart(id) {

    let data = JSON.parse(localStorage.getItem("ProductDetails"));

    let addtocartdata = JSON.parse(localStorage.getItem("addtocartdetail"));

    let addtocartsave = {};

    let addtocartsave2 = {};

    if (addtocartdata != null) {


        let cartData = addtocartdata.find(function (e) {
            return e.pid == id;
        })


        if (cartData != null) {

            console.log("...");
        } else {
            //push
            for (let i = 0; i < data.product.length; i++) {

                if (id == data.product[i].pid) {
                    let len = addtocartdata.length;

                    addtocartsave = {

                        id: len + 1,
                        name: data.product[i].name,
                        img: data.product[i].img,
                        price: data.product[i].price,
                        pid: data.product[i].pid,

                    }


                    addtocartdata.push(addtocartsave);
                    addtocartsave2 = addtocartdata;
                    localStorage.setItem("addtocartdetail", JSON.stringify(addtocartsave2));

                }

            }

        }


    } else {

        for (let i = 0; i < data.product.length; i++) {

            if (id == data.product[i].id) {

                addtocartsave = {


                    id: 1,
                    name: data.product[i].name,
                    img: data.product[i].img,
                    price: data.product[i].price,
                    pid: data.product[i].pid

                };


            }

        }

        localStorage.setItem("addtocartdetail", JSON.stringify([addtocartsave]));

    }
    addtocartdisplay();
}

function addtocartdisplay() {

    let data = JSON.parse(localStorage.getItem("addtocartdetail"));

    let row3 = '';


    let sum = 0;

    if (data != null) {
        row3 += "<tr class='border'>";
        row3 += "<th class='border border-end text-dark'><center>Id</center></th>";
        row3 += "<th class='border border-end text-dark'><center>Name</center></th>";
        row3 += "<th class='border border-end text-dark'><center>Product</center></th>";
        row3 += "<th class='border border-end text-dark'><center>Price</center></th>";
        row3 += "<th class='text-dark'><center>Action</center></th>";
        row3 += "</tr>";

        for (let i = 0; i < data.length; i++) {

            row3 += "<tr class='border'>";
            row3 += "<td class='border border-end text-dark'><center>" + data[i].id + "</center></td>";
            row3 += "<td class='border border-end text-dark'><center>" + data[i].name + "</center></td>";
            row3 += "<td class='border border-end'><center> <img src='" + data[i].img + "' id='addtocartimg' style='height: 50px;'> </center></td>";
            row3 += "<td class='border border-end'><center>" + "₹ " + data[i].price + "</center></td>";
            row3 += "<td><center> <input type='button' name='del' id='del' onclick='delcartdata(" + data[i].id + ")' value='Delete'></center></td>";
            row3 += "</tr>";

            sum += parseInt(data[i].price);


        }

    }



    row3 += "<td class='border border-end text-dark' style='font-weight: bold;' colspan='3'><center>Total Amount</center></td>";
    row3 += "<td colspan='2'><center>₹ " + sum + "</center></td>";

    document.getElementById("addtocart-table").innerHTML = row3;

}

// Delete cart data

function delcartdata(id) {

    let data = JSON.parse(localStorage.getItem("addtocartdetail"));

    if (data != null) {

        for (let i = 0; i < data.length; i++) {

            if (id == data[i].id) {

                let id2 = id - 1;
                data.splice(id2, 1);
                let j = 1;
                for (let i = 0; i < data.length; i++) {
                    data[i].id = j;
                    j++;
                }


                localStorage.setItem("addtocartdetail", JSON.stringify(data));
                addtocartdisplay();

            }

        }

    }

    addtocartdisplay();

}



