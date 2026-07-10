import { SystemPage } from "@/components/layout/SystemPage";

export default function NotFound() {
  return (
    <SystemPage
      action={{
        href: "/work",
        label: "Return to work",
      }}
      label="404"
      message="The page may have moved, or the project may no longer be published."
      title="This space is quiet."
    />
  );
}
