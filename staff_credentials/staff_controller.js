

var tempAccDB = [];
var accounts = [];
var accountIdForUpdate = "";




function resetData() {
    username = "";
    psd = "";
    cfmpsd = "";
    confirm_msg = "";
    staff_name = "";
    staff_location = "";
    designation = "";
    contactnumber = "";
    salary = "";
    emp_id = "";

}


function reset_psd_page(forget_psd_username) {
    let username = sessionStorage.getItem("forgetpsd_username");
    let psd = document.getElementById("reset_psd");
    let cfmpsd = document.getElementById('reset_cfmpsd');
    reset_psd(username, psd.value, cfmpsd.value);
}

function get_registered_details() {
    fetch("https://retoolapi.dev/HOcUqC/emp_data", {
        "method": "GET",
        "headers": { "content-type": "application/json;charset=utf-8" }
    })
        .then((response) => { return response.json(); })
        .then((data) => {
            accounts = data;
        })

}

function forget_pswd_get_registered_details(forget_psd_username) {
    fetch("https://retoolapi.dev/HOcUqC/emp_data", {
        "method": "GET",
        "headers": { "content-type": "application/json;charset=utf-8" }
    })
        .then((response) => { return response.json(); })
        .then((data) => {
            accounts = data;


            let username_equals = false;
            for (let account of accounts) {

                if (account.username == forget_psd_username) {
                    sessionStorage.setItem("forgetpsd_username", forget_psd_username);
                    username_equals = true;



                    if (username_equals) {
                        document.getElementById("forgetpsd_confirm_msg").innerHTML = "";
                        window.location.href = "../reset_psd/reset_psd.html";
                    }
                    else
                        document.getElementById("forgetpsd_confirm_msg").innerHTML = "Error : Data Not Found..!";

                } else
                    document.getElementById("forgetpsd_confirm_msg").innerHTML = "Error : Data Not Found..!";

            }
        })
}



class forget_pswd {
    check_username(forget_psd_username) {

        if (forget_psd_username !== "") {

            forget_pswd_get_registered_details(forget_psd_username);

        }
        else
            document.getElementById("forgetpsd_confirm_msg").innerHTML = "Fill Username field..";
    }
}

// let userdb = [];


// function setdb() {
//     sessionStorage.setItem("login_details", userdb);
// }

// function getdb_username() {

//     let userdb = sessionStorage.getItem("login_details");
//     let login_details = userdb.split("/");

//     // for (let userarr of login_details) {
//     //     let splited_db = userarr.split(",");
//         userdb.push(login_details);
//         console.log(userdb);
//     // }
// }

function reset_get_registered_details() {


    fetch("https://retoolapi.dev/HOcUqC/emp_data", {
        "method": "GET",
        "headers": { "content-type": "application/json;charset=utf-8" }
    })
        .then((response) => { return response.json(); })
        .then((data) => {
            accounts = data;
        })

    let update_account = {
        "idno": account.idno,
        "username": username,
        "psd": psd
    }

    let account = accounts.filter((account) => { return account.username == username })[0];

    fetch('https://retoolapi.dev/HOcUqC/emp_data/' + account.idno,
        {
            "method": "PUT",
            "body": JSON.stringify(update_account),
            "headers": { "Content-Type": "application/json; charset=UTF-8" }
        })
        .then((response) => {
            if (response && response.ok) {
                console.log(response.json);
                return response.json();
            }
        })
        .then((data) => {
            console.log(data);

            alert("Account Added.. : " + username);
            // get_registered_stu_details();
        })

}

