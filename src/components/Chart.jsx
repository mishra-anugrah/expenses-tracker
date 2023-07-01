import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

export const Chart = (props) => {
  const { summary } = props;

  ChartJS.register(ArcElement, Tooltip, Legend);

  return (
    <div className="chart">
      <Doughnut
        data={{
          labels: ["Income", "Expenses"],
          datasets: [
            {
              data: [
                summary ? summary.income : 0,
                summary ? summary.expense : 0,
              ],
              backgroundColor: ["green", "red"],
              borderColor: ["green", "red"],
              borderWidth: 1,
            },
          ],
        }}
      />
    </div>
  );
};
