import "./styless.css";
import React from "react";
import { Container } from "@mantine/core";
import CustomSlider from "components/Slider/Slider";



type CandidatesListProps = {
  CandidatesList: any | unknown;
  defaultValue?: number | undefined
};

const SliderStatistic: React.FC<CandidatesListProps> = ({ CandidatesList }) => {
  return (
    <div className="slider__wrapper">
      <div className="disable_slider"></div>
      <Container size="xl">
        <div className="bg__lines">
          <span className="line-1"></span>
          <span className="line-2"></span>
          <span className="line-3"></span>
          <span className="line-4"></span>
        </div>
        {CandidatesList.data?.results.map((item:any, index:number) => (
          <div className="in__wrapper" key={index}>
            <CustomSlider item={item} />

          </div>
        ))}
      </Container>
    </div>
  );
};

export default SliderStatistic;
