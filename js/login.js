const button = document.querySelector("#button")
const username = document.querySelector("#username")
const password = document.querySelector("#password")
const email = document.querySelector("#email")

button.addEventListener ( "click" , function(e){
    let mail = "hei.nomena.4@gmail.com"
    let nom = "nomena"
    let mots = "789456"
    if ( username.value == nom && password.value == mots && email.value == mail){
        window.location.href = ""
        button.value = "..."
        setTimeout(function(e){
            button.value = "Login Now"
        } , 2000)
    } else 
    {
        const alert = document.querySelector(".login_alert")
        button.value = "..."
        setTimeout(function(e){
            button.value = 'Login Now'
        } , 2000)
        setTimeout(function(e){
            if ( alert.classList.contains('login_alert_style')){
                alert.classList.remove('login_alert_style')
            }else{
                alert.classList.add('login_alert_style')
            }
         
        },2000)
    }

})