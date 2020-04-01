// TODO - Handle user session and determine if they just posted or not

let postReq = new XMLHttpRequest();
let getReq = new XMLHttpRequest();

// This function takes an array input messageList and will populate the div with id #guestbookBody with messages
let displayMessages = messageList => {
    document.getElementById("guestbookBody").innerHTML = "";
    for (i = 0; i < messageList.length; i++) {
        let post = "<div id='guestbookMessage'>" +
            "<p>" + messageList[i].message + "</p>" + "<p>  -" + messageList[i].name + "</p><br>";
        document.getElementById("guestbookBody").innerHTML += post;
    }
}

// This function will handle the data on submit and call the sendReq function to create the postReq
let handleSubmit = () => {
    
    // Create JS Object to pass to request
    const formData = 
    {
        name: document.getElementById("name").value,
        message: document.getElementById("message").value,
    }  

    document.getElementById("name").value = "";
    document.getElementById("message").value = "";

    sendReq(JSON.stringify(formData));

}

// This function is run on page load and sends a getMessage request to the Flask Router
let handleLoad = async function() {
    getReq.open("GET", "https://guestbookrouter.aharken.com:26550/getMessages")
    getReq.send();
    //console.log("Page loaded");
}

// This function is run after the form data is turned into a JSON format and sends it to the Flask Router
let sendReq = async function(formData) {
    postReq.open("POST", "https://guestbookrouter.aharken.com:26550/postMessage");
    postReq.send(formData);
    //console.log(postReq.readyState);
}

// This function handles a state change for the request that is responsible for sending messages to the Flask Router
postReq.onreadystatechange = () => {
    if (postReq.readyState === 4) {// The request is completed
        //console.log(postReq.responseText);
        handleLoad();

    }
}

// This function handles a state change for the request that is responsible for retrieving messages from the Flask Router
getReq.onreadystatechange = () => {
    if (getReq.readyState === 4) {// The request is completed
        console.log(getReq.responseText);
        let jsonResponse = JSON.parse(getReq.responseText);
        if (jsonResponse.success === true)
            displayMessages(jsonResponse.messages);
        
    }
    else {
        console.log(getReq.readyState);
    }
}