import styles from "../styles/Home.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import config from "../config/config";
const Layout = (props) => {
  const router = useRouter();
  const topButton = () => {
    return (
      <div className={styles.boxmenu}>
        <button
          className={styles.mainmenu}
          onClick={() => {
            router.push("/");
          }}>Home</button>
        <button
          className={styles.mainmenu}
          onClick={() => {
            router.push("/shop");
          }}>Our Product</button>
        <button
          className={styles.mainmenu}
          onClick={() => {
            router.push("/login");
          }}>Login</button>
        <button
          className={styles.mainmenu}
          onClick={() => {
            axios
              .get(`${config.URL}/logout`, { withCredentials: true })
              .then((res) => {
                // console.log(res);
                localStorage.removeItem("userid");
                window.location.reload();
              })
              .catch((error) => {
                console.log(error);
              });
          }}>Logout</button>
      </div>
    );
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>BASTINELLI TACTICAL KNIFE CLUB</title>
      </Head>
      <main className={styles.main} style={{backgroundImage: "https://t4.ftcdn.net/jpg/03/49/86/71/240_F_349867133_a2Upqgg99LIDvsGbR4Of3a0bXCwqzrAQ.jpg"}}>
        <div className="row-justify-between" style={{ backgroundColor : '#181818' }}>
          <div className="rows" style ={{ color:'white', alignItems: 'center' }}>
            <img className={styles.logo} src={"https://static.wixstatic.com/media/5a3fd2_d7ccbebfbaf943c8b49a49e3069cf85e~mv2.jpg/v1/fill/w_50,h_48,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/griffes%20hd.jpg"}></img>
            <div className="flex" style={{ flexDirection: 'column', justifyContent: 'center' }}>
              <h1  className={styles.title} >BASTINELLI TACTICAL </h1>
              <small>KNIFE CLUB</small>
            </div>
           
            
          </div>
          <div style={{ paddingRight: '5%' }}>{topButton()}</div>
        </div>
        <div>{props.children}</div>
      </main>
    </div>
  );
};

export default Layout;

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
