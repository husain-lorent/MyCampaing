import React, {useEffect, useState} from "react";
import EventItem from "./EventItem";
import EventModal from "./EventModal/EventModal";
import "./style.css";
import useInfiniteScroll from "hooks/custom/useInfiniteScroll";
import {useObserverRef} from "hooks/custom/useObserverRef";


function Event() {
    const [opened, setOpened] = useState<boolean | number>(false);
    const [pageNumber, setPageNumber] = useState(1);
    const {
        results,
        hasMore,
        loading,
        error,
        refetch,
        setRefetch
    } = useInfiniteScroll(pageNumber);
    const lastResultElementRef = useObserverRef({loading, setPageNumber, hasMore})

    useEffect(() => {
        setRefetch(!refetch);
    }, [opened]);


    return (
        <>
            <div className="event">
                <div className="event__top">
                    <h2>Events</h2>
                    <div className="event__add-btn">
                        <button onClick={() => setOpened(true)}>Add</button>
                    </div>
                </div>
                <div className="event__list">
                    {results?.map((item: any, index: number) => (
                        <EventItem
                            item={item}
                            key={index}
                            opened={opened}
                            setRefetch={setRefetch}
                            setPageNumber={setPageNumber}
                            lastResultElementRef={lastResultElementRef}
                            setOpened={setOpened}
                        />
                    ))}
                </div>
                <EventModal opened={opened} setOpened={setOpened}/>
            </div>
        </>
    );
}


export default Event;

