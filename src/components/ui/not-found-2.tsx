import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@/components/ui/empty";
import { HomeIcon, CompassIcon } from "lucide-react";

export function NotFound() {
	return (
		<div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0B0C0E]">
			<Empty>
				<EmptyHeader>
					<EmptyTitle className="mask-b-from-20% mask-b-to-80% font-extrabold text-9xl text-amber-500">
						404
					</EmptyTitle>
					<EmptyDescription className="-mt-8 text-nowrap text-foreground/80 text-white">
						The page you're looking for might have been <br />
						moved or doesn't exist.
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<div className="flex gap-2">
						<Button asChild className="bg-amber-500 hover:bg-amber-600 text-black">
							<a href="/">
								<HomeIcon
								className="size-4 mr-2" data-icon="inline-start" />
								Go Home
							</a>
						</Button>

						<Button asChild variant="outline" className="border-amber-500/50 text-amber-500 hover:bg-amber-500/10">
							<a href="/#capabilities">
								<CompassIcon 
								className="size-4 mr-2" 
								data-icon="inline-start" />{" "}
								Explore
							</a>
						</Button>
					</div>
				</EmptyContent>
			</Empty>
		</div>
	);
}
