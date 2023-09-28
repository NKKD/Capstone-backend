import { useEffect, useState } from "react";
import ROSLIB from "roslib";

function VoltageReader({ ros, isConnected }) {
    const [voltage, setVoltage] = useState(null);

    useEffect(() => {
        if (isConnected) {
            console.log("Subscribing to /voltage topic");

            const voltageTopic = new ROSLIB.Topic({
                ros: ros,
                name: "/voltage",
                messageType: "std_msgs/Float32", // Change to your message type
            });

            console.log("Subscribed to /voltage topic");


            voltageTopic.subscribe(function (message) {
                console.log("Show /voltage topic data");
                console.log("Received message: ", message);
                if(message.data) setVoltage(message.data);
                else console.error("Data not found in the message");
            });


            return () => {
                console.log("Unsubscribing from /voltage topic");
                voltageTopic.unsubscribe();
            };
        }
    }, [ros, isConnected]);

    if (voltage !== null) return <div>Voltage: {voltage}</div>;
    return null;
}

export default VoltageReader;
