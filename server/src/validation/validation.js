const joi = require("joi");

exports.userSchema = joi.object({
  name: joi.string().min(3).max(30).required(),
  phone: joi.string().regex(/[0-9]/).min(10).max(10).required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).max(16),
});

exports.loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).max(16),
});

exports.memoriesSchema = joi.object({
  content: joi.string().required(),
  lat: joi
    .string()
    .regex(/[0-9.]/)
    .max(10)
    .required(),
  lang: joi
    .string()
    .regex(/[0-9.]/)
    .max(10)
    .required(),
});

exports.memoriesUp = joi.object({
  content: joi.string(),
  id: joi.string(),
  lat: joi
    .string()
    .regex(/[0-9.]/)
    .max(10),
  long: joi
    .string()
    .regex(/[0-9.]/)
    .max(10),
});
