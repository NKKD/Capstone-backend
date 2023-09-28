import {useState} from "react";
import ROSLIB from 'roslib'

function RobotConnection() {
    const [status, setStatus] = useState("Not connected");
    const ros = new ROSLIB.Ros({encoding: 'ascii'})

    function connect() {

        if (status !== 'Connected!') {
            ros.connect("ws://192.168.1.11:9090")

            ros.on('error', function (error) {
                console.log(error)
                setStatus(error)
            })

            // Find out exactly when we made a connection.
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

    return (
        <div>
            <div>
                {status} <span>to the robot</span>
            </div>
            <button onClick={() => connect()}>Connect</button>
        </div>
    )
}

export default RobotConnection
