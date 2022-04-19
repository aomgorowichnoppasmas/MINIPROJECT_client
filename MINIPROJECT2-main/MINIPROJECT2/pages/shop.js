import Layout from "../components/layout";
import { useState, useEffect } from "react";
import styles from "../styles/shop.module.css";
import axios from "axios";
import config from "../config/config";
import { useRouter } from "next/router";
import CheckRouter from "../components/checkrouter";

const Shop = ({ token }) => {
  const router = useRouter();
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  useEffect(async () => {
    setUserid(localStorage.getItem("userid"));
  });
  const productList = [
    { id: "fixedblade", productName: "Bastinelli Creations Sin", price: 400 },
   { id: "dagger", productName: "bastinelli M390", price: 350 },
  
  ];
  const addtocart = async (item) => {
    console.log(item);
    let productName = item.productName;
    let quantity = 1;
    let price = item.price;
    await axios
      .post(
        `${config.URL}/addtocart`,
        { userid, productName, quantity, price },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Layout>
      <div>
        <div className={styles.cart}>
          <img
            onClick={() => {
              router.push("/cart");
            }}
            className={styles.cartIcon}
            src={"image/cart.png"}
          ></img>
        </div>
        <div className={styles.productBox}>
          <div className={styles.productList}>
            {productList.map((item) => {
              return (
                <div key={item.id}>
                  <img
                    className={styles.productImage}
                    src={`image/knife/${item.id}.jpg`}
                  ></img>
                  <div className={styles.productDetial}>
                    <p className={styles.productName}>{item.productName}</p>
                    <p className={styles.productName}>{item.price}$</p>
                    <button
                      onClick={() => addtocart(item)}
                      className={styles.addCartButton}>ADD PRODUCT IN CART</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckRouter(Shop);

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
