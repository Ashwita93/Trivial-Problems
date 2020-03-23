console.log("hi I'm connected to you, HTML!");
window.onload = () => {
    refreshList();
}

function refreshList() {
    fetch("/display", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('data', data);
        document.getElementById("comments").innerHTML = '';
        for (let i = data.length - 1; i => 0; i--) {
            document.getElementById("comments").innerHTML += data[i].title + " says <span>" + data[i].content + "</span> <br/>";
        }
    });
}

const form = document.getElementById("myform");
console.log(form)
form.onsubmit = event => {
    event.preventDefault();
    // const dataInput = event.target.elements ["input"];
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    console.log(title);
    console.log(content);
    fetch("/add", {
        method: "POST",
        body: JSON.stringify({title: title, content: content}),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log("no errors");
        refreshList();
    });

    
};