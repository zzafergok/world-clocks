import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { Layout, Card, Row, Col, Button } from "antd";
import "../App.css";

export default function Clock({ match }) {
  const [clock, setClock] = useState("");
  const [day, setDay] = useState("");
  const [week, setWeek] = useState("");

  useEffect(() => {
    // console.log(match.params.continent);
    // console.log(match.params.area);
    const getClock = () => {
      axios
        .get(
          `http://worldtimeapi.org/api/timezone/${match.params.continent}/${match.params.area}`
        )
        .then((res) => {
          setClock(res.data.datetime);
          setWeek(res.data.week_number);
          setDay(res.data.day_of_year);
        });
    };
    getClock();
  }, [match]);

  const { Header, Footer, Content } = Layout;
  return (
    <div>
      <Layout>
        <Header></Header>
        <Footer></Footer>
        <Row align="middle">
          <Col span={12} offset={6}>
            <Content>
              <Card className="content-card">
                <h2>{match.params.area} City</h2>
                <h4>{moment(clock).format("DD MMMM YYYY, h:mm:ss")}</h4>
                <h5>{day}th day of the year</h5>
                <h5>{week}th day of the year</h5>
              </Card>
              <Link to="/">
                <Button
                  className="content-button"
                  type="primary"
                  shape="round"
                  icon={<ArrowLeftOutlined />}
                >
                  Back
                </Button>
              </Link>
            </Content>
          </Col>
        </Row>
        <Footer></Footer>
      </Layout>
    </div>
  );
}
