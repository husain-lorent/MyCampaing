import {Slider} from "@mantine/core";


type DataObject = {
    label: string,
    value: number
}
type ResultsProps = {
    data: DataObject[];
    today: number
}

function Demo({data, today}: ResultsProps) {
    return (
        <>
            {data?.every(item => !isNaN(item?.value)) && <Slider
                label={(val) => data.find((mark) => mark.value !== val)?.value}
                defaultValue={today}
                marks={data?.sort((a, b) => a?.value - b?.value)}
                // styles={{markLabel: {display: 'none'}}}
            />}
        </>

    );
}

export default Demo;
