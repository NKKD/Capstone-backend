import { useState, useEffect } from "react";
import ROSLIB from 'roslib'

function RobotConnection() {
    const [status, setStatus] = useState("Not connected");
    const [voltage, setVoltage] = useState(null);
    const ros = new ROSLIB.Ros({ encoding: 'ascii' });

    useEffect(() => {
        if (status === 'Connected') {
            readVoltageTopic();
        }
    }, [status]);

    function connect() {
        if (status !== 'Connected') {
            ros.connect("ws://192.168.1.11:9090")

            ros.on('error', function (error) {
                console.log(error)
                setStatus(error.toString())
            })

            ros.on('connection', function () {
                console.log('Connected!')
                setStatus("Connected")
            })

            ros.on('close', function () {
                console.log('Connection closed')
                setStatus("Connection closed")
            })
        }
    }

    function readVoltageTopic() {
        const voltageTopic = new ROSLIB.Topic({
            ros: ros,
            name: '/voltage',
            messageType: 'std_msgs/Float32', // adjust the message type
        });

        voltageTopic.subscribe(function (message) {
            console.log("start reading")
            console.log('Received message on ' + voltageTopic.name + ': ' + message.data);
            setVoltage(message.data);
            // You may unsubscribe after receiving the message if you no longer need to listen to this topic.
            voltageTopic.unsubscribe();
        });
    }


    return (
        <div>
            <div>
                {status} <span>to the robot</span>
            </div>
            {voltage && <div>Voltage: {voltage}</div>}
            <button onClick={() => connect()}>Connect</button>
        </div>
    )
}

export default RobotConnection;
