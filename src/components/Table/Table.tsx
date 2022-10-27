import "./style.css";
import { Table } from "@mantine/core";
import Skletavatar from "assets/images/skletavatar.svg";

function CustomTable({ verticalSpacing, CandidatesList }: any) {
  const rows = CandidatesList.data?.results.map((item: any) => (
    <tr key={item.id}>
      <td className="table__info">
        <img src={item.image ? item.image : Skletavatar} alt={item.first_name} />
        <p>{item.first_name} </p>
        <p>{item.last_name}</p>
      </td>
      <td className="table__percent">{item.percentage.toFixed(1)} %</td>
      <td className="table__numbers">{item.real_numbers} k</td>
      <td className="table__predictions">{item.predictions}</td>
    </tr>
  ));
  return (
    <div className="table__wrapper">
      <h2>Statistic</h2>
      <Table className="table" verticalSpacing={verticalSpacing}>
        <thead>
          <tr>
            <th></th>
            <th>
              <h4>Percentages</h4>
            </th>
            <th>
              <h4>Real numbers</h4>
            </th>
            <th>
              <h4>Predictions</h4>
            </th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
}

export default CustomTable;
