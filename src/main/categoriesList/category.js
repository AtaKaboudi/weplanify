import "./category.css";
import { useNavigate } from "react-router-dom";
function Category() {
	var categories = [
		{
			name: "Barber Men",
			icon: "https://cdn-icons-png.flaticon.com/512/1995/1995475.png",
		},
		{
			name: "Barber Women",
			icon: "https://cdn-icons-png.flaticon.com/512/3499/3499087.png",
		},
		{
			name: "Nail Saloon",
			icon: "https://cdn-icons-png.flaticon.com/512/2810/2810421.png",
		},
		{
			name: "Coach",
			icon: "https://cdn-icons-png.flaticon.com/512/939/939286.png",
		},
		{
			name: "Beauty Institute",
			icon: "https://cdn-icons.flaticon.com/png/512/2763/premium/2763384.png?token=exp=1659015777~hmac=744d3330ce1a25356e26b146a3aab808",
		},
	];

	const navigate = useNavigate();

	function rerouteToProduct(e) {
		navigate("/navigate/" + e.target.id);
	}
	return (
		<div className="margins">
			<h3 className="categoryTitle">Categories</h3>
			<div className="CaregoryWrapper">
				{categories.map((category) => {
					return (
						<div
							id={category.name}
							className="categoryCard"
							onClick={(e) => {
								rerouteToProduct(e);
							}}>
							<img id={category.name} src={category.icon}></img>
							<h3 id={category.name} className="categoryName">
								{category.name}
							</h3>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Category;
