//let req = {}
//let query = ""
let results = []
//let pw = "Bailey10" 
//let netID = "jad64177"
//let database = "375groupb4"


btnAdd.onclick = function() {
    let userID = inptUID.value
    let name = inptName.value
    let num = inptNum.value
    let grade = inptGrade.value
    let home = inptHome.value
    let homestate = inptHomeState.value
    let location = inptCurrent.value
    let query = "INSERT INTO person (`user_id`,`name`, `phone_number`, `grade_level`, `hometown`, `home_state`, `current_location`) VALUES ('" + userID + "', '" + name + "', '" + num + "', '" + grade + "', '" + home + "', '" + homestate + "','" + location + "')"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=" + database + "&query=" + query)
    if (req.status == 200) {
        if (req.responseText == 500)
            lblMessage.value = "You have successfully added the customer!"
        else
            lblMessage.value = "There was a problem with adding the customer to the database."
    } else
        lblMessage.value = "Error: " + req.status
}
imgBackHome.onclick=function(){
    ChangeForm(welcomePage)
}
