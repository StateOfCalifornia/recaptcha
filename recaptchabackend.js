const fetch = require("node-fetch");

async function verifyRecaptcha(token) {
  const secret = "YOUR_SECRET_KEY";
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
    { method: "POST" }
  );
  const data = await response.json();
  return data.success;
}

app.post("/submit-form", async (req, res) => {
  const { name, email, "g-recaptcha-response": recaptchaToken } = req.body;
  const isHuman = await verifyRecaptcha(recaptchaToken);
  if (!isHuman) {
    res.status(400).send("reCAPTCHA verification failed");
    return;
  }
  // process the form submission
  res.send("Form submitted successfully!");
});
