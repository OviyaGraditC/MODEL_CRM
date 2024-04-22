function add_lead() {

    let stu_name = document.getElementById("stu_name").value;
    let stu_number = document.getElementById("stu_number").value;
    let stu_course = document.getElementById('stu_course').value;
    let stu_location = document.getElementById("stu_location").value;
    let stu_source = document.getElementById("stu_source").value;
    let stu_status = document.getElementById("stu_status").value;
    let register_user = new addLead();
    register_user.check_details(stu_name, stu_number, stu_course, stu_location, stu_source, stu_status);

    // window.location.href="./login.html";
}

function get_registered_stu_details() {

    fetch("https://retoolapi.dev/XOeueX/empLead", {
        "method": "GET",
        "headers": { "content-type": "application/json;charset=utf-8" }
    })
        .then((response) => { return response.json(); })
        .then((data) => {
            accounts = data;
            displayData(accounts);
        })

}



class addLead {
    check_details(stu_name, stu_number, stu_course, stu_location, stu_source, stu_status) {
        get_registered_stu_details();


        if (stu_name !== "" && stu_number !== "") {

            let account = {
                "stu_name": stu_name,
                "stu_course": stu_course,
                "stu_number": stu_number,
                "stu_source": stu_source,
                "stu_location": stu_location,
                "stu_status": stu_status

            }


            fetch("https://retoolapi.dev/XOeueX/empLead",
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
                    // get_registered_stu_details();
                })

            document.getElementById("confirm_msg").innerHTML = "Lead Added Successfully..!! ";

            document.getElementById("stu_name").value = "";
            document.getElementById("stu_number").value = "";
            document.getElementById("stu_course").value = "";
            document.getElementById("stu_location").value = "";
            document.getElementById("stu_source").value = "";
            document.getElementById("stu_status").value = "";

        }
        else {
            confirm_msg.innerHTML = "Error : Fill all the fields..";

        }
    }
}

function update_column_resetData() {
    update_stu_id.value = "";
    update_stu_name.value = "";
    update_stu_number.value = "";
    update_stu_course.value = "";
    update_stu_location.value = "";
    update_stu_source.value = "";
    update_stu_status.value = "";
}

