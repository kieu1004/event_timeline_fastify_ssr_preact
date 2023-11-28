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

        this.timeOutId = setTimeout(() => {
            this.setState({
                job: dataJobUpdate
            });
        }, 10000);
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