function reset_psd(username, psd, cfmpsd) {
    console.log(username + " done");
    fetch("https://retoolapi.dev/HOcUqC/emp_data", {
        "method": "GET",
        "headers": { "content-type": "application/json;charset=utf-8" }
    })
        .then((response) => { return response.json(); })
        .then((data) => {
            console.log(data);

            accounts = data;

            let account = accounts.filter((account) => { return account.username == username })[0];
            // console.log("---------------");
            // console.log(account);
            if (psd == cfmpsd) {

                let account_id = account.id;
                console.log("--------**-------");
                console.log(account);
                let account_details = {
                    "idno": account_id,
                    "username": username,
                    "psd": psd,
                    "emp_id": account.emp_id,
                    "salary": account.salary,
                    "username": account.username,
                    "staff_name": account.staff_name,
                    "designation": account.designation,
                    "contactnumber": account.contactnumber,
                    "staff_location": account.staff_location
                }
                let apiUrl = "https://retoolapi.dev/HOcUqC/emp_data/" + account_id;
                fetch(apiUrl, {
                    "method": "PUT",
                    "body": JSON.stringify(account_details),
                    "headers": { "Content-Type": "application/json; charset=UTF-8" }
                }).then((response) => {
                    console.log(response);
                    return response.json()
                })
                    .then((data) => {
                        console.log("---------------");
                        console.log(data);
                        document.getElementById("resetpsd_confirm_msg").innerHTML = "Account Updated Successfully...!";
                        displayData(account_details);
                        get_registered_stu_details();

                    })
            } else
                document.getElementById("resetpsd_confirm_msg").innerHTML = "Error: Password and confirm password doesn't match..!";
        })
}
// else
//             document.getElementById("resetpsd_confirm_msg").innerHTML = "Error : Fill all the columns..";






class login {
    login_page(username, psd) {
        if (username !== "" && psd !== "") {

            fetch("https://retoolapi.dev/HOcUqC/emp_data", {
                "method": "GET",
                "headers": { "content-type": "application/json;charset=utf-8" }
            })
                .then((response) => { return response.json(); })
                .then((data) => {
                    accounts = data;
                    sessionStorage.setItem("login_user", username);

                    let account_data = accounts.filter((account) => { return account.username == username })[0];


                    if (account_data.username == username && account_data.psd == psd) {
                        window.location.href = "../../staff_credentials/staff_home_page/staff_home_page.html";
                    }
                    else
                        document.getElementById("confirm_msg").innerHTML = "Error: Data Not Found..!";

                })
        }
        else
            document.getElementById("confirm_msg").innerHTML = "Error: Fill all the fields";

    }
}

function staffregisterUser() {

    resetData();
    let username = document.getElementById("username");
    let psd = document.getElementById("psd");
    let cfmpsd = document.getElementById('cfmpsd');
    let confirm_msg = document.getElementById("confirm_msg");
    let staff_location = document.getElementById("staff_location");
    let salary = document.getElementById("salary");
    let designation = document.getElementById("designation");
    let staff_name = document.getElementById("staff_name");
    let contactnumber = document.getElementById("contact_number");
    let emp_id = document.getElementById("emp_id");
    let register_user = new RegisterDetails();
    register_user.check_details(username.value, psd.value, cfmpsd.value, staff_name.value, contactnumber.value, designation.value, salary.value, emp_id.value, staff_location.value, confirm_msg.value);

    // window.location.href="./login.html";
}

class RegisterDetails {
    check_details(username, psd, cfmpsd, staff_name, contactnumber, designation, salary, emp_id, staff_location, confirm_msg) {


        fetch("https://retoolapi.dev/HOcUqC/emp_data", {
            "method": "GET",
            "headers": { "content-type": "application/json;charset=utf-8" }
        })
            .then((response) => { return response.json(); })
            .then((data) => {
                accounts = data;
                // displayData(accounts);
                console.log(accounts);
                console.log(username);

                console.log(accounts[0].username);
                let account_duplicate_data = false;
                for (let i = 0; i < accounts.length; i++) {
                    if (accounts[i].username == username) {
                        account_duplicate_data = true;
                        break;
                    }
                    else
                        account_duplicate_data = false;
                }
                // let account_duplicate_data = accounts.filter((account) => { return account.username == username })[0];

                console.log("--------account_duplicate_data-------------");

                console.log(account_duplicate_data);

                if (username !== "" && psd !== "" && cfmpsd !== "" && staff_name !== "" && contactnumber !== "" && designation !== "" && salary !== "" && emp_id !== "" && staff_location !== "") {
                    if(account_duplicate_data == false)
                    {
                    if (psd == cfmpsd) {

                        let account = {
                            "psd": psd,
                            "emp_id": emp_id,
                            "salary": salary,
                            "username": username,
                            "staff_name": staff_name,
                            "designation": designation,
                            "contactnumber": contactnumber,
                            "staff_location": staff_location
                        }


                        fetch("https://retoolapi.dev/HOcUqC/emp_data",
                            {
                                "method": "POST",
                                "body": JSON.stringify(account),
                                "headers": { "Content-Type": "application/json; charset=UTF-8" }
                            })
                            .then((response) => {
                                if (response && response.ok) {
                                    return response.json();
                                }
                            })
                            .then((data) => {
                                alert("Account Added.. : " + data.id);
                                console.log(data);
                                // get_registered_stu_details();
                            })

                        document.getElementById("confirm_msg").innerHTML = "User Registeration Successful..!! ";

                        document.getElementById("username").value = "";
                        document.getElementById("psd").value = "";
                        document.getElementById("cfmpsd").value = "";
                        document.getElementById("staff_name").value = "";
                        document.getElementById("staff_location").value = "";
                        document.getElementById("designation").value = "";
                        document.getElementById("salary").value = "";
                        document.getElementById("emp_id").value = "";
                        document.getElementById("contactnumber").value = "";
                    }
                    else 
                        document.getElementById("confirm_msg").innerHTML = "Error : Password and Confirm Password does not match..";
                }else
                document.getElementById("confirm_msg").innerHTML = "Error : Username Already exist..";
                }
                else {
                    document.getElementById("confirm_msg").innerHTML = "Error : Fill all the fields..";
                }
            })
    }
}

