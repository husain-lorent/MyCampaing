import React, {FC} from "react";
import "./styless.css";

type HokageDropdownProps = {
    list: any;
};

const HokageDropdown: FC<HokageDropdownProps> = ({list}) => {

    const handleSelectElection = (id: number) => {
        id && localStorage.setItem("election_id", String(id))
    }

    return (
        <div className="hokage_dropdown">
            <ul>
                {list?.map((d: any) => (
                    <li onClick={() => handleSelectElection(d?.id)} key={d?.id}>{d?.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default HokageDropdown;
