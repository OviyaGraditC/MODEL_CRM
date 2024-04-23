var tempAccDB = [];
var accounts = [];
var accountIdForUpdate = "";

function registerUser() {

    resetData();
    let username = document.getElementById("username").value;
    let psd = document.getElementById("psd").value;
    let cfmpsd = document.getElementById('cfmpsd').value;
    let confirm_msg = document.getElementById("confirm_msg").value
    let register_user = new RegisterDetails();
    register_user.check_details(username, psd, cfmpsd);
}

function resetData(username, psd, cfmpsd) {
    username = "";
    psd = "";
    cfmpsd = "";
}

function reset_psd_page(forget_psd_username) {
    let username = sessionStorage.getItem("forgetpsd_username");
    let psd = document.getElementById("reset_psd");
    let cfmpsd = document.getElementById('reset_cfmpsd');
    reset_psd(username, psd.value, cfmpsd.value);
}

function get_registered_details() {
    fetch("https://retoolapi.dev/5Pzpcy/student_login", {
        "method": "GET",
        "headers": { "content-type": "application/json;charset=utf-8" }
    })
        .then((response) => { return response.json(); })
        .then((data) => {
            accounts = data;
        })

}

function forget_pswd_get_registered_details(forget_psd_username) {
    fetch("https://retoolapi.dev/5Pzpcy/student_login", {
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
                        window.location.href = "./reset_psd/reset_psd.html";
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

function reset_get_registered_details() {

    fetch("https://retoolapi.dev/5Pzpcy/student_login", {
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

    fetch('https://retoolapi.dev/5Pzpcy/student_login/' + account.idno,
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
        })
}

function reset_psd(username, psd, cfmpsd) {

    console.log(username + "done");
    fetch("https://retoolapi.dev/5Pzpcy/student_login", {
        "method": "GET",
        "headers": { "content-type": "application/json;charset=utf-8" }
    })
        .then((response) => { return response.json(); })
        .then((data) => {
            accounts = data;
            let account = accounts.filter((account) => { return account.username == username })[0];
            console.log(account.idno);
            if (psd == cfmpsd) {

                let account_id = account.idno;

                let account_details = {
                    "idno": account_id,
                    "username": username,
                    "psd": psd
                }
                let apiUrl = "https://retoolapi.dev/5Pzpcy/student_login/" + account_id;
                fetch(apiUrl, {
                    "method": "PUT",
                    "body": JSON.stringify(account_details),
                    "headers": { "Content-Type": "application/json; charset=UTF-8" }
                }).then((response) => {
                    console.log(response);
                    return response.json()
                })
                    .then((data) => {
                        console.log(data);
                        document.getElementById("resetpsd_confirm_msg").innerHTML = "Account Updated Successfully...!";
                        displayData(account_details);
                        get_registered_stu_details();

                    })
            } else
                document.getElementById("resetpsd_confirm_msg").innerHTML = "Error: Password and confirm password doesn't match..!";
        })
}

class login {
    login_page(username, psd) {
        if(username !== "" && psd !== "") {
            fetch("https://retoolapi.dev/5Pzpcy/student_login", {
                "method": "GET",
                "headers": { "content-type": "application/json;charset=utf-8" }
            })
                .then((response) => { return response.json(); })
                .then((data) => {
                    accounts = data;
                    
                    let account_data = "";
                    sessionStorage.setItem("login_user", username);
                    account_data = accounts.filter((account) => { return account.username == username });
                    
                    if (account_data && account_data.length == 0) {
                        console.log(data);
                        document.getElementById("confirm_msg").innerHTML = "Error: Data Not Found..!";
                    }
                    else if (account_data[0].username == username && account_data[0].psd == psd) {
                        window.location.href = "../student_home_page/student_home_page.html";
                    } else
                        document.getElementById("confirm_msg").innerHTML = "Error: Data Not Found..!";          
                })
        }
        else
            document.getElementById("confirm_msg").innerHTML = "Error: Fill all the fields";
    }
}

class RegisterDetails {
    check_details(username, psd, cfmpsd) {
        fetch("https://retoolapi.dev/5Pzpcy/student_login", {
            "method": "GET",
            "headers": { "content-type": "application/json;charset=utf-8" }
        })
            .then((response) => { return response.json(); })
            .then((data) => {
                accounts = data;
                console.log(accounts);
                console.log(username);

                console.log(accounts[0].username);
                let account_duplicate_data = false;

                for (let i = 0; i < accounts.length; i++) {
                    console.log(accounts[i]);
                    if (accounts[i].username == username) {
                        console.log("inside for");
                        account_duplicate_data = true;
                        break;
                    }
                    else
                        account_duplicate_data = false;
                }

                console.log(account_duplicate_data + "-----");

                if (username !== "" && psd !== "" && cfmpsd !== "") {

                    if (account_duplicate_data == false) {

                        if (psd == cfmpsd) {

                            let account = {

                                "username": username,
                                "psd": psd
                            }
                            fetch("https://retoolapi.dev/5Pzpcy/student_login",
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
                                    document.getElementById("confirm_msg").innerHTML="Automatically Page will be redirected to Login Page"
                                    setInterval(()=>{window.location.href="../login/login.html"}, 3000);
                                })
                            document.getElementById("confirm_msg").innerHTML = "User Registeration Successful..!! ";
                            document.getElementById("username").value = "";
                            document.getElementById("psd").value = "";
                            document.getElementById("cfmpsd").value = "";
                        }
                        else
                            confirm_msg.innerHTML = "Error : Password and Confirm Password does not match..";

                    } else
                        confirm_msg.innerHTML = "Error : Username Already Exist..";

                }
                else {
                    confirm_msg.innerHTML = "Error : Fill all the fields..";

                }

            }
            )
    }
}



function get_registered_stu_details() {

    fetch("https://retoolapi.dev/5Pzpcy/student_login", {
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
    fetch('https://retoolapi.dev/5Pzpcy/student_login/' + del_id, {
        method: 'DELETE',
        "headers": { "content-type": "application/json;charset=utf-8" }
    })
        .then((response) => { return response.json(); })
        .then((data) => {
            alert("Account Deleted: " + del_id);

            get_registered_stu_details();
        })
}

function create_account() {
    window.location.href = "../register/register.html";
}

function update_registered_stu_details() {
    get_registered_stu_details();
    let account = {

        "username": username,
        "psd": psd
    }

    fetch("https://retoolapi.dev/5Pzpcy/student_login",
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
            displayData(data);
        })
    resetData();
}


function getInputs() {
    idno = document.getElementById('update_idno').value;
    username = document.getElementById('update_username').value;
    psd = document.getElementById('updated_psd').value;
}

function getInputs_reset() {

    let reset_psd = document.getElementById('reset_psd');
    let cf_psd = document.getElementById('reset_cfmpsd');
}

function update_column_resetData() {
    update_idno.value = "";
    update_username.value = "";
    updated_psd.value = "";
}

function updateAccount(accountId) {
    get_registered_stu_details();
    let update_columns = '<input type="text" class="update_login_input" name="idno" id="update_idno" placeholder="idno" readonly><input type="text" class="update_login_input" name="username" id="update_username" placeholder="Enter username"><input type="text" class="update_login_input" name="psd" id="updated_psd" placeholder="Enter password"><button id="update_psd" class="btn btn-success button_top1" onclick="updateAcc()">Update</button>'
    document.getElementById('update_columns').innerHTML = update_columns;
    getInputs();
    let account = accounts.filter((account) => { return account.id == accountId })[0];
    accountIdForUpdate = account.id;
    update_idno.value = accountId;
    update_username.value = account.username;
    updated_psd.value = account.psd;


}

function updateAcc() {
    get_registered_stu_details();
    getInputs();

    let account = {
        "idno": accountIdForUpdate,
        "username": username,
        "psd": psd
    }
    let apiUrl = "https://retoolapi.dev/5Pzpcy/student_login/" + accountIdForUpdate;
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
            displayData(accounts);
            get_registered_stu_details();

        })
    update_column_resetData();
}


function displayData(accounts) {
    console.log("success");
    var result = '<b>' + '<th style="background-color: #0e91e3;">' + "Id No" + '</th>' + '<th style="background-color: #0e91e3;">' + "Username" + '</th>' + '<th style="background-color: #0e91e3;">' + "Password" + '</th>' + '<th style="background-color: #0e91e3;">' + "Update" + '</th>' + '<th style="background-color: #0e91e3;">' + "Delete" + '</th>' + '</b>';

    for (let account of accounts) {


        result += '<tr>' + '<td>' + account.id + '</td>';
        result += '<td>' + account.username + '</td>';
        result += '<td>' + account.psd + '</td>';
        result += '<td>' + '<button type="button" style="width:auto; height:auto; font-size:15px;" class="btn btn-warning" onclick="updateAccount(' + account.id + ')">Update</button>' + '</td>';
        result += '<td>' + '<button type="button" style="width:auto; height:auto; font-size:15px;" class="btn btn-danger" onclick="delete_registered_stu_details(' + account.id + ')">Delete</button>' + '</td>' + '</tr>';
    }
    document.getElementById('accounts').innerHTML = '<div class="update_column_box">' + result + '</div>';

    get_registered_details();
}