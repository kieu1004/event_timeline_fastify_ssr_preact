import { h, Component } from 'preact';
import App from '../components/App';
import dataJob from '../utils/data';
import dataUpdate from '../utils/dataUpdate';


class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            job: dataJob
        };
    }

    componentDidMount() {
        localStorage.setItem("dataUpdate", JSON.stringify(dataUpdate));
        const dataJobUpdate = JSON.parse(localStorage.getItem('dataUpdate'));

        //Initialize the channel Client - SW
        //port1, port2
        const messageChannel = new MessageChannel();


        // Initialize the channel
        function initializeMessageChannel() {
            //SW register?
            if (navigator.serviceWorker.controller) {
                //Send messages to SW (1)
                navigator.serviceWorker.controller.postMessage({
                    type: 'INIT_PORT',
                }, [messageChannel.port2]);

                // Listen to the response
                messageChannel.port1.onmessage = (event) => {
                    // Print the result
                    console.log("Message channel response", dataJobUpdate);
                };

                // Then send the message (2)
                navigator.serviceWorker.controller.postMessage({
                    type: 'UPDATE_UI',
                });

            } else {
                console.log("Service Worker controller not available yet. Waiting...");
                // Wait for the controller to be available
                navigator.serviceWorker.addEventListener('controllerchange', initializeMessageChannel);
            }
        }


        // Set up channel
        // to send messages between different tabs or windows in the same browser.
        const broadcast = new BroadcastChannel('ui-channel');

        // Listen to the response
        broadcast.onmessage = (event) => {
            console.log("Broadcast chanel response", dataJobUpdate);
            setTimeout(() => {
                this.setState({
                    job: dataJobUpdate
                });
            }, 10000);
        };
        // Send first request to start the UI update process.
        broadcast.postMessage({
            type: 'UPDATE_UI',
        });


        // Listen to the response from the service worker controller
        navigator.serviceWorker.controller.onmessage = (event) => {
            if (event.data && event.data.type === 'UPDATE_UI_CLIENTS') {
                console.log("Reponse from service worker", dataJobUpdate);
                setTimeout(() => {
                    this.setState({
                        job: dataJobUpdate
                    });
                }, 10000);
            }
        };
        // Send first request to the service worker controller
        navigator.serviceWorker.controller.postMessage({
            type: 'UPDATE_UI_CLIENTS',
        });


        // Initialize the message channel
        initializeMessageChannel();

    }





    componentWillUnmount() {
        clearTimeout(this.timeOutId);
    }





    render() {
        const { job } = this.state;

        return h(App, { dataJob: job });
    }
}

export default Home;