function delete_registered_stu_details(del_id) {


    console.log("Success");
    fetch('https://retoolapi.dev/XOeueX/empLead/' + del_id, {
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

function updateAccount(accountId) {

    fetch("https://retoolapi.dev/XOeueX/empLead", {
        "method": "GET",
        "headers": { "content-type": "application/json;charset=utf-8" }
    })
        .then((response) => { return response.json(); })
        .then((data) => {
            accounts = data;
            displayData(accounts);


            let update_columns = '<input type="text" class="update_login_input" name="update_stu_id" id="update_stu_id" placeholder="Id No"><input type="text" class="update_login_input" name="update_stu_name" id="update_stu_name" placeholder="Student Name"><input type="number" class="update_login_input" name="update_stu_number" id="update_stu_number" placeholder="Contact Number" readonly> <select class="login_input" name="update_stu_course" id="update_stu_course" placeholder="Course"><option value="" disabled selected hidden>Course</option><option value="fullstack">fullstack</option><option value="frontend">frontend</option><option value="backend">backend</option><option value="python">python</option><option value="angular">angular</option></select><select class="login_input" name="update_stu_location" id="update_stu_location" placeholder="Location"><option value="" disabled selected hidden>Location</option><option value="chennai">chennai</option><option value="tambaram">tambaram</option><option value="trichy">trichy</option><option value="madurai">madurai</option></select><select class="login_input" name="update_stu_source" id="update_stu_source" placeholder="Source"><option value="" disabled selected hidden>Source</option><option value="Google">Google</option><option value="Banner">Banner</option><option value="Poster">Poster</option><option value="Wall painting">Wall painting</option><option value="friends">Friends</option></select><textarea id="update_stu_status" class="update_login_input_status" name="update_stu_status"  placeholder="Status"></textarea><button id="update_psd" class="btn btn-success1 button_top2" onclick="updateAcc()">Update</button>'
            document.getElementById('update_columns').innerHTML = update_columns;
            getInputs();
            let account = accounts.filter((account) => { return account.id == accountId })[0];
            console.log("---------------------------");
            console.log(account);
            accountIdForUpdate = account.id;
            update_stu_id.value = accountId;
            update_stu_name.value = account.stu_name;
            update_stu_number.value = account.stu_number;
            update_stu_course.value = account.stu_course;
            update_stu_location.value = account.stu_location;
            update_stu_source.value = account.stu_source;
            update_stu_status.value = account.stu_status;
        })
}

function updateAcc() {
    get_registered_stu_details();
    getInputs();

    let account = {
        "idno": accountIdForUpdate,
        "stu_name": stu_name,
        "stu_course": stu_course,
        "stu_number": stu_number,
        "stu_source": stu_source,
        "stu_location": stu_location,
        "stu_status": stu_status

    }
    let apiUrl = "https://retoolapi.dev/XOeueX/empLead/" + accountIdForUpdate;
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
    var result = '<b>' + '<th style="background-color: #0e91e3;">' + "Id No" + '</th>' + '<th style="background-color: #0e91e3;">' + "Student Name" + '</th>' + '<th style="background-color: #0e91e3;">' + "Contact Number" + '</th>' + '<th style="background-color: #0e91e3;">' + "Course" + '</th>' + '<th style="background-color: #0e91e3;">' + "Location" + '</th>' + '<th style="background-color: #0e91e3;">' + "Source" + '</th>' + '<th style="background-color: #0e91e3;">' + "Call" + '</th>' + '<th style="background-color: #0e91e3;">' + "Status " + '</th>' + '<th style="background-color: #0e91e3;">' + "Status Update" + '</th>' + '<th style="background-color: #0e91e3;">' + "Delete" + '</th>' + '</b>';

    for (let account of accounts) {

        result += '<tr>' + '<td>' + account.id + '</td>';
        result += '<td>' + account.stu_name + '</td>';
        result += '<td>' + account.stu_number + '</td>';
        result += '<td>' + account.stu_course + '</td>';
        result += '<td>' + account.stu_location + '</td>';
        result += '<td>' + account.stu_source + '</td>';
        result += '<td>' + '<button type="button" style="width: 48px; height: 44px; font-size: 15px; font-size:15px;" class="btn btn-warning" onclick="updateAccount(' + account.id + ')"><img class="call_img" src="../../assets/viber.png"></button>' + '</td>';
        result += '<td>' + account.stu_status + '</td>';
        result += '<td>' + '<button type="button" style="width:auto; height:auto; font-size:15px;" class="btn btn-warning" onclick="updateAccount(' + account.id + ')">Update</button>' + '</td>';
        result += '<td>' + '<button type="button" style="width:auto; height:auto; font-size:15px;" class="btn btn-danger" onclick="delete_registered_stu_details(' + account.id + ')">Delete</button>' + '</td>' + '</tr>';
    }
    document.getElementById('accounts').innerHTML = '<div class="update_column_box">' + result + '</div>';

    get_registered_details();

}

function getInputs() {
    stu_name = document.getElementById('update_stu_name').value;
    stu_number = document.getElementById('update_stu_number').value;
    stu_course = document.getElementById('update_stu_course').value;
    stu_location = document.getElementById('update_stu_location').value;
    stu_source = document.getElementById('update_stu_source').value;
    stu_status = document.getElementById('update_stu_status').value;
}

function get_registered_details() {
    fetch("https://retoolapi.dev/XOeueX/empLead", {
        "method": "GET",
        "headers": { "content-type": "application/json;charset=utf-8" }
    })
        .then((response) => { return response.json(); })
        .then((data) => {
            accounts = data;
        })

}