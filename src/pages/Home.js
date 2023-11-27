import { h, Component } from 'preact';
import App from '../components/App';
import dataJob from '../utils/data';
import dataJobUpdate from '../utils/dataUpdate';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            job: dataJob
        };
    }

    componentDidMount() {
        this.timerId = setTimeout(() => {
            this.setState({
                job: dataJobUpdate
            });
        }, 10000);
    }

    componentWillUnmount() {
        clearTimeout(this.timerId);
    }

    render() {
        const { job } = this.state;

        return h(App, { dataJob: job });
    }
}

export default Home;
