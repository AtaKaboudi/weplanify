import "./stats.css";
import { Line } from "react-chartjs-2";
import ReactApexChart from "react-apexcharts";

function ReportCard(props) {
	let params = props.params;
	return (
		<div className="pRerportCard">
			<span class="material-symbols-outlined" style={{ color: params.color }}>
				{params.icon}
			</span>
			<div>
				<h3 style={{ color: params.color }}>{params.value}</h3>
				<label>{params.label}</label>{" "}
			</div>
		</div>
	);
}

export { ReportCard };
