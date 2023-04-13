import axios from "axios";
import nodemailer from "nodemailer";

const transporter = async (
  email: string,
  data: any,
  subject: string
): Promise<void> => {
  const dataSent = JSON.stringify(data)
  
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "thelinkbaseofficial@gmail.com",
      pass: "qcuydstusovjayct",
    },
  });

  try {
    await transporter.sendMail({
      from: "thelinkbaseofficial@gmail.com",
      to: email,
      subject: subject,
      text: `${dataSent}`,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export async function sendEmail(
  rol: string,
  data1: any,
  subject: string
): Promise<void> {
  try {
    const { data } = await axios.get(`http://localhost:3001/users/rol/${rol}`);
    if (rol === "superAdmin" || rol === "adminProviders") {
      await transporter(data[0].email, data1, subject);
    }
    if (rol === "checker") {
      const checker = data.find((user: any) => user.company === data1.company);
      await transporter(checker?.email, data1, subject);
    }
    if (rol === "adminReviews") {
      data.map(
        async (user: any) => await transporter(user.email, data1, subject)
      );
    }
  } catch (error) {
    console.log(error);
  }
}
