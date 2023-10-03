import ROSLIB from 'roslib'
export class RobotService{

    // #robotIP;
    // #robotPortNumber;
    #ros;

    getRobotConnection(robotIp, robotPortNumber) {
        if (!robotIp || !robotPortNumber) {
            throw new Error('IP and Port Number must be provided!');
        }

        this.#ros = new ROSLIB.Ros({ encoding: 'ascii' });

        this.#ros.on('error', function (error) {
            console.error('Error connecting to robot:', error);
            // Consider handling the error more effectively, for example, by setting up a callback or event emitter.
        });

        this.#ros.on('connection', function () {
            console.log('Connected!');
        });

        this.#ros.on('close', function () {
            console.log('Connection closed');
            // Handle connection closed more effectively here, perhaps by reconnecting or informing the user.
        });

        const robotAddress = "ws://" + robotIp + ":" + robotPortNumber;
        this.#ros.connect(robotAddress);

    }



    getRobotIMUReading() {
        return new Promise((resolve, reject) => {
            if (!this.#ros || !this.#ros.isConnected) {
                reject('Not connected to ROS');
                return;
            }

            const imuTopic = new ROSLIB.Topic({
                ros: this.#ros,
                name: '/imu/data',
                messageType: 'sensor_msgs/Imu',
            });

            imuTopic.subscribe((message) => {
                console.log('Received message on ' + imuTopic.name + ': ', message);
                imuTopic.unsubscribe();
                resolve(message); // Resolve the promise with the received message
            });
        });
    }


    getRobotVoltageReading() {
        return new Promise((resolve, reject) => {
            if (!this.#ros || !this.#ros.isConnected) {
                reject('Not connected to ROS');
                return;
            }

            const voltageTopic = new ROSLIB.Topic({
                ros: this.#ros,
                name: '/voltage',
                messageType: 'std_msgs/Float32', // adjust the message type
            });

            console.log("topic defined");

            voltageTopic.subscribe((message) => {
                console.log("voltage here");
                console.log('Received message on ' + voltageTopic.name + ': ' + message.data);
                voltageTopic.unsubscribe();
                resolve(message); // Resolve the promise with the received message
            });
        });
    }


    postRGBEffect(RGBEffectID) {

        if (!this.#ros || !this.#ros.isConnected) {
            console.error('Unable to publish RGB Effect: ROS is not connected');
            return;
        }

        const rgbLightTopic = new ROSLIB.Topic({
            ros: this.#ros,
            name: '/RGBLight',
            messageType: 'std_msgs/Int32'
        });

        const parsedRGBEffectID = parseInt(RGBEffectID, 10);

        const message = new ROSLIB.Message({
            data: parsedRGBEffectID
        });

        console.log('Publishing message to /RGBLight:', parsedRGBEffectID);
        rgbLightTopic.publish(message);
        console.log('Published message to /RGBLight');
    }


    postRobotMovement(robotMovement) {

        if (!this.#ros || !this.#ros.isConnected) {
            console.error('Unable to publish Robot Movement: ROS is not connected');
            return;
        }

        const cmdVelTopic = new ROSLIB.Topic({
            ros: this.#ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/Twist'
        });

        const message = new ROSLIB.Message({
            linear: {
                x: Number(robotMovement.linearX),
                y: Number(robotMovement.linearY),
                z: Number(0.0)
            },
            angular: {
                x: Number(0.0),
                y: Number(0.0),
                z: Number(robotMovement.angularZ)
            }
        });

        console.log("Topic and message defined");
        cmdVelTopic.publish(message);
        console.log('Published message to /cmd_vel');
    }


    postRobotEstop() {
        if (!this.#ros || !this.#ros.isConnected) {
            console.error('Unable to publish Estop: ROS is not connected');
            return;
        }

        const cmdVelTopic = new ROSLIB.Topic({
            ros: this.#ros,
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

        cmdVelTopic.publish(message);
        console.log('Published Estop to /cmd_vel');
    }



    // function readCmdVelTopic() {
    //
    //     console.log("start reading")
    //
    //     const cmdVelTopic = new ROSLIB.Topic({
    //         ros: ros,
    //         name: '/cmd_vel',
    //         messageType: 'geometry_msgs/Twist', // adjust the message type
    //     });
    //
    //     console.log("topic defined")
    //
    //     cmdVelTopic.subscribe(function (message) {
    //         console.log("cmd vel here")
    //         console.log('Received message on ' + cmdVelTopic.name + ': ', message); // logging the entire message object
    //         cmdVelTopic.unsubscribe();
    //     });
    //
    //     connect();
    // }


}