import {RobotService} from "../services/robot-service.js";
const robotService = new RobotService();

export class RobotController{

    async getRobotConnection(req, res){
        try {
            let robotIP= req.query.robotIP;
            let robotPortNumber = req.query.robotPortNumber;
            let robotConnection = await robotService.getRobotConnection(robotIP,robotPortNumber);
            res.status(200)
            res.json(robotConnection)
        }
        catch (err) {
            res.status(500);
            res.json({ error: err.message })
        }
    }

    async getRobotIMUReading(req, res){
        try {
            let imuReading = await robotService.getRobotIMUReading();
            res.status(200)
            res.json(imuReading)
        }
        catch (err) {
            res.status(500);
            res.json({ error: err.message })
        }
    }

    async getRobotVoltageReading(req, res){
        try {
            let voltageReading = await robotService.getRobotVoltageReading();
            res.status(200)
            res.json(voltageReading)
        }
        catch (err) {
            res.status(500);
            res.json({ error: err.message })
        }
    }

    postRGBEffect(req,res) {
        try {
            let RGBEffectID = req.query.id
            console.log(RGBEffectID)
            robotService.postRGBEffect(RGBEffectID)
            res.status(200)
            res.json({ result: RGBEffectID })

        }
        catch (err) {
            res.status(500);
            res.json({error: err.message})
        }
    }

    postRobotMovement(req,res) {
        try {
            let robotMovement = req.query
            robotService.postRobotMovement(robotMovement)
            res.status(200)
            res.json({ result: robotMovement })

        }
        catch (err) {
            res.status(500);
            res.json({error: err.message})
        }
    }

    postRobotEstop(req,res) {
        try {
            let robotEstop = robotService.postRobotEstop()
            res.status(200)
            res.json({ result: robotEstop })

        }
        catch (err) {
            res.status(500);
            res.json({error: err.message})
        }
    }


}