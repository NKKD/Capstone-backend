import { useState } from "react";










    return (
        <div>
            <div>
                {status} <span>to the robot</span>
            </div>
            <button onClick={() => connect()}>Connect</button>
            <button onClick={() => readVoltageTopic()}>Voltage</button>
            <button onClick={() => readCmdVelTopic()}>Cmd Vel</button>
            <button onClick={() => readImuTopic()}>IMU</button>
            <button onClick={() => publishToRGBLight()}>RGB Light</button>
            <button onClick={() => publishMoveToCmdVel()}>Move</button>
        </div>
    )
}

export default RobotConnection;
