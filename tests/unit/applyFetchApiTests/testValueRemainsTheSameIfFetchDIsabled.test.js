import { FETCH_API, XHR } from "../../../src/Sender";
import { BrowserRequestController } from "../../../src/browserRequestController";
import { expect, jest, test } from '@jest/globals';




let counter = 0;

beforeEach(() => {
  counter = 0;
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ counterReponse: counter + 1 }),
      clone: () => Promise.resolve({ counterReponse: counter }),
    })
  );
});


it("test value remains the same if apply fech is disabled", async function () {
    const browserRequestController = new BrowserRequestController({
      reportOnError: function (error, event) {
        console.log("report error", error);
      },
      filters: {
        disabelForXhr: true,
        disabelForFetchApi: true
      },
      test: true
    });
  
  
    browserRequestController.addPreHttpRequestListener(function (params,/**@type {Sender}  */ sender) {
      if (sender.getSenderType() == XHR) {
      } else if (sender.getSenderType() == FETCH_API) {
        counter = 4;
      }
    });
  
    browserRequestController.apply();
  
    expect(counter).toEqual(0);
    counter = await fetch('URL').then(response => response.json()).then(data => data.counterReponse);
    expect(counter).toEqual(1);
  
  })