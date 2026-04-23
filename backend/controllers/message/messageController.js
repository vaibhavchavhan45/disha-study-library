import { getMessageService } from "./messageService.js";

export const getMessageController = async (req, res) => {
  const { name, isValid } = req.body;

  try {
    const result = await getMessageService(name, isValid);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Something went wrong.",
    });
  }
};