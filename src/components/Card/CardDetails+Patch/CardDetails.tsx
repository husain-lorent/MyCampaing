import "./style.css";
import { FC, useState } from "react";
import { useForm } from "@mantine/form";
import Button from "components/Button/Button";
import closeIcon from "../../../assets/images/closeicon.svg";
import { FileButton, Grid, NumberInput, TextInput } from "@mantine/core";
import { usePutchCandidateMutation } from "hooks/mutation/usePutchCandidateMutation";
import { useStatesPopup } from "context/MainStatesContext";

type CardDetailsProps = {
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
  showDetails: boolean;
  CandidatesListDetail: any;
  voterfirstname: string;
  voterlastname: string;
};

const CardDetails: FC<CardDetailsProps> = ({
  setShowDetails,
  CandidatesListDetail,
  voterfirstname,
  voterlastname,
}) => {
  const [file, setFile] = useState([]);
  const usePatchCandidates = usePutchCandidateMutation({
    id: CandidatesListDetail.data?.id,
  });
  console.log(CandidatesListDetail.data.predictions);
  const { refreshCandidates, setRefreshCandidates } = useStatesPopup();
  const form = useForm({
    initialValues: {
      telegram: CandidatesListDetail.data?.social_contacts.telegram,
      whatsapp: CandidatesListDetail.data?.social_contacts.whatsapp,
      facebook: CandidatesListDetail.data?.social_contacts.facebook,
      email: CandidatesListDetail.data?.social_contacts.email,
      firstname: CandidatesListDetail.data?.first_name,
      lastname: CandidatesListDetail.data?.last_name,
      predictions: CandidatesListDetail.data?.predictions,
      phone: CandidatesListDetail.data?.social_contacts.phone_number,
    },

    validate: {
      firstname: (value) =>
        value.length < 2 ? "First name adress must " : null,
      lastname: (value) => (value.length < 2 ? "Last name adress must " : null),
      email: (value) => (value.length < 2 ? "Email adress " : null),
      predictions: (value) => (value.length < 0 ? "predictions " : null),
    },
  });

  const UpdateUser = (e: any) => {
    let data = {
      social_contacts: {
        phone_number: e.phone,
        telegram: e.telegram,
        facebook: e.facebook,
        whatsapp: e.whatsapp,
        email: e.email,
      },
      first_name: e.firstname,
      last_name: e.lastname,
      // organization: e.organization,
      predictions: e.predictions,
      // image: image,
    };
    const PutchCandidates = usePatchCandidates.mutateAsync(data);
    PutchCandidates.then((res) => {
      console.log(res);
      setRefreshCandidates(refreshCandidates + 1);
    }).catch((err) => {
      console.log(err, "err");
    });
  };

  return (
    <div className="carddetails">
      <div>
        <div className="cardpatch__top">
          <h2>
            {voterfirstname} { voterlastname}
          </h2>
          <img
            onClick={() => setShowDetails(false)}
            src={closeIcon}
            alt="closeIcon"
          />
        </div>
        <div className="cardpatch__photo">
          <p>Photo</p>
          <div className="cardpatch__download-img">
            <FileButton onChange={(e: any) => setFile(e)} accept="">
              {(props) => <Button {...props}>Choose photo</Button>}
            </FileButton>
          </div>
        </div>
        <div className="cardpatch__form">
          <form
            onSubmit={form.onSubmit(UpdateUser)}
            className="addcardsoc__form-control"
          >
            <div className="organization">
              <TextInput
                label="First name"
                placeholder="Organization"
                {...form.getInputProps("firstname")}
              />
              <TextInput
                label="Last name"
                placeholder="Last name"
                {...form.getInputProps("lastname")}
              />
              <TextInput
                label="Phone number"
                placeholder="+998900028833"
                {...form.getInputProps("phone")}
              />
            </div>
            <p>Social media</p>
            <Grid gutter="xs">
              <Grid.Col span={6}>
                <TextInput
                  label=""
                  placeholder="Telegram"
                  {...form.getInputProps("telegram")}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  placeholder="WhatsApp"
                  {...form.getInputProps("whatsapp")}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  placeholder="Facebook"
                  {...form.getInputProps("facebook")}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  type="email"
                  placeholder="Your email"
                  {...form.getInputProps("email")}
                />
              </Grid.Col>
            </Grid>
            <NumberInput
              label="Predictions"
              placeholder="Predictions"
              {...form.getInputProps("predictions")}
            />
            <div className="cardpatch__btn-add">
              <Button width="100%" type="submit">
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