function get_registered_stu_details() {

    fetch("https://retoolapi.dev/HOcUqC/emp_data", {
        "method": "GET",
        "headers": { "content-type": "application/json;charset=utf-8" }
    })
        .then((response) => { return response.json(); })
        .then((data) => {
            accounts = data;
            displayData(accounts);
            console.log(accounts[0]);
        })

}

function delete_registered_stu_details(del_id) {


    console.log("Success");
    // del_id = document.getElementById("to_delete").value;
    fetch('https://retoolapi.dev/HOcUqC/emp_data/' + del_id, {
        method: 'DELETE',
        "headers": { "content-type": "application/json;charset=utf-8" }
    })
        .then((response) => { return response.json(); })
        .then((data) => {
            alert("Account Deleted: " + del_id);

            get_registered_stu_details();
            displayData(accounts);
        })
}

function create_account() {
    window.location.href = "../register/register.html";
}

function update_registered_stu_details() {
    get_registered_stu_details();
    displayData(accounts);
    let account = {
        "username": username,
        "psd": psd
    }

    fetch("https://retoolapi.dev/HOcUqC/emp_data",
        {
            "method": "POST",
            "body": JSON.stringify(account),
            "headers": { "Content-Type": "application/json; charset=UTF-8" }
        })
        .then((response) => {
            if (response && response.ok) {
                console.log(response.json);
                return response.json();
            }
        })
        .then((data) => {
            console.log(data);

            alert("Account Added.. : " + data.id);
            get_registered_stu_details();


        })
    resetData();
}


function getInputs() {
    idno = document.getElementById('update_idno');
    username = document.getElementById('update_username');
    psd = document.getElementById('updated_psd');
    contactnumber = document.getElementById('update_contactnumber');
    staff_name = document.getElementById('update_staff_name');
    staff_location = document.getElementById('update_staff_location');
    designation = document.getElementById('update_designation');
    emp_id = document.getElementById('update_emp_id');
    salary = document.getElementById('update_salary');
}

function getInputs_reset() {
    let reset_psd = document.getElementById('reset_psd');
    let cf_psd = document.getElementById('reset_cfmpsd');
}


