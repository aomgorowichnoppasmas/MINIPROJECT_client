import Head from "next/head";
import Layout from "../components/layout";
import { useState } from "react";
import styles from "../styles/login.module.css";
import axios from "axios";
import config from "../config/config";
import { useRouter } from "next/router";

export default function Register({ token }) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const register = async () => {
    let result = await axios
      .post(
        `${config.URL}/register`,
        { username, password, email, name, telephone },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        router.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Layout>
      <p style={{ marginLeft: "10px" }} className={styles.textTitle}>REGISTER</p>
      <div className="column">
        <input
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
          placeholder="USERNAME">
            
          </input>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          placeholder="PASSWORD">
          </input>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          placeholder="E-MAIL">  
          </input>
        <input
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          placeholder="NAME">
          </input>
        <input
          onChange={(e) => setTelephone(e.target.value)}
          className={styles.input}
          placeholder="PHONE NUNBER">
          </input>
        <button className="p-2 bg-yellow-500 hover:text-indigo-500 rounded-br-lg rounded-tl-lg drop-shadow-lg" onClick={() => register() }>REGISTER</button>
      </div>
    </Layout>
  );
}

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
