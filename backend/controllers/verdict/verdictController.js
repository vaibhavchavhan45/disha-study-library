import { submitVerdictService } from "./verdictService.js";

export const submitVerdictController = async (req, res) => {
  try {
    const result = await submitVerdictService(req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Something went wrong.",
    });
  }
};
