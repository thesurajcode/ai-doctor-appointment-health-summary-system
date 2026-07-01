const validate = (schema) => {
  return (req, res, next) => {

    console.log(req.body);

    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten(),
      });
    }

    req.validatedData = result.data;
    next();
  };
};
