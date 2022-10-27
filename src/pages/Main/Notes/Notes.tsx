import {useAccountPopup} from "context/AccountPopupContext";
import "./style.css";

const Notes = () => {
    const {handleMouseOver, handleMouseOut, isHovering} = useAccountPopup();

    return (
        <div className={`${isHovering ? "notes" : "notes__hover"}`}>
            <div className="notes__top">
                <h2>Notes</h2>
                <div className="notes__block">
                    <div className="notes__block-btns">
                        <p className="notes__block-add">New block</p>
                        <p className="notes__block-delete">Delete block</p>
                    </div>
                    <div className="notes__dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
            <div className="votes__texteditor">
                {/*////////// Text Editor /////////////*/}
            </div>
        </div>
    );
};

export default Notes;
