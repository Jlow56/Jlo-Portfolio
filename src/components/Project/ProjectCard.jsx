import React from "react";
import HomeCard from "./HomeCard";
import "./ShowCards.scss";

function ShowCards({ accomodations }) {
  return (
    <section className="card-container flex">
      {accomodations.map((item) => (
        <HomeCard
          key={item.id}
          id={item.id}
          cover={item.cover}
          alt={item.title}
          title={item.title}
        />
      ))}
    </section>
  );
}

export default ShowCards;