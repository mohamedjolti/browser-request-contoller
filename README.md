# browser-request-Listener
Execute callbacks before or after each fetch api call  or XMlHttprequest call
(Note that the real fetch api and XmlHttpRequest calls are not affected ) 
# Install
```
npm install browser-request-listener
```

# Usage & Api
- 1 Create an instance of the BrowserRequestListener : 
  1. The reportOnError is a callback used when an error occured in a Listener 
  2. The parametre filters.disableForXHr allow you to disable Listeners (pre and post)  for Xhr calls
  3. The parametre filters.disableForFetch allow you to disable Listeners (pre and post)  for Fetch api calls
 
   

```javascript

import { BrowserRequestListener } from "browser-request-Listener";

 

const browserRequestListener = new BrowserRequestListener({
  reportOnError: function (error, event) {
    console.log("report error", error);
  },
  filters: {
    // disableForXHr : true
    // disableForFetch : true, 
  }
});


```
- 2 Add a PreListener for each request :
  1. The params argument contains the payload of the request
  2. The sender is an object that allows you to check if the request has been performed by Fetch or Xhr and the sender instance is the XHr instance or the fetch call 

```javascript
browserRequestListener.addPreHttpRequestListener(function (params,/**@type {Sender}  */ sender) {
  if (sender.getSenderType() == "XHR") {
    console.log("called before XHR", params, sender);
  } else if (sender.getSenderType() == "FETCH_API") {
    console.log("called before Fetch API", params, sender);
  }
});

  ```
- 3 Add a PostListener for each request :
  1. The response agrgument contains the response of the request
  2.  The sender is an object that allows you to check if the request has been performed by Fetch or Xhr and the sender instance is the XHr instance or the fetch call 
  
```javascript

  browserRequestListener.addPostHttpRequestListener(function (response, /**@type {Sender}  */ sender) {
  if (sender.getSenderType() == "XHR") {
    const XHR_INSTANCE = sender.getSenderIntance();
    console.log("called after XML http request")
    if (XHR_INSTANCE.status != 201) {
      console.log("error : ", XHR_INSTANCE.status)
    }

  } else if (sender.getSenderType() == "FETCH_API") {
    console.log("called after Fetch API", response, sender);
  }
});

browserRequestListener.apply();
  
  ```
