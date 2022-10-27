import "./style.css";
import Skletavatar from "assets/images/skletavatar.svg";
import { Checkbox } from "@mantine/core";
type AddCandtItemsProps = {
  items: any;
  checked: any;
  setChecked: any;
};

const AddCandtItems: React.FC<AddCandtItemsProps> = ({
  items,
  checked,
  setChecked,
}) => {
  const handeleGainCheckedValues = (e: any, data: any) => {
    if (e.target.checked) {
      setChecked([...checked, data.id]);
    } else {
      setChecked(checked.filter((item: any) => item !== data.id));
    }
  };

  return (
    <div className="addcandidate">
      <div className="addcandidate__soc-info">
        <img
          src={items.image ? items.image : Skletavatar}
          alt={items.first_name}
        />
        <div>
          <div className="addcandidate__name">
            <p>{items.first_name}</p>
            <p>{items.last_name}</p>
          </div>
          <p className="addcandidate__job">{items.organization}</p>
        </div>
      </div>
      <div>
        <p className="addcandidate__phone">{items.phone_number}</p>
        <p className="addcandidate__mail">{items.email}</p>
      </div>
      <Checkbox onChange={(e) => handeleGainCheckedValues(e, items)} />
    </div>
  );
};

export default AddCandtItems;
