import React, { useState } from "react";
import Card from "../components/explore/Card";
import data from "../dummy";
import Search from "../components/search/Search";
import Aside from "../components/aside/Aside";

function Home() {
  const [search, setSearch] = useState("");
  console.log(search);
  return (
    <div className="flex">
      <Aside />

      <div className="ml-56">
        <Search setSearch={setSearch} />
        <Card />
      </div>
    </div>
  );
}

export default Home;
