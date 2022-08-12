import React, { useEffect, useContext } from "react";
import UserContext from "../UserContext";

import Caraousel from "./Caraousel";

export default function Home() {

  const {getCart } = useContext(UserContext);

  useEffect(() => {
    getCart();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="my-5 pt-3">

    <Caraousel/>
    </div>
  );
}
