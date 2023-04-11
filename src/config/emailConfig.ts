import axios from "axios";
import nodemailer from "nodemailer";

export async function sendEmail(rol: string, data: object): Promise<void> {
  try {
    const { data } = await axios.get(`http://localhost:3001/users/rol/${rol}`);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "thelinkbaseofficial@gmail.com",
        pass: "qcuydstusovjayct",
      },
    });

    await transporter.sendMail({
      from: "thelinkbaseofficial@gmail.com",
      to: data.email,
      subject: "A new user has registered",
      text: `${data}`,
    });
  } catch (error) {
    console.log(error);
  }
}
