import {useEffect, useState} from "react";
import axios from "axios";
import {request} from "../../services/api";

//useInfinite hook only use with useObserveRef, because these hooks props relative to each other

export default function useInfiniteScroll(pageNumber: number) {
    const [loading, setLoading] = useState(true);
    const [refetch, setRefetch] = useState(false)
    const [error, setError] = useState(false);
    const [results, setResults] = useState<any>([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel: any
        request.get("/election/event/pagination", {
            params: {page: pageNumber},
            cancelToken: new axios.CancelToken(c => cancel = c),
        }).then((res) => {
            res?.data?.results && setResults((prevResults: any) => [...prevResults, ...res?.data?.results])
            setHasMore(res.data.results.length > 0)
            setLoading(false)
        }).catch(e => {
            if (axios.isCancel(e)) return
            setError(true)
        })
        return () => cancel();
    }, [pageNumber, refetch])

    return {loading, error, results, hasMore, refetch, setRefetch}

}
