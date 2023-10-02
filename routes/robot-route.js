import {Router} from 'express'
var router = Router();

import {RobotController} from "../controllers/robot-controller.js";
const robotController = new RobotController();

router.get("/robot", function (req, res) {
    robotController.getRobotConnection(req,res)
})

router.get("/robot/imu", function (req, res) {
    robotController.getRobotIMUReading(req,res)
})

router.get("/robot/voltage", function (req, res) {
    robotController.getRobotVoltageReading(req,res)
})

router.post("/robot/rgb/:id", function (req, res) {
    robotController.postRGBEffect(req,res)
})

router.post("/robot/movement", function (req, res) {
    robotController.postRobotMovement(req,res)
})

router.post("/robot/estop", function (req, res) {
    robotController.postRobotEstop(req,res)
})

export default router;