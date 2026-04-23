import { submitFeedbackService } from "./feedbackService.js";

export const submitFeedbackController = async (req, res) => {
  try {
    const result = await submitFeedbackService(req.body);
    return res.status(200).json(result);
  } 
  
  catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Something went wrong.",
    });
  }
};