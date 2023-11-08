import {  setIsAlreadyApplied } from "../BrowserRequestListener";
import { reportConfigOrDefault } from "./defaultReport";
import { dispatchPostSubscribers } from "./postSubscribers";
import { dispatchPreSubscribers } from "./preSubscribers";
import { Sender, XHR } from "./Sender";

export const applyForXMlHttpRequest = function (configuration) {
    const sender = new Sender();
    sender.setSenderType(XHR);

    const OLD_SEND = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function () {
        this.addEventListener("readystatechange", function () {
            if (this.readyState === XMLHttpRequest.DONE) {
                dispatchPostSubscribers(this.response, sender, configuration.reportOnError);
            }
        })
        this.addEventListener("error", function(event){            
            reportConfigOrDefault({
                sender,
                error: 'ERROR', // hard coding a value here, because there is no error defined
                reportOnError: configuration.reportOnError,
                event
            });
        })
        try {
            sender.setSenderInstance(this);
            dispatchPreSubscribers(arguments, sender, configuration.reportOnError);
        } catch (error) {
            reportConfigOrDefault({
                sender,
                error,
                reportOnError: configuration.reportOnError
            });
        } finally {
            setIsAlreadyApplied(true);
            OLD_SEND.apply(this, arguments);
        }
    }
}