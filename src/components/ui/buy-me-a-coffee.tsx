import type React from "react";

interface BuyMeACoffeeButtonProps {
	username: string;
	className?: string;
}

export const BuyMeACoffeeButton: React.FC<BuyMeACoffeeButtonProps> = ({
	username,
	className,
}) => {
	const profileUrl = `https://www.buymeacoffee.com/${username}`;
	return (
		<a
			href={profileUrl}
			target="_blank"
			rel="noopener noreferrer"
			className={className}
			style={{
				display: "inline-block",
				background: "#FFDD00",
				color: "#000",
				padding: "0.75em 1.5em",
				borderRadius: "8px",
				fontWeight: "bold",
				textDecoration: "none",
				boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
				transition: "background 0.2s",
			}}
		>
			☕ Buy Me a Coffee
		</a>
	);
};
