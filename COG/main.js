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
        let toEmail = encodeURI('editor@thecogpublication.in');
        let subject = encodeURI(`Support request by ${data['name']}`);
        let plan = data['selectedValue'] == 'None' ? `I haven't decided any plan to choose from.` : `I would like to choose <strong>${data['selectedValue']}</strong> plan`
        let body = encodeURI(`<h3>Hello! I am ${data['name']}</h3><p>I wanted some help in publishing my book - <strong>{YOUR BOOK NAME}</strong> which will be ready - ${data['bookStatus']}. The book is of type - ${data['items']}</p></br><p>${plan}</p></br><p>You can reach out to me via</br>Email: ${data['email']} or</br>Contact: ${data['phone']}</p></br></br><p>Thank you,</p><p>${data['name']}</p>`);
        window.location.href = `mailto:${toEmail}?&subject=${subject}&body=${body}`
    }
}
