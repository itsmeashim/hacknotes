import { useSession } from "~/modules/common/hooks/use-session";

interface SignedOutProps {
	children: React.ReactNode;
}

export default function SignedOut({ children }: SignedOutProps) {
	const { data: session } = useSession();

	if (session?.data?.user) {
		return null;
	}

	return <>{children}</>;
}
