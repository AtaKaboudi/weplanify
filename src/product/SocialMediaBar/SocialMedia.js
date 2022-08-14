import "./SocialMedia.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faYoutube,
	faFacebook,
	faTwitter,
	faInstagram,
} from "@fortawesome/free-brands-svg-icons";
function SocialMediaBar() {
	return (
		<div className="SocialMediaBar">
			<h2> FOLLOW US!</h2>
			<label>To stay in touch with our latest news</label>
			<div className="LinksContainer">
				<a href="https://www.youtube.com" className="youtube social">
					<FontAwesomeIcon icon={faYoutube} size="2x" />
				</a>
				<a href="https://www.facebook.com" className="facebook social">
					<FontAwesomeIcon icon={faFacebook} size="2x" />
				</a>
				<a href="https://www.instagram.com" className="instagram social">
					<FontAwesomeIcon icon={faInstagram} size="2x" />
				</a>
				<a href="https://www.twitter.com" className="twitter social">
					<FontAwesomeIcon icon={faTwitter} size="2x" />
				</a>
			</div>
		</div>
	);
}
export default SocialMediaBar;
