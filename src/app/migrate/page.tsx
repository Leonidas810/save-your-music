import { PageTemplate } from "@/components/templates/Page.template";

export default function MigratePage() {
    return (
        <div className="min-h-screen dark:bg-black bg-white flex flex-col justify-center">
            <PageTemplate>
                <h1>Start Migration</h1>
                <p>Choose a source and destination platform to migrate your playlists.</p>
                

            </PageTemplate>
        </div>
    );
}
