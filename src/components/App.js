import { h, render, Component } from 'preact';
import logo from '../assets/clip.png'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobData: props.dataJob
        };
    }

    render() {
        return (
            <div style={{ backgroundColor: '#f5f6f7' }}>
                <p className="date">August 2022</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className='sortable-list' style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        {this.props.dataJob.map((item, index) => (
                            this.renderItem(index, item)
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    renderItem(index, item) {

        return (
            <div key={index} style={{ backgroundColor: 'white', width: '100%', height: '100%', display: 'flex' }} draggable
                className='item'
            >
                <div style={{ flex: 1, flexDirection: 'column', display: 'flex', marginRight: 15, direction: 'rtl' }}>
                    <text style={{ lineHeight: '20px', marginTop: 15, marginBottom: 5, fontFamily: 'Arial', fontSize: 13, color: 'gray' }} className='time'>{item.time}</text>
                    <img src={logo} alt={`attach`} style={{ width: 15, height: 15, marginBottom: 0 }}></img>
                </div>
                <div style={{ backgroundColor: item.status === 'finished' ? '#0070f2' : 'lightgray', width: 3, position: 'relative' }}>
                    <div style={{ width: 20, height: 20, backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '25%', left: '50%', transform: 'translate(-50%, -50%)', borderWidth: 2, borderColor: 'blue' }}>
                        <div style={{ width: item.status === 'finished' ? 15 : 10, height: item.status === 'finished' ? 15 : 10, backgroundColor: item.status === 'unfinished' ? 'white' : '#0070f2', borderRadius: '50%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', border: item.status === 'unfinished' ? '3px solid gray' : 'white' }}>
                            {item.icon && (
                                <img
                                    className='icon'
                                    src={item.icon}
                                    alt={`${item.icon}`}
                                    style={{ width: 10, height: 10, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', filter: 'brightness(0) invert(1)' }}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div style={{ flex: 3.5, paddingTop: 10, paddingBottom: 10, borderBottom: '1px solid lightgray', marginLeft: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <p style={{ display: 'block', fontWeight: 'bold', fontFamily: 'Arial', lineHeight: '1px' }} className='title'>{item.title}</p>
                            <p style={{ display: 'block', fontSize: 14, lineHeight: '10px', fontFamily: 'Arial' }} className='description'>{item.description}</p>
                            <p style={{ display: 'block', fontSize: 12, color: 'gray', lineHeight: '10px', fontFamily: 'Arial' }} className='attribute'>{item.attribute}</p>
                        </div>
                        <div style={{ padding: 5, paddingRight: 20, direction: 'rtl' }}>
                            <p style={{ display: 'block', fontSize: 12, color: 'gray', lineHeight: '1px', fontFamily: 'Arial' }} className='status1'>{item.status1}</p>
                            <p style={{ display: 'block', fontSize: 12, color: 'gray', fontFamily: 'Arial' }} className='status2'>{item.status2}</p>
                            <p style={{ display: 'block', fontSize: 12, color: 'gray', lineHeight: '2px', fontFamily: 'Arial' }} className='attribute'>{item.attribute}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default App;