import "./styless.css";
import { Container } from "@mantine/core";
import CusomCarousel from "components/Carousel/Carousel";
import SkletonCard from "components/Card/SkletonCard/SkletonCard";

type CandidatesProps = {
  CandidatesList: any | unknown;
};

const Candidates: React.FC<CandidatesProps> = ({ CandidatesList }) => {
  // const cartItem = [
  //   {
  //     fullnmae: "Ryan1 Harrington",
  //     img: "https://i0.wp.com/newdoorfiji.com/wp-content/uploads/2018/03/profile-img-1.jpg?ssl=1",
  //     socicons: [facebook, telegram, instagram, phone],
  //   },
  //   {
  //     fullnmae: "Bryan2 Carter",
  //     img: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWFsZXxlbnwwfHwwfHw%3D&w=1000&q=80",
  //     socicons: [facebook, telegram, instagram, phone],
  //   },
  //   {
  //     fullnmae: "Jayden Duncan",
  //     img: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg",
  //     socicons: [facebook, telegram, instagram, phone],
  //   },
  //   {
  //     fullnmae: "Saidamir Bakhromov",
  //     img: "https://media.istockphoto.com/photos/portrait-concept-picture-id1016761216?k=20&m=1016761216&s=612x612&w=0&h=jEC8voGLjSyhdOO7EMQyrLtZ9m--TEUmd4X56sqyZk0=",
  //     socicons: [facebook, telegram, instagram, phone],
  //   },

  //   {
  //     fullnmae: "Ryan Harrington",
  //     img: "https://i0.wp.com/newdoorfiji.com/wp-content/uploads/2018/03/profile-img-1.jpg?ssl=1",
  //     socicons: [facebook, telegram, instagram, phone],
  //   },
  //   {
  //     fullnmae: "Bryan Carter",
  //     img: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWFsZXxlbnwwfHwwfHw%3D&w=1000&q=80",
  //     socicons: [facebook, telegram, instagram, phone],
  //   },
  // ];

  return (
    <div className="cand_wrapper">
      <div className="cand__header">
        <Container size="xl" className="cand__header-container">
          <div className="cand__left-header">
            <p>
              Real numbers <span>142k</span>
            </p>
            <p>
              Predictions <span>700k</span>
            </p>
          </div>
          <div className="cand__right-header">
            <p>
              143:21:53<span>left</span>
            </p>
          </div>
        </Container>
      </div>
      <Container size="xl">
        <h2>Candidates</h2>
        {CandidatesList.isLoading ? (
          <SkletonCard />
        ) : (
          <CusomCarousel
            CandidatesList={CandidatesList}
            height="auto"
            slideSize="auto"
            slideGap="xl"
            align="start"
            slidesToScroll={3}
            withControls={false}
          />
        )}
      </Container>
    </div>
  );
};

export default Candidates;