function update_column_resetData() {
    update_idno.value = "";
    update_username.value = "";
    updated_psd.value = "";
    update_staff_name.value = "";
    update_contactnumber.value = "";
    update_salary.value = "";
    update_staff_location.value = "";
    update_designation.value = "";
    update_emp_id = "";


}
function updateAccount(accountId) {
    console.log("starting updateAccount");
    fetch("https://retoolapi.dev/HOcUqC/emp_data/" + accountId, {
        "method": "GET",
        "headers": { "content-type": "application/json;charset=utf-8" }
    })
        .then((response) => { return response.json(); })
        .then((data) => {
            accounts = data;

            let update_columns = '<input type="text" class="update_login_input" name="idno" id="update_idno" placeholder="idno" readonly><input type="text" class="update_login_input" name="username" id="update_username" placeholder="Enter username"><input type="text" class="update_login_input" name="psd" id="updated_psd" placeholder="Enter password"><input type="text" class="update_login_input" name="update_staff_name" id="update_staff_name" placeholder="Enter staff name"><input type="text" class="update_login_input" name="update_staff_location" id="update_staff_location" placeholder="Enter staff location"><input type="text" class="update_login_input" name="update_salary" id="update_salary" placeholder="Enter staff salary"><input type="text" class="update_login_input" name="update_designation" id="update_designation" placeholder="Enter designation"><input type="text" class="update_login_input" name="update_contactnumber" id="update_contactnumber" placeholder="Enter contact number"><input type="text" class="update_login_input" name="update_emp_id" id="update_emp_id" placeholder="Enter emp_id"><button id="update_psd" class="btn btn-success button_top1" onclick="updateAcc()">Update</button>'
            document.getElementById('staff_accounts').innerHTML = update_columns;
            // console.log(accounts.username);
            getInputs();
            // let account = accounts.filter((account) => { return account.id == accountId })[0];
            accountIdForUpdate = accountId;
            idno.value = accountIdForUpdate;
            username.value = accounts.username;
            psd.value = accounts.psd;
            staff_name.value = accounts.staff_name;
            staff_location.value = accounts.staff_location;
            salary.value = accounts.salary;
            designation.value = accounts.designation;
            contactnumber.value = accounts.contactnumber;
            emp_id.value = accounts.emp_id;

        })
    // displayData(accounts);
}

function updateAcc() {
    get_registered_stu_details();
    getInputs();

    let account = {
        "id": accountIdForUpdate.value,
        "psd": psd.value,
        "emp_id": emp_id.value,
        "salary": salary.value,
        "username": username.value,
        "staff_name": staff_name.value,
        "designation": designation.value,
        "contactnumber": contactnumber.value,
        "staff_location": staff_location.value
    }
    let apiUrl = "https://retoolapi.dev/HOcUqC/emp_data/" + accountIdForUpdate;
    fetch(apiUrl, {
        "method": "PUT",
        "body": JSON.stringify(account),
        "headers": { "Content-Type": "application/json; charset=UTF-8" }
    }).then((response) => {
        console.log(response);
        return response.json()
    })
        .then((data) => {
            console.log(data);
            alert("Account Updated Successfully...");
            // displayData(accounts);
            get_registered_stu_details();
            displayData(data);

        })
    update_column_resetData();
}


function displayData(accounts) {
    var result = '<table style=" caption-side: bottom;' + 'border-collapse: collapse;' + 'border-style: solid;' + 'border-color: #068ddd;' + 'border-width: thin;">' + '<b>' + '<th>' + "Id No" + '</th>' + '<th>' + "Username" + '</th>' + '<th>' + "Password" + '</th>' + '<th>' + "Name" + '</th>' + '<th>' + "Location" + '<th>' + "salary" + '<th>' + "Designation" + '<th>' + "Contact Number" + '<th>' + "Emp_id" + '</th>' + '<th>' + "Update" + '</th>' + '<th>' + "Delete" + '</th>' + '</b>';

    for (let account of accounts) {
        console.log(account.staff_location);
        result += '<tr>' + '<td>' + account.id + '</td>';
        result += '<td>' + account.username + '</td>';
        result += '<td>' + account.psd + '</td>';
        result += '<td>' + account.staff_name + '</td>';
        result += '<td>' + account.staff_location + '</td>';
        result += '<td>' + account.salary + '</td>';
        result += '<td>' + account.designation + '</td>';
        result += '<td>' + account.contactnumber + '</td>';
        result += '<td>' + account.emp_id + '</td>';
        result += '<td>' + '<button type="button" style="width:auto; height:auto; font-size:15px;" class="btn btn-warning" onclick="updateAccount(' + account.id + ')">Update</button>' + '</td>';
        result += '<td>' + '<button type="button" style="width:auto; height:auto; font-size:15px;" class="btn btn-danger" onclick="delete_registered_stu_details(' + account.id + ')">Delete</button>' + '</td>' + '</tr>';
    }

    document.getElementById('staff_update_columns').innerHTML = '<div class="update_column_box">' + result + '</table>' + '</div>';
    // document.getElementById('staff_accounts').innerHTML = '<div class="update_column_box">' + result + '</table>' + '</div>';
    get_registered_details();

    // return '<div class="update_column_box">' + result + '</div>';
}