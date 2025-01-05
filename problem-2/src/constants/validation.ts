export const ValidateRules = {
  required: {
    value: true,
    message: "This field is required",
  },
  emailPattern: {
    value: /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
    message: "Invalid email address",
  },
  phonePattern: {
    value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
    message: "Invalid phone number",
  },
  usernamePattern: {
    value: /^[a-zA-Z0-9._-]+$/,
    message:
      "Should contains letters, numbers, hyphens (-), underscores (_), and periods (.)",
  },
};
