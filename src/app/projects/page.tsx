import { redirect } from "next/navigation";

export const metadata = {
  title: "Karya & Portofolio | Darell Rangga",
  description:
    "Koleksi proyek, sistem produksi, dan rekayasa perangkat lunak Darell Rangga.",
};

export default function ProjectsPage() {
  redirect("/#hub");
}
