import "./style.css";
import { useState, FC } from "react";
import { useGetSponsorsQuery } from "hooks/query";
import SponsorsItem from "./SponsorsItem/SponsorsItem";
import AddClient from "./SponsorModal/AddClient/AddClient";
import UpdateSponsor from "./UpdateSponsor/UpdateSponsor";

type SponsorsState = {
  openedModel?: any;
};

const Sponsors: FC<SponsorsState> = ({ openedModel }) => {
  const [opened, setOpened] = useState(false);
  const [openUpdate, setOpenUpdate] = useState("sponsoritem");

  const useGetSponsors = useGetSponsorsQuery({
    election: 1,
    update: 1,
    enabled: openedModel == "sponsors" ? true : false,
  });

  return (
    <div className="sponsors__wrapper">
      <h2>Sponsors</h2>
      {openUpdate == "sponsoritem" ? (
        <div className="sponsorsitem">
          {useGetSponsors?.data?.results.map((item: any, index: number) => (
            <SponsorsItem
              item={item}
              key={index}
              setOpenUpdate={setOpenUpdate}
            />
          ))}
        </div>
      ) : openUpdate == "update" ? (
        <UpdateSponsor setOpenUpdate={setOpenUpdate} />
      ) : null}
      <div className="addsponsors" onClick={() => setOpened(true)}>
        +Add sponsor
      </div>
      <AddClient opened={opened} setOpened={setOpened} />
    </div>
  );
};

export default Sponsors;
