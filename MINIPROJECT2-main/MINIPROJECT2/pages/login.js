import Head from "next/head";
import Layout from "../components/layout";
import { useState } from "react";
import styles from "../styles/login.module.css";
import axios from "axios";
import config from "../config/config";
import { useRouter } from "next/router";

export default function Login({ token }) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isLogin = () => {
    if (token == "") {
      return (
        <div>
          <p className={styles.textTitle}>LOGIN HERE</p>
          <div
            style={{ marginBottom: "10px", marginTop: "30px" }}
            className="rows">
            <p className={styles.textTitle}>RESGISTER HERE</p>
            <button className="p-2 bg-yellow-500 hover:text-indigo-500 rounded-br-lg rounded-tl-lg drop-shadow-lg" onClick={() => {
                router.push("/register");
              }}
              className="p-2 bg-yellow-500 hover:text-indigo-500 rounded-br-lg rounded-tl-lg drop-shadow-lg"> REGISTER </button>
          </div>
          <div className="column">
            <input
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
              placeholder="Username"></input>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="Password"></input>
            <button className="p-2 bg-yellow-500 hover:text-indigo-500 rounded-br-lg rounded-tl-lg drop-shadow-lg" onClick={() => login()} > LOGIN </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="rows">
          <p className={styles.title}>YOU ARE LOGIN NOW!!!</p>
        </div>
      );
    }
  };
  const login = async () => {
    let result = await axios
      .post(
        `${config.URL}/login`,
        { username, password },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("userid", res.data.user.id);
        window.location.replace("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return <Layout>{isLogin()}</Layout>;
}

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
