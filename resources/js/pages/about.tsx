import { Head, Link } from "@inertiajs/react";
import { contact } from "@/routes";

export default function About() {
    return (
        <>
            <Head title="About" />
            <h1>About</h1>
            <p>
                This is the about page
            </p>

            <Link href={contact()} as="button">
                Contact
            </Link>
        </>
    )
}
