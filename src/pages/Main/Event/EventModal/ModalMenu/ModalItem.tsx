import {useEffect, useRef} from "react";
import {useState} from "react";
import deleteIcon from "assets/images/deleteicon.svg";
import React from 'react'
import {useNavigate, createSearchParams, useLocation} from "react-router-dom";
import qs from "qs";

type modalItemProps = {
    item?: any
}

const ModalItem: React.FC<modalItemProps> = ({item}) => {
    const [openseting, setOpenSeting] = useState(false);
    const navigate = useNavigate();
    const {pathname, search} = useLocation();
    const query = qs.parse(search, {ignoreQueryPrefix: true});
    const menuRef: any = useRef();

    const handleEventItem = (id: number) => {
        navigate({
            pathname,
            search: qs.stringify({
                ...query,
                id
            })
        })
        setOpenSeting(!openseting)
    }

    useEffect(() => {
        let handler = (e: any) => {
            if (!menuRef.current.contains(e.target)) {
                setOpenSeting(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
            if (openseting) {
                setOpenSeting(false);
            }
        };
    });
    useEffect(() => {
        let handlerkokage = (e: any) => {
            if (!menuRef.current.contains(e.target)) {
                setOpenSeting(false);
            }
        };

        document.addEventListener("mousedown", handlerkokage);

        return () => {
            document.removeEventListener("mousedown", handlerkokage);
            if (openseting) {
                setOpenSeting(false);
            }
        };
    });
    return (
        <div>
            <ul ref={menuRef}>
                <li onClick={() => handleEventItem(item?.id)}>
                    {item?.title}
                    {openseting && (
                        <div className="modalitem__delete_drp">
                            <div className="modalitem__btn-delete">
                                <img src={deleteIcon} alt="DeleteIcon"/> <span> Delete</span>
                            </div>
                        </div>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default ModalItem;
