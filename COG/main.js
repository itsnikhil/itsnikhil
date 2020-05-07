let txt = document.getElementById('tag');
let list = document.getElementById('list');
let items = [];
const event = new KeyboardEvent('keypress', {
    key: 'Enter',
});
function simulateEnterPress() {
    txt.dispatchEvent(event);
}
txt.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        let val = txt.value;
        if (val !== '') {
            if (items.indexOf(val) >= 0) {
                alert('Tag name is a duplicate');
            } else {
                if (items.length == 5) {alert('You have reached the maximum limit allowed of 5 tags!'); return}
                items.push(val);
                render();
                txt.value = '';
                txt.focus();
            }
        } else {
            alert('Please type a tag Name');
        }
    }
});

function render() {
    list.innerText = '';
    items.map((item, index) => {
        let listItem = document.createElement("li");
        let itemHolder = document.createElement("span");
        let itemRemove = document.createElement("a");
        itemHolder.innerText = item;
        itemRemove.innerText = 'X';
        itemRemove.href = `javascript: remove(${index})`;
        listItem.appendChild(itemHolder);
        listItem.appendChild(itemRemove);
        list.appendChild(listItem);
    });
}

function remove(i) {
    items = items.filter(item => items.indexOf(item) != i);
    render();
}

window.onload = function () {
    render();
    txt.focus();
}
let selectedValue;
function selectThis(x, value) {
    if (document.querySelector(".cards .selected") != null) { document.querySelector(".cards .selected .left svg path").classList.add("tick"); }
    if (document.querySelector(".cards .selected") != null)
        document.querySelector(".cards .selected").classList.toggle("selected");
    x.classList.toggle("selected");
    x.querySelector(".cards .selected .left svg path").classList.remove("tick");
    selectedValue = value;
}
selectThis(document.querySelector(".cards .card"), "Bronze");

function validateData(){
    let bookStatus = null;
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('contact').value;
    let agree = document.getElementById('agree').checked;
    document.querySelectorAll("input[name='book-status']").forEach((t) => {if(t.checked) bookStatus = t.value})
    // GUARD CLAUSES
    if(items.length == 0) {alert("Please provide at least 1 tag for type of book. Hit enter after selecting a value!"); return (false)}
    if(bookStatus == null) {alert("Please provide book status!"); return (false)}
    if(name == "") {alert("Please provide your name!"); return (false)}
    if(email == "") {alert("Please provide your email address!"); return (false)}
    if(phone.length < 10) {alert("Please provide valid phone number!"); return (false)}
    if(!agree) {alert("Please accept our terms and conditions!"); return (false)}
    return {
        items: items.toString(),
        bookStatus: bookStatus,
        selectedValue: selectedValue,
        name: name,
        email: email,
        phone: phone
    }
}

function sendMail(){
    data = validateData();
    if (data){
        let fromEmail = encodeURI('taneja.nikhil03@gmail.com');
        let subject = encodeURI(`Support request by ${data['name']}`);
        let body = encodeURI(`<h1>HEADING</h1>Name: ${data['name']}\nEmail: ${data['email']}\nContact: ${data['phone']}\nBook Status: ${data['bookStatus']}\nPlan: ${data['selectedValue']}\nBook tags: ${data['items']}\n`);
        window.location.href = `mailto:${fromEmail}?&subject=${subject}&body=${body}`
    }
}