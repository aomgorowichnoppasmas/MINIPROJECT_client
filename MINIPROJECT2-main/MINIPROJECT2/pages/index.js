import styles from "../styles/Home.module.css";
import Layout from "../components/layout";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  axios
  return (
    <Layout>
      <div className={styles.homepage}>
        <p className={styles.indexTitle}>WELCOME TO BATINELLI STORE</p>
        <p className={styles.subtitle}>NEW COLLECTION HAS ARIVED</p>
        <button className={styles.indexButton} onClick={() => {
            router.push("/shop");
          }}>New Collection</button>
      </div>
    </Layout>
  );
}
