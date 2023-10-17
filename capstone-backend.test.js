// Import the RobotService class
import { RobotService } from './services/robot-service.js';

describe('RobotService - getRobotIMUReading', () => {
    let robotService;

    beforeEach(() => {
        // Create an instance of RobotService before running each test
        robotService = new RobotService();
    });

    it('should reject with "Not connected to ROS" if ROS is not connected', async () => {
        try {
            // Call getRobotIMUReading without connecting to ROS (mocked)
            await robotService.getRobotIMUReading();
        } catch (error) {
            expect(error).toBe('Not connected to ROS');
        }
    });

    it('should resolve with IMU data when ROS is connected', async () => {
        // Mock the ROS connection and ROSLIB.Topic
        const mockROS = {
            isConnected: true,
        };

        const mockTopic = {
            subscribe: jest.fn((callback) => {
                const mockMessage = { exampleData: 'your mock data' };
                callback(mockMessage);
            }),
        };

        // Assign the mocked ROS and ROSLIB.Topic to the RobotService instance
        robotService.#ros = mockROS;
        robotService.#ros.Topic = mockTopic;

        // Call getRobotIMUReading
        const result = await robotService.getRobotIMUReading();

        expect(result).toEqual({ exampleData: 'your mock data' });
        expect(mockTopic.subscribe).toHaveBeenCalledWith(expect.any(Function));
    });
});
