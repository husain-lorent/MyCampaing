import {Checkbox} from "@mantine/core";
import {ChangeEvent, useState} from "react";
import {Accordion, Button} from "@mantine/core";
import {BsFillPlayFill} from "react-icons/bs";
import React from "react";
import "./style.css";
import phone from "assets/images/phone.svg";
import facebook from "assets/images/facebook.svg";
import telegram from "assets/images/telegram.svg";
import instagram from "assets/images/instagram.svg";
import {useDeleteEventGuestMutation} from "../../../../../../hooks/mutation/useDeleteEventGuestMutation";
import {useLocation} from "react-router-dom";
import toast from "react-hot-toast";

type ModalContentItemProps = {
    item: any;
    setOpened: any;
    opened: boolean;
    title: string;
};


const ModalContentItem: React.FC<ModalContentItemProps> = ({
                                                               item,
                                                               setOpened,
                                                               opened,
                                                               title,
                                                           }) => {
    const {state} = useLocation();
    const [showDesc, setShowDesc] = useState(false);
    const [deleteBlock, setDeleteBlock] = useState(false);
    const [guests, setGuests] = useState<number[]>([]);
    const useDeleteEventGuest = useDeleteEventGuestMutation()
    const [accordionOpen, setAccordionOpen] = useState<string | null>(null);
    const handleGuestsDelete = (event: ChangeEvent<HTMLInputElement>, id: number) => {
        if (event?.target?.checked) {
            setGuests((prevState: number[]) => [...prevState, id])
        } else {
            setGuests((prevState: number[]) => prevState?.filter(item => item !== id))
        }

    }
    const controlshowremove = () => {
        if (deleteBlock) {
            setDeleteBlock(false);
        }
    };

    const deleteItem = () => {
        if (deleteBlock) {
            const data = {
                event_id: state?.event_id,
                guests
            }
            const deleteEventPromise = useDeleteEventGuest.mutateAsync(data);
            deleteEventPromise.then((res) => {
                if (res?.data?.success === "deleted") {
                    item.refetch();
                    toast.success("Guest successfully deleted")
                }
            }).catch((err) => {
                toast.error("Please check and try again!")
            })
            setDeleteBlock(false);
            return;
        }
        if (!deleteBlock) {
            setDeleteBlock(true);
            return;
        }
    };
    return (
        <>
            <Accordion
                value={accordionOpen}
                onChange={setAccordionOpen}
                chevron={<BsFillPlayFill size={20}/>}
                styles={{
                    chevron: {
                        "&[data-rotate]": {
                            transform: "rotate(90deg)",
                        },
                    },
                }}
            >
                <div className="accordion__wrapper">
                    <Accordion.Item
                        value={`customization`}
                        className="accordion__item"
                    >
                        <div className="accordion__flex">
                            <Accordion.Control>
                                <div onClick={controlshowremove} className="accordion__change">
                                    <p>{title}</p>
                                </div>
                            </Accordion.Control>

                            <div className="accordion__change-btns">
                                <>
                                    {!deleteBlock && <Button
                                        onClick={() => setOpened(true)}
                                        className="accardion__change-add"
                                    >
                                        Add {title?.split(" ")[0]}
                                    </Button>}
                                    {item?.data?.results?.length !== 0 && <Button
                                        onClick={() => {
                                            deleteItem();
                                            setAccordionOpen(`customization`);
                                        }}
                                        className="accardion__change-delete"
                                    >
                                        Delete {title?.split(" ")[0]}
                                    </Button>}
                                </>
                            </div>
                        </div>
                        <Accordion.Panel>
                            {item?.data?.results?.map((d: any) => (
                                <div className="info" key={d?.id}>
                                    <>
                                        <div className="modalcontentitem__wrapper">
                                            <div
                                                onClick={() => setShowDesc(!showDesc)}
                                                className="modalcontentitem__info"
                                            >
                                                <img src={d?.image}/>
                                                <div>
                                                    <p className="modalcontentitem__name">{d?.first_name} {d?.last_name}</p>
                                                    <p className="modalcontentitem__job">{d?.organization}</p>
                                                </div>
                                                <div>
                                                    <p className="modalcontentitem__phone">{d?.social_contacts?.phone_number}</p>
                                                    <p className="modalcontentitem__mail">{d?.social_contacts?.email}</p>
                                                </div>
                                            </div>
                                            {deleteBlock ? (
                                                <Checkbox onChange={(event) => handleGuestsDelete(event, d?.id)}/>
                                            ) : (
                                                <div className="modalcontentitem__socicons">
                                                    <a href={"https://www.facebook.com/" + d?.social_contacts?.facebook}>
                                                        <img src={facebook}/>
                                                    </a>
                                                    <a href={"https://t.me/" + d?.social_contacts?.telegram}>
                                                        <img src={telegram}/>
                                                    </a>
                                                    <a href={"https://www.instagram.com/" + d?.social_contacts?.instagram}>
                                                        <img src={instagram}/>
                                                    </a>
                                                    <a href={"tel:" + d?.social_contacts?.phone_number}>
                                                        <img src={phone}/>
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                        {showDesc && (
                                            <div className="modalcontent__text">
                                                <p>
                                                    Lorem Ipsum is simply dummy text of the printing and
                                                    typesetting industry. Lorem Ipsum has been the
                                                    industry's standard dummy text ever since the 1500s
                                                </p>
                                            </div>
                                        )}
                                    </>
                                </div>
                            ))}
                        </Accordion.Panel>
                    </Accordion.Item>
                </div>
            </Accordion>
        </>
    );
};

export default ModalContentItem;
