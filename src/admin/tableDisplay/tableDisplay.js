import "./tableDisplay.css";
import useState from "react";
import { useNavigate } from "react-router-dom";
function TableDisplay(props) {
	let { updateAppointment, params, setParms, reactive } = props;
	let navigate = useNavigate();
	return (
		<div className="partnerRequestsComponentWraper">
			<div className="partnerRequestLabel">
				<label>Company</label>
				<label>City</label>
				<label>Owner</label>
				<label>Category</label>
			</div>
			{params
				? params.map((d, i) => {
						return (
							<div
								className="partnerRequestWrapper"
								onClick={() => {
									navigate("/partner/" + d.id);
								}}>
								<label>{d.company_name}</label>
								<label>{d.city}</label>
								<label>{d.owner_name}</label>
								<label>{d.category}</label>
								<div className="spanWrapper">
									{reactive ? (
										<span
											class="material-symbols-outlined"
											id={d.id}
											key={i}
											onClick={(e) => {
												updateAppointment(e.target.id, "approved");
												setParms(params.filter((item) => item.id !== d.id));
											}}>
											check
										</span>
									) : (
										""
									)}

									{reactive ? (
										<span
											class="material-symbols-outlined"
											id={d.id}
											onClick={(e) => {
												updateAppointment(e.target.id, "denied");

												setParms(params.filter((item) => item.id !== d.id));
											}}>
											do_not_disturb_on
										</span>
									) : (
										""
									)}
								</div>
							</div>
						);
				  })
				: null}
		</div>
	);
}

export default TableDisplay;
