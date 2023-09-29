import { useState } from "react";
import ROSLIB from 'roslib'

function RobotConnection() {
    const [status, setStatus] = useState("Not connected");
    const ros = new ROSLIB.Ros({ encoding: 'ascii' });


    function connect() {

        ros.connect("ws://192.168.0.167:9090")

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

    function readVoltageTopic() {

        console.log("start reading")

        const voltageTopic = new ROSLIB.Topic({
            ros: ros,
            name: '/voltage',
            messageType: 'std_msgs/Float32', // adjust the message type
        });

        console.log("topic defined")

        voltageTopic.subscribe(function (message) {
            console.log("voltage here")
            console.log('Received message on ' + voltageTopic.name + ': ' + message.data);
            voltageTopic.unsubscribe();
        });

        connect();
    }


    function readCmdVelTopic() {

        console.log("start reading")

        const cmdVelTopic = new ROSLIB.Topic({
            ros: ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/Twist', // adjust the message type
        });

        console.log("topic defined")

        cmdVelTopic.subscribe(function (message) {
            console.log("cmd vel here")
            console.log('Received message on ' + cmdVelTopic.name + ': ', message); // logging the entire message object
            cmdVelTopic.unsubscribe();
        });

        connect();
    }

    function publishToRGBLight() {

        const rgbLightTopic = new ROSLIB.Topic({
            ros: ros,
            name: '/RGBLight',
            messageType: 'std_msgs/Int32'
        });

        const message = new ROSLIB.Message({
            data: 0 // the data you want to publish
        });

        // Connecting to ROS
        ros.on('connection', function () {
            console.log('Connected to WebSocket server.');

            // Publishing message once connected
            rgbLightTopic.publish(message);
            console.log('Published message to /RGBLight');
        });

        connect();

    }


    function publishMoveToCmdVel() {

        console.log("Start publishing");

        const cmdVelTopic = new ROSLIB.Topic({
            ros: ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/Twist'
        });

        const message = new ROSLIB.Message({
            linear: {
                x: 0.0,
                y: 0.0,
                z: 0.0
            },
            angular: {
                x: 0.0,
                y: 0.0,
                z: 0.0
            }
        });

        console.log("Topic and message defined");

        // Connecting to ROS
        ros.on('connection', function () {
            console.log('Connected to WebSocket server.');

            // Publishing message once connected
            cmdVelTopic.publish(message);
            console.log('Published message to /cmd_vel');
        });

        ros.on('error', function (error) {
            console.log('Error connecting to WebSocket server: ', error);
        });

        ros.on('close', function () {
            console.log('Connection to WebSocket server closed.');
        });

        // Assuming you have a 'connect' function to initiate the connection to ROS.
        connect();
    }









    return (
        <div>
            <div>
                {status} <span>to the robot</span>
            </div>
            <button onClick={() => connect()}>Connect</button>
            <button onClick={() => readVoltageTopic()}>Voltage</button>
            <button onClick={() => readCmdVelTopic()}>Cmd Vel</button>
            <button onClick={() => publishToRGBLight()}>RGB Light</button>
            <button onClick={() => publishMoveToCmdVel()}>Move</button>
        </div>
    )
}

export default RobotConnection;
