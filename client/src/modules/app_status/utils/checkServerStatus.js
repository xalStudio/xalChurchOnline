//= Structures & Data
// Own
import OnServerStatusChangedEventName from "../data/OnServerStatusChangedEventName";

export default () => {
    let status;
    if (!window.navigator.onLine) {
        status = "offline";
    } else {
        status = "notConnected";
    }

    window.serverStatus = status;
    window.dispatchEvent(new CustomEvent(OnServerStatusChangedEventName, { detail: status }))
}