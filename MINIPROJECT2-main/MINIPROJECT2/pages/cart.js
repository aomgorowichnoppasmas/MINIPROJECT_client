import Layout from "../components/layout";
import { useState, useEffect } from "react";
import styles from "../styles/shop.module.css";
import axios from "axios";
import config from "../config/config";
import { useRouter } from "next/router";
import CheckRouter from "../components/checkrouter";
import _ from 'lodash'
const Cart = ({ token }) => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [productList, setProductList] = useState([]);
  console.log('productList', productList)
  const [confirm, setConfirm] = useState("");
  const [userid, setUserid] = useState("");
  const [changed, setChangd] = useState(new Date())

  useEffect(async () => {
    setUserid(localStorage.getItem("userid"));
    getData(localStorage.getItem("userid"))
    },[]);
  const getData = (id) => {
    axios
      .get(`${config.URL}/cart`, {
        headers: {
          search: id || userid,
        },
      })
      .then((res) => {
        let resdata = res.data.data[0];
        setProductList(resdata.products);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteProduct = (productname) => {
    axios
      .get(`${config.URL}/deleteProduct`, {
        headers: {
          userid: userid,
          productname: productname,
        },
      })
      .then((res) => {
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const changeQuantity = (item, operation) => {
    const allProduct = productList
    const index = _.indexOf(allProduct, _.find(allProduct, ['productName', item.productName]))
    let quantity = item.quantity
    if(operation==='add'){
      quantity+=1
    }
    else{
      quantity-=1
    }
    allProduct.splice(index, 1, {
      ...allProduct[index],
      quantity: quantity
    })
    setProductList(allProduct)
    setChangd(new Date())
  }
  return (
    <Layout>
      <div>
        <p className={styles.carttitle}>KNIFE CART</p>
        <div className="centers">
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeader}>
                <td>NAME</td>
                <th>QUANTITY</th>
                <th>PRICE</th>
                <th>TOTAL</th>
                <th>CHANGE</th>
              </tr>
            </thead>
            <tbody>
              {productList.map((item) => {
                if (item !== null) {
                  return (
                    <tr key={item.productName}>
                      <td>{item.productName}</td>
                      <th>
                        <div style={{display: 'flex', justifyContent: 'center', gap: 6}}>
                          <button className={styles.addButton} onClick={() => changeQuantity(item, 'add')}>+</button>
                        <span>{item.quantity}</span>
                        <button className={styles.deleteButton} onClick={() => changeQuantity(item, 'delete')}>-</button>
                        </div>
                        </th>

                      <th>{item.price}</th>
                      <th>{item.price*item.quantity}</th>

                      <th>
                        <button
                          onClick={() => deleteProduct(item.productName)}
                          className={styles.deleteButton}>DELETE</button>
                      </th>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
        <div className="centers">
          <button
            style={{ marginTop: "5vh" }}
            className={styles.showButton}
            onClick={() => {
              setConfirm("Order Confirm");
            }}>CONFIRM</button>
        </div>
        <div className="centers">
          <p className="rows">{confirm}</p>
        </div>
      </div>
    </Layout>
  );
};

export default CheckRouter(Cart);

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
