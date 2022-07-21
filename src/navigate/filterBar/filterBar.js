import "./filterBar.css";
import { useEffect, useState } from "react";
const FilterBar = (props) => {
	var { parentUpdate } = props;

	/// will contain only the active filter
	var [filterParams, setFilterParams] = useState({});

	//callback parent when fitler params change
	useEffect(() => {
		parentUpdate(filterParams);
	}, [filterParams]);

	return (
		<div className="filterBarWrapper">
			<label>FILTER</label>
			<form className="categoryFitlerWrapper">
				<select
					onChange={(e) => {
						setFilterParams({
							filter: "category",
							op: "==",
							value: e.target.value,
						});
					}}>
					<option value="" disabled selected>
						{" "}
						Category
					</option>
					<option value="Barber Men"> Barber Man</option>
					<option value="Barber Women"> Barber Woman</option>
					<option value="Massage Center"> Massage Center</option>
					<option value="Nail Saloon"> Nail Saloon</option>
				</select>
			</form>

			<form className="categoryFitlerWrapper">
				<select
					onChange={(e) => {
						setFilterParams({
							filter: "city",
							op: "==",
							value: e.target.value,
						});
					}}>
					<option disabled selected>
						City
					</option>
					<option>Sousse</option>
					<option>Tunis</option>
				</select>
			</form>

			<form className="categoryFitlerWrapper">
				<select
					onChange={(e) => {
						setFilterParams({ filter: "rating", op: ">", value: 3 });
					}}>
					<option disabled selected>
						Rank{" "}
					</option>
					<option value="Best"> Best Patners</option>
				</select>
			</form>
		</div>
	);
};
export default FilterBar;
