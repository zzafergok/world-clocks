import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { Row, Col, Card, Form, Input } from "antd";
import "../App.css";

export default function Cities() {
  const [cities, setCities] = useState([]);
  const [citiesBuffer, setCitiesBuffer] = useState(null);

  useEffect(() => {
    getCities();
  }, []);

  const getCities = () => {
    axios.get("http://worldtimeapi.org/api/timezone").then((res) => {
      setCities(res.data);
    });
  };

  const gridStyle = {
    width: "100%",
    textAlign: "center",
  };

  const paragraph = {
    textAlign: "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const filterCities = (e) => {
    var input = e.target.value;
    setCitiesBuffer((prevCity) => {
      return cities.filter((s) => {
        return s.toLowerCase().includes(input.toLowerCase());
      });
    });
  };

  const { Search } = Input;

  return (
    <>
      <Row>
        <Form
          style={{width: "90%", padding: "36px", marginLeft:'15%', marginRight:'15%'}}
          {...layout}
          name="basic"
        >
          <Search placeholder="Search" onChange={filterCities} enterButton />
        </Form>
      </Row>
      <Row>
        {citiesBuffer != null
          ? citiesBuffer.map((city) => (
              <Col key={city} span={8} style={{ padding: "12px" }}>
                <Link to={`/${city}`}>
                  <Card style={gridStyle}>
                    <h3 style={paragraph}>{city}</h3>
                  </Card>
                </Link>
              </Col>
            ))
          : cities.map((city) => (
              <Col key={city} span={8} style={{ padding: "15px" }}>
                <Link to={`/${city}`}>
                  <Card style={gridStyle}>
                    <h3 style={paragraph}>{city}</h3>
                  </Card>
                </Link>
              </Col>
            ))}
      </Row>
    </>
  );
}
